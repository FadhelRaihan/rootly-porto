'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Star, ExternalLink, GripVertical } from 'lucide-react'
import { ConsoleModal } from '@/components/admin/console-modal'
import { cn } from '@/lib/utils'
import { ProjectForm } from '@/components/admin/forms/project-form'
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog'
import { toast } from 'sonner'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { AppSelect } from '@/components/ui/app-select'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  client: string | null
  year: number
  summary: string
  thumbnailUrl: string
  liveUrl?: string | null
  isFeatured: boolean
  displayOrder: number
  createdAt: string | Date
  updatedAt: string | Date
}

interface ProjectsClientProps {
  projectList: Project[]
}

export function ProjectsClient({ projectList }: ProjectsClientProps) {
  const router = useRouter()
  
  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null)

  // Reorder states
  const [isReorderOpen, setIsReorderOpen] = useState(false)
  const [reorderItems, setReorderItems] = useState<Project[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isSavingOrder, setIsSavingOrder] = useState(false)

  // Drag and Drop Handlers
  const handleOpenReorder = () => {
    // Sort by displayOrder ascending before reordering
    const sorted = [...projectList].sort((a, b) => a.displayOrder - b.displayOrder)
    setReorderItems(sorted)
    setIsReorderOpen(true)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newItems = [...reorderItems]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(index, 0, draggedItem)

    setReorderItems(newItems)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleSaveOrder = async () => {
    setIsSavingOrder(true)
    try {
      const response = await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: reorderItems.map((item) => item.id) }),
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      toast.success('Projects reordered successfully')
      setIsReorderOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save order')
    } finally {
      setIsSavingOrder(false)
    }
  }

  const categoryLabels: Record<string, string> = {
    WEB_APP: 'Web App',
    MOBILE: 'Mobile',
    INTERNAL_SYSTEM: 'Internal System',
    DESIGN: 'Design',
  }

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [featuredFilter, setFeaturedFilter] = useState('ALL')

  const handleDeleteConfirm = async () => {
    if (!deletingProjectId) return
    
    try {
      const response = await fetch(`/api/admin/projects/${deletingProjectId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      toast.success('Project deleted successfully')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete project')
    }
  }

  const handleEditClick = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`)
      const data = await res.json()
      if (data.success) {
        setEditingProject(data.data)
      } else {
        toast.error('Failed to load project details')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load project details')
    }
  }

  const filteredProjects = projectList.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'ALL' || project.category === selectedCategory
    
    const matchesFeatured = featuredFilter === 'ALL' || 
      (featuredFilter === 'FEATURED' && project.isFeatured) ||
      (featuredFilter === 'STANDARD' && !project.isFeatured)

    return matchesSearch && matchesCategory && matchesFeatured
  })

  return (
    <div className="p-8 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Telemetry Control Panel */}
      <div className="flex flex-wrap items-center justify-between border-b border-dashed border-[#E2E2DF] pb-4 mb-8 font-mono text-[10px] gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#1D9E75] font-bold">SYSTEM CONTROL PANEL // PROJECT_DATABASE</span>
        </div>
        <div className="text-gray-400 uppercase tracking-wider font-semibold">
          NODE REGISTRY // SECURE CONNECTION
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#1C1C1A]">Projects Console</h1>
          <p className="text-xs font-mono text-[#888780] mt-1">QUERYING SYSTEM PROJECTS... STATUS: OK</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={handleOpenReorder}
            className="border-[#E2E2DF] text-gray-700 font-mono text-xs uppercase tracking-wider h-10 px-4 cursor-pointer hover:bg-gray-50 border-dashed"
          >
            {"[ REORDER_NODES ]"}
          </Button>
          <Button 
            onClick={() => setIsCreateOpen(true)} 
            className="bg-[#1D9E75] hover:bg-[#1a8c66] text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] hover:border-[#1a8c66] rounded-md h-10 px-4 cursor-pointer shadow-xs transition-all duration-200"
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            {"[ ADD_NEW_PROJECT ]"}
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg border border-[#E2E2DF] border-dashed font-mono">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#1D9E75] font-bold">DIR_SEARCH &gt;</span>
          <Input
            placeholder="query_title_or_client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-24 bg-[#F7F6F2]/65 border-[#E2E2DF] text-black placeholder-gray-450 focus-visible:ring-[#1D9E75] font-mono text-xs h-9"
          />
        </div>

        {/* Filters Selectors */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Category Select */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">{"[ CATEGORY ]:"}</span>
            <AppSelect
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              options={[
                { value: 'ALL', label: 'ALL_CATEGORIES' },
                { value: 'WEB_APP', label: 'WEB_APP' },
                { value: 'MOBILE', label: 'MOBILE_APP' },
                { value: 'INTERNAL_SYSTEM', label: 'INTERNAL_SYSTEM' },
                { value: 'DESIGN', label: 'DESIGN_UI_UX' },
              ]}
              width="w-[170px]"
            />
          </div>

          {/* Featured Status Select */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">{"[ STATUS ]:"}</span>
            <AppSelect
              value={featuredFilter}
              onValueChange={setFeaturedFilter}
              options={[
                { value: 'ALL', label: 'ALL_STATUS' },
                { value: 'FEATURED', label: 'FEATURED_ONLY' },
                { value: 'STANDARD', label: 'STANDARD_ONLY' },
              ]}
              width="w-[150px]"
            />
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <Card className="bg-white border-[#E2E2DF] border-dashed text-black">
          <CardContent className="p-12 text-center text-gray-500 font-mono text-xs">
            {"// ERROR: NO REGISTERED PROJECT NODES MATCHING SEARCH METADATA."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const shortId = project.id.slice(0, 8).toUpperCase()
            return (
              <div
                key={project.id}
                className="group bg-white rounded-lg border border-[#E2E2DF] border-dashed overflow-hidden hover:border-[#1D9E75] transition-all duration-300 flex flex-col hover:shadow-xs"
              >
                {/* Header Telemetry bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#E2E2DF] border-dashed font-mono text-[9px] text-[#888780] bg-[#F7F6F2]/30">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.isFeatured ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                    <span>BUILD_ID: 0x{shortId}</span>
                  </div>
                  <div className="uppercase tracking-wider">
                    {categoryLabels[project.category] || project.category}
                  </div>
                </div>

                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-[#F7F6F2] overflow-hidden border-b border-[#E2E2DF] border-dashed">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500 grayscale hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-[10px]">
                      {"// NO_IMAGE_NODE"}
                    </div>
                  )}
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none font-mono">
                    <Badge className="bg-[#1C1C1A] text-white border border-[#E2E2DF]/50 hover:bg-[#1C1C1A] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none">
                      {categoryLabels[project.category] || project.category}
                    </Badge>
                    {project.isFeatured && (
                      <Badge className="bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 hover:bg-[#1D9E75]/10 text-[9px] flex items-center gap-1 px-2 py-0.5 rounded-none font-bold">
                        <Star className="w-2.5 h-2.5 fill-[#1D9E75] stroke-[#1D9E75]" />
                        FEATURED
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between font-mono">
                  <div>
                    <h3 className="font-serif text-base text-[#1C1C1A] font-bold line-clamp-1 group-hover:text-[#1D9E75] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    
                    {/* Meta variables map */}
                    <div className="mt-3.5 space-y-1 text-[10px] text-gray-500 border-t border-b border-dashed border-[#E2E2DF] py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#888780]">CLIENT ==&gt;</span>
                        <span className="text-[#1C1C1A] font-bold truncate max-w-[150px]">{project.client || 'PERSONAL_PROJECT'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#888780]">RELEASE_YEAR ==&gt;</span>
                        <span className="text-[#1C1C1A] font-bold">{project.year}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#888780]">INDEX_SLUG ==&gt;</span>
                        <span className="text-[#1D9E75] font-bold">{project.slug}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#888780] mt-3.5 line-clamp-2 leading-relaxed font-sans">
                      {project.summary || 'No project summary telemetry provided.'}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-dashed border-[#E2E2DF]">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1D9E75] hover:text-[#1a8c66] flex items-center gap-1 font-bold tracking-wider hover:underline"
                      >
                        <ExternalLink size={10} />
                        RUN_LIVE_ENVIRONMENT
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400 italic">{"// NO_LIVE_LINK"}</span>
                    )}
                    
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(project)}
                        className="text-[#1C1C1A] border border-[#E2E2DF] hover:border-[#1D9E75] hover:bg-[#1D9E75]/5 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                        title="Edit Project"
                      >
                        {"[ EDIT ]"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingProjectId(project.id)}
                        className="text-red-600 border border-transparent hover:border-red-600/35 hover:bg-red-50 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                        title="Delete Project"
                      >
                        {"[ DELETE ]"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Reorder Modal */}
      <ConsoleModal
        isOpen={isReorderOpen}
        onOpenChange={setIsReorderOpen}
        title="[ REORDER_PROJECT_NODES ]"
        subtitle="// DRAG AND DROP NODES TO ADJUST SYSTEM DISPLAY SEQUENCE"
        maxWidth="sm:max-w-2xl"
      >
        <div className="mt-2 max-h-[50vh] overflow-y-auto pr-1 space-y-2 font-mono">
          {reorderItems.map((project, index) => (
            <div
              key={project.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center justify-between p-3 bg-white border border-dashed rounded-lg cursor-move transition-all",
                draggedIndex === index 
                  ? "opacity-50 border-[#1D9E75] bg-[#1D9E75]/5" 
                  : "border-[#E2E2DF] hover:border-[#1D9E75]"
              )}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-gray-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1C1C1A]">{project.title}</span>
                  <span className="text-[9px] text-[#888780] uppercase">
                    Category: {categoryLabels[project.category] || project.category} {project.client ? `// Client: ${project.client}` : ''}
                  </span>
                </div>
              </div>
              <Badge className="bg-[#F7F6F2] border border-dashed border-[#E2E2DF] text-gray-500 text-[10px] font-bold rounded-none px-2 py-0.5">
                POS_{index + 1}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-dashed border-[#E2E2DF] font-mono">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsReorderOpen(false)}
            className="border-[#E2E2DF] border-dashed text-gray-700 cursor-pointer text-xs h-9 rounded-md px-4 uppercase"
            disabled={isSavingOrder}
          >
            {"[ CANCEL ]"}
          </Button>
          <Button
            type="button"
            onClick={handleSaveOrder}
            className="bg-[#1D9E75] hover:bg-[#1a8c66] text-white border border-[#1D9E75] hover:border-[#1a8c66] cursor-pointer text-xs h-9 rounded-md px-4 uppercase"
            disabled={isSavingOrder}
          >
            {isSavingOrder ? 'SAVING_SEQUENCE...' : '[ SAVE_SEQUENCE ]'}
          </Button>
        </div>
      </ConsoleModal>

      {/* Create Modal */}
      <ConsoleModal
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="[ ADD_NEW_PROJECT_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        <ProjectForm onSuccess={() => setIsCreateOpen(false)} />
      </ConsoleModal>

      {/* Edit Modal */}
      <ConsoleModal
        isOpen={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
        title="[ EDIT_PROJECT_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        <ProjectForm 
          initialData={editingProject} 
          onSuccess={() => setEditingProject(null)} 
        />
      </ConsoleModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={!!deletingProjectId}
        onClose={() => setDeletingProjectId(null)}
        onConfirm={handleDeleteConfirm}
        itemName="project"
      />
    </div>
  )
}
