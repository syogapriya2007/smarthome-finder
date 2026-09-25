const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("SmartHome Finder Backend is Running!");
});


// ===============================
// CONTACT + SMS
// ===============================

app.post("/api/contact", async (req, res) => {
  try {
    const {
      user_name,
      user_phone,
      message,
      property_title,
      owner_phone,
    } = req.body;

    console.log("\n========== NEW ENQUIRY ==========");
    console.log("User Name:", user_name);
    console.log("User Phone:", user_phone);
    console.log("Property:", property_title);
    console.log("Owner Phone:", owner_phone);
    console.log("Message:", message);

    // Check required fields
    if (!user_name || !user_phone || !owner_phone) {
      return res.status(400).json({
        success: false,
        message: "Name, user phone and owner phone are required.",
      });
    }


    // ===============================
    // SMS MESSAGE
    // ===============================

    const smsMessage =
      `SmartHome Finder: New enquiry for ${property_title}. ` +
      `Name: ${user_name}. ` +
      `Phone: ${user_phone}. ` +
      `Message: ${message}`;


    console.log("SMS Message:", smsMessage);


    // ===============================
    // FAST2SMS
    // ===============================

    const smsResponse = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: smsMessage,
        numbers: owner_phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );


    console.log("Fast2SMS Response:");
    console.log(smsResponse.data);


    // ===============================
    // SUCCESS
    // ===============================

    return res.json({
      success: true,
      message: "Enquiry sent and SMS request submitted successfully!",
      smsResponse: smsResponse.data,
    });

  } catch (error) {

    console.error("\n========== SMS ERROR ==========");

    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Enquiry received but SMS could not be sent.",
      error: error.response?.data || error.message,
    });
  }
});


// ===============================
// SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SmartHome Finder Backend running on port ${PORT}`);
});