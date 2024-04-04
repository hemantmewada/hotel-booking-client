import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/properties/:_id" element={<ListingDetails />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/propertylist" element={<PropertyList />} />
        <Route path="/reservationlist" element={<ReservationList />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search/:search" element={<Search />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
