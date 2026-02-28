"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { 
  BarChart3, 
  Plus, 
  List, 
  Download, 
  HardHat, 
  MapPin, 
  Drill,
  TrendingUp,
  Calendar,
  FileText
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { getAllLogs, calculateStats, downloadCSV, generateSampleData, DrillingStats, DrillingLog } from "./lib/data"
import { INDIAN_MINE_SITES } from "./lib/constants"

const COLORS = ['#b5804e', '#7d7358', '#635b46', '#9a9175', '#b8b29a', '#d4d0bf']

export default function Dashboard() {
  const [logs, setLogs] = useState<DrillingLog[]>([])
  const [stats, setStats] = useState<DrillingStats | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = () => {
    const allLogs = getAllLogs()
    if (allLogs.length === 0) {
      generateSampleData()
      const sampleLogs = getAllLogs()
      setLogs(sampleLogs)
      setStats(calculateStats(sampleLogs))
    } else {
      setLogs(allLogs)
      setStats(calculateStats(allLogs))
    }
  }

  const handleExport = () => {
    downloadCSV(`drilling_logs_${new Date().toISOString().split('T')[0]}.csv`)
  }

  const recentLogs = logs.slice(0, 5)

  if (!mounted) {
    return <div className="min-h-screen bg-mining-950" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mining-950 via-mining-900 to-mining-950 text-earth-100">
      {/* Header */}
      <header className="border-b border-mining-800 bg-mining-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-earth-600 rounded-lg">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Indian Mining Drilling Logger</h1>
                <p className="text-sm text-earth-400">Professional drilling information management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/logs">
                <Button variant="outline" size="sm" className="gap-2">
                  <List className="w-4 h-4" />
                  View Logs
                </Button>
              </Link>
              <Link href="/log">
                <Button size="sm" className="gap-2 bg-earth-600 hover:bg-earth-700">
                  <Plus className="w-4 h-4" />
                  New Log
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-earth-400">Total Drilling</CardDescription>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <Drill className="w-6 h-6 text-earth-500" />
                {stats ? stats.totalMeters.toLocaleString() : "0"}
                <span className="text-sm text-earth-500">m</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-earth-400">Drill Holes</CardDescription>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <MapPin className="w-6 h-6 text-earth-500" />
                {stats ? stats.totalHoles : "0"}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-earth-400">Avg Core Recovery</CardDescription>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-earth-500" />
                {stats ? stats.avgCoreRecovery.toFixed(1) : "0"}
                <span className="text-sm text-earth-500">%</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-earth-400">Active Mines</CardDescription>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-earth-500" />
                {stats ? Object.keys(stats.metersByMine).length : "0"}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Drilling Progress Over Time */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-earth-500" />
                Drilling Progress Over Time
              </CardTitle>
              <CardDescription className="text-earth-400">
                Monthly drilling meters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stats?.metersByMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#413c31" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#b8b29a" 
                    fontSize={12}
                    tickFormatter={(value) => value.slice(5)}
                  />
                  <YAxis stroke="#b8b29a" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1c17', 
                      border: '1px solid #413c31',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#e8e6dc' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meters" 
                    stroke="#b5804e" 
                    strokeWidth={2}
                    dot={{ fill: '#b5804e', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Core Recovery by Mine */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-earth-500" />
                Core Recovery by Mine
              </CardTitle>
              <CardDescription className="text-earth-400">
                Average recovery percentage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats?.recoveryByMine.slice(0, 6) || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#413c31" />
                  <XAxis 
                    dataKey="mine" 
                    stroke="#b8b29a" 
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#b8b29a" fontSize={12} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1c17', 
                      border: '1px solid #413c31',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Recovery']}
                  />
                  <Bar dataKey="recovery" fill="#7d7358" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Drilling Methods Distribution */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Drilling Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={stats?.methodDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {(stats?.methodDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1c17', 
                      border: '1px solid #413c31',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span style={{ color: '#b8b29a', fontSize: '10px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Mines by Drilling */}
          <Card className="bg-mining-900/50 border-mining-800 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-lg">Top Mines by Drilling Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart 
                  data={Object.entries(stats?.metersByMine || {})
                    .map(([mine, meters]) => ({ mine, meters }))
                    .sort((a, b) => b.meters - a.meters)
                    .slice(0, 6)}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#413c31" />
                  <XAxis type="number" stroke="#b8b29a" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="mine" 
                    stroke="#b8b29a" 
                    fontSize={10}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1c17', 
                      border: '1px solid #413c31',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value} m`, 'Drilled']}
                  />
                  <Bar dataKey="meters" fill="#b5804e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card className="bg-mining-900/50 border-mining-800 mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-earth-500" />
                Recent Drilling Logs
              </CardTitle>
              <CardDescription className="text-earth-400">
                Latest 5 drilling activities
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-mining-800">
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Drill Hole</th>
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Mine Site</th>
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Depth</th>
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Recovery</th>
                    <th className="text-left py-3 px-4 text-earth-400 font-medium text-sm">Geologist</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.map((log) => (
                    <tr key={log.id} className="border-b border-mining-800/50 hover:bg-mining-800/30">
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="bg-earth-600/20 text-earth-300">
                          {log.drillHoleId}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-earth-200">{log.mineSite}</td>
                      <td className="py-3 px-4 text-earth-400 text-sm">{log.date}</td>
                      <td className="py-3 px-4 text-earth-200">{log.totalDepth} m</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          log.coreRecovery >= 90 ? 'text-green-400' : 
                          log.coreRecovery >= 80 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {log.coreRecovery}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-earth-400 text-sm">{log.geologistName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {recentLogs.length === 0 && (
              <div className="text-center py-8 text-earth-500">
                No drilling logs yet. Create your first log to see data here.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mine Sites Reference */}
        <Card className="bg-mining-900/50 border-mining-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-earth-500" />
              Available Mine Sites
            </CardTitle>
            <CardDescription className="text-earth-400">
              {INDIAN_MINE_SITES.length} Indian mining locations configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {INDIAN_MINE_SITES.slice(0, 18).map((mine) => (
                <div 
                  key={mine.id} 
                  className="p-2 bg-mining-800/50 rounded text-xs text-earth-300 border border-mining-700"
                >
                  <div className="font-medium text-earth-200 truncate">{mine.name}</div>
                  <div className="text-earth-500">{mine.state}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-earth-500">
              + {INDIAN_MINE_SITES.length - 18} more mine sites available
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}