import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const globalForDb = globalThis as unknown as { conn: postgres.Sql }

const getConnection = () => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('[project-ref]')) {
    return postgres('postgresql://dummy:dummy@localhost:5432/dummy')
  }
  return postgres(process.env.DATABASE_URL, { max: 1 })
}

const conn = globalForDb.conn ?? getConnection()
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema })