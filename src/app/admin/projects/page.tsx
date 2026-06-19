import { db } from '@/db'
import { projects } from '@/db/schema'
import { desc, asc } from 'drizzle-orm'
import { ProjectsClient } from '@/components/admin/projects-client'

export default async function ProjectsPage() {
  const projectList = await db.select().from(projects).orderBy(asc(projects.displayOrder), desc(projects.createdAt))

  return <ProjectsClient projectList={projectList as any} />
}