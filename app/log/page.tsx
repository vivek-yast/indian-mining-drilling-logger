"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  MapPin, 
  Drill, 
  HardHat,
  Clock,
  Ruler,
  Mountain,
  User,
  FileText,
  CheckCircle
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { saveLog, getLogById, DrillingLog } from "../lib/data"
import { 
  INDIAN_MINE_SITES, 
  DRILLING_METHODS, 
  ROCK_TYPES, 
  EQUIPMENT_LIST, 
  FORMATIONS 
} from "../lib/constants"

export default function DrillingLogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  
  const [formData, setFormData] = useState<Partial<DrillingLog>>({
    mineSite: '',
    company: '',
    drillHoleId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    depthFrom: 0,
    depthTo: 0,
    totalDepth: 0,
    rockType: '',
    formation: '',
    coreRecovery: 0,
    drillingMethod: 'Diamond Drilling',
    equipment: '',
    geologistName: '',
    notes: '',
  })
  
  const [selectedMine, setSelectedMine] = useState<string>('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (editId) {
      const existingLog = getLogById(editId)
      if (existingLog) {
        setFormData(existingLog)
        setSelectedMine(existingLog.mineSite)
      }
    }
  }, [editId])

  const handleMineChange = (mineName: string) => {
    setSelectedMine(mineName)
    const mine = INDIAN_MINE_SITES.find(m => m.name === mineName)
    if (mine) {
      setFormData(prev => ({
        ...prev,
        mineSite: mine.name,
        company: mine.company,
        latitude: mine.latitude,
        longitude: mine.longitude,
      }))
    }
  }

  const handleDepthChange = (field: 'depthFrom' | 'depthTo', value: number) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      const from = field === 'depthFrom' ? value : (prev.depthFrom || 0)
      const to = field === 'depthTo' ? value : (prev.depthTo || 0)
      return {
        ...newData,
        totalDepth: Math.max(0, to - from)
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const log: DrillingLog = {
      ...formData as DrillingLog,
      id: editId || `log-${Date.now()}`,
      createdAt: editId ? (formData.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    saveLog(log)
    setSaved(true)
    
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }

  if (saved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mining-950 via-mining-900 to-mining-950 flex items-center justify-center">
        <Card className="bg-mining-900/50 border-mining-800 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-white text-2xl mb-2">Log Saved Successfully!</CardTitle>
          <CardDescription className="text-earth-400">
            Redirecting to dashboard...
          </CardDescription>
        </Card>
      </div>
    )
  }

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
                <Drill className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">
                {editId ? 'Edit Drilling Log' : 'New Drilling Log'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mine Selection */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-earth-500" />
                Mine Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Select Mine Site *
                </label>
                <select
                  required
                  value={selectedMine}
                  onChange={(e) => handleMineChange(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  <option value="">Select a mine site...</option>
                  {INDIAN_MINE_SITES.map((mine) => (
                    <option key={mine.id} value={mine.name}>
                      {mine.name} - {mine.company} ({mine.state})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Company
                </label>
                <Input 
                  value={formData.company} 
                  disabled 
                  className="bg-mining-800 border-earth-600 text-earth-400"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Drill Hole ID *
                </label>
                <Input 
                  required
                  placeholder="e.g., JHA-2024-001"
                  value={formData.drillHoleId}
                  onChange={(e) => setFormData(prev => ({ ...prev, drillHoleId: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Drilling Details */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-earth-500" />
                Drilling Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Date *
                </label>
                <Input 
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Start Time *
                </label>
                <Input 
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  End Time
                </label>
                <Input 
                  type="time"
                  value={formData.endTime || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Depth & Recovery */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-earth-500" />
                Depth & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Depth From (m) *
                </label>
                <Input 
                  type="number"
                  step="0.1"
                  required
                  value={formData.depthFrom}
                  onChange={(e) => handleDepthChange('depthFrom', parseFloat(e.target.value) || 0)}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Depth To (m) *
                </label>
                <Input 
                  type="number"
                  step="0.1"
                  required
                  value={formData.depthTo}
                  onChange={(e) => handleDepthChange('depthTo', parseFloat(e.target.value) || 0)}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Total Depth (m)
                </label>
                <Input 
                  type="number"
                  value={formData.totalDepth}
                  disabled
                  className="bg-mining-800 border-earth-600 text-earth-400"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Core Recovery (%)
                </label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.coreRecovery}
                  onChange={(e) => setFormData(prev => ({ ...prev, coreRecovery: parseFloat(e.target.value) || 0 }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Geology */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mountain className="w-5 h-5 text-earth-500" />
                Geological Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Rock Type/Mineral *
                </label>
                <select
                  required
                  value={formData.rockType}
                  onChange={(e) => setFormData(prev => ({ ...prev, rockType: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  <option value="">Select rock type...</option>
                  {ROCK_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Formation/Zone *
                </label>
                <select
                  required
                  value={formData.formation}
                  onChange={(e) => setFormData(prev => ({ ...prev, formation: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  <option value="">Select formation...</option>
                  {FORMATIONS.map((formation) => (
                    <option key={formation} value={formation}>{formation}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Equipment & Method */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardHat className="w-5 h-5 text-earth-500" />
                Equipment & Method
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Drilling Method *
                </label>
                <select
                  required
                  value={formData.drillingMethod}
                  onChange={(e) => setFormData(prev => ({ ...prev, drillingMethod: e.target.value as any }))}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  {DRILLING_METHODS.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Equipment Used *
                </label>
                <select
                  required
                  value={formData.equipment}
                  onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  <option value="">Select equipment...</option>
                  {EQUIPMENT_LIST.map((equipment) => (
                    <option key={equipment} value={equipment}>{equipment}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Personnel & Location */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-earth-500" />
                Personnel & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Geologist/Engineer Name *
                </label>
                <Input 
                  required
                  placeholder="Enter name"
                  value={formData.geologistName}
                  onChange={(e) => setFormData(prev => ({ ...prev, geologistName: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Latitude
                </label>
                <Input 
                  type="number"
                  step="0.000001"
                  placeholder="e.g., 23.750000"
                  value={formData.latitude || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Longitude
                </label>
                <Input 
                  type="number"
                  step="0.000001"
                  placeholder="e.g., 86.420000"
                  value={formData.longitude || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sample Information */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-earth-500" />
                Sample Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Sample ID
                </label>
                <Input 
                  placeholder="e.g., JHA-001-C"
                  value={formData.sampleId || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, sampleId: e.target.value }))}
                  className="bg-mining-800 border-earth-600 text-earth-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-earth-300">
                  Sample Type
                </label>
                <select
                  value={formData.sampleType || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, sampleType: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500"
                >
                  <option value="">Select type...</option>
                  <option value="Core Sample">Core Sample</option>
                  <option value="RC Chip Sample">RC Chip Sample</option>
                  <option value="Percussion Sample">Percussion Sample</option>
                  <option value="Bulk Sample">Bulk Sample</option>
                  <option value="Channel Sample">Channel Sample</option>
                  <option value="Grab Sample">Grab Sample</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="bg-mining-900/50 border-mining-800">
            <CardHeader>
              <CardTitle className="text-white">Notes & Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                rows={4}
                placeholder="Enter geological observations, drilling conditions, sample quality notes, etc."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="flex w-full rounded-md border border-earth-600 bg-mining-800 px-3 py-2 text-sm text-earth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-500 min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/">
              <Button type="button" variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button 
                type="submit" 
                size="lg"
                className="gap-2 bg-earth-600 hover:bg-earth-700 text-white"
              >
                <Save className="w-4 h-4" />
                {editId ? 'Update Log' : 'Save Log'}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}