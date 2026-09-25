
import { Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
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
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProperty from "./pages/AddProperty";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />} />

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

      <Route
        path="/book/:id"
        element={<Book />}
      />
      <Route
  path="/my-bookings"
  element={<MyBookings />}
/>
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
      <Route path="/compare" element={<Compare />} />
      <Route path="/track-worker/:id" element={<TrackWorker />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/add-property" element={<AddProperty />} />

    </Routes>
  );
}

export default App;
