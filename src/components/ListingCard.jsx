import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { conf } from "../config/conf";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
} from "@mui/icons-material";
import { dateFormat } from "../helper/Helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setWishlist } from "../redux/state";
const ListingCard = ({
  listingId,
  photos,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  booking,
}) => {
  // console.log(listingId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.user?.wishlist);
  const isLiked = wishlist?.find((item) => item._id == listingId);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // listing api
  const handleWislistAction = async (e) => {
    e.stopPropagation();
    if (!token) {
      toast.error("Please login first.");
      return false;
    }
    try {
      const { data } = await axios.get(
        `${conf.API_URL}/listing/wishlist-action/${listingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.status) {
        toast.success(data.message);
        dispatch(setWishlist(data.data.wishList));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <div className="slide" key={index}>
              <img
                src={`${conf.SERVER_BASE_URL}/${photo.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div className="prev-button">
                <ArrowBackIosNew sx={{ fontSize: "15px" }} onClick={prev} />
              </div>
              <div className="next-button">
                <ArrowForwardIos sx={{ fontSize: "15px" }} onClick={next} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {dateFormat(startDate, "d, MMMM yyyy")} -{" "}
            {dateFormat(endDate, "d, MMMM yyyy")}
          </p>
          <p>
            <span>${price}</span> total
          </p>
        </>
      )}
      <button className="favorite" onClick={handleWislistAction}>
        <Favorite
          sx={{
            color: `${isLiked ? "#FF0000" : "#FFF"}`,
          }}
        />
      </button>
    </div>
  );
};

export default ListingCard;
