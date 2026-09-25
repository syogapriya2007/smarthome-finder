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
  "Tallakulam": "Tallakulam",
  "Thirunagar": "Thirunagar",
  "Palanganatham": "Palanganatham",
  "Arapalayam": "Arapalayam",
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
    rent: [12000, 13000, 14000, 15000, 16000],
    sale: 0,
  },
  {
    title: "Spacious Independent House",
    type: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    rent: [17000, 18000, 19000, 20000, 22000],
    sale: 0,
  },
  {
    title: "Premium Family Villa",
    type: "Buy",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    rent: 0,
    sale: 7500000,
  },
  {
    title: "Comfortable 2BHK Home",
    type: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    rent: [10000, 11500, 12500, 13500, 14500],
    sale: 0,
  },
  {
    title: "Luxury 3BHK Villa",
    type: "Buy",
    bedrooms: 3,
    bathrooms: 3,
    area: 1900,
    rent: 0,
    sale: 6200000,
  },
];

/*
  20 Madurai areas × 5 properties
  = 100 properties
*/

const properties = areas.flatMap((area, areaIndex) => {
  return houseStyles.map((style, houseIndex) => {
    const id = areaIndex * 5 + houseIndex + 1;

    const isRent = style.type === "Rent";

    let price;

    if (isRent) {
      price =
        style.rent[
          (areaIndex + houseIndex) % style.rent.length
        ];
    } else {
      /*
        Sale price changes slightly area by area
        so every property has a different price.
      */
      price =
        style.sale +
        areaIndex * 150000 +
        houseIndex * 250000;
    }

    const match =
      90 +
      ((areaIndex * 3 + houseIndex * 2) % 10);

    const image = houseImages[
      (id - 1) % houseImages.length
    ];

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
        houseImages[(id + 1) % houseImages.length],
        houseImages[(id + 2) % houseImages.length],
      ],

      verified: true,

      ownerName: `SmartHome Owner ${id}`,

      ownerPhone: "9876543210",

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
});

export default properties;