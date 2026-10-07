import { Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";

import Register from "./pages/Register1";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Property from "./pages/Property";
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import Success from "./pages/Success";

import Book from "./pages/Book";
import MyBookings from "./pages/MyBookings";

import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import ServiceBooking from "./pages/ServiceBooking";
import MyServiceBookings from "./pages/MyServiceBookings";

import Compare from "./pages/Compare";
import TrackWorker from "./pages/TrackWorker";

import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  return (
    <Routes>

      {/* =========================
          SPLASH
      ========================= */}

      <Route
        path="/"
        element={<Splash />}
      />


      {/* =========================
          LOGIN
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =========================
          REGISTER
      ========================= */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
          BUYER / USER
      ========================= */}

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/search"
        element={<Search />}
      />

      <Route
        path="/property/:id"
        element={<Property />}
      />

      <Route
        path="/contact/:id"
        element={<Contact />}
      />

      <Route
        path="/schedule/:id"
        element={<Schedule />}
      />

      <Route
        path="/success/:id"
        element={<Success />}
      />


      {/* =========================
          PROPERTY BOOKING
      ========================= */}

      <Route
        path="/book/:id"
        element={<Book />}
      />

      <Route
        path="/my-bookings"
        element={<MyBookings />}
      />

      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation />}
      />


      {/* =========================
          SERVICES
      ========================= */}

      <Route
        path="/services"
        element={<Services />}
      />

      <Route
        path="/service/:id"
        element={<ServiceDetails />}
      />

      <Route
        path="/service-booking/:workerId"
        element={<ServiceBooking />}
      />

      <Route
        path="/my-service-bookings"
        element={<MyServiceBookings />}
      />

      <Route
        path="/track-worker/:id"
        element={<TrackWorker />}
      />


      {/* =========================
          OTHER BUYER FEATURES
      ========================= */}

      <Route
        path="/compare"
        element={<Compare />}
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

    </Routes>
  );
}

export default App;