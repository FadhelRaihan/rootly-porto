import {
  pgTable,
  pgEnum,
  text,
  boolean,
  integer,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

export const projectCategoryEnum = pgEnum('project_category', [
  'WEB_APP',
  'MOBILE',
  'INTERNAL_SYSTEM',
  'DESIGN',
])

export const techCategoryEnum = pgEnum('tech_category', [
  'FRONTEND',
  'BACKEND',
  'MOBILE',
  'DATABASE',
  'DEVOPS',
  'DESIGN',
])

export const projects = pgTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: projectCategoryEnum('category').notNull(),
  client: text('client'),
  showClient: boolean('show_client').notNull().default(false),
  year: integer('year').notNull(),
  summary: text('summary').notNull(),
  challenge: text('challenge').notNull(),
  solution: text('solution').notNull(),
  impact: text('impact').notNull(),
  thumbnailUrl: text('thumbnail_url').notNull(),
  images: text('images').array().notNull().default([]),
  liveUrl: text('live_url'),
  isFeatured: boolean('is_featured').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const services = pgTable('services', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  icon: text('icon').notNull(),
  summary: text('summary').notNull(),
  description: text('description').notNull(),
  useCases: text('use_cases').array().notNull().default([]),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const techStacks = pgTable('tech_stacks', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  category: techCategoryEnum('category').notNull(),
  iconUrl: text('icon_url').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const projectTechStacks = pgTable('project_tech_stacks', {
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  techStackId: text('tech_stack_id')
    .notNull()
    .references(() => techStacks.id, { onDelete: 'restrict' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.techStackId] }),
}))

export const serviceTechStacks = pgTable('service_tech_stacks', {
  serviceId: text('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  techStackId: text('tech_stack_id')
    .notNull()
    .references(() => techStacks.id, { onDelete: 'restrict' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.serviceId, table.techStackId] }),
}))

export const testimonials = pgTable('testimonials', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clientName: text('client_name').notNull(),
  clientRole: text('client_role').notNull(),
  clientCompany: text('client_company').notNull(),
  clientPhoto: text('client_photo'),
  quote: text('quote').notNull(),
  rating: integer('rating'),
  projectId: text('project_id')
    .unique()
    .references(() => projects.id, { onDelete: 'set null' }),
  isFeatured: boolean('is_featured').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const admins = pgTable('admins', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const projectsRelations = relations(projects, ({ many, one }) => ({
  techStacks: many(projectTechStacks),
  testimonial: one(testimonials, {
    fields: [projects.id],
    references: [testimonials.projectId],
  }),
}))

export const servicesRelations = relations(services, ({ many }) => ({
  techStacks: many(serviceTechStacks),
}))

export const techStacksRelations = relations(techStacks, ({ many }) => ({
  projects: many(projectTechStacks),
  services: many(serviceTechStacks),
}))

export const projectTechStacksRelations = relations(projectTechStacks, ({ one }) => ({
  project: one(projects, { fields: [projectTechStacks.projectId], references: [projects.id] }),
  techStack: one(techStacks, { fields: [projectTechStacks.techStackId], references: [techStacks.id] }),
}))

export const serviceTechStacksRelations = relations(serviceTechStacks, ({ one }) => ({
  service: one(services, { fields: [serviceTechStacks.serviceId], references: [services.id] }),
  techStack: one(techStacks, { fields: [serviceTechStacks.techStackId], references: [techStacks.id] }),
}))

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  project: one(projects, {
    fields: [testimonials.projectId],
    references: [projects.id],
  }),
}))

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert
export type TechStack = typeof techStacks.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
export type Admin = typeof admins.$inferSelect