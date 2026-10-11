
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartHome Finder Backend is Running!");
});

app.post("/send-sms", async (req, res) => {
  console.log("SEND-SMS REQUEST RECEIVED");

  try {
    const {
      user_name,
      user_phone,
      message,
      property_title,
      owner_phone,
    } = req.body;

    if (!user_name || !user_phone || !owner_phone) {
      return res.status(400).json({
        success: false,
        message: "Name, user phone and owner phone are required.",
      });
    }

    const apiKey = process.env.FAST2SMS_API_KEY;

    if (!apiKey) {
      console.error("FAST2SMS_API_KEY is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Fast2SMS API key is missing. Check your server .env file.",
      });
    }

    const smsMessage =
      `SmartHome Finder Enquiry\n` +
      `Property: ${property_title || "Property"}\n` +
      `Name: ${user_name}\n` +
      `Phone: ${user_phone}\n` +
      `Message: ${message || "Interested in this property."}`;

    console.log("Enquiry received for property:", property_title);
    console.log("Owner phone:", owner_phone);

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: smsMessage,
        language: "english",
        flash: 0,
        numbers: String(owner_phone).replace(/\D/g, ""),
      },
      {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    console.log("Fast2SMS response:", response.data);

    // Don't report success if the provider reports failure.
    if (response.data?.return === false) {
      return res.status(502).json({
        success: false,
        message: response.data?.message || "Fast2SMS rejected the SMS request.",
      });
    }

    return res.json({
      success: true,
      message: "SMS request accepted by Fast2SMS.",
    });
  } catch (error) {
    console.error(
      "SMS ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "SMS sending failed. Check the backend terminal for details.",
    });
  }
});

app.listen(5000, () => {
  console.log("SmartHome Finder Backend running on port 5000");
  console.log("http://localhost:5000");
});