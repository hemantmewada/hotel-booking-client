import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.list;
    },
    setTrips: (state, action) => {
      state.user.trips = action.payload;
    },
    setWishlist: (state, action) => {
      state.user.wishlist = action.payload;
    },
    setPropertylist: (state, action) => {
      state.user.propertylist = action.payload;
    },
    setReservationlist: (state, action) => {
      state.user.reservationlist = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setListings,
  setTrips,
  setWishlist,
  setPropertylist,
  setReservationlist,
} = userSlice.actions;

export default userSlice.reducer;
