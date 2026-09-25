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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // IMPORTANT: async is here
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.user_phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (formData.user_phone.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.user_name,
          user_phone: formData.user_phone,
          message: formData.message,
          property_title: property?.title || "Property",
          owner_phone: property?.ownerPhone || "",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Enquiry sent successfully!");

        setFormData({
          user_name: "",
          user_phone: "",
          message: "I'm interested in this property.",
        });

        navigate(`/property/${id}`);
      } else {
        alert(data.message || "Failed to send enquiry.");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      alert(
        "Backend server connect aagala. Please make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return (
      <div className="contact-page">
        <h2>Property not found</h2>
        <button onClick={() => navigate("/search")}>
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Owner</h1>
          <p>
            Send an enquiry about{" "}
            <strong>{property.title}</strong>
          </p>
        </div>

        <div className="property-info">
          <h2>{property.title}</h2>
          <p>📍 {property.location}</p>
          <p>💰 {property.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
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

          <div className="form-group">
            <label>Your Phone Number</label>

            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

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

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "📩 Send Enquiry"}
          </button>
        </form>

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