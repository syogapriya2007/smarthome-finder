const BOOKED_PROPERTIES_KEY = "smarthome_booked_properties";

// Get all booked property IDs
export const getBookedProperties = () => {
  try {
    const booked = localStorage.getItem(BOOKED_PROPERTIES_KEY);

    if (!booked) {
      return [];
    }

    return JSON.parse(booked);
  } catch (error) {
    console.error("Error reading booked properties:", error);
    return [];
  }
};

// Check whether a property is already booked
export const isPropertyBooked = (propertyId) => {
  const bookedProperties = getBookedProperties();

  return bookedProperties.includes(Number(propertyId));
};

// Book / lock a property
export const bookProperty = (propertyId) => {
  const bookedProperties = getBookedProperties();
  const id = Number(propertyId);

  if (!bookedProperties.includes(id)) {
    bookedProperties.push(id);

    localStorage.setItem(
      BOOKED_PROPERTIES_KEY,
      JSON.stringify(bookedProperties)
    );
  }
};

// Cancel property booking
export const cancelPropertyBooking = (propertyId) => {
  const bookedProperties = getBookedProperties();

  const updatedBookings = bookedProperties.filter(
    (id) => id !== Number(propertyId)
  );

  localStorage.setItem(
    BOOKED_PROPERTIES_KEY,
    JSON.stringify(updatedBookings)
  );
};