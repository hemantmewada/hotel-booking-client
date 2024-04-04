import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import { setTrips } from "../redux/state";
import toast from "react-hot-toast";
import axios from "axios";
import { conf } from "../config/conf";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
const TripList = () => {
  const [loading, setLoading] = useState(false);
  const tripList = useSelector((state) => state.user?.trips) || [];
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // listing api
  const getTrips = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${conf.API_URL}/booking/trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.data);
      if (data.status) {
        dispatch(setTrips(data.data));
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
    if (token) getTrips();
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
          <h1 className="title-list">Your Trip List</h1>
          <div className="list">
            {tripList?.map(
              ({
                _id,
                listingId,
                startDate,
                endDate,
                totalPrice,
                booking = true,
              }) => (
                <ListingCard
                  listingId={listingId._id}
                  booking={booking}
                  photos={listingId.photos}
                  city={listingId.city}
                  province={listingId.province}
                  country={listingId.country}
                  category={listingId.category}
                  price={totalPrice}
                  type={listingId.type}
                  startDate={startDate}
                  endDate={endDate}
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

export default TripList;
