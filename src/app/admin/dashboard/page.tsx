import { db } from '@/db'
import { projects, services, techStacks, testimonials } from '@/db/schema'
import { count } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default async function DashboardPage() {
  const [projectCount, serviceCount, techCount, testimonialCount] = await Promise.all([
    db.select({ count: count() }).from(projects),
    db.select({ count: count() }).from(services),
    db.select({ count: count() }).from(techStacks),
    db.select({ count: count() }).from(testimonials),
  ])

  const recentProjects = await db
    .select()
    .from(projects)
    .orderBy(projects.createdAt)
    .limit(5)

  return (
    <div className="p-8">
      <h1 className="text-2xl text-white font-serif mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#242422] border-[#2E2E2C]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-white font-bold">{projectCount[0].count}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#242422] border-[#2E2E2C]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-white font-bold">{serviceCount[0].count}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#242422] border-[#2E2E2C]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-white font-bold">{techCount[0].count}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#242422] border-[#2E2E2C]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-white font-bold">{testimonialCount[0].count}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#242422] border-[#2E2E2C]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Projects</CardTitle>
          <Link href="/admin/projects/new">
            <Button size="sm" className="bg-[#1D9E75] hover:bg-[#1a8c66]">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between py-2 border-b border-[#2E2E2C] last:border-0">
                <div>
                  <p className="text-white font-medium">{project.title}</p>
                  <p className="text-gray-400 text-sm">{project.category}</p>
                </div>
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}