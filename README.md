# Rootly — Software House Website

A full-stack portfolio website built with Next.js, Drizzle ORM, Supabase, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Auth**: NextAuth.js v5
- **Image Upload**: Cloudinary
- **Email**: Resend
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Database (Supabase connection string)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (from cloudinary.com → Dashboard → API Keys)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Resend (from resend.com → API Keys)
RESEND_API_KEY=""
RESEND_FROM_EMAIL="hello@rootly.id"
RESEND_TO_EMAIL="owner@rootly.id"
```

### 3. Database Setup

```bash
# Push schema to Supabase
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

**Login credentials** (after seeding):
- Email: `admin@rootly.id`
- Password: `Admin123!`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Drizzle Studio

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public website pages
│   ├── admin/             # Admin dashboard pages
│   └── api/               # API routes
├── components/
│   ├── admin/             # Admin components
│   ├── public/            # Public website components
│   └── ui/                # shadcn/ui components
├── db/                    # Database schema and config
└── lib/                   # Utilities, auth, validations
```

## Features

- Public website with Home, About, Services, Portfolio, Process, Contact pages
- Admin dashboard with full CRUD for Projects, Services, Tech Stack, Testimonials
- Image upload to Cloudinary
- Contact form with email notifications via Resend
- SEO optimized with sitemap and robots.txt
- Fully responsive design

## License

MIT