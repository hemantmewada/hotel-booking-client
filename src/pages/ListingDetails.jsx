import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
  BiTrash,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdOutlineVilla,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { conf } from "../config/conf";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Puff } from "react-loader-spinner";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";

const facilitiesArray = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />,
  },
  {
    name: "Pet allowed",
    icon: <MdPets />,
  },
];

const ListingDetails = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const { _id } = useParams();
  const [listing, setListing] = useState({});
  const navigate = useNavigate();

  // listing api
  const getListing = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${conf.API_URL}/listing/single/${_id}`);
      if (data.status) {
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
    getListing();
  }, [_id]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const start = dateRange[0].startDate;
  const end = dateRange[0].endDate;
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  const handleSubmit = async () => {
    try {
      if (dayCount < 1) {
        toast.error("Please select any date for booking.");
        return false;
      }
      const { data } = await axios.post(
        `${conf.API_URL}/booking/create`,
        {
          listingId: _id,
          hostId: listing.createdBy?._id,
          startDate: start,
          endDate: end,
          totalPrice: (dayCount * listing.price).toFixed(2),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.status) {
        toast.dismiss();
        toast.success(data.message);
        navigate(`/trips`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return loading ? (
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
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        {/* photos */}
        <div className="photos">
          {listing.photos?.map((photo, index) => (
            <img
              key={index}
              src={`${conf.SERVER_BASE_URL}/${photo.replace("public", "")}`}
              alt={`photo ${index + 1}`}
            />
          ))}
        </div>

        {/* type */}
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} Guests - {listing.bedroomCount} Bedrooms -{" "}
          {listing.bedCount} Beds - {listing.bathroomCount} Bathrooms
        </p>
        <hr />

        <div className="profile">
          <img
            src={`${conf.SERVER_BASE_URL}/${listing.createdBy?.profile.replace(
              "public",
              ""
            )}`}
            alt=""
          />
          <h3>
            Hosted by {listing.createdBy?.firstName.charAt(0).toUpperCase()}
            {listing.createdBy?.firstName.slice(1)}{" "}
            {listing.createdBy?.lastName.charAt(0).toUpperCase()}
            {listing.createdBy?.lastName.slice(1)}
          </h3>
        </div>
        <hr />

        <h1>Description</h1>
        <p>{listing.description}</p>
        <hr />

        <h1>{listing.highlight}</h1>
        <p>{listing.highlightDescription}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities?.map((amenity, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilitiesArray.find(
                        (facility) => facility.name == amenity
                      ).icon
                    }
                  </div>
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                showMonthArrow={false}
              />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} X {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} X {dayCount} nights
                </h2>
              )}
              <h2>Total price ${(listing.price * dayCount).toFixed(2)}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button type="submit" className="button" onClick={handleSubmit}>
                book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
