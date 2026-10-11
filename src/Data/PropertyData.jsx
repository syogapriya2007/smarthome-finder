
const areas = [
  "KK Nagar",
  "Anna Nagar",
  "Tallakulam",
  "Thirunagar",
  "Palanganatham",
  "Arapalayam",
  "Simmakkal",
  "Mattuthavani",
  "Anaiyur",
  "Villapuram",
  "Kalavasal",
  "Teppakulam",
  "Vandiyur",
  "Ellis Nagar",
  "Ponmeni",
  "Kochadai",
  "Bibikulam",
  "Alagappan Nagar",
  "K.Pudur",
  "Iyer Bungalow",
];

const areaShortNames = {
  "KK Nagar": "KK Nagar",
  "Anna Nagar": "Anna Nagar",
  Tallakulam: "Tallakulam",
  Thirunagar: "Thirunagar",
  Palanganatham: "Palanganatham",
  Arapalayam: "Arapalayam",
  Simmakkal: "Simmakkal",
  Mattuthavani: "Mattuthavani",
  Anaiyur: "Anaiyur",
  Villapuram: "Villapuram",
  Kalavasal: "Kalavasal",
  Teppakulam: "Teppakulam",
  Vandiyur: "Vandiyur",
  "Ellis Nagar": "Ellis Nagar",
  Ponmeni: "Ponmeni",
  Kochadai: "Kochadai",
  Bibikulam: "Bibikulam",
  "Alagappan Nagar": "Alagappan Nagar",
  "K.Pudur": "K.Pudur",
  "Iyer Bungalow": "Iyer Bungalow",
};

const houseImages = [
  "/images/house1.jpg",
  "/images/house2.jpg",
  "/images/house3.jpg",
  "/images/house4.jpg",
  "/images/house5.jpg",
  "/images/house6.jpg",
  "/images/house7.jpg",
  "/images/house8.jpg",
  "/images/house9.jpg",
  "/images/house10.jpg",
  "/images/house11.jpg",
  "/images/house12.jpg",
];

const houseStyles = [
  {
    title: "Modern Family Home",
    type: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rent: [3000, 5000, 7500, 10000, 12000],
    sale: 0,
  },
  {
    title: "Spacious Independent House",
    type: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    rent: [4000, 6000, 9000, 14000, 22000],
    sale: 0,
  },
  {
    title: "Premium Family Villa",
    type: "Buy",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    rent: 0,
    sale: 0,
  },
  {
    title: "Comfortable 2BHK Home",
    type: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    rent: [3500, 8000, 11000, 16000, 25000],
    sale: 0,
  },
  {
    title: "Luxury 3BHK Villa",
    type: "Buy",
    bedrooms: 3,
    bathrooms: 3,
    area: 1900,
    rent: 0,
    sale: 0,
  },
];

const salePriceBands = [
  800000,    // ₹8L
  1800000,   // ₹18L
  3500000,   // ₹35L
  6500000,   // ₹65L
  12000000,  // ₹1.2Cr
];

// Owner contact details
const ownerDetails = [
  { phone: "9994875018", email: "24suca52@tcarts.in" },
  { phone: "9025097986", email: "24suca32@tcarts.in" },
  { phone: "9597367373", email: "24suca33@tcarts.in" },
  { phone: "9500343967", email: "24succa21@tcarts.in" },
  { phone: "7639219388", email: "24suca22@tcarts.in" },
  { phone: "9597686189", email: "24suca41@tcarts.in" },
  { phone: "8148324144", email: "senthuram78@gmail.com" },
  { phone: "9787634037", email: "24suca50@tcarts.in" },
];

// Generate exactly 150 properties
const properties = Array.from({ length: 150 }, (_, index) => {
  const id = index + 1;

  const areaIndex = Math.floor(index / 8);
  const area = areas[areaIndex % areas.length];

  const houseIndex = index % houseStyles.length;
  const style = houseStyles[houseIndex];

  const isRent = style.type === "Rent";

  let price;

  if (isRent) {
    // Rent budget values: below ₹4,000 to above ₹20,000
    const rentIndex =
      Math.floor(index / 5) % style.rent.length;

    price = style.rent[rentIndex];
  } else {
    // Sale budget values: below ₹10L to above ₹1Cr
    const saleBandIndex =
      Math.floor(index / 5) % salePriceBands.length;

    price =
      salePriceBands[saleBandIndex] +
      areaIndex * 10000;
  }

  const match =
    90 + ((areaIndex * 3 + houseIndex * 2) % 10);

  const image =
    houseImages[(id - 1) % houseImages.length];

  const owner =
    ownerDetails[(id - 1) % ownerDetails.length];

  return {
    id,

    title: `${style.title} - ${areaShortNames[area]}`,
    location: area,
    type: style.type,
    price,
    match,

    bedrooms: style.bedrooms,
    bathrooms: style.bathrooms,
    area: style.area,
    sqft: style.area,

    image,

    images: [
      image,
      houseImages[id % houseImages.length],
      houseImages[(id + 1) % houseImages.length],
    ],

    verified: true,
    booked: false,
    status: "AVAILABLE",

    ownerName: `SmartHome Owner ${id}`,
    ownerPhone: owner.phone,
    ownerEmail: owner.email,

    description: `A beautiful ${style.bedrooms}BHK ${style.type.toLowerCase()} property in ${area}, Madurai. This home offers comfortable living space, good surroundings and convenient access to nearby facilities.`,

    amenities: [
      "Parking",
      "24/7 Water Supply",
      "Power Backup",
      "Security",
      "Modular Kitchen",
      "Nearby Shops",
    ],

    facing: ["East", "West", "North", "South"][
      (areaIndex + houseIndex) % 4
    ],

    furnishing: [
      "Fully Furnished",
      "Semi Furnished",
      "Unfurnished",
    ][(areaIndex + houseIndex) % 3],
  };
});
export default properties;
