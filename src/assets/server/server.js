const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartHome Finder Backend is Running!");
});

app.post("/send-sms", async (req, res) => {
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
        message: "User name, user phone and owner phone are required",
      });
    }

    const smsMessage =
      `SmartHome Finder Enquiry\n` +
      `Property: ${property_title || "Property"}\n` +
      `Name: ${user_name}\n` +
      `Phone: ${user_phone}\n` +
      `Message: ${message || "Interested in this property."}`;

    console.log("New Enquiry");
    console.log("Owner Phone:", owner_phone);
    console.log("User Name:", user_name);
    console.log("User Phone:", user_phone);

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: smsMessage,
        language: "english",
        flash: 0,
        numbers: owner_phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Response:", response.data);

    res.json({
      success: true,
      message: "SMS sent to house owner successfully!",
    });

  } catch (error) {
    console.error(
      "SMS Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "SMS sending failed",
    });
  }
});

app.listen(5000, () => {
  console.log("SmartHome Finder Backend Started");
  console.log("http://localhost:5000");
});