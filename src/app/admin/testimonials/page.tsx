import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit } from 'lucide-react'

export default async function TestimonialsPage() {
  const list = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
  return (
    <div className="p-8">
      <div className="flex justify-between mb-8"><h1 className="text-2xl text-white font-serif">Testimonials</h1><Link href="/admin/testimonials/new"><Button className="bg-[#1D9E75]"><Plus className="mr-2 h-4 w-4" />Add</Button></Link></div>
      <div className="space-y-4">
        {list.map((item) => (
          <Card key={item.id} className="bg-[#242422] border-[#2E2E2C]">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1"><p className="text-white font-medium">{item.clientName}</p><p className="text-gray-400 text-sm">{item.clientRole} at {item.clientCompany}</p><p className="text-gray-500 text-sm mt-2 line-clamp-2">"{item.quote}"</p></div>
              <div className="flex items-center gap-3">
                {item.isFeatured && <Badge className="bg-[#1D9E75]">Featured</Badge>}
                {item.isActive ? <Badge className="bg-green-600">Active</Badge> : <Badge variant="outline" className="border-[#2E2E2C]">Inactive</Badge>}
                <Link href={`/admin/testimonials/${item.id}`}><Button variant="ghost" size="icon" className="text-gray-400"><Edit size={18}/></Button></Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}