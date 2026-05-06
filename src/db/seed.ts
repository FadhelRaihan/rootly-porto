import { db } from './index'
import { admins, techStacks, services, projects, testimonials, projectTechStacks } from './schema'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('Cleaning up existing data...')
  await db.delete(projectTechStacks)
  await db.delete(testimonials)
  await db.delete(projects)
  await db.delete(services)
  await db.delete(techStacks)
  
  console.log('Seeding database...')

  // Create admin
  const hashedPassword = await bcrypt.hash('Admin123!', 12)
  await db.insert(admins).values({
    id: 'admin01',
    email: 'admin@rootly.id',
    password: hashedPassword,
    name: 'Rootly Admin',
  }).onConflictDoNothing()
  console.log('✓ Admin created')

  // Create tech stacks
  const techStackData = [
    { id: 'ts01', name: 'Next.js', category: 'FRONTEND' as const, iconUrl: '/tech/nextjs.svg', isActive: true },
    { id: 'ts02', name: 'React', category: 'FRONTEND' as const, iconUrl: '/tech/react.svg', isActive: true },
    { id: 'ts03', name: 'TypeScript', category: 'FRONTEND' as const, iconUrl: '/tech/typescript.svg', isActive: true },
    { id: 'ts04', name: 'Node.js', category: 'BACKEND' as const, iconUrl: '/tech/nodejs.svg', isActive: true },
    { id: 'ts05', name: 'PostgreSQL', category: 'DATABASE' as const, iconUrl: '/tech/postgresql.svg', isActive: true },
    { id: 'ts06', name: 'Flutter', category: 'MOBILE' as const, iconUrl: '/tech/flutter.svg', isActive: true },
    { id: 'ts07', name: 'Figma', category: 'DESIGN' as const, iconUrl: '/tech/figma.svg', isActive: true },
    { id: 'ts08', name: 'Tailwind CSS', category: 'FRONTEND' as const, iconUrl: '/tech/tailwind.svg', isActive: true },
  ]
  await db.insert(techStacks).values(techStackData).onConflictDoNothing()
  console.log('✓ Tech stacks created')

  // Create services
  const serviceData = [
    {
      id: 'svc01',
      slug: 'web-application-development',
      title: 'Web Application Development',
      icon: 'Globe',
      summary: 'We build modern, scalable web applications that deliver exceptional user experiences.',
      description: 'Our web application development service covers the entire software development lifecycle, from discovery and design to development, testing, and deployment. We use cutting-edge technologies like Next.js, React, and TypeScript to build performant, accessible, and maintainable applications that grow with your business.',
      useCases: ['E-commerce platforms', 'SaaS products', 'Enterprise dashboards', 'Progressive web apps'],
      displayOrder: 1,
      isActive: true,
    },
    {
      id: 'svc02',
      slug: 'mobile-application-development',
      title: 'Mobile Application Development',
      icon: 'Smartphone',
      summary: 'We create native-quality mobile experiences for iOS and Android using Flutter.',
      description: 'Our mobile development team builds beautiful, fast, and reliable mobile applications using Flutter. Whether you need a consumer app, internal tool, or platform MVP, we deliver apps that work seamlessly across devices and provide native-like performance.',
      useCases: ['Consumer apps', 'Business utilities', 'E-commerce mobile', 'Internal tools'],
      displayOrder: 2,
      isActive: true,
    },
    {
      id: 'svc03',
      slug: 'internal-business-systems',
      title: 'Internal Business Systems',
      icon: 'Building2',
      summary: 'We automate workflows and build custom internal tools to boost your team\'s productivity.',
      description: 'Every business has unique processes that generic software can\'t handle. We build custom internal systems—CRMs, inventory management, employee portals, approval workflows—that fit exactly how your team works. No more workarounds or expensive license fees.',
      useCases: ['CRM systems', 'Inventory management', 'Approval workflows', 'Employee dashboards'],
      displayOrder: 3,
      isActive: true,
    },
    {
      id: 'svc04',
      slug: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: 'Palette',
      summary: 'We design intuitive, beautiful interfaces that users love and that drive business results.',
      description: 'Great design is not just about how things look—it\'s about how they work. Our design process combines user research, interaction design, and visual design to create experiences that are both beautiful and functional. We prototype, test, and iterate until we get it right.',
      useCases: ['Product design', 'Design systems', 'User research', 'Prototyping'],
      displayOrder: 4,
      isActive: true,
    },
  ]
  await db.insert(services).values(serviceData).onConflictDoNothing()
  console.log('✓ Services created')

  // Create projects
  const projectData = [
    {
      id: 'proj01',
      slug: 'tani-kita-agriculture-platform',
      title: 'TaniKita Agriculture Platform',
      category: 'WEB_APP' as const,
      client: 'PT Tani Jaya Indonesia',
      showClient: true,
      year: 2025,
      summary: 'A comprehensive agricultural marketplace connecting farmers directly with buyers, featuring real-time pricing, weather integration, and supply chain tracking.',
      challenge: 'Indonesian farmers often struggle to get fair prices for their produce due to multiple middlemen in the supply chain. They lacked access to real-time market information and faced significant post-harvest losses due to poor storage and logistics.',
      solution: 'We built a full-stack web platform with a mobile-first approach. The platform includes a marketplace with transparent pricing, weather API integration for harvest planning, warehouse location finder, and a logistics tracking system. We used Next.js for the frontend, Node.js for the API, and PostgreSQL for data management.',
      impact: 'Over 2,000 farmers registered within the first 6 months. Average price increase for farmers: 23%. Reduced post-harvest losses by 40% through better storage coordination. The platform now processes 500+ transactions monthly.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      images: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200',
      ],
      liveUrl: 'https://tanikita.id',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      id: 'proj02',
      slug: 'sehat-connect-healthcare-app',
      title: 'SehatConnect Healthcare App',
      category: 'MOBILE' as const,
      client: 'Sehat Indonesia Foundation',
      showClient: true,
      year: 2024,
      summary: 'A telemedicine and health management mobile application serving over 100,000 users in rural Indonesia.',
      challenge: 'Rural communities in Indonesia have limited access to healthcare professionals. Many health issues go undiagnosed due to the distance to the nearest clinic, and patients struggle to track their chronic conditions.',
      solution: 'We developed a comprehensive Flutter-based mobile application featuring video consultation with doctors, AI-powered symptom checker, medication reminders, health record storage, and appointment scheduling. The app works offline for basic features and syncs when connected.',
      impact: '150+ doctors onboarded in the first year. Average consultation wait time reduced from 3 days to 2 hours. Patient medication adherence improved by 65%. Featured by the Indonesian Ministry of Health as a model for rural healthcare.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
      images: [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
      ],
      liveUrl: 'https://play.google.com/store/apps/sehatconnect',
      isFeatured: true,
      displayOrder: 2,
    },
    {
      id: 'proj03',
      slug: 'logistik-id-internal-system',
      title: 'LogistikID Warehouse Management',
      category: 'INTERNAL_SYSTEM' as const,
      client: 'PT Logistik Nusantara',
      showClient: false,
      year: 2024,
      summary: 'A custom internal system for managing warehouse operations, inventory tracking, and delivery logistics across 15 locations.',
      challenge: 'The client operated 15 warehouses across Java with separate, disconnected systems. Real-time inventory visibility was impossible, leading to stock discrepancies, delayed shipments, and significant financial losses.',
      solution: 'We built a centralized warehouse management system with real-time inventory tracking, barcode scanning for receiving and dispatch, route optimization for deliveries, and comprehensive reporting dashboards. The system integrates with their existing ERP.',
      impact: 'Inventory accuracy improved from 72% to 98%. Order fulfillment time reduced by 35%. Monthly logistics costs decreased by Rp 500 million through better route planning. The client expanded to 25 warehouses using the same system.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
      images: [
        'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200',
      ],
      isFeatured: false,
      displayOrder: 3,
    },
  ]
  await db.insert(projects).values(projectData).onConflictDoNothing()
  console.log('✓ Projects created')

  // Create project-tech stack relationships
  const projectTechRelationships = [
    { projectId: 'proj01', techStackId: 'ts01' }, // Next.js
    { projectId: 'proj01', techStackId: 'ts03' }, // TypeScript
    { projectId: 'proj01', techStackId: 'ts04' }, // Node.js
    { projectId: 'proj01', techStackId: 'ts05' }, // PostgreSQL
    { projectId: 'proj01', techStackId: 'ts08' }, // Tailwind CSS
    { projectId: 'proj02', techStackId: 'ts06' }, // Flutter
    { projectId: 'proj02', techStackId: 'ts03' }, // TypeScript
    { projectId: 'proj02', techStackId: 'ts05' }, // PostgreSQL
    { projectId: 'proj03', techStackId: 'ts01' }, // Next.js
    { projectId: 'proj03', techStackId: 'ts02' }, // React
    { projectId: 'proj03', techStackId: 'ts03' }, // TypeScript
    { projectId: 'proj03', techStackId: 'ts04' }, // Node.js
    { projectId: 'proj03', techStackId: 'ts05' }, // PostgreSQL
  ]
  await db.insert(projectTechStacks).values(projectTechRelationships).onConflictDoNothing()
  console.log('✓ Project-TechStack relationships created')

  // Create testimonials
  const testimonialData = [
    {
      id: 'test01',
      clientName: 'Budi Santoso',
      clientRole: 'CEO',
      clientCompany: 'PT Tani Jaya Indonesia',
      clientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      quote: 'Rootly didn\'t just build a platform—they understood our mission to help Indonesian farmers. The result exceeded our expectations. Our farmers are earning more, and buyers are getting better quality produce.',
      rating: 5,
      projectId: 'proj01',
      isFeatured: true,
      isActive: true,
      displayOrder: 1,
    },
    {
      id: 'test02',
      clientName: 'Dr. Maya Suhartono',
      clientRole: 'Program Director',
      clientCompany: 'Sehat Indonesia Foundation',
      clientPhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200',
      quote: 'Working with Rootly was a revelation. They didn\'t just execute—they collaborated with us to understand the real needs of rural healthcare. The app has truly changed lives.',
      rating: 5,
      projectId: 'proj02',
      isFeatured: true,
      isActive: true,
      displayOrder: 2,
    },
  ]
  await db.insert(testimonials).values(testimonialData).onConflictDoNothing()
  console.log('✓ Testimonials created')

  console.log('\n✅ Seed completed successfully!')
  console.log('\nAdmin login credentials:')
  console.log('  Email: admin@rootly.id')
  console.log('  Password: Admin123!')
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })