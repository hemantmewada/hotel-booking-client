import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Search, Menu, Person } from "@mui/icons-material";
import { darkgrey, pinkred } from "../styles/variables";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Navbar.scss";
import { conf } from "../config/conf";
import { setLogout } from "../redux/state";
import toast from "react-hot-toast";
import Input from "./Input";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    dispatch(
      setLogout({
        user: null,
        token: null,
      })
    );
    toast.success("Logged out successfully.");
    navigate("/sign-in");
  };
  const handleSearch = () => {
    if (search) {
      navigate(`/search/${search}`);
    } else {
      toast.error("please input something in search box.");
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/logo.png" alt="logo" />
      </Link>
      <div className="navbar_search">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton onClick={handleSearch}>
          <Search sx={{ color: pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <Link to="/create-listing" className="host">
            Become a host
          </Link>
        ) : (
          <Link to="/sign-in" className="host">
            Become a host
          </Link>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <Menu sx={{ color: darkgrey }} />
          {user ? (
            <img
              src={`${conf.SERVER_BASE_URL}/${user.profile.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          ) : (
            <Person sx={{ color: darkgrey }} />
          )}
        </button>
        {isDropdownActive && (
          <div className="navbar_right_accountmenu">
            {!user ? (
              <>
                <Link to="/sign-in">Sign in</Link>
                <Link to="/sign-up">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/trips">Trip List</Link>
                <Link to="/wishlist">Wish List</Link>
                <Link to="/propertylist">Property List</Link>
                <Link to="/reservationlist">Reservation List</Link>
                <Link
                  onClick={() => setIsDropdownActive(!isDropdownActive)}
                  to="/create-listing"
                >
                  Become A Host
                </Link>
                <Link onClick={handleLogout}>Log out</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
