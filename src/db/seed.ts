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
      titleId: 'Pengembangan Aplikasi Web',
      icon: 'Globe',
      summary: 'We build modern, scalable web applications that deliver exceptional user experiences.',
      summaryId: 'Kami membangun aplikasi web modern dan skalabel yang memberikan pengalaman pengguna luar biasa.',
      description: 'Our web application development service covers the entire software development lifecycle, from discovery and design to development, testing, and deployment. We use cutting-edge technologies like Next.js, React, and TypeScript to build performant, accessible, and maintainable applications that grow with your business.',
      descriptionId: 'Layanan pengembangan aplikasi web kami mencakup seluruh siklus pengembangan perangkat lunak, dari penemuan dan desain hingga pengembangan, pengujian, dan penerapan. Kami menggunakan teknologi terkini seperti Next.js, React, dan TypeScript untuk membangun aplikasi yang berkinerja tinggi, mudah diakses, dan mudah dirawat yang tumbuh bersama bisnis Anda.',
      useCases: ['E-commerce platforms', 'SaaS products', 'Enterprise dashboards', 'Progressive web apps'],
      displayOrder: 1,
      isActive: true,
    },
    {
      id: 'svc02',
      slug: 'mobile-application-development',
      title: 'Mobile Application Development',
      titleId: 'Pengembangan Aplikasi Mobile',
      icon: 'Smartphone',
      summary: 'We create native-quality mobile experiences for iOS and Android using Flutter.',
      summaryId: 'Kami menciptakan pengalaman mobile berkualitas native untuk iOS dan Android menggunakan Flutter.',
      description: 'Our mobile development team builds beautiful, fast, and reliable mobile applications using Flutter. Whether you need a consumer app, internal tool, or platform MVP, we deliver apps that work seamlessly across devices and provide native-like performance.',
      descriptionId: 'Tim pengembangan mobile kami membangun aplikasi yang indah, cepat, dan andal menggunakan Flutter. Baik Anda membutuhkan aplikasi konsumen, alat internal, atau MVP platform, kami memberikan aplikasi yang bekerja mulus di berbagai perangkat dengan performa seperti native.',
      useCases: ['Consumer apps', 'Business utilities', 'E-commerce mobile', 'Internal tools'],
      useCasesId: ['Aplikasi konsumen', 'Utilitas bisnis', 'Mobile e-commerce', 'Alat internal'],
      displayOrder: 2,
      isActive: true,
    },
    {
      id: 'svc03',
      slug: 'internal-business-systems',
      title: 'Internal Business Systems',
      titleId: 'Sistem Bisnis Internal',
      icon: 'Building2',
      summary: 'We automate workflows and build custom internal tools to boost your team\'s productivity.',
      summaryId: 'Kami mengotomatiskan alur kerja dan membangun alat internal kustom untuk meningkatkan produktivitas tim Anda.',
      description: 'Every business has unique processes that generic software can\'t handle. We build custom internal systems—CRMs, inventory management, employee portals, approval workflows—that fit exactly how your team works. No more workarounds or expensive license fees.',
      descriptionId: 'Setiap bisnis memiliki proses unik yang tidak dapat ditangani oleh perangkat lunak generik. Kami membangun sistem internal kustom—CRM, manajemen inventaris, portal karyawan, alur kerja persetujuan—yang sesuai dengan cara kerja tim Anda. Tidak ada lagi solusi sementara atau biaya lisensi mahal.',
      useCases: ['CRM systems', 'Inventory management', 'Approval workflows', 'Employee dashboards'],
      useCasesId: ['Sistem CRM', 'Manajemen inventaris', 'Alur kerja persetujuan', 'Dashboard karyawan'],
      displayOrder: 3,
      isActive: true,
    },
    {
      id: 'svc04',
      slug: 'ui-ux-design',
      title: 'UI/UX Design',
      titleId: 'Desain UI/UX',
      icon: 'Palette',
      summary: 'We design intuitive, beautiful interfaces that users love and that drive business results.',
      summaryId: 'Kami mendesain antarmuka yang intuitif dan indah yang disukai pengguna dan mendorong hasil bisnis.',
      description: 'Great design is not just about how things look—it\'s about how they work. Our design process combines user research, interaction design, and visual design to create experiences that are both beautiful and functional. We prototype, test, and iterate until we get it right.',
      descriptionId: 'Desain yang hebat bukan hanya tentang bagaimana tampilannya—tetapi tentang bagaimana ia bekerja. Proses desain kami menggabungkan riset pengguna, desain interaksi, dan desain visual untuk menciptakan pengalaman yang indah sekaligus fungsional. Kami membuat prototipe, menguji, dan melakukan iterasi hingga semuanya tepat.',
      useCases: ['Product design', 'Design systems', 'User research', 'Prototyping'],
      useCasesId: ['Desain produk', 'Sistem desain', 'Riset pengguna', 'Prototyping'],
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
      titleId: 'Platform Pertanian TaniKita',
      category: 'WEB_APP' as const,
      serviceId: 'svc01',
      client: 'PT Tani Jaya Indonesia',
      clientId: 'PT Tani Jaya Indonesia',
      showClient: true,
      year: 2025,
      summary: 'A comprehensive agricultural marketplace connecting farmers directly with buyers, featuring real-time pricing, weather integration, and supply chain tracking.',
      summaryId: 'Pasar pertanian komprehensif yang menghubungkan petani langsung dengan pembeli, dilengkapi harga real-time, integrasi cuaca, dan pelacakan rantai pasok.',
      challenge: 'Indonesian farmers often struggle to get fair prices for their produce due to multiple middlemen in the supply chain. They lacked access to real-time market information and faced significant post-harvest losses due to poor storage and logistics.',
      challengeId: 'Petani Indonesia sering kesulitan mendapatkan harga yang adil untuk hasil panen mereka karena banyaknya perantara dalam rantai pasok. Mereka tidak memiliki akses ke informasi pasar real-time dan menghadapi kerugian pasca-panen yang signifikan karena penyimpanan dan logistik yang buruk.',
      solution: 'We built a full-stack web platform with a mobile-first approach. The platform includes a marketplace with transparent pricing, weather API integration for harvest planning, warehouse location finder, and a logistics tracking system. We used Next.js for the frontend, Node.js for the API, and PostgreSQL for data management.',
      solutionId: 'Kami membangun platform web full-stack dengan pendekatan mobile-first. Platform ini mencakup marketplace dengan harga transparan, integrasi API cuaca untuk perencanaan panen, pencari lokasi gudang, dan sistem pelacakan logistik. Kami menggunakan Next.js untuk frontend, Node.js untuk API, dan PostgreSQL untuk manajemen data.',
      impact: 'Over 2,000 farmers registered within the first 6 months. Average price increase for farmers: 23%. Reduced post-harvest losses by 40% through better storage coordination. The platform now processes 500+ transactions monthly.',
      impactId: 'Lebih dari 2.000 petani terdaftar dalam 6 bulan pertama. Kenaikan harga rata-rata untuk petani: 23%. Mengurangi kerugian pasca-panen sebesar 40% melalui koordinasi penyimpanan yang lebih baik. Platform kini memproses 500+ transaksi setiap bulan.',
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
      titleId: 'Aplikasi Kesehatan SehatConnect',
      category: 'MOBILE' as const,
      serviceId: 'svc02',
      client: 'Sehat Indonesia Foundation',
      clientId: 'Sehat Indonesia Foundation',
      showClient: true,
      year: 2024,
      summary: 'A telemedicine and health management mobile application serving over 100,000 users in rural Indonesia.',
      summaryId: 'Aplikasi mobile telemedisin dan manajemen kesehatan yang melayani lebih dari 100.000 pengguna di pedesaan Indonesia.',
      challenge: 'Rural communities in Indonesia have limited access to healthcare professionals. Many health issues go undiagnosed due to the distance to the nearest clinic, and patients struggle to track their chronic conditions.',
      challengeId: 'Masyarakat pedesaan di Indonesia memiliki akses terbatas ke tenaga kesehatan profesional. Banyak masalah kesehatan tidak terdiagnosis karena jarak ke klinik terdekat, dan pasien kesulitan melacak kondisi kronis mereka.',
      solution: 'We developed a comprehensive Flutter-based mobile application featuring video consultation with doctors, AI-powered symptom checker, medication reminders, health record storage, and appointment scheduling. The app works offline for basic features and syncs when connected.',
      solutionId: 'Kami mengembangkan aplikasi mobile berbasis Flutter yang komprehensif dengan fitur konsultasi video dengan dokter, pemeriksa gejala bertenaga AI, pengingat obat, penyimpanan rekam medis, dan penjadwalan janji temu. Aplikasi ini berfungsi offline untuk fitur dasar dan sinkron saat terhubung.',
      impact: '150+ doctors onboarded in the first year. Average consultation wait time reduced from 3 days to 2 hours. Patient medication adherence improved by 65%. Featured by the Indonesian Ministry of Health as a model for rural healthcare.',
      impactId: '150+ dokter bergabung di tahun pertama. Waktu tunggu konsultasi rata-rata berkurang dari 3 hari menjadi 2 jam. Kepatuhan minum obat pasien meningkat 65%. Ditampilkan oleh Kementerian Kesehatan Indonesia sebagai model untuk layanan kesehatan pedesaan.',
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
      titleId: 'Manajemen Gudang LogistikID',
      category: 'INTERNAL_SYSTEM' as const,
      serviceId: 'svc03',
      client: 'PT Logistik Nusantara',
      clientId: 'PT Logistik Nusantara',
      showClient: false,
      year: 2024,
      summary: 'A custom internal system for managing warehouse operations, inventory tracking, and delivery logistics across 15 locations.',
      summaryId: 'Sistem internal kustom untuk mengelola operasi gudang, pelacakan inventaris, dan logistik pengiriman di 15 lokasi.',
      challenge: 'The client operated 15 warehouses across Java with separate, disconnected systems. Real-time inventory visibility was impossible, leading to stock discrepancies, delayed shipments, and significant financial losses.',
      challengeId: 'Klien mengoperasikan 15 gudang di seluruh Jawa dengan sistem yang terpisah dan tidak terhubung. Visibilitas inventaris real-time tidak mungkin dilakukan, menyebabkan perbedaan stok, pengiriman tertunda, dan kerugian finansial yang signifikan.',
      solution: 'We built a centralized warehouse management system with real-time inventory tracking, barcode scanning for receiving and dispatch, route optimization for deliveries, and comprehensive reporting dashboards. The system integrates with their existing ERP.',
      solutionId: 'Kami membangun sistem manajemen gudang terpusat dengan pelacakan inventaris real-time, pemindaian barcode untuk penerimaan dan pengiriman, optimasi rute pengiriman, dan dashboard pelaporan komprehensif. Sistem ini terintegrasi dengan ERP mereka yang sudah ada.',
      impact: 'Inventory accuracy improved from 72% to 98%. Order fulfillment time reduced by 35%. Monthly logistics costs decreased by Rp 500 million through better route planning. The client expanded to 25 warehouses using the same system.',
      impactId: 'Akurasi inventaris meningkat dari 72% menjadi 98%. Waktu pemenuhan pesanan berkurang 35%. Biaya logistik bulanan berkurang Rp 500 juta melalui perencanaan rute yang lebih baik. Klien memperluas hingga 25 gudang menggunakan sistem yang sama.',
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
      clientNameId: 'Budi Santoso',
      clientRole: 'CEO',
      clientRoleId: 'CEO',
      clientCompany: 'PT Tani Jaya Indonesia',
      clientCompanyId: 'PT Tani Jaya Indonesia',
      clientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      quote: 'Rootly didn\'t just build a platform—they understood our mission to help Indonesian farmers. The result exceeded our expectations. Our farmers are earning more, and buyers are getting better quality produce.',
      quoteId: 'Rootly tidak hanya membangun platform—mereka memahami misi kami untuk membantu petani Indonesia. Hasilnya melampaui ekspektasi kami. Petani kami mendapatkan penghasilan lebih, dan pembeli mendapatkan produk berkualitas lebih baik.',
      rating: 5,
      projectId: 'proj01',
      isFeatured: true,
      isActive: true,
      displayOrder: 1,
    },
    {
      id: 'test02',
      clientName: 'Dr. Maya Suhartono',
      clientNameId: 'Dr. Maya Suhartono',
      clientRole: 'Program Director',
      clientRoleId: 'Direktur Program',
      clientCompany: 'Sehat Indonesia Foundation',
      clientCompanyId: 'Sehat Indonesia Foundation',
      clientPhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200',
      quote: 'Working with Rootly was a revelation. They didn\'t just execute—they collaborated with us to understand the real needs of rural healthcare. The app has truly changed lives.',
      quoteId: 'Bekerja dengan Rootly sungguh luar biasa. Mereka tidak hanya mengeksekusi—mereka berkolaborasi dengan kami untuk memahami kebutuhan nyata layanan kesehatan pedesaan. Aplikasi ini benar-benar telah mengubah kehidupan.',
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