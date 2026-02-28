export interface DrillingLog {
  id: string;
  mineSite: string;
  company: string;
  drillHoleId: string;
  date: string;
  startTime: string;
  endTime?: string;
  depthFrom: number;
  depthTo: number;
  totalDepth: number;
  rockType: string;
  formation: string;
  coreRecovery: number;
  drillingMethod: DrillingMethod;
  equipment: string;
  geologistName: string;
  sampleId?: string;
  sampleType?: string;
  notes: string;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  azimuth?: number;
  dip?: number;
  createdAt: string;
  updatedAt: string;
}

export type DrillingMethod = 
  | "Diamond Drilling"
  | "Reverse Circulation (RC)"
  | "Percussion Drilling"
  | "Rotary Drilling"
  | "Auger Drilling"
  | "Core Drilling"
  | "DTH Drilling"
  | "Top Hammer Drilling";

export type RockType =
  | "Coal"
  | "Iron Ore"
  | "Limestone"
  | "Bauxite"
  | "Copper Ore"
  | "Gold Ore"
  | "Manganese"
  | "Granite"
  | "Basalt"
  | "Sandstone"
  | "Shale"
  | "Quartzite"
  | "Gneiss"
  | "Schist"
  | "Laterite"
  | "Alluvium";

export interface MineSite {
  id: string;
  name: string;
  company: string;
  state: string;
  district: string;
  mineralType: RockType[];
  latitude: number;
  longitude: number;
}

export interface DrillingStats {
  totalMeters: number;
  totalHoles: number;
  avgCoreRecovery: number;
  metersByMine: Record<string, number>;
  metersByMonth: { month: string; meters: number }[];
  recoveryByMine: { mine: string; recovery: number }[];
  methodDistribution: { method: string; count: number }[];
}

export interface FilterOptions {
  mineSite?: string;
  company?: string;
  dateFrom?: string;
  dateTo?: string;
  rockType?: string;
  drillingMethod?: string;
  searchQuery?: string;
}