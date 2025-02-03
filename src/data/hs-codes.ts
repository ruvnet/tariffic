interface HSCode {
  code: string;
  title: string;
  description: string;
}

export const hsCodes: HSCode[] = [
  // Section I: Live Animals; Animal Products (01-05)
  {
    code: "01",
    title: "Live Animals",
    description: "Live horses, cattle, pigs, sheep, goats, poultry"
  },
  {
    code: "02",
    title: "Meat and Edible Meat Offal",
    description: "Fresh, chilled or frozen meat and edible meat offal"
  },
  {
    code: "03",
    title: "Fish and Crustaceans",
    description: "Fish, crustaceans, molluscs, aquatic invertebrates"
  },
  {
    code: "04",
    title: "Dairy Products",
    description: "Milk, eggs, honey, edible products of animal origin"
  },

  // Section II: Vegetable Products (06-14)
  {
    code: "07",
    title: "Edible Vegetables",
    description: "Vegetables, roots and tubers"
  },
  {
    code: "08",
    title: "Edible Fruits and Nuts",
    description: "Fruits, nuts, citrus fruit peels"
  },
  {
    code: "10",
    title: "Cereals",
    description: "Wheat, rice, corn, barley, oats, etc."
  },

  // Section IV: Prepared Foodstuffs (16-24)
  {
    code: "16",
    title: "Prepared Meat and Fish",
    description: "Preparations of meat, fish, crustaceans"
  },
  {
    code: "22",
    title: "Beverages",
    description: "Alcoholic and non-alcoholic beverages"
  },

  // Section VI: Chemical Products (28-38)
  {
    code: "29",
    title: "Organic Chemicals",
    description: "Chemical compounds, pharmaceuticals, organic materials"
  },
  {
    code: "30",
    title: "Pharmaceutical Products",
    description: "Medicines, vaccines, bandages"
  },

  // Section VII: Plastics and Rubber (39-40)
  {
    code: "39",
    title: "Plastics and Articles",
    description: "Plastic materials and finished plastic products"
  },
  {
    code: "40",
    title: "Rubber and Articles",
    description: "Natural and synthetic rubber, tires, rubber products"
  },

  // Section IX: Wood and Wood Products (44-46)
  {
    code: "44",
    title: "Wood and Articles of Wood",
    description: "Timber, wood products, wooden furniture components"
  },

  // Section XI: Textiles and Textile Articles (50-63)
  {
    code: "50-52",
    title: "Textile Fibers",
    description: "Silk, wool, cotton fibers and yarns"
  },
  {
    code: "61",
    title: "Knitted Apparel",
    description: "Knitted or crocheted clothing and accessories"
  },
  {
    code: "62",
    title: "Woven Apparel",
    description: "Non-knitted clothing and accessories"
  },
  {
    code: "63",
    title: "Other Textile Articles",
    description: "Blankets, linens, curtains, other textile articles"
  },

  // Section XV: Base Metals (72-83)
  {
    code: "72",
    title: "Iron and Steel",
    description: "Base metals including pig iron, ferro-alloys, flat-rolled products"
  },
  {
    code: "73",
    title: "Articles of Iron or Steel",
    description: "Finished products like tubes, pipes, structures, chains"
  },
  {
    code: "76",
    title: "Aluminum and Articles",
    description: "Aluminum and aluminum alloys, plates, sheets, foil"
  },

  // Section XVI: Machinery and Equipment (84-85)
  {
    code: "84",
    title: "Machinery and Mechanical Appliances",
    description: "Industrial machinery, computers, engines, mechanical equipment"
  },
  {
    code: "85",
    title: "Electrical Machinery and Equipment",
    description: "Electronics, electrical equipment, sound/video equipment"
  },

  // Section XVII: Vehicles and Transport Equipment (86-89)
  {
    code: "87",
    title: "Vehicles",
    description: "Motor vehicles, parts and accessories"
  },
  {
    code: "88",
    title: "Aircraft and Parts",
    description: "Aircraft, spacecraft, and parts thereof"
  },

  // Section XVIII: Optical and Medical Instruments (90-92)
  {
    code: "90",
    title: "Optical and Medical Instruments",
    description: "Precision instruments, medical devices, measuring equipment"
  },

  // Section XX: Miscellaneous Manufactured Articles (94-96)
  {
    code: "94",
    title: "Furniture and Lighting",
    description: "Furniture, bedding, lamps, prefabricated buildings"
  },
  {
    code: "95",
    title: "Toys and Sports Equipment",
    description: "Toys, games, sports equipment"
  }
];

// Note: The full HS Code system contains over 5,000 six-digit codes organized in:
// - 21 Sections
// - 96 Chapters (2-digit)
// - Headings (4-digit)
// - Subheadings (6-digit)
// 
// This list includes commonly traded categories at the chapter (2-digit) level.
// For specific products, refer to the full HS Code database at:
// https://www.trade.gov/harmonized-system-hs-codes
