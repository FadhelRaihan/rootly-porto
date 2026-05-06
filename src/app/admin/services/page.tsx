import { db } from '@/db'
import { services } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit } from 'lucide-react'

export default async function ServicesPage() {
  const serviceList = await db.select().from(services).orderBy(desc(services.createdAt))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-white font-serif">Services</h1>
        <Link href="/admin/services/new">
          <Button className="bg-[#1D9E75] hover:bg-[#1a8c66]">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {serviceList.map((service) => (
          <Card key={service.id} className="bg-[#242422] border-[#2E2E2C]">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-white font-medium">{service.title}</p>
                <p className="text-gray-400 text-sm">{service.summary}</p>
              </div>
              <div className="flex items-center gap-3">
                {service.isActive ? (
                  <Badge className="bg-[#1D9E75] text-white">Active</Badge>
                ) : (
                  <Badge variant="outline" className="border-[#2E2E2C] text-gray-400">Inactive</Badge>
                )}
                <Link href={`/admin/services/${service.id}`}>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Edit size={18} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}