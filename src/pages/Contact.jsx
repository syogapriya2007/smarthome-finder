import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Contact.css";

function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  console.log("SELECTED PROPERTY:", property);
  console.log("OWNER PHONE:", property?.ownerPhone);

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    message: "I'm interested in this property.",
  });

  const [loading, setLoading] = useState(false);

  // Website message
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove old message when user edits form
    setStatusMessage("");
    setStatusType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage("");
    setStatusType("");

    if (!formData.user_name.trim()) {
      setStatusMessage("Please enter your name.");
      setStatusType("error");
      return;
    }

    if (!formData.user_phone.trim()) {
      setStatusMessage("Please enter your phone number.");
      setStatusType("error");
      return;
    }

    if (formData.user_phone.trim().length < 10) {
      setStatusMessage("Please enter a valid phone number.");
      setStatusType("error");
      return;
    }

    if (!formData.message.trim()) {
      setStatusMessage("Please enter your message.");
      setStatusType("error");
      return;
    }

    if (!property?.ownerPhone) {
      setStatusMessage(
        "Owner phone number is not available for this property."
      );
      setStatusType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: formData.user_name.trim(),
            user_phone: formData.user_phone.trim(),
            message: formData.message.trim(),
            property_title: property.title,
            owner_phone: property.ownerPhone,
          }),
        }
      );

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      // ===============================
      // SMS SUCCESS
      // ===============================

      if (response.ok && data.success) {
        setStatusMessage(
          "✅ Enquiry sent successfully! SMS has been sent to the property owner."
        );

        setStatusType("success");

        setFormData({
          user_name: "",
          user_phone: "",
          message: "I'm interested in this property.",
        });

        // Don't immediately navigate.
        // User can see the success message on this page.
      }

      // ===============================
      // SMS FAILED
      // ===============================

      else {
        setStatusMessage(
          data.message ||
            "❌ Enquiry submitted, but SMS could not be sent."
        );

        setStatusType("error");
      }
    } catch (error) {
      console.error("Contact Error:", error);

      setStatusMessage(
        "❌ Backend server connect aagala. Please make sure server is running on port 5000."
      );

      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // PROPERTY NOT FOUND
  // ===============================

  if (!property) {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <h2>Property not found</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/search")}
          >
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-container">

        {/* ================= HEADER ================= */}

        <div className="contact-header">
          <h1>📩 Contact Owner</h1>

          <p>
            Send an enquiry about{" "}
            <strong>{property.title}</strong>
          </p>
        </div>

        {/* ================= PROPERTY INFO ================= */}

        <div className="property-info">
          <h2>{property.title}</h2>

          <p>📍 {property.location}</p>

          <p>💰 {property.price}</p>
        </div>

        {/* ================= WEBSITE STATUS MESSAGE ================= */}

        {statusMessage && (
          <div
            className={`status-message ${
              statusType === "success"
                ? "success-message"
                : "error-message"
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >

          {/* NAME */}

          <div className="form-group">
            <label>Your Name</label>

            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label>Your Phone Number</label>

            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength="10"
              required
            />
          </div>

          {/* MESSAGE */}

          <div className="form-group">
            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              required
            />
          </div>

          {/* SEND BUTTON */}

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading
              ? "📤 Sending..."
              : "📩 Send Enquiry"}
          </button>

        </form>

        {/* ================= BACK BUTTON ================= */}

        <button
          className="back-btn"
          onClick={() => navigate(`/property/${id}`)}
        >
          ← Back to Property
        </button>

      </div>
    </div>
  );
}

export default Contact;