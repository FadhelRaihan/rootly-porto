'use client'

import React, { useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Unlink,
  Code, 
  Undo, 
  Redo,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content...',
  disabled = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // Disable default link extension inside StarterKit to avoid duplicate warnings
      }),
      Placeholder.configure({
        placeholder: `// ${placeholder.toUpperCase().replace(/\s+/g, '_')}...`,
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#1D9E75] underline cursor-pointer hover:text-[#1D9E75]/80',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none min-h-[150px] max-h-[300px] overflow-y-auto px-3 py-2.5 text-xs text-rootly-text font-mono leading-relaxed bg-transparent',
      },
    },
    immediatelyRender: false,
  })

  // Synchronize editor content when value changes externally (e.g. on reset or language copy)
  React.useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL Link:', previousUrl)

    // cancelled
    if (url === null) return

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="flex flex-col border border-dashed border-rootly-admin-border bg-rootly-admin-bg/40 focus-within:border-solid focus-within:border-[#1D9E75] focus-within:ring-1 focus-within:ring-[#1D9E75] rounded-md transition-all overflow-hidden">
      {/* Editor CSS styles injected to handle editor elements and placeholder */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #6B7280;
            pointer-events: none;
            height: 0;
            font-style: italic;
          }
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .ProseMirror li {
            margin-bottom: 0.25rem !important;
          }
          .ProseMirror blockquote {
            border-left: 2px solid #1D9E75 !important;
            padding-left: 0.75rem !important;
            margin-left: 0 !important;
            color: #9CA3AF !important;
            font-style: italic !important;
          }
          .ProseMirror a {
            color: #1D9E75 !important;
            text-decoration: underline !important;
          }
          .ProseMirror code {
            background-color: rgba(29, 158, 117, 0.1) !important;
            color: #1D9E75 !important;
            padding: 2px 4px !important;
            border-radius: 4px !important;
            font-family: monospace !important;
          }
        `
      }} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-[#181817] border-b border-dashed border-rootly-admin-border select-none">
        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('bold') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Bold"
        >
          <Bold size={13} />
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('italic') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Italic"
        >
          <Italic size={13} />
        </button>

        <div className="w-[1px] h-4 bg-rootly-admin-border/50 mx-1" />

        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('bulletList') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Bullet List"
        >
          <List size={13} />
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('orderedList') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Ordered List"
        >
          <ListOrdered size={13} />
        </button>

        <div className="w-[1px] h-4 bg-rootly-admin-border/50 mx-1" />

        <button
          type="button"
          disabled={disabled}
          onClick={setLink}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('link') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Add Link"
        >
          <LinkIcon size={13} />
        </button>

        {editor.isActive('link') && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 rounded cursor-pointer transition-all text-red-400 hover:bg-red-500/10"
            title="Remove Link"
          >
            <Unlink size={13} />
          </button>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:text-gray-650",
            editor.isActive('code') && "bg-rootly-primary/15 text-rootly-primary border border-[#1D9E75]/35"
          )}
          title="Code Inline"
        >
          <Code size={13} />
        </button>

        <div className="w-[1px] h-4 bg-rootly-admin-border/50 mx-1" />

        <button
          type="button"
          disabled={disabled || !editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:opacity-30 disabled:pointer-events-none"
          title="Undo"
        >
          <Undo size={13} />
        </button>

        <button
          type="button"
          disabled={disabled || !editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded cursor-pointer transition-all hover:bg-rootly-primary/10 hover:text-rootly-primary text-gray-200 disabled:opacity-30 disabled:pointer-events-none"
          title="Redo"
        >
          <Redo size={13} />
        </button>

        <div className="ml-auto pr-1 flex items-center gap-1.5 text-[9px] text-[#1D9E75] font-mono select-none">
          <Sparkles size={10} className="animate-pulse" />
          <span>TIPTAP_EDITOR</span>
        </div>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  )
}
