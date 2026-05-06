import { db } from '@/db'
import { projects } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function ProjectsPage() {
  const projectList = await db.select().from(projects).orderBy(desc(projects.createdAt))

  const categoryLabels: Record<string, string> = {
    WEB_APP: 'Web App',
    MOBILE: 'Mobile',
    INTERNAL_SYSTEM: 'Internal System',
    DESIGN: 'Design',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-white font-serif">Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-[#1D9E75] hover:bg-[#1a8c66]">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2E2E2C]">
                <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                <th className="text-left p-4 text-gray-400 font-medium">Year</th>
                <th className="text-left p-4 text-gray-400 font-medium">Featured</th>
                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectList.map((project) => (
                <tr key={project.id} className="border-b border-[#2E2E2C] last:border-0">
                  <td className="p-4">
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-gray-500 text-sm">{project.client}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="border-[#2E2E2C] text-gray-300">
                      {categoryLabels[project.category]}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-300">{project.year}</td>
                  <td className="p-4">
                    {project.isFeatured ? (
                      <Badge className="bg-[#1D9E75] text-white">Yes</Badge>
                    ) : (
                      <Badge variant="outline" className="border-[#2E2E2C] text-gray-400">No</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`}>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <Edit size={18} />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}