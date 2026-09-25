import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkerData from "../Data/WorkerData";
import ServiceData from "../Data/ServiceData";
import "./ServiceBooking.css";

function ServiceBooking() {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const worker = WorkerData.find(
    (item) => item.id === Number(workerId)
  );

  const service = worker
    ? ServiceData.find(
        (item) => item.id === worker.serviceId
      )
    : null;

  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  if (!worker || !service) {
    return (
      <div className="booking-error">
        <h2>Booking details not found 😕</h2>

        <button onClick={() => navigate("/services")}>
          ← Back to Services
        </button>
      </div>
    );
  }

  const visitCharge = 100;
  const totalAmount = worker.price + visitCharge;

  const handleBooking = (e) => {
    e.preventDefault();

    if (
      !serviceType ||
      !date ||
      !time ||
      !address
    ) {
      alert("Please fill all required details.");
      return;
    }

    const booking = {
      id: Date.now(),
      workerId: worker.id,
      workerName: worker.name,
      serviceId: service.id,
      serviceName: service.name,
      serviceType,
      date,
      time,
      address,
      notes,
      serviceCharge: worker.price,
      visitCharge,
      totalAmount,
      status: "Confirmed",
    };

    const oldBookings =
      JSON.parse(
        localStorage.getItem("serviceBookings")
      ) || [];

    localStorage.setItem(
      "serviceBookings",
      JSON.stringify([
        ...oldBookings,
        booking,
      ])
    );

    alert("🎉 Service booked successfully!");

    navigate("/my-service-bookings");
  };

  return (
    <div className="service-booking-page">

      {/* HEADER */}

      <header className="booking-header">

        <button
          onClick={() =>
            navigate(`/service/${service.id}`)
          }
        >
          ← Back
        </button>

        <h2>
          🏠 SmartHome
        </h2>

      </header>


      {/* MAIN */}

      <main className="booking-container">

        <div className="booking-title">

          <span>
            🔧 SERVICE BOOKING
          </span>

          <h1>
            Book your service
          </h1>

          <p>
            Choose your preferred service,
            date and time.
          </p>

        </div>


        <div className="booking-layout">

          {/* LEFT */}

          <div className="booking-form-card">

            <form onSubmit={handleBooking}>

              {/* SELECTED WORKER */}

              <div className="selected-worker">

                <div className="booking-worker-avatar">
                  {worker.photo}
                </div>

                <div>

                  <small>
                    Selected Professional
                  </small>

                  <h3>
                    {worker.name}
                  </h3>

                  <p>
                    ⭐ {worker.rating} ·{" "}
                    {worker.experience}
                  </p>

                </div>

                <span className="worker-online">
                  🟢 Available
                </span>

              </div>


              {/* SERVICE TYPE */}

              <div className="form-group">

                <label>
                  Select Service *
                </label>

                <select
                  value={serviceType}
                  onChange={(e) =>
                    setServiceType(e.target.value)
                  }
                >

                  <option value="">
                    Choose a service
                  </option>

                  <option>
                    General Service
                  </option>

                  <option>
                    Repair
                  </option>

                  <option>
                    Installation
                  </option>

                  <option>
                    Gas Filling
                  </option>

                </select>

              </div>


              {/* DATE */}

              <div className="form-group">

                <label>
                  📅 Select Date *
                </label>

                <input
                  type="date"
                  value={date}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />

              </div>


              {/* TIME */}

              <div className="form-group">

                <label>
                  🕐 Select Time *
                </label>

                <select
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                >

                  <option value="">
                    Choose a time
                  </option>

                  <option>
                    09:00 AM
                  </option>

                  <option>
                    10:00 AM
                  </option>

                  <option>
                    11:00 AM
                  </option>

                  <option>
                    12:00 PM
                  </option>

                  <option>
                    02:00 PM
                  </option>

                  <option>
                    03:00 PM
                  </option>

                  <option>
                    04:00 PM
                  </option>

                  <option>
                    05:00 PM
                  </option>

                  <option>
                    06:00 PM
                  </option>

                </select>

              </div>


              {/* ADDRESS */}

              <div className="form-group">

                <label>
                  📍 Service Address *
                </label>

                <textarea
                  placeholder="Enter your complete home address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  rows="4"
                />

              </div>


              {/* NOTES */}

              <div className="form-group">

                <label>
                  📝 Additional Details
                </label>

                <textarea
                  placeholder="Tell the professional about your problem..."
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  rows="3"
                />

              </div>


              {/* CONFIRM */}

              <button
                type="submit"
                className="confirm-booking-btn"
              >
                Confirm Booking →
              </button>

            </form>

          </div>


          {/* RIGHT SUMMARY */}

          <aside className="booking-summary">

            <div className="summary-icon">
              {service.icon}
            </div>

            <h2>
              {service.name}
            </h2>

            <p>
              Professional home service
            </p>


            <div className="summary-worker">

              <span>
                👨‍🔧
              </span>

              <div>

                <strong>
                  {worker.name}
                </strong>

                <small>
                  ⭐ {worker.rating}
                </small>

              </div>

            </div>


            <div className="price-breakdown">

              <div>
                <span>
                  Service Charge
                </span>

                <strong>
                  ₹{worker.price}
                </strong>
              </div>

              <div>
                <span>
                  Visit Charge
                </span>

                <strong>
                  ₹{visitCharge}
                </strong>
              </div>

              <hr />

              <div className="total-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{totalAmount}
                </strong>

              </div>

            </div>


            <div className="booking-protection">

              🛡️

              <div>

                <strong>
                  SmartHome Protection
                </strong>

                <p>
                  Verified professional and
                  secure booking.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default ServiceBooking;