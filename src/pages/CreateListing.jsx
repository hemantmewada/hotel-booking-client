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
import "../styles/CreateListing.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { pinkred } from "../styles/variables";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { useFormik } from "formik";
import { CreateListingSchema } from "../validations/schemas";
import axios from "axios";
import { conf } from "../config/conf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const data = {
  categoriesArray: [
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
  ],
  typesArray: [
    {
      name: "An entire place",
      description: "Guests have the whole place to themselves",
      icon: <FaHouseUser />,
    },
    {
      name: "Room(s)",
      description:
        "Guests have their own room in a house, plus access to shared places",
      icon: <BsFillDoorOpenFill />,
    },
    {
      name: "A Shared Room",
      description:
        "Guests sleep in a room or common area that maybe shared with you or others",
      icon: <FaPeopleRoof />,
    },
  ],
  facilitiesArray: [
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
  ],
};
const initialValues = {
  streetAddress: "",
  aptSuite: "",
  city: "",
  province: "",
  country: "",
  title: "",
  description: "",
  highlight: "",
  highlightDescription: "",
  price: "",
};
const CreateListing = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const token = useSelector((state) => state.token);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prev) => [...prev, ...newPhotos]);
  };
  const handleDragPhoto = (result) => {
    if (!result.destination) return false;
    const items = Array.from(photos);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.slice(result.destination.index, 0, recordedItem);
    setPhotos(items);
  };
  const handleRemove = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index != indexToRemove));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationStates({
      ...locationStates,
      [name]: value,
    });
  };

  const handleChangeCount = (name, type) => {
    let value = 0;
    if (type == "increment") {
      value = count[name] + 1;
    } else if (type == "decrement") {
      if (count[name] == 1) {
        value = 1;
        toast.dismiss();
        toast.error(`${name} can't be less then 1`);
      } else {
        value = count[name] - 1;
      }
    }
    setCount({
      ...count,
      [name]: value,
    });
  };

  const handleChangeAmenity = (amenity) => {
    const index = amenities.indexOf(amenity);
    if (index != -1) {
      let tempAmenities = [...amenities];
      tempAmenities.splice(index, 1);
      setAmenities(tempAmenities);
    } else {
      setAmenities([...amenities, amenity]);
    }
    // if (amenities.includes(amenity)) {
    //   setAmenities((prev) => prev.filter((item) => item != amenity));
    // } else {
    //   setAmenities([...amenities, amenity]);
    // }
  };
  // formik form
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues,
      validationSchema: CreateListingSchema,
      onSubmit: (values, state) => {
        createListing(values, state);
      },
    });
  const createListing = async (values, state) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (photos.length > 0) {
        /* Append each selected photos to the FormData object */
        photos.forEach((photo) => {
          formData.append("photos", photo);
        });
      }
      formData.append("category", category);
      formData.append("type", type);
      if (amenities.length > 0) {
        amenities.forEach((amenity) => {
          formData.append("amenities", amenity);
        });
      }
      // formData.append("amenities", amenities);
      formData.append("guestCount", count.guests);
      formData.append("bedroomCount", count.bedrooms);
      formData.append("bedCount", count.beds);
      formData.append("bathroomCount", count.bathrooms);
      const { data } = await axios.post(
        `${conf.API_URL}/listing/create`,
        formData,
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
        state.resetForm();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Public your place</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your places</h2>
            <hr />
            <h3>Which of these categories best describes you place?</h3>
            <div className="category-list">
              {data.categoriesArray.map((item, index) => {
                return (
                  <div
                    className={`category${
                      category == item.label ? " selected" : ""
                    }`}
                    key={index}
                    onClick={() => setCategory(item.label)}
                  >
                    <div className="category_icon">{item.icon}</div>
                    <p>{item.label}</p>
                  </div>
                );
              })}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {data.typesArray.map((item, index) => {
                return (
                  <div
                    className={`type${item.name == type ? " selected" : ""}`}
                    key={index}
                    onClick={() => setType(item.name)}
                  >
                    <div className="type_text">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="type_icon">{item.icon}</div>
                  </div>
                );
              })}
            </div>
            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <Input
                  onChange={handleChange}
                  value={values.streetAddress}
                  name="streetAddress"
                  placeholder="Street Address"
                  error={errors.streetAddress}
                  onBlur={handleBlur}
                  touched={touched.streetAddress}
                />
                {/* <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={locationStates.streetAddress}
                  onChange={handleLocationChange}
                /> */}
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                {/* <input
                  type="text"
                  placeholder="Apartment, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={locationStates.aptSuite}
                  onChange={handleLocationChange}
                /> */}
                <Input
                  onChange={handleChange}
                  value={values.aptSuite}
                  name="aptSuite"
                  placeholder="Apartment, Suite, etc. (if applicable)"
                  error={errors.aptSuite}
                  onBlur={handleBlur}
                  touched={touched.aptSuite}
                />
              </div>
              <div className="location">
                <p>City</p>
                {/* <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={locationStates.city}
                  onChange={handleLocationChange}
                /> */}
                <Input
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  placeholder="City"
                  error={errors.city}
                  onBlur={handleBlur}
                  touched={touched.city}
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                {/* <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={locationStates.province}
                  onChange={handleLocationChange}
                /> */}
                <Input
                  onChange={handleChange}
                  value={values.province}
                  name="province"
                  placeholder="Province"
                  error={errors.province}
                  onBlur={handleBlur}
                  touched={touched.province}
                />
              </div>
              <div className="location">
                <p>Country</p>
                {/* <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={locationStates.country}
                  onChange={handleLocationChange}
                /> */}
                <Input
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  placeholder="Country"
                  error={errors.country}
                  onBlur={handleBlur}
                  touched={touched.country}
                />
              </div>
            </div>
            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("guests", "decrement")}
                  />
                  <p>{count.guests}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("guests", "increment")}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("bedrooms", "decrement")}
                  />
                  <p>{count.bedrooms}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("bedrooms", "increment")}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("beds", "decrement")}
                  />
                  <p>{count.beds}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("beds", "increment")}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("bathrooms", "decrement")}
                  />
                  <p>{count.bathrooms}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: pinkred },
                    }}
                    onClick={() => handleChangeCount("bathrooms", "increment")}
                  />
                </div>
              </div>
            </div>
            {/* end */}
          </div>
          {/* step 1 end */}
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {data.facilitiesArray.map((item, index) => {
                return (
                  <div
                    className={`facility ${
                      amenities.includes(item.name) ? " selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleChangeAmenity(item.name)}
                  >
                    <div className="facility_icon">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 ? (
                      <>
                        <input
                          type="file"
                          className="d-none"
                          id="image"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from you device</p>
                        </label>
                      </>
                    ) : (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            index={index}
                            key={index}
                            draggableId={index.toString()}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemove(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          type="file"
                          className="d-none"
                          id="image"
                          multiple
                          accept="image/*"
                          onChange={handleUploadPhotos}
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from you device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* end */}
            <h3>What make your place attractive and exciting</h3>
            <div className="description">
              <p>Title</p>
              {/* <input type="text" placeholder="Title" name="title" /> */}
              <Input
                error={errors.title}
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched.title}
                placeholder="Title"
                value={values.title}
              />
              <p>Description</p>
              {/* <input type="text" placeholder="Description" name="description" /> */}
              <Input
                error={errors.description}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched.description}
                placeholder="Description"
                value={values.description}
              />
              <p>Highlight</p>
              {/* <input type="text" placeholder="Highlight" name="highlight" /> */}
              <Input
                error={errors.highlight}
                name="highlight"
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched.highlight}
                placeholder="Highlight"
                value={values.highlight}
              />
              <p>Highlight Details</p>
              {/* <input
                type="text"
                placeholder="Highlight Details"
                name="highlightDescription"
              /> */}
              <Input
                error={errors.highlightDescription}
                name="highlightDescription"
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched.highlightDescription}
                placeholder="Highlight Details"
                value={values.highlightDescription}
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              {/* <input
                type="number"
                className="price"
                name="price"
                placeholder="Enter price"
              /> */}
              <Input
                error={errors.price}
                name="price"
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched.price}
                placeholder="Enter price"
                value={values.price}
                type="number"
              />
            </div>
          </div>
          {/* step 2 end */}
          <button className="submit_btn" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
