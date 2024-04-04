import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { Puff } from "react-loader-spinner";
import toast from "react-hot-toast";
import axios from "axios";
import { conf } from "../config/conf";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";
const CategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { category } = useParams();
  // listing api
  const getCategoryWiseListing = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${conf.API_URL}/listing/category/${category}`
      );
      if (data.status) {
        setWishlist(data.data);
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
    getCategoryWiseListing();
  }, []);

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
          <h1 className="title-list">{category}</h1>
          <div className="list">
            {wishlist?.map(
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

export default CategoryPage;
