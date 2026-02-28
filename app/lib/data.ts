import { DrillingLog, DrillingStats, FilterOptions } from './types';

const STORAGE_KEY = 'mining_drilling_logs_v1';

export function getAllLogs(): DrillingLog[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveLog(log: DrillingLog): void {
  const logs = getAllLogs();
  const existingIndex = logs.findIndex(l => l.id === log.id);
  
  if (existingIndex >= 0) {
    logs[existingIndex] = { ...log, updatedAt: new Date().toISOString() };
  } else {
    logs.push(log);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function deleteLog(id: string): void {
  const logs = getAllLogs().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getLogById(id: string): DrillingLog | undefined {
  return getAllLogs().find(l => l.id === id);
}

export function filterLogs(options: FilterOptions): DrillingLog[] {
  let logs = getAllLogs();
  
  if (options.mineSite) {
    logs = logs.filter(l => l.mineSite === options.mineSite);
  }
  
  if (options.company) {
    logs = logs.filter(l => l.company === options.company);
  }
  
  if (options.rockType) {
    logs = logs.filter(l => l.rockType === options.rockType);
  }
  
  if (options.drillingMethod) {
    logs = logs.filter(l => l.drillingMethod === options.drillingMethod);
  }
  
  if (options.dateFrom) {
    logs = logs.filter(l => l.date >= options.dateFrom!);
  }
  
  if (options.dateTo) {
    logs = logs.filter(l => l.date <= options.dateTo!);
  }
  
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    logs = logs.filter(l => 
      l.drillHoleId.toLowerCase().includes(query) ||
      l.mineSite.toLowerCase().includes(query) ||
      l.geologistName.toLowerCase().includes(query) ||
      l.notes.toLowerCase().includes(query) ||
      (l.sampleId && l.sampleId.toLowerCase().includes(query))
    );
  }
  
  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function calculateStats(logs?: DrillingLog[]): DrillingStats {
  const allLogs = logs || getAllLogs();
  
  const totalMeters = allLogs.reduce((sum, log) => sum + log.totalDepth, 0);
  const totalHoles = allLogs.length;
  const avgCoreRecovery = allLogs.length > 0 
    ? allLogs.reduce((sum, log) => sum + log.coreRecovery, 0) / allLogs.length 
    : 0;
  
  // Meters by mine
  const metersByMine: Record<string, number> = {};
  allLogs.forEach(log => {
    metersByMine[log.mineSite] = (metersByMine[log.mineSite] || 0) + log.totalDepth;
  });
  
  // Meters by month
  const monthMap = new Map<string, number>();
  allLogs.forEach(log => {
    const date = new Date(log.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + log.totalDepth);
  });
  
  const metersByMonth = Array.from(monthMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, meters]) => ({ month, meters }));
  
  // Recovery by mine
  const recoveryMap = new Map<string, { total: number; count: number }>();
  allLogs.forEach(log => {
    const current = recoveryMap.get(log.mineSite) || { total: 0, count: 0 };
    recoveryMap.set(log.mineSite, {
      total: current.total + log.coreRecovery,
      count: current.count + 1
    });
  });
  
  const recoveryByMine = Array.from(recoveryMap.entries())
    .map(([mine, data]) => ({ mine, recovery: data.total / data.count }));
  
  // Method distribution
  const methodMap = new Map<string, number>();
  allLogs.forEach(log => {
    methodMap.set(log.drillingMethod, (methodMap.get(log.drillingMethod) || 0) + 1);
  });
  
  const methodDistribution = Array.from(methodMap.entries())
    .map(([method, count]) => ({ method, count }));
  
  return {
    totalMeters,
    totalHoles,
    avgCoreRecovery,
    metersByMine,
    metersByMonth,
    recoveryByMine,
    methodDistribution,
  };
}

export function exportToCSV(logs?: DrillingLog[]): string {
  const data = logs || getAllLogs();
  
  const headers = [
    'ID', 'Mine Site', 'Company', 'Drill Hole ID', 'Date', 'Start Time', 'End Time',
    'Depth From (m)', 'Depth To (m)', 'Total Depth (m)', 'Rock Type', 'Formation',
    'Core Recovery (%)', 'Drilling Method', 'Equipment', 'Geologist',
    'Sample ID', 'Sample Type', 'Latitude', 'Longitude', 'Elevation (m)',
    'Azimuth', 'Dip', 'Notes', 'Created At'
  ];
  
  const rows = data.map(log => [
    log.id,
    log.mineSite,
    log.company,
    log.drillHoleId,
    log.date,
    log.startTime,
    log.endTime || '',
    log.depthFrom,
    log.depthTo,
    log.totalDepth,
    log.rockType,
    log.formation,
    log.coreRecovery,
    log.drillingMethod,
    log.equipment,
    log.geologistName,
    log.sampleId || '',
    log.sampleType || '',
    log.latitude || '',
    log.longitude || '',
    log.elevation || '',
    log.azimuth || '',
    log.dip || '',
    `"${log.notes.replace(/"/g, '""')}"`,
    log.createdAt
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function downloadCSV(filename: string = 'drilling_logs.csv'): void {
  const csv = exportToCSV();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function generateSampleData(): void {
  const sampleLogs: DrillingLog[] = [
    {
      id: 'sample-1',
      mineSite: 'Jharia Coalfield',
      company: 'Coal India Limited (CIL)',
      drillHoleId: 'JHA-2024-001',
      date: '2024-02-15',
      startTime: '08:00',
      endTime: '16:30',
      depthFrom: 0,
      depthTo: 150,
      totalDepth: 150,
      rockType: 'Coal',
      formation: 'Coal Seam',
      coreRecovery: 92,
      drillingMethod: 'Diamond Drilling',
      equipment: 'Atlas Copco Diamec U6',
      geologistName: 'Ramesh Kumar',
      sampleId: 'JHA-001-C',
      sampleType: 'Core Sample',
      notes: 'Good coal seam encountered between 45-120m depth. High quality coking coal.',
      latitude: 23.75,
      longitude: 86.42,
      elevation: 185,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      mineSite: 'Kirandul',
      company: 'National Mineral Development Corporation (NMDC)',
      drillHoleId: 'KIR-2024-045',
      date: '2024-02-20',
      startTime: '07:30',
      endTime: '18:00',
      depthFrom: 0,
      depthTo: 220,
      totalDepth: 220,
      rockType: 'Iron Ore',
      formation: 'Iron Ore Body',
      coreRecovery: 88,
      drillingMethod: 'Reverse Circulation (RC)',
      equipment: 'Sandvik DE712',
      geologistName: 'Priya Sharma',
      sampleId: 'KIR-045-RC',
      sampleType: 'RC Chip Sample',
      notes: 'High grade hematite ore body identified. Fe content estimated at 65%.',
      latitude: 18.63,
      longitude: 81.25,
      elevation: 450,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      mineSite: 'Noamundi',
      company: 'Tata Steel',
      drillHoleId: 'NOA-2024-112',
      date: '2024-02-25',
      startTime: '06:00',
      endTime: '14:00',
      depthFrom: 0,
      depthTo: 180,
      totalDepth: 180,
      rockType: 'Iron Ore',
      formation: 'Iron Ore Body',
      coreRecovery: 95,
      drillingMethod: 'Core Drilling',
      equipment: 'Boart Longyear LF90D',
      geologistName: 'Amit Patel',
      sampleId: 'NOA-112-C',
      sampleType: 'Core Sample',
      notes: 'Excellent core recovery. Massive hematite with minor goethite.',
      latitude: 22.15,
      longitude: 85.53,
      elevation: 620,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-4',
      mineSite: 'Lanjigarh',
      company: 'Vedanta Limited',
      drillHoleId: 'LAN-2024-023',
      date: '2024-03-01',
      startTime: '08:30',
      endTime: '17:00',
      depthFrom: 0,
      depthTo: 95,
      totalDepth: 95,
      rockType: 'Bauxite',
      formation: 'Bauxite Zone',
      coreRecovery: 85,
      drillingMethod: 'Percussion Drilling',
      equipment: 'Furukawa HCR1200',
      geologistName: 'Sunita Devi',
      sampleId: 'LAN-023-P',
      sampleType: 'Percussion Sample',
      notes: 'Lateritic bauxite profile. Good Al2O3 content in upper 60m.',
      latitude: 19.72,
      longitude: 83.42,
      elevation: 320,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-5',
      mineSite: 'Kothagudem',
      company: 'Singareni Collieries Company Limited (SCCL)',
      drillHoleId: 'KOT-2024-089',
      date: '2024-03-05',
      startTime: '07:00',
      endTime: '15:30',
      depthFrom: 0,
      depthTo: 125,
      totalDepth: 125,
      rockType: 'Coal',
      formation: 'Coal Seam',
      coreRecovery: 90,
      drillingMethod: 'Diamond Drilling',
      equipment: 'Atlas Copco Explorac 235',
      geologistName: 'Venkat Reddy',
      sampleId: 'KOT-089-C',
      sampleType: 'Core Sample',
      notes: 'Multiple thin coal seams intersected. Main seam at 45-80m depth.',
      latitude: 17.55,
      longitude: 80.62,
      elevation: 95,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-6',
      mineSite: 'Joda',
      company: 'Tata Steel',
      drillHoleId: 'JOD-2024-156',
      date: '2024-03-10',
      startTime: '06:30',
      endTime: '16:00',
      depthFrom: 0,
      depthTo: 200,
      totalDepth: 200,
      rockType: 'Iron Ore',
      formation: 'Iron Ore Body',
      coreRecovery: 93,
      drillingMethod: 'Core Drilling',
      equipment: 'Boart Longyear LF90D',
      geologistName: 'Manoj Das',
      sampleId: 'JOD-156-C',
      sampleType: 'Core Sample',
      notes: 'Consistent high-grade ore body. Minor shale partings at 120m and 165m.',
      latitude: 21.85,
      longitude: 85.43,
      elevation: 480,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  
  sampleLogs.forEach(log => saveLog(log));
}

export function clearAllData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}