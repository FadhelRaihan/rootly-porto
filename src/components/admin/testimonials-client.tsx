'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, ArrowUpDown, GripVertical } from 'lucide-react'
import { ConsoleModal } from '@/components/admin/console-modal'
import { TestimonialForm } from '@/components/admin/forms/testimonial-form'
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  clientName: string
  clientRole: string
  clientCompany: string
  clientPhoto: string | null
  quote: string
  rating: number
  isFeatured: boolean
  isActive: boolean
  displayOrder: number
  projectId: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

interface TestimonialsClientProps {
  testimonialList: Testimonial[]
}

export function TestimonialsClient({ testimonialList }: TestimonialsClientProps) {
  const router = useRouter()

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<string | null>(null)

  // Reordering states
  const [isReorderOpen, setIsReorderOpen] = useState(false)
  const [items, setItems] = useState<Testimonial[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isSavingOrder, setIsSavingOrder] = useState(false)

  const handleDeleteConfirm = async () => {
    if (!deletingTestimonialId) return

    try {
      const response = await fetch(`/api/admin/testimonials/${deletingTestimonialId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }

      toast.success('Testimonial deleted successfully')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete testimonial')
    }
  }

  const handleEditClick = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`)
      const data = await res.json()
      if (data.success) {
        setEditingTestimonial(data.data)
      } else {
        toast.error('Failed to load testimonial details')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load testimonial details')
    }
  }

  // Drag and Drop Handlers
  const handleOpenReorder = () => {
    // Sort by displayOrder ascending before reordering
    const sorted = [...testimonialList].sort((a, b) => a.displayOrder - b.displayOrder)
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
      const response = await fetch('/api/admin/testimonials/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: items.map((item) => item.id) }),
      })

      if (!response.ok) {
        throw new Error('Failed to save order')
      }

      toast.success('Testimonials reordered successfully')
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
    <div className="p-8 bg-[#F7F6F2] min-h-screen text-[#1C1C1A]">
      {/* Telemetry Control Panel */}
      <div className="flex flex-wrap items-center justify-between border-b border-dashed border-[#E2E2DF] pb-4 mb-8 font-mono text-[10px] gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[#1D9E75] font-bold">SYSTEM CONTROL PANEL // TESTIMONIALS_DATABASE</span>
        </div>
        <div className="text-gray-400 uppercase tracking-wider font-semibold">
          NODE REGISTRY // SECURE CONNECTION
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#1C1C1A]">Testimonials Console</h1>
          <p className="text-xs font-mono text-[#888780] mt-1">QUERYING SYSTEM FEEDBACKS... STATUS: OK</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={handleOpenReorder}
            className="border-[#E2E2DF] text-gray-700 font-mono text-xs uppercase tracking-wider h-10 px-4 cursor-pointer hover:bg-gray-50 border-dashed"
          >
            <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-gray-500" />
            {"[ REORDER_TESTIMONIALS ]"}
          </Button>
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-[#1D9E75] hover:bg-[#1a8c66] text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] hover:border-[#1a8c66] rounded-md h-10 px-4 cursor-pointer shadow-xs transition-all duration-200"
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            {"[ ADD_TESTIMONIAL ]"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {testimonialList.length === 0 ? (
          <Card className="bg-white border-[#E2E2DF] border-dashed text-black">
            <CardContent className="p-12 text-center text-gray-500 font-mono text-xs">
              {"// ERROR: NO REGISTERED TESTIMONIAL READOUTS FOUND."}
            </CardContent>
          </Card>
        ) : (
          [...testimonialList]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((testimonial) => {
              const shortId = testimonial.id.slice(0, 8).toUpperCase()
              return (
                <Card key={testimonial.id} className="bg-white border-[#E2E2DF] border-dashed hover:border-[#1D9E75] hover:shadow-xs transition-all duration-300 text-black group font-mono">
                  <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {/* Client Avatar */}
                      <div className="w-12 h-12 border border-dashed border-[#E2E2DF] bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs rounded-none">
                        {testimonial.clientPhoto ? (
                          <Image 
                            src={testimonial.clientPhoto} 
                            alt={testimonial.clientName} 
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-500">
                            {testimonial.clientName.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <h3 className="font-serif text-base font-bold text-[#1C1C1A] transition-colors group-hover:text-[#1D9E75]">
                            {testimonial.clientName}
                          </h3>
                          <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-500/5 px-2 py-0.5 border border-dashed border-amber-500/20">
                            {`[ RATING: ${testimonial.rating}/5 ★ ]`}
                          </span>
                          <span className="text-[9px] text-[#888780] font-mono">{"// ID: 0x"}{shortId}</span>
                        </div>
                        
                        {/* Rolling Panel */}
                        <div className="relative h-[20px] w-full overflow-hidden mt-1.5 bg-transparent font-mono text-[11px]">
                          <div className="absolute inset-0 transition-transform duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-1/2 flex flex-col w-full h-[200%]">
                            {/* Layer A: Quote Preview */}
                            <div className="h-[20px] flex items-center shrink-0">
                              <p className="text-gray-500 truncate w-full italic">
                                {"QUOTE ==> "}"{testimonial.quote}"
                              </p>
                            </div>
                            
                            {/* Layer B: Client Details */}
                            <div className="h-[20px] flex items-center shrink-0">
                              <p className="text-[#1D9E75] font-semibold truncate w-full">
                                {"METRIC ==> "}{testimonial.clientRole} at {testimonial.clientCompany}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E2E2DF]/50 border-dashed">
                      <div className="flex items-center gap-1.5">
                        {testimonial.isFeatured && (
                          <span className="text-[10px] text-amber-600 font-bold bg-amber-500/5 border border-dashed border-amber-500/20 px-2 py-0.5">
                            FEATURED_NODE
                          </span>
                        )}
                        {testimonial.isActive ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#1D9E75] font-bold bg-[#1D9E75]/5 border border-dashed border-[#1D9E75]/20 px-2 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
                            ACTIVE
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold bg-gray-50 border border-dashed border-gray-200 px-2 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            OFFLINE
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditClick(testimonial)}
                          className="text-[#1C1C1A] border border-[#E2E2DF] hover:border-[#1D9E75] hover:bg-[#1D9E75]/5 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                          title="Edit Testimonial"
                        >
                          {"[ EDIT ]"}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setDeletingTestimonialId(testimonial.id)}
                          className="text-red-600 border border-transparent hover:border-red-650/30 hover:bg-red-50 text-[9px] font-bold px-2 h-6 rounded-none cursor-pointer"
                          title="Delete Testimonial"
                        >
                          {"[ DEL ]"}
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
        title="[ REORDER_TESTIMONIAL_NODES ]"
        subtitle="// DRAG AND DROP NODES TO ADJUST SYSTEM DISPLAY SEQUENCE"
        maxWidth="sm:max-w-2xl"
      >
        <div className="mt-2 max-h-[50vh] overflow-y-auto pr-1 space-y-2 font-mono">
          {items.map((testimonial, index) => (
            <div
              key={testimonial.id}
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
                <div className="w-8 h-8 border border-dashed border-[#E2E2DF] flex items-center justify-center overflow-hidden shrink-0 shadow-2xs rounded-none bg-gray-50">
                  {testimonial.clientPhoto ? (
                    <Image 
                      src={testimonial.clientPhoto} 
                      alt={testimonial.clientName} 
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-gray-500">
                      {testimonial.clientName.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-[#1C1C1A]">{testimonial.clientName}</span>
              </div>
              <Badge className="bg-[#F7F6F2] border border-dashed border-[#E2E2DF] text-gray-500 text-[10px] font-bold rounded-none px-2 py-0.5 font-mono">
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
        title="[ ADD_NEW_TESTIMONIAL_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        <TestimonialForm onSuccess={() => setIsCreateOpen(false)} />
      </ConsoleModal>

      {/* Edit Modal */}
      <ConsoleModal
        isOpen={!!editingTestimonial}
        onOpenChange={(open) => !open && setEditingTestimonial(null)}
        title="[ EDIT_TESTIMONIAL_NODE ]"
        maxWidth="sm:max-w-3xl"
      >
        {editingTestimonial && (
          <TestimonialForm 
            initialData={{
              ...editingTestimonial,
              clientPhoto: editingTestimonial.clientPhoto || '',
              projectId: editingTestimonial.projectId || undefined,
            }} 
            onSuccess={() => setEditingTestimonial(null)} 
          />
        )}
      </ConsoleModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={!!deletingTestimonialId}
        onClose={() => setDeletingTestimonialId(null)}
        onConfirm={handleDeleteConfirm}
        itemName="testimonial"
      />
    </div>
  )
}
