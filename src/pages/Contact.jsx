
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import properties from "../Data/PropertyData";
import "./Contact.css";

function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    message: "I'm interested in this property.",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatusMessage("");
    setStatusType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage("");
    setStatusType("");

    // Validate name
    if (!formData.user_name.trim()) {
      setStatusMessage("Please enter your name.");
      setStatusType("error");
      return;
    }

    // Validate phone number
    const phone = formData.user_phone.trim();

    if (!/^\d{10}$/.test(phone)) {
      setStatusMessage(
        "Please enter a valid 10-digit phone number."
      );
      setStatusType("error");
      return;
    }

    // Validate message
    if (!formData.message.trim()) {
      setStatusMessage("Please enter your message.");
      setStatusType("error");
      return;
    }

    // Check property
    if (!property) {
      setStatusMessage("Property not found.");
      setStatusType("error");
      return;
    }

    // Check owner's email
    if (
      !property.ownerEmail ||
      !String(property.ownerEmail).includes("@")
    ) {
      setStatusMessage(
        "Owner email is not configured for this property."
      );
      setStatusType("error");
      return;
    }

    setLoading(true);

    try {
      const templateParams = {
        to_email: property.ownerEmail,
        property_title: property.title || "Property Enquiry",
        user_name: formData.user_name.trim(),
        user_phone: phone,
        message: formData.message.trim(),
      };

      
const response = await emailjs.send(
  "service_oymtoih",
  "template_q9g34oe",
  templateParams,
  {
    publicKey: "7wow1YdoqHnk-gJpB",
  }
);


      console.log("EmailJS response:", response.status, response.text);

      setStatusMessage(
        "Your enquiry email has been sent successfully!"
      );
      setStatusType("success");

      setFormData({
        user_name: "",
        user_phone: "",
        message: "I'm interested in this property.",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      const errorText =
        error?.text || error?.message || "Unknown error";

      setStatusMessage(
        `Unable to send email: ${errorText}`
      );
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <h2>Property not found</h2>

          <button
            type="button"
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
        <div className="contact-header">
          <h1>📩 Contact Owner</h1>

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

        {statusMessage && (
          <div
            className={`status-message ${
              statusType === "success"
                ? "success-message"
                : "error-message"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="user_name">Your Name</label>

            <input
              id="user_name"
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_phone">
              Your Phone Number
            </label>

            <input
              id="user_phone"
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              autoComplete="tel"
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
              required
            />
          </div>

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

        <button
          type="button"
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
