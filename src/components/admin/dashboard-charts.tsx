'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TrendingUp, Users, Mail, CheckCircle2, Briefcase, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  projectType: string
  budget: string | null
  message: string
  createdAt: string | Date
}

interface DashboardChartsProps {
  leads?: Lead[]
}

export function DashboardCharts({ leads = [] }: DashboardChartsProps) {
  const [visitorPeriod, setVisitorPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number; label: string; value: number } | null>(null)
  const [hoveredBar, setHoveredBar] = useState<{ index: number; label: string; value: number } | null>(null)

  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [yearlyData, setYearlyData] = useState<any[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMonthlyData(data.monthly || [])
          setYearlyData(data.yearly || [])
          setIsError(false)
        } else {
          setIsError(true)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch analytics', err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const activeData = visitorPeriod === 'monthly' ? monthlyData : yearlyData
  const maxVal = activeData.length > 0 ? Math.max(...activeData.map((d) => d.value)) : 0

  const categories = [
    { key: 'Web Application', label: 'Web App', color: '#1D9E75' },
    { key: 'Mobile Application', label: 'Mobile App', color: '#5DCAA5' },
    { key: 'UI/UX Design', label: 'Design UI/UX', color: '#9FE1CB' },
    { key: 'Internal Business System', label: 'Internal System', color: '#1C1C1A' },
    { key: 'Tech Consulting', label: 'Consulting', color: '#E2E2DF' },
    { key: 'Lainnya', label: 'Others', color: '#888780' },
  ]

  const submissionsByCategory = categories.map((cat) => {
    const count = leads.filter((lead) => lead.projectType === cat.key).length
    return { category: cat.label, count, color: cat.color }
  })

  // Budget calculations
  const budgetMap: Record<string, number> = {
    'under-10m': 5,
    '10-25m': 17.5,
    '25-50m': 37.5,
    '50-100m': 75,
    'over-100m': 120,
  }

  const leadsWithBudget = leads.filter((lead) => lead.budget && budgetMap[lead.budget] !== undefined)
  const totalBudgetVal = leadsWithBudget.reduce((sum, lead) => sum + budgetMap[lead.budget!], 0)
  const avgDealSizeVal = leadsWithBudget.length > 0 ? (totalBudgetVal / leadsWithBudget.length) : 0

  const formatCurrency = (valInMillions: number) => {
    if (valInMillions >= 1000) {
      return `Rp ${(valInMillions / 1000).toFixed(2)} M`
    }
    return `Rp ${valInMillions.toFixed(1)} Jt`
  }

  const avgDealSize = leadsWithBudget.length > 0 ? formatCurrency(avgDealSizeVal) : 'Rp 0'
  const totalPipeline = formatCurrency(totalBudgetVal)

  const totalVisitors = activeData.reduce((sum, d) => sum + d.value, 0)
  const conversionRate = totalVisitors > 0 ? ((leads.length / totalVisitors) * 100).toFixed(2) : '0.00'

  // SVG dimensions for Line Chart
  const width = 600
  const height = 240
  const paddingX = 40
  const paddingY = 30

  // Generate points
  const points = activeData.map((d, index) => {
    const x = paddingX + (index / (activeData.length - 1 || 1)) * (width - paddingX * 2)
    const y = height - paddingY - (maxVal > 0 ? (d.value / maxVal) : 0) * (height - paddingY * 2)
    return { x, y, label: d.label, value: d.value }
  })

  // Path commands
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')

  // Area path commands
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : ''

  // Bar Chart details
  const barMax = Math.max(...submissionsByCategory.map((d) => d.count))

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visitor Analytics Chart */}
        <Card className="lg:col-span-2 bg-white border-[#E2E2DF] border-dashed text-black rounded-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-dashed border-[#E2E2DF] gap-4">
            <div>
              <CardTitle className="text-sm font-serif text-[#1C1C1A] flex items-center gap-2 font-bold font-mono">
                <span className="p-1 border border-dashed border-[#E2E2DF] bg-[#F7F6F2]/30 text-[#1D9E75]">
                  <Users className="w-3.5 h-3.5" />
                </span>
                {"[ TELEMETRY // WEB_VISITORS_ANALYTICS ]"}
              </CardTitle>
              <CardDescription className="text-[10px] text-gray-500 font-mono mt-1">
                {"// TRAFFIC DATA STREAM FOR ROOTLY MAIN NODE"}
              </CardDescription>
            </div>
            <div className="flex gap-1.5 border border-dashed border-[#E2E2DF] p-1 bg-[#F7F6F2]">
              <button
                onClick={() => { setVisitorPeriod('monthly'); setHoveredPoint(null); }}
                className={cn(
                  "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer",
                  visitorPeriod === 'monthly'
                    ? "bg-white border border-dashed border-[#E2E2DF] text-[#1D9E75] shadow-2xs"
                    : "text-gray-400 hover:text-black"
                )}
              >
                [ MONTHLY ]
              </button>
              <button
                onClick={() => { setVisitorPeriod('yearly'); setHoveredPoint(null); }}
                className={cn(
                  "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer",
                  visitorPeriod === 'yearly'
                    ? "bg-white border border-dashed border-[#E2E2DF] text-[#1D9E75] shadow-2xs"
                    : "text-gray-400 hover:text-black"
                )}
              >
                [ YEARLY ]
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                <p className="text-[10px] font-bold animate-pulse">{"// INITIALIZING_TELEMETRY_STREAM... STATUS: LOADING_DATA"}</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-red-500 border border-dashed border-red-200/50 bg-red-50/10 p-4 rounded-lg">
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <p className="font-bold text-xs uppercase tracking-wider">{"// CONNECTION_ERROR: ANALYTICS_DB_OFFLINE"}</p>
                <p className="text-[10px] text-gray-500 max-w-sm mt-1 leading-relaxed">
                  Umami registry connection failure. Ensure analytics variables are configured inside your .env.local registry mapping.
                </p>
              </div>
            ) : (
              <>
                <div className="relative pt-4">
                  {/* Responsive SVG Container */}
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                      const y = paddingY + r * (height - paddingY * 2)
                      return (
                        <g key={i}>
                          <line
                            x1={paddingX}
                            y1={y}
                            x2={width - paddingX}
                            y2={y}
                            stroke="#E2E2DF"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={paddingX - 8}
                            y={y + 3}
                            textAnchor="end"
                            className="text-[9px] fill-gray-400 font-mono"
                          >
                            {Math.round(maxVal * (1 - r))}
                          </text>
                        </g>
                      )
                    })}

                    {/* Area Path */}
                    {areaD && <path d={areaD} fill="url(#areaGradient)" className="transition-all duration-300" />}

                    {/* Line Path */}
                    {pathD && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#1D9E75"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Interaction points */}
                    {points.map((p, index) => (
                      <g key={index}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredPoint?.index === index ? 5 : 3.5}
                          fill={hoveredPoint?.index === index ? '#1D9E75' : '#FFFFFF'}
                          stroke="#1D9E75"
                          strokeWidth={1.5}
                          className="cursor-pointer transition-all duration-150"
                          onMouseEnter={() => setHoveredPoint({ index, ...p })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {/* X Axis labels */}
                        <text
                          x={p.x}
                          y={height - 8}
                          textAnchor="middle"
                          className="text-[9px] fill-gray-400 font-mono"
                        >
                          {p.label}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Chart Tooltip */}
                  {hoveredPoint && (
                    <div
                      className="absolute bg-white border border-dashed border-[#E2E2DF] shadow-xs p-2.5 text-[9px] pointer-events-none transition-all duration-75 text-black font-mono"
                      style={{
                        left: `${(hoveredPoint.x / width) * 100}%`,
                        top: `${(hoveredPoint.y / height) * 100 - 15}%`,
                        transform: 'translate(-50%, -100%)',
                      }}
                    >
                      <p className="font-bold text-[#1D9E75]">{`[ READOUT // 0x${hoveredPoint.label.toUpperCase()} ]`}</p>
                      <p className="text-gray-500 mt-0.5">
                        {`TRAFFIC: ${hoveredPoint.value.toLocaleString()} NODES`}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500 font-mono border-t border-dashed border-[#E2E2DF]/50 pt-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span>{"TELEMETRY_GROWTH ==> "}</span>
                  <span className="font-bold text-[#1D9E75]">+18.4% INCREASE</span>
                  <span className="text-gray-400">COMPARED TO PREVIOUS MONITORING SESSION</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Project Submissions / Inquiries */}
        <Card className="bg-white border-[#E2E2DF] border-dashed text-black rounded-lg">
          <CardHeader className="pb-3 border-b border-dashed border-[#E2E2DF]">
            <CardTitle className="text-sm font-serif text-[#1C1C1A] flex items-center gap-2 font-bold font-mono">
              <span className="p-1 border border-dashed border-[#E2E2DF] bg-[#F7F6F2]/30 text-[#1D9E75]">
                <Mail className="w-3.5 h-3.5" />
              </span>
              {"[ DATA_STREAM // INQUIRY_LEADS ]"}
            </CardTitle>
            <CardDescription className="text-[10px] text-gray-500 font-mono mt-1">
              {"// INCOMING PIPELINE SEGMENTED BY TYPE"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4 font-mono text-xs">
            <div className="space-y-3.5">
              {submissionsByCategory.map((d, index) => {
                const percentage = (d.count / (barMax || 1)) * 100
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold text-gray-700">{d.category.toUpperCase().replace(/\s+/g, '_')}</span>
                      <span className="text-[#1D9E75] font-bold">{d.count} NODES</span>
                    </div>
                    <div 
                      className="relative h-5 w-full bg-[#F7F6F2] border border-dashed border-[#E2E2DF]/50 overflow-hidden cursor-pointer"
                      onMouseEnter={() => setHoveredBar({ index, label: d.category, value: d.count })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: d.color,
                        }}
                      />
                      {hoveredBar?.index === index && (
                        <div className="absolute inset-0 flex items-center justify-end pr-2 bg-black/5 text-[8px] text-gray-700 font-bold">
                          {`[ ${Math.round((d.count / (submissionsByCategory.reduce((sum, item) => sum + item.count, 0) || 1)) * 100)}% OF TOTAL ]`}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-3 border-t border-dashed border-[#E2E2DF] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 text-gray-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75]" />
                TOTAL_PIPELINE_NODES
              </div>
              <span className="font-bold text-sm text-[#1C1C1A]">
                {`[ ${submissionsByCategory.reduce((sum, item) => sum + item.count, 0)} SUBMISSIONS ]`}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytical Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-[#E2E2DF] border-dashed text-black rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">CONVERSION_RATE</p>
                <p className="text-2xl font-bold text-[#1C1C1A] mt-1.5 font-mono">{conversionRate}%</p>
              </div>
              <div className="w-9 h-9 border border-dashed border-[#E2E2DF] bg-[#1D9E75]/5 flex items-center justify-center text-[#1D9E75] shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[9px] text-gray-500 mt-3 font-mono">{"// LEADS_TO_VISITORS_METRIC"}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E2E2DF] border-dashed text-black rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">EST_AVG_DEAL_SIZE</p>
                <p className="text-2xl font-bold text-[#1C1C1A] mt-1.5 font-mono">{avgDealSize}</p>
              </div>
              <div className="w-9 h-9 border border-dashed border-[#E2E2DF] bg-[#5DCAA5]/5 flex items-center justify-center text-[#5DCAA5] shrink-0">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[9px] text-gray-500 mt-3 font-mono">{"// PIPELINE_DEAL_Telemetry"}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E2E2DF] border-dashed text-black rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">EST_TOTAL_PIPELINE</p>
                <p className="text-2xl font-bold text-[#1C1C1A] mt-1.5 font-mono">{totalPipeline}</p>
              </div>
              <div className="w-9 h-9 border border-dashed border-[#E2E2DF] bg-black/5 flex items-center justify-center text-black shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[9px] text-gray-500 mt-3 font-mono">{"// CUMULATIVE_PIPELINE_VAL"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
