'use client'

import { useState } from 'react'
import { ConsoleModal } from '@/components/admin/console-modal'
import { Button } from '@/components/ui/button'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  itemName?: string
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'item',
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const upperItem = itemName.toUpperCase().replace(/\s+/g, '_')

  return (
    <ConsoleModal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="[ CRITICAL_DESTRUCTION_ALERT ]"
      subtitle="// WARNING: SYSTEM TERMINATION SEQUENCE INITIATED"
      maxWidth="sm:max-w-md"
    >
      <div className="font-mono text-xs text-black space-y-4 py-3">
        <div className="p-3 border border-dashed border-red-200 bg-red-50/30 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500 font-bold uppercase">TARGET_NODE</span>
            <span className="text-red-600 font-bold">{`[ ${upperItem} ]`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-bold uppercase">PROTOCOL</span>
            <span className="text-gray-700">NODE_REGISTRY_PURGE</span>
          </div>
          <div className="border-t border-dashed border-red-200/50 my-2 pt-2">
            <p className="text-[10px] text-red-600 font-semibold leading-relaxed">
              {"// WARNING: Performing this operation will purge the selected node registry from the database. This command is irreversible."}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3 border-t border-dashed border-[#E2E2DF]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-[#E2E2DF] border-dashed text-gray-700 font-mono text-xs uppercase tracking-wider h-9 px-4 cursor-pointer hover:bg-gray-50"
          >
            {"[ ABORT_SEQUENCE ]"}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider border border-red-600 rounded-md h-9 px-4 cursor-pointer shadow-xs transition-all duration-200"
          >
            {isDeleting ? 'EXECUTING_PURGE...' : '[ CONFIRM_DESTRUCTION ]'}
          </Button>
        </div>
      </div>
    </ConsoleModal>
  )
}
