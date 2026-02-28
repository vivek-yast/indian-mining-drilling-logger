import { MineSite, DrillingMethod, RockType } from './types';

export const INDIAN_MINING_COMPANIES = [
  "Coal India Limited (CIL)",
  "Singareni Collieries Company Limited (SCCL)",
  "National Mineral Development Corporation (NMDC)",
  "Hindustan Zinc Limited",
  "Vedanta Limited",
  "Hindalco Industries",
  "Steel Authority of India (SAIL)",
  "Tata Steel",
  "JSW Steel",
  "Adani Enterprises",
  "Odisha Mining Corporation",
  "Madhya Pradesh State Mining Corporation",
  "Karnataka Minerals",
  "Rajasthan State Mines & Minerals",
  "Uranium Corporation of India",
  "Indian Rare Earths Limited",
];

export const INDIAN_MINE_SITES: MineSite[] = [
  // Coal India Mines
  { id: "cil-1", name: "Jharia Coalfield", company: "Coal India Limited (CIL)", state: "Jharkhand", district: "Dhanbad", mineralType: ["Coal"], latitude: 23.75, longitude: 86.42 },
  { id: "cil-2", name: "Raniganj Coalfield", company: "Coal India Limited (CIL)", state: "West Bengal", district: "Paschim Bardhaman", mineralType: ["Coal"], latitude: 23.62, longitude: 87.08 },
  { id: "cil-3", name: "Korba Coalfield", company: "Coal India Limited (CIL)", state: "Chhattisgarh", district: "Korba", mineralType: ["Coal"], latitude: 22.35, longitude: 82.68 },
  { id: "cil-4", name: "Talcher Coalfield", company: "Coal India Limited (CIL)", state: "Odisha", district: "Angul", mineralType: ["Coal"], latitude: 20.95, longitude: 85.22 },
  { id: "cil-5", name: "Singrauli Coalfield", company: "Coal India Limited (CIL)", state: "Madhya Pradesh", district: "Singrauli", mineralType: ["Coal"], latitude: 24.20, longitude: 82.67 },
  { id: "cil-6", name: "Wardha Valley", company: "Coal India Limited (CIL)", state: "Maharashtra", district: "Chandrapur", mineralType: ["Coal"], latitude: 20.00, longitude: 79.30 },
  { id: "cil-7", name: "North Karanpura", company: "Coal India Limited (CIL)", state: "Jharkhand", district: "Ranchi", mineralType: ["Coal"], latitude: 23.67, longitude: 85.17 },
  { id: "cil-8", name: "South Karanpura", company: "Coal India Limited (CIL)", state: "Jharkhand", district: "Hazaribagh", mineralType: ["Coal"], latitude: 23.75, longitude: 85.25 },
  { id: "cil-9", name: "Bokaro", company: "Coal India Limited (CIL)", state: "Jharkhand", district: "Bokaro", mineralType: ["Coal"], latitude: 23.68, longitude: 85.95 },
  { id: "cil-10", name: "Rajmahal", company: "Coal India Limited (CIL)", state: "Jharkhand", district: "Sahibganj", mineralType: ["Coal"], latitude: 25.05, longitude: 87.83 },
  
  // Singareni Mines
  { id: "sccl-1", name: "Kothagudem", company: "Singareni Collieries Company Limited (SCCL)", state: "Telangana", district: "Bhadradri Kothagudem", mineralType: ["Coal"], latitude: 17.55, longitude: 80.62 },
  { id: "sccl-2", name: "Bellampalli", company: "Singareni Collieries Company Limited (SCCL)", state: "Telangana", district: "Mancherial", mineralType: ["Coal"], latitude: 19.07, longitude: 79.48 },
  { id: "sccl-3", name: "Ramagundam", company: "Singareni Collieries Company Limited (SCCL)", state: "Telangana", district: "Peddapalli", mineralType: ["Coal"], latitude: 18.80, longitude: 79.45 },
  { id: "sccl-4", name: "Mancherial", company: "Singareni Collieries Company Limited (SCCL)", state: "Telangana", district: "Mancherial", mineralType: ["Coal"], latitude: 18.87, longitude: 79.43 },
  
  // NMDC Iron Ore Mines
  { id: "nmdc-1", name: "Kirandul", company: "National Mineral Development Corporation (NMDC)", state: "Chhattisgarh", district: "Dantewada", mineralType: ["Iron Ore"], latitude: 18.63, longitude: 81.25 },
  { id: "nmdc-2", name: "Bailadila", company: "National Mineral Development Corporation (NMDC)", state: "Chhattisgarh", district: "Dantewada", mineralType: ["Iron Ore"], latitude: 18.85, longitude: 81.05 },
  { id: "nmdc-3", name: "Donimalai", company: "National Mineral Development Corporation (NMDC)", state: "Karnataka", district: "Ballari", mineralType: ["Iron Ore"], latitude: 15.02, longitude: 76.57 },
  { id: "nmdc-4", name: "Kumaraswamy", company: "National Mineral Development Corporation (NMDC)", state: "Karnataka", district: "Ballari", mineralType: ["Iron Ore"], latitude: 15.08, longitude: 76.52 },
  
  // Vedanta/Hindalco
  { id: "ved-1", name: "Lanjigarh", company: "Vedanta Limited", state: "Odisha", district: "Kalahandi", mineralType: ["Bauxite"], latitude: 19.72, longitude: 83.42 },
  { id: "ved-2", name: "Jharsuguda", company: "Vedanta Limited", state: "Odisha", district: "Jharsuguda", mineralType: ["Coal", "Bauxite"], latitude: 21.85, longitude: 84.02 },
  { id: "hin-1", name: "Muri", company: "Hindalco Industries", state: "Jharkhand", district: "Ranchi", mineralType: ["Bauxite"], latitude: 23.38, longitude: 85.87 },
  
  // Tata Steel
  { id: "tsl-1", name: "Noamundi", company: "Tata Steel", state: "Jharkhand", district: "West Singhbhum", mineralType: ["Iron Ore"], latitude: 22.15, longitude: 85.53 },
  { id: "tsl-2", name: "Joda", company: "Tata Steel", state: "Odisha", district: "Keonjhar", mineralType: ["Iron Ore"], latitude: 21.85, longitude: 85.43 },
  { id: "tsl-3", name: "Katamati", company: "Tata Steel", state: "Odisha", district: "Keonjhar", mineralType: ["Iron Ore"], latitude: 21.65, longitude: 85.35 },
  { id: "tsl-4", name: "Khondbond", company: "Tata Steel", state: "Odisha", district: "Jajpur", mineralType: ["Iron Ore"], latitude: 20.95, longitude: 86.25 },
  
  // SAIL
  { id: "sail-1", name: "Kiriburu", company: "Steel Authority of India (SAIL)", state: "Jharkhand", district: "West Singhbhum", mineralType: ["Iron Ore"], latitude: 22.12, longitude: 85.28 },
  { id: "sail-2", name: "Meghahatuburu", company: "Steel Authority of India (SAIL)", state: "Jharkhand", district: "West Singhbhum", mineralType: ["Iron Ore"], latitude: 22.08, longitude: 85.25 },
  { id: "sail-3", name: "Gua", company: "Steel Authority of India (SAIL)", state: "Jharkhand", district: "West Singhbhum", mineralType: ["Iron Ore"], latitude: 22.20, longitude: 85.38 },
  { id: "sail-4", name: "Bolani", company: "Steel Authority of India (SAIL)", state: "Odisha", district: "Sundargarh", mineralType: ["Iron Ore"], latitude: 22.08, longitude: 85.05 },
  
  // JSW Steel
  { id: "jsw-1", name: "Vyasanakere", company: "JSW Steel", state: "Karnataka", district: "Ballari", mineralType: ["Iron Ore"], latitude: 15.15, longitude: 76.75 },
  { id: "jsw-2", name: "Toranagallu", company: "JSW Steel", state: "Karnataka", district: "Ballari", mineralType: ["Iron Ore"], latitude: 15.05, longitude: 76.68 },
  
  // State Mining Corporations
  { id: "omc-1", name: "Daitari", company: "Odisha Mining Corporation", state: "Odisha", district: "Keonjhar", mineralType: ["Iron Ore"], latitude: 21.08, longitude: 85.75 },
  { id: "omc-2", name: "Gandhamardan", company: "Odisha Mining Corporation", state: "Odisha", district: "Bargarh", mineralType: ["Iron Ore"], latitude: 20.85, longitude: 82.65 },
  { id: "mp-1", name: "Malanjkhand", company: "Madhya Pradesh State Mining Corporation", state: "Madhya Pradesh", district: "Balaghat", mineralType: ["Copper Ore"], latitude: 22.02, longitude: 80.72 },
  { id: "raj-1", name: "Zawar", company: "Rajasthan State Mines & Minerals", state: "Rajasthan", district: "Udaipur", mineralType: ["Zinc", "Lead"], latitude: 24.35, longitude: 73.70 },
  
  // Other Major Mines
  { id: "hzl-1", name: "Rampura Agucha", company: "Hindustan Zinc Limited", state: "Rajasthan", district: "Bhilwara", mineralType: ["Zinc", "Lead"], latitude: 25.92, longitude: 74.72 },
  { id: "ucil-1", name: "Jaduguda", company: "Uranium Corporation of India", state: "Jharkhand", district: "East Singhbhum", mineralType: ["Uranium"], latitude: 22.65, longitude: 86.35 },
  { id: "irel-1", name: "Chavara", company: "Indian Rare Earths Limited", state: "Kerala", district: "Kollam", mineralType: ["Rare Earths"], latitude: 8.98, longitude: 76.53 },
  { id: "irel-2", name: "Manavalakurichi", company: "Indian Rare Earths Limited", state: "Tamil Nadu", district: "Kanyakumari", mineralType: ["Rare Earths"], latitude: 8.13, longitude: 77.30 },
];

export const DRILLING_METHODS: DrillingMethod[] = [
  "Diamond Drilling",
  "Reverse Circulation (RC)",
  "Percussion Drilling",
  "Rotary Drilling",
  "Auger Drilling",
  "Core Drilling",
  "DTH Drilling",
  "Top Hammer Drilling",
];

export const ROCK_TYPES: RockType[] = [
  "Coal",
  "Iron Ore",
  "Limestone",
  "Bauxite",
  "Copper Ore",
  "Gold Ore",
  "Manganese",
  "Granite",
  "Basalt",
  "Sandstone",
  "Shale",
  "Quartzite",
  "Gneiss",
  "Schist",
  "Laterite",
  "Alluvium",
];

export const EQUIPMENT_LIST = [
  "Atlas Copco Diamec U6",
  "Atlas Copco Explorac 235",
  "Sandvik DE712",
  "Boart Longyear LF90D",
  "Dando Terrier",
  "Foremost DR24",
  "Ingersoll Rand ECM350",
  "Schramm T450",
  "Reedrill 345",
  "Furukawa HCR1200",
  "Tamrock Pantera 1500",
  "SOILMEC SR-30",
  "MAIT HR130",
  "Casagrande C6",
  "Indigenous Rig - 300m",
  "Indigenous Rig - 600m",
  "Indigenous Rig - 1000m",
  "Other",
];

export const FORMATIONS = [
  "Overburden",
  "Weathered Zone",
  "Transition Zone",
  "Fresh Rock",
  "Coal Seam",
  "Iron Ore Body",
  "Bauxite Zone",
  "Limestone Bed",
  "Granite Basement",
  "Schistose Zone",
  "Quartz Vein",
  "Fault Zone",
  "Dyke Intrusion",
  "Alluvial Deposit",
  "Lateritic Cap",
];

export const INDIAN_STATES = [
  "Jharkhand",
  "Odisha",
  "Chhattisgarh",
  "Karnataka",
  "Maharashtra",
  "Madhya Pradesh",
  "Rajasthan",
  "West Bengal",
  "Telangana",
  "Tamil Nadu",
  "Kerala",
  "Gujarat",
  "Andhra Pradesh",
  "Assam",
  "Meghalaya",
];