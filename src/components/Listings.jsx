import React, { useEffect, useState } from "react";
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
import "../styles/Listings.scss";
import toast from "react-hot-toast";
import axios from "axios";
import { conf } from "../config/conf";
import { useDispatch, useSelector } from "react-redux";
import { setListings, setWishlist } from "../redux/state";
import { Puff } from "react-loader-spinner";
import Loader from "./Loader";
import ListingCard from "./ListingCard";
import { Link, useNavigate } from "react-router-dom";

const categoriesArray = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/beach_cat.jpg",
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/windmill_cat.webp",
    label: "Windmills",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/modern_cat.webp",
    label: "Iconic cities",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: "assets/countryside_cat.webp",
    label: "Countryside",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Amazing Pools",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Ski-in/out",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Castles",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Arctic",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];
const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  const token = useSelector((state) => state.token);
  // listing api
  const getListings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${conf.API_URL}/listing?category=${category}`
      );
      if (data.status) {
        dispatch(
          setListings({
            list: data.data,
          })
        );
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
  // listing api
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        `${conf.API_URL}/listing/wishlist-with-detail`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status) {
        dispatch(setWishlist(data.data.wishList));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getWishlist();
  }, [token]);
  useEffect(() => {
    getListings();
  }, [category]);
  const navigate = useNavigate();

  return (
    <>
      <div className="category-list">
        {categoriesArray.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(item.label)}
              className={`category ${
                category == item.label ? " selected" : ""
              }`}
              key={index}
            >
              <div className="category_icon">{item.icon}</div>
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
      {loading ? (
        <div
          style={{
            height: "70vh",
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
      ) : (
        // <Loader />
        <div className="listings">
          {listings?.map(
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
      )}
    </>
  );
};

export default Listings;
