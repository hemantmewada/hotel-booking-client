import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { Puff } from "react-loader-spinner";
import toast from "react-hot-toast";
import axios from "axios";
import { conf } from "../config/conf";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";
const Search = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const { search } = useParams();
  // listing api
  const getSearchedListing = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${conf.API_URL}/listing/search/${search}`
      );
      if (data.status) {
        console.log(data.data);
        setListing(data.data);
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
    getSearchedListing();
  }, [search]);

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
          <h1 className="title-list">Searched result for: {search}</h1>
          <div className="list">
            {listing?.map(
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

export default Search;
