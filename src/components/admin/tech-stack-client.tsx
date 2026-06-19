'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Code2, Terminal, Database, Smartphone, Settings, Palette } from 'lucide-react'
import { ConsoleModal } from '@/components/admin/console-modal'
import { TechStackForm } from '@/components/admin/forms/tech-stack-form'
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface TechStack {
  id: string
  name: string
  category: 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'DATABASE' | 'DEVOPS' | 'DESIGN'
  iconUrl: string | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

interface TechStackClientProps {
  techList: TechStack[]
}

const CATEGORIES = [
  { key: 'FRONTEND', label: 'Frontend', icon: Code2, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
  { key: 'BACKEND', label: 'Backend', icon: Terminal, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
  { key: 'DATABASE', label: 'Database', icon: Database, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
  { key: 'MOBILE', label: 'Mobile', icon: Smartphone, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
  { key: 'DEVOPS', label: 'DevOps', icon: Settings, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
  { key: 'DESIGN', label: 'Design', icon: Palette, color: 'text-[#1D9E75] bg-[#1D9E75]/5 border-[#1D9E75]/20' },
] as const

export function TechStackClient({ techList }: TechStackClientProps) {
  const router = useRouter()
  
  // Dialog/Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTech, setEditingTech] = useState<TechStack | null>(null)
  const [deletingTechId, setDeletingTechId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  const handleDeleteConfirm = async () => {
    if (!deletingTechId) return
    
    try {
      const response = await fetch(`/api/admin/tech-stack/${deletingTechId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete tech stack')
      }

      toast.success('Tech stack deleted successfully')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete tech stack')
    }
  }

  const handleEditClick = async (tech: TechStack) => {
    try {
      const res = await fetch(`/api/admin/tech-stack/${tech.id}`)
      const data = await res.json()
      if (data.success) {
        setEditingTech(data.data)
      } else {
        toast.error('Failed to load tech stack details')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load tech stack details')
    }
  }

  const categoriesToRender = activeCategory === 'ALL'
    ? CATEGORIES
    : CATEGORIES.filter((cat) => cat.key === activeCategory)

  return (
    <div className="p-8 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Telemetry Control Panel */}
      <div className="flex flex-wrap items-center justify-between border-b border-dashed border-[#E2E2DF] pb-4 mb-8 font-mono text-[10px] gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[#1D9E75] font-bold">SYSTEM CONTROL PANEL // TECH_STACK_DATABASE</span>
        </div>
        <div className="text-gray-400 uppercase tracking-wider font-semibold">
          NODE REGISTRY // SECURE CONNECTION
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-serif text-[#1C1C1A]">Tech Stack Console</h1>
          <p className="text-xs font-mono text-[#888780] mt-1">QUERYING SYSTEM STACKS... STATUS: ACTIVE</p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#1D9E75] hover:bg-[#1a8c66] text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] hover:border-[#1a8c66] rounded-md h-10 px-4 cursor-pointer shadow-xs transition-all duration-200"
        >
          <Plus className="mr-2 h-3.5 w-3.5" />
          {"[ ADD_NEW_STACK ]"}
        </Button>
      </div>

      {/* Interactive Command Filter Station */}
      <div className="mb-8 border border-dashed border-[#E2E2DF] bg-white p-4 font-mono text-xs rounded-lg">
        <div className="text-gray-400 mb-2 flex items-center gap-1 text-[10px] uppercase font-bold">
          <span>DIR_QUERY_FILTER &gt; select_category --active=</span>
          <span className="text-[#1D9E75]">{activeCategory}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={cn(
              "px-3 py-1.5 border text-xs cursor-pointer transition-all",
              activeCategory === 'ALL'
                ? "bg-[#1D9E75]/10 border-[#1D9E75] text-[#1D9E75] font-bold"
                : "border-dashed border-[#E2E2DF] hover:border-[#1D9E75] text-gray-500 hover:text-black"
            )}
          >
            {`[ ALL_NODES (${techList.length}) ]`}
          </button>
          {CATEGORIES.map((cat) => {
            const count = techList.filter((item) => item.category === cat.key).length
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-3 py-1.5 border text-xs cursor-pointer transition-all",
                  activeCategory === cat.key
                    ? "bg-[#1D9E75]/10 border-[#1D9E75] text-[#1D9E75] font-bold"
                    : "border-dashed border-[#E2E2DF] hover:border-[#1D9E75] text-gray-500 hover:text-black"
                )}
              >
                {`[ ${cat.label.toUpperCase()} (${count}) ]`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Segmented Grid Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesToRender.map((cat) => {
          const CatIcon = cat.icon
          const items = techList.filter((item) => item.category === cat.key)
          
          return (
            <Card key={cat.key} className="bg-white border-[#E2E2DF] border-dashed shadow-xs flex flex-col min-h-[300px] rounded-lg">
              <CardHeader className="border-b border-dashed border-[#E2E2DF] pb-3 flex flex-row items-center justify-between space-y-0 font-mono">
                <CardTitle className="text-[#1C1C1A] font-serif text-base flex items-center gap-2 font-bold">
                  <span className="p-1 border border-dashed border-[#E2E2DF] bg-[#F7F6F2]/35 text-[#1D9E75]">
                    <CatIcon className="w-3.5 h-3.5" />
                  </span>
                  {cat.label}
                </CardTitle>
                <Badge variant="outline" className="border-[#E2E2DF] border-dashed text-gray-500 bg-[#F7F6F2] font-bold text-[9px] rounded-none px-2 py-0.5">
                  {`[ ${items.length} NODES ]`}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col font-mono text-xs">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-8">
                    <p className="text-[10px]">{"// NO STACKS REGISTERED."}</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {items.map((tech) => {
                      const shortId = tech.id.slice(0, 8).toUpperCase()
                      return (
                        <div 
                          key={tech.id} 
                          className="group/item flex items-center justify-between p-3 border border-dashed border-[#E2E2DF] hover:border-[#1D9E75] transition-all duration-200 bg-white"
                        >
                          <div className="flex items-center gap-3">
                            {/* Tech Icon / Avatar */}
                            <div className="w-8 h-8 border border-dashed border-[#E2E2DF] flex items-center justify-center overflow-hidden shrink-0 bg-[#F7F6F2]/20 p-1">
                              {tech.iconUrl ? (
                                <Image 
                                  src={tech.iconUrl} 
                                  alt={tech.name} 
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 object-contain grayscale group-hover/item:grayscale-0 transition-all duration-300"
                                />
                              ) : (
                                <span className="text-[9px] font-bold text-gray-500">{tech.name.slice(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#1C1C1A]">{tech.name}</span>
                              <div className="flex items-center gap-1.5 text-[9px] text-[#888780] mt-0.5">
                                <span>{`NODE::0x${shortId}`}</span>
                                <span>{"//"}</span>
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full shrink-0",
                                  tech.isActive ? "bg-[#1D9E75] animate-pulse" : "bg-gray-300"
                                )} />
                                <span className={tech.isActive ? "text-[#1D9E75] font-semibold" : "text-gray-400"}>
                                  {tech.isActive ? "ACTIVE" : "OFFLINE"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 opacity-80 group-hover/item:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditClick(tech)}
                              className="text-[#1C1C1A] border border-[#E2E2DF] hover:border-[#1D9E75] hover:bg-[#1D9E75]/5 text-[8px] font-bold px-1.5 h-5 rounded-none cursor-pointer"
                              title="Edit"
                            >
                              {"[ EDIT ]"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setDeletingTechId(tech.id)}
                              className="text-red-600 border border-transparent hover:border-red-600/30 hover:bg-red-50 text-[8px] font-bold px-1.5 h-5 rounded-none cursor-pointer"
                              title="Delete"
                            >
                              {"[ DEL ]"}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Create Modal */}
      <ConsoleModal
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="[ ADD_NEW_TECH_STACK_NODE ]"
        maxWidth="sm:max-w-xl"
      >
        <TechStackForm onSuccess={() => setIsCreateOpen(false)} />
      </ConsoleModal>

      {/* Edit Modal */}
      <ConsoleModal
        isOpen={!!editingTech}
        onOpenChange={(open) => !open && setEditingTech(null)}
        title="[ EDIT_TECH_STACK_NODE ]"
        maxWidth="sm:max-w-xl"
      >
        {editingTech && (
          <TechStackForm 
            initialData={{
              ...editingTech,
              iconUrl: editingTech.iconUrl || '',
            }} 
            onSuccess={() => setEditingTech(null)} 
          />
        )}
      </ConsoleModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={!!deletingTechId}
        onClose={() => setDeletingTechId(null)}
        onConfirm={handleDeleteConfirm}
        itemName="tech stack"
      />
    </div>
  )
}
