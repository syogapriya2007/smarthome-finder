import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchProperties from "./pages/Searchproperties";
import Property from "./pages/Property";






function App() {
  return (
    <Routes>

      {/* FIRST PAGE - LOGIN */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* HOME */}
      <Route
        path="/home"
        element={<Home />}
      />

      {/* PROPERTIES */}
      <Route
        path="/search"
        element={<SearchProperties />}
      />

      {/* PROPERTY DETAILS */}
      <Route
        path="/property/:id"
        element={<Property />}
      />

    </Routes>
  );
}

export default App;