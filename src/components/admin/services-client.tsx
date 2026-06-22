'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, GripVertical } from 'lucide-react'
import * as Icons from 'lucide-react'
import { ConsoleModal } from '@/components/admin/console-modal'
import { ServiceForm } from '@/components/admin/forms/service-form'
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  title: string
  slug: string
  icon: string
  summary: string
  description: string
  isActive: boolean
  displayOrder: number
  createdAt: string | Date
  updatedAt: string | Date
}

interface ServicesClientProps {
  serviceList: Service[]
}

export function ServicesClient({ serviceList }: ServicesClientProps) {
  const router = useRouter()
  
  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingService, setEditingService] = useState<any | null>(null)
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null)
  
  // Reordering states
  const [isReorderOpen, setIsReorderOpen] = useState(false)
  const [items, setItems] = useState<Service[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isSavingOrder, setIsSavingOrder] = useState(false)

  const getServiceIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle
    return <IconComponent className="w-4 h-4" />
  }

  const handleDeleteConfirm = async () => {
    if (!deletingServiceId) return
    
    try {
      const response = await fetch(`/api/admin/services/${deletingServiceId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete service')
      }

      toast.success('Service deleted successfully')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete service')
    }
  }

  const handleEditClick = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`)
      const data = await res.json()
      if (data.success) {
        setEditingService(data.data)
      } else {
        toast.error('Failed to load service details')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load service details')
    }
  }

  // Drag and Drop Handlers
  const handleOpenReorder = () => {
    // Sort by displayOrder ascending before reordering
    const sorted = [...serviceList].sort((a, b) => a.displayOrder - b.displayOrder)
    setItems(sorted)
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

    const newItems = [...items]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(index, 0, draggedItem)

    setItems(newItems)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleSaveOrder = async () => {
    setIsSavingOrder(true)
    try {
      const response = await fetch('/api/admin/services/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: items.map((item) => item.id) }),
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      toast.success('Services reordered successfully')
      setIsReorderOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save order')
    } finally {
      setIsSavingOrder(false)
    }
  }

  return (
    <div className="p-8 bg-rootly-admin-bg min-h-screen text-rootly-text">
      {/* Telemetry Control Panel */}
      <div className="flex flex-wrap items-center justify-between border-b border-dashed border-rootly-admin-border pb-4 mb-8 font-mono text-[10px] gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-rootly-primary font-bold">SYSTEM CONTROL PANEL // SERVICES_DATABASE</span>
        </div>
        <div className="text-gray-400 uppercase tracking-wider font-semibold">
          NODE REGISTRY // SECURE CONNECTION
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-rootly-text">Services Console</h1>
          <p className="text-xs font-mono text-rootly-muted mt-1">QUERYING SYSTEM SERVICES... STATUS: OK</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={handleOpenReorder}
            className="border-rootly-admin-border text-gray-700 font-mono text-xs uppercase tracking-wider h-10 px-4 cursor-pointer hover:bg-gray-50 border-dashed"
          >
            {"[ REORDER_SERVICES ]"}
          </Button>
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-rootly-primary hover:brightness-90 text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] hover:border-[#1a8c66] rounded-md h-10 px-4 cursor-pointer shadow-xs transition-all duration-200"
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            {"[ ADD_NEW_SERVICE ]"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {serviceList.length === 0 ? (
          <Card className="bg-rootly-admin-card border-rootly-admin-border border-dashed text-rootly-text">
            <CardContent className="p-12 text-center text-gray-500 font-mono text-xs">
              {"// ERROR: NO REGISTERED SERVICE CAPABILITIES FOUND."}
            </CardContent>
          </Card>
        ) : (
          serviceList.map((service) => {
            const shortId = service.id.slice(0, 8).toUpperCase()
            return (
              <Card key={service.id} className="bg-rootly-admin-card border-rootly-admin-border border-dashed hover:border-rootly-primary hover:shadow-xs transition-all duration-300 text-rootly-text group font-mono">
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    {/* Icon Indicator */}
                    <div className="w-10 h-10 border border-dashed border-rootly-admin-border bg-rootly-admin-bg/30 flex items-center justify-center text-rootly-primary shrink-0">
                      {getServiceIcon(service.icon)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-base font-bold text-rootly-text transition-colors group-hover:text-rootly-primary">
                          {service.title}
                        </h3>
                        <span className="text-[9px] text-rootly-muted font-mono">{"// SERVICE_0x"}{shortId}</span>
                      </div>
                      
                      {/* Rolling Panel */}
                      <div className="relative h-[20px] w-full overflow-hidden mt-1.5 bg-transparent font-mono text-[11px]">
                        <div className="absolute inset-0 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-1/2 flex flex-col w-full h-[200%]">
                          {/* Layer A: Summary */}
                          <div className="h-[20px] flex items-center shrink-0">
                            <p className="text-gray-500 truncate w-full">
                              {"SUMMARY ==> "}{service.summary}
                            </p>
                          </div>
                          
                          {/* Layer B: Description Preview */}
                          <div className="h-[20px] flex items-center shrink-0">
                            <p className="text-rootly-primary font-semibold truncate w-full italic">
                              {"DESCRIPTION ==> "}{service.description || 'No description provided.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-rootly-admin-border/50 border-dashed">
                    {service.isActive ? (
                      <Badge className="bg-rootly-primary/10 text-rootly-primary border border-[#1D9E75]/30 hover:bg-rootly-primary/10 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none">
                        ACTIVE
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-rootly-admin-border border-dashed text-gray-400 bg-rootly-admin-bg text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none">
                        INACTIVE
                      </Badge>
                    )}
                    
                    <div className="flex items-center gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditClick(service)}
                        className="text-rootly-text border border-rootly-admin-border hover:border-rootly-primary hover:bg-rootly-primary/5 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                        title="Edit Service"
                      >
                        {"[ EDIT ]"}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setDeletingServiceId(service.id)}
                        className="text-red-600 border border-transparent hover:border-red-600/35 hover:bg-red-50 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                        title="Delete Service"
                      >
                        {"[ DELETE ]"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Reorder Modal */}
      <ConsoleModal
        isOpen={isReorderOpen}
        onOpenChange={setIsReorderOpen}
        title="[ REORDER_SERVICE_NODES ]"
        subtitle="// DRAG AND DROP NODES TO ADJUST SYSTEM DISPLAY SEQUENCE"
        maxWidth="sm:max-w-2xl"
      >
        <div className="mt-2 max-h-[50vh] overflow-y-auto pr-1 space-y-2 font-mono">
          {items.map((service, index) => (
            <div
              key={service.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center justify-between p-3 bg-rootly-admin-card border border-dashed rounded-lg cursor-move transition-all",
                draggedIndex === index 
                  ? "opacity-50 border-[#1D9E75] bg-rootly-primary/5" 
                  : "border-rootly-admin-border hover:border-rootly-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-gray-400 shrink-0" />
                <div className="w-8 h-8 border border-dashed border-rootly-admin-border flex items-center justify-center text-rootly-primary shrink-0">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="text-xs font-bold text-rootly-text">{service.title}</span>
              </div>
              <Badge className="bg-rootly-admin-bg border border-dashed border-rootly-admin-border text-gray-500 text-[10px] font-bold rounded-none px-2 py-0.5 font-mono">
                POS_{index + 1}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-dashed border-rootly-admin-border font-mono">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsReorderOpen(false)}
            className="border-rootly-admin-border border-dashed text-gray-700 cursor-pointer text-xs h-9 rounded-md px-4 uppercase"
            disabled={isSavingOrder}
          >
            {"[ CANCEL ]"}
          </Button>
          <Button
            type="button"
            onClick={handleSaveOrder}
            className="bg-rootly-primary hover:brightness-90 text-white border border-[#1D9E75] hover:border-[#1a8c66] cursor-pointer text-xs h-9 rounded-md px-4 uppercase"
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
        title="[ ADD_NEW_SERVICE_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        <ServiceForm onSuccess={() => setIsCreateOpen(false)} />
      </ConsoleModal>

      {/* Edit Modal */}
      <ConsoleModal
        isOpen={!!editingService}
        onOpenChange={(open) => !open && setEditingService(null)}
        title="[ EDIT_SERVICE_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        <ServiceForm 
          initialData={editingService} 
          onSuccess={() => setEditingService(null)} 
        />
      </ConsoleModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={!!deletingServiceId}
        onClose={() => setDeletingServiceId(null)}
        onConfirm={handleDeleteConfirm}
        itemName="service"
      />
    </div>
  )
}
