import { db } from '@/db'
import { projects } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/admin/forms/project-form'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  })

  if (!project) {
    notFound()
  }

  const techRes = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/tech-stack`, { 
    headers: { Cookie: '' }
  })
  const techData = await techRes.json()
  let techStackIds: string[] = []
  
  if (techData.success) {
    const allTechs = Object.values(techData.data as Record<string, any[]>).flat()
    const projectTechRes = await fetch(`${process.env.NEXTAUTH_URL}/api/projects/${project.slug}`)
    const projectData = await projectTechRes.json()
    if (projectData.success?.data?.techStacks) {
      techStackIds = projectData.data.techStacks.map((t: { id: string }) => t.id)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl text-white font-serif mb-8">Edit Project</h1>
      <ProjectForm initialData={{ ...project, techStackIds } as any} />
    </div>
  )
}