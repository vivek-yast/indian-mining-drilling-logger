"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Edit2, 
  Trash2, 
  MapPin,
  Plus,
  FileText,
  X
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table"
import { 
  getAllLogs, 
  filterLogs, 
  deleteLog, 
  downloadCSV,
  DrillingLog,
  FilterOptions 
} from "../lib/data"
import { INDIAN_MINE_SITES, ROCK_TYPES, DRILLING_METHODS } from "../lib/constants"

export default function LogsListPage() {
  const [logs, setLogs] = useState<DrillingLog[]>([])
  const [filters, setFilters] = useState<FilterOptions>({})
  const [showFilters, setShowFilters] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    loadLogs()
  }, [filters])

  const loadLogs = () => {
    const filtered = filterLogs(filters)
    setLogs(filtered)
  }

  const handleDelete = (id: string) => {
    deleteLog(id)
    setDeleteConfirm(null)
    loadLogs()
  }

  const handleExport = () => {
    downloadCSV(`drilling_logs_filtered_${new Date().toISOString().split('T')[0]}.csv`)
  }

  const clearFilters = () => {
    setFilters({})
  }

  const uniqueMines = Array.from(new Set(INDIAN_MINE_SITES.map(m => m.name)))
  const uniqueCompanies = Array.from(new Set(INDIAN_MINE_SITES.map(m => m.company)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-mining-950 via-mining-900 to-mining-950 text-earth-100">
      {/* Header */}
      <header className="border-b border-mining-800 bg-mining-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-mining-700 mx-2" />
              <div className="p-2 bg-earth-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Drilling Logs</h1>
                <p className="text-sm text-earth-400">{logs.length} records found</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className={`gap-2 ${showFilters ? 'bg-earth-600/20' : ''}`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Panel */}
        {showFilters && (
          <Card className="bg-mining-900/50 border-mining-800 mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Filter Logs</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-500" />
                    <Input 
                      placeholder="Search logs..."
                      value={filters.searchQuery || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                      className="pl-9 bg-mining-800 border-earth-600 text-earth-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Mine Site
                  </label>
                  <select
                    value={filters.mineSite || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, mineSite: e.target.value || undefined }))}
                    className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                  >
                    <option value="">All Mines</option>
                    {uniqueMines.map((mine) => (
                      <option key={mine} value={mine}>{mine}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Company
                  </label>
                  <select
                    value={filters.company || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value || undefined }))}
                    className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                  >
                    <option value="">All Companies</option>
                    {uniqueCompanies.map((company) => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Rock Type
                  </label>
                  <select
                    value={filters.rockType || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, rockType: e.target.value || undefined }))}
                    className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                  >
                    <option value="">All Rock Types</option>
                    {ROCK_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Drilling Method
                  </label>
                  <select
                    value={filters.drillingMethod || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, drillingMethod: e.target.value || undefined }))}
                    className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                  >
                    <option value="">All Methods</option>
                    {DRILLING_METHODS.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Date From
                  </label>
                  <Input 
                    type="date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value || undefined }))}
                    className="bg-mining-800 border-earth-600 text-earth-100"
                  />
                </div>
                
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-earth-300">
                    Date To
                  </label>
                  <Input 
                    type="date"
                    value={filters.dateTo || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value || undefined }))}
                    className="bg-mining-800 border-earth-600 text-earth-100"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Logs Table */}
        <Card className="bg-mining-900/50 border-mining-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-mining-800 hover:bg-transparent">
                    <TableHead className="text-earth-400">Drill Hole</TableHead>
                    <TableHead className="text-earth-400">Mine Site</TableHead>
                    <TableHead className="text-earth-400">Date</TableHead>
                    <TableHead className="text-earth-400">Depth</TableHead>
                    <TableHead className="text-earth-400">Rock Type</TableHead>
                    <TableHead className="text-earth-400">Recovery</TableHead>
                    <TableHead className="text-earth-400">Method</TableHead>
                    <TableHead className="text-earth-400">Geologist</TableHead>
                    <TableHead className="text-earth-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-mining-800/50">
                      <TableCell>
                        <Badge variant="secondary" className="bg-earth-600/20 text-earth-300">
                          {log.drillHoleId}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-earth-200">{log.mineSite}</div>
                        <div className="text-xs text-earth-500">{log.company}</div>
                      </TableCell>
                      <TableCell className="text-earth-400 text-sm">{log.date}</TableCell>
                      <TableCell>
                        <div className="text-earth-200">{log.totalDepth} m</div>
                        <div className="text-xs text-earth-500">{log.depthFrom}-{log.depthTo}m</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-earth-600 text-earth-300">
                          {log.rockType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          log.coreRecovery >= 90 ? 'text-green-400' : 
                          log.coreRecovery >= 80 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {log.coreRecovery}%
                        </span>
                      </TableCell>
                      <TableCell className="text-earth-400 text-sm">{log.drillingMethod}</TableCell>
                      <TableCell className="text-earth-400 text-sm">{log.geologistName}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/log?edit=${log.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit2 className="w-4 h-4 text-earth-400" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => setDeleteConfirm(log.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {logs.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-earth-600 mx-auto mb-4" />
                <p className="text-earth-400 text-lg">No drilling logs found</p>
                <p className="text-earth-600 text-sm mt-1">
                  {Object.keys(filters).length > 0 
                    ? 'Try adjusting your filters' 
                    : 'Create your first log to get started'}
                </p>
                <Link href="/log" className="mt-4 inline-block">
                  <Button className="gap-2 bg-earth-600 hover:bg-earth-700">
                    <Plus className="w-4 h-4" />
                    Create New Log
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-mining-900 border-mining-800 max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle className="text-white">Confirm Delete</CardTitle>
              <CardDescription className="text-earth-400">
                Are you sure you want to delete this drilling log? This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}