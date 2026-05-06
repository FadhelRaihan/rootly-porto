import { ProjectForm } from '@/components/admin/forms/project-form'

export default function NewProjectPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-white font-serif mb-8">New Project</h1>
      <ProjectForm />
    </div>
  )
}