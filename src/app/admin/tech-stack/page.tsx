import { db } from '@/db'
import { techStacks } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit } from 'lucide-react'

const categoryLabels: Record<string, string> = { FRONTEND: 'Frontend', BACKEND: 'Backend', MOBILE: 'Mobile', DATABASE: 'Database', DEVOPS: 'DevOps', DESIGN: 'Design' }

export default async function TechStackPage() {
  const list = await db.select().from(techStacks).orderBy(desc(techStacks.createdAt))
  return (
    <div className="p-8">
      <div className="flex justify-between mb-8"><h1 className="text-2xl text-white font-serif">Tech Stack</h1><Link href="/admin/tech-stack/new"><Button className="bg-[#1D9E75]"><Plus className="mr-2 h-4 w-4" />Add</Button></Link></div>
      <div className="grid grid-cols-4 gap-4">
        {list.map((item) => (
          <Card key={item.id} className="bg-[#242422] border-[#2E2E2C]">
            <CardContent className="flex items-center justify-between p-4">
              <div><p className="text-white font-medium">{item.name}</p><Badge variant="outline" className="border-[#2E2E2C] text-gray-400 mt-1">{categoryLabels[item.category]}</Badge></div>
              <Link href={`/admin/tech-stack/${item.id}`}><Button variant="ghost" size="icon" className="text-gray-400"><Edit size={18}/></Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}