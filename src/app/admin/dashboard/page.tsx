import { db } from '@/db'
import { projects, services, techStacks, testimonials, leads } from '@/db/schema'
import { count, desc } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardCharts } from '@/components/admin/dashboard-charts'

export default async function DashboardPage() {
  const [projectCount, serviceCount, techCount, testimonialCount, leadsList] = await Promise.all([
    db.select({ count: count() }).from(projects),
    db.select({ count: count() }).from(services),
    db.select({ count: count() }).from(techStacks),
    db.select({ count: count() }).from(testimonials),
    db.select().from(leads).orderBy(desc(leads.createdAt)),
  ])

  return (
    <div className="p-8 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Console Control Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-dashed border-[#E2E2DF] pb-4 mb-8 font-mono text-[10px] gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#1D9E75] font-bold">SYSTEM CONTROL PANEL // MAINNET</span>
        </div>
        <div className="text-gray-400 uppercase tracking-wider">
          SECURE CONNECTION: ESTABLISHED // AUTH_OK
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#1C1C1A]">Dashboard Console</h1>
        <p className="text-xs font-mono text-[#888780] mt-1">INITIALIZING MONITORING AGENTS... ACTIVE</p>
      </div>
      
      {/* Web3 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Projects */}
        <Card className="bg-white border-[#E2E2DF] border-dashed hover:border-[#1D9E75]/50 transition-all duration-300 shadow-xs relative overflow-hidden group">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs text-gray-500 font-mono font-bold uppercase tracking-wider">{"[ PROJECTS ]"}</CardTitle>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#1C1C1A] font-bold font-mono">{projectCount[0].count}</p>
            <span className="text-[9px] text-[#888780] font-mono mt-2 block">{"// TOTAL ACTIVE BUILDS"}</span>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="bg-white border-[#E2E2DF] border-dashed hover:border-[#1D9E75]/50 transition-all duration-300 shadow-xs relative overflow-hidden group">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs text-gray-500 font-mono font-bold uppercase tracking-wider">{"[ SERVICES ]"}</CardTitle>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#1C1C1A] font-bold font-mono">{serviceCount[0].count}</p>
            <span className="text-[9px] text-[#888780] font-mono mt-2 block">{"// DEPLOYED CAPABILITIES"}</span>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="bg-white border-[#E2E2DF] border-dashed hover:border-[#1D9E75]/50 transition-all duration-300 shadow-xs relative overflow-hidden group">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs text-gray-500 font-mono font-bold uppercase tracking-wider">{"[ TECH STACK ]"}</CardTitle>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#1C1C1A] font-bold font-mono">{techCount[0].count}</p>
            <span className="text-[9px] text-[#888780] font-mono mt-2 block">{"// SYSTEM PROTOCOLS"}</span>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="bg-white border-[#E2E2DF] border-dashed hover:border-[#1D9E75]/50 transition-all duration-300 shadow-xs relative overflow-hidden group">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs text-gray-500 font-mono font-bold uppercase tracking-wider">{"[ TESTIMONY ]"}</CardTitle>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#1C1C1A] font-bold font-mono">{testimonialCount[0].count}</p>
            <span className="text-[9px] text-[#888780] font-mono mt-2 block">{"// CLIENT VERIFICATIONS"}</span>
          </CardContent>
        </Card>
      </div>

      <DashboardCharts leads={leadsList} />
    </div>
  )
}