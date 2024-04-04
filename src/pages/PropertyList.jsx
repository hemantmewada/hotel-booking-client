import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import { setPropertylist, setTrips } from "../redux/state";
import toast from "react-hot-toast";
import axios from "axios";
import { conf } from "../config/conf";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
const PropertyList = () => {
  const [loading, setLoading] = useState(false);
  const tripList = useSelector((state) => state.user?.trips) || [];
  const wishlist = useSelector((state) => state.user?.wishlist) || [];
  const propertylist = useSelector((state) => state.user?.propertylist) || [];
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // listing api
  const getPropertylist = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${conf.API_URL}/listing/property-list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status) {
        dispatch(setPropertylist(data.data));
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) getPropertylist();
  }, [token]);

  return (
    <>
      {loading ? (
        <>
          <Navbar />
          <div
            style={{
              height: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Puff
              visible={true}
              height="80"
              width="100%"
              color="#F8395A"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <h1 className="title-list">Your Property List</h1>
          <div className="list">
            {propertylist?.map(
              ({
                _id,
                photos,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  booking={booking}
                  photos={photos}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  price={price}
                  type={type}
                  key={_id}
                />
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PropertyList;
