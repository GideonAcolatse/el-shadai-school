import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = {
  id: "default",
  schoolName: "El-Shadai School",
  motto: "Let Your Light Shine",
  heroBadge: "Tema Newtown Manhean • Preschool, Primary & JHS",
  heroTitle: "El-Shadai School: Let Your Light Shine",
  heroSubtitle:
    "Providing quality private education in Tema, Ghana, to nurture future leaders with academic excellence, discipline, and moral integrity.",
  heroImage: "/images/school/DSC_0064.jpg",
  aboutSummary:
    "At El-Shadai School in Tema, Ghana, we are dedicated to nurturing young minds through academic excellence, discipline, and strong moral values. Since our founding, the school has remained committed to equipping children with the knowledge, skills, and character they need to succeed in today's world.\n\nOur holistic approach to education combines quality teaching, co-curricular activities, and personal development, ensuring every child discovers their potential and shines brightly in life and society. With a caring environment and passionate teachers, we prepare students not just for exams, but for leadership and lifelong success.",
  mission:
    "To nurture and educate children by providing a holistic learning experience that blends academic excellence with moral and social responsibility.",
  vision:
    "To be one of Ghana's leading private schools, recognized for shaping future leaders who excel both in knowledge and character.",
  coreValues: "Excellence, Discipline, Integrity, Respect, and Leadership",
  headteacherName: "Mrs. Elisabeth Afua Quarshie Ackwornu",
  headteacherRole: "Headteacher",
  headteacherMessage:
    "At El-Shadai School, we do more than teach subjects; we shape futures. We believe that with the right guidance, discipline, and inspiration, every child has the potential to shine brightly. We warmly welcome parents and guardians to join us in this journey of raising tomorrow's leaders.",
  headteacherImage: "/images/school/leader-headteacher.jpg",
  address: "Tema Newtown Manhean, Greater Accra Region, Ghana",
  phonePrimary: "+233 (0) 244 72 1828",
  phoneSecondary: "+233 (0) 244 13 4854",
  emailInfo: "info@elshadaischool.com",
  emailAdmissions: "admissions@elshadaischool.com",
  admissionFeeTitle: "One-Time Admission",
  admissionFeeText: "Free Admission: Welcoming new families with transparent, zero-fee admission registration.",
  primaryTuitionText: "Affordable and tailored termly payment plans designed to support families across Preschool and Primary.",
  jhsTuitionText: "Competitive fees with intensive BECE preparation, computing, and practical STEM skills development.",
  facebookUrl: "https://web.facebook.com/patience.ankamahaddo.1",
  instagramUrl: "#",
  tiktokUrl: "#",
  youtubeUrl: "#",
  urgentBannerActive: true,
  urgentBannerText:
    "Admissions Open for the 2026/2027 Academic Year (Preschool, Primary & JHS). Free Admission Available!",
  urgentBannerLink: "/admission",
};

const LEADERS = [
  {
    name: "Mrs. Elisabeth Afua Quarshie Ackwornu",
    role: "Headteacher",
    bio: "Dedicated educator guiding academic standards, student mentorship, and holistic character formation across all departments.",
    imageUrl: "/images/school/leader-headteacher.jpg",
    facebookUrl: "#",
    twitterUrl: "#",
    linkedinUrl: "#",
    sortOrder: 1,
  },
  {
    name: "Mrs. Patience Ankamah Addo",
    role: "Director",
    bio: "Visionary school leader committed to excellence in private education and community upliftment in Tema Newtown Manhean.",
    imageUrl: "/images/school/leader-director.jpg",
    facebookUrl: "https://web.facebook.com/patience.ankamahaddo.1",
    twitterUrl: "#",
    linkedinUrl: "#",
    sortOrder: 2,
  },
  {
    name: "Mr. Nii Fosu Baddoo",
    role: "Administrator",
    bio: "Oversees school operations, parent relations, admissions coordination, and campus welfare.",
    imageUrl: "/images/school/leader-administrator.jpg",
    facebookUrl: "#",
    twitterUrl: "#",
    linkedinUrl: "#",
    sortOrder: 3,
  },
  {
    name: "Mrs. Sylvia Sackey",
    role: "Bursar",
    bio: "Manages school finance, flexible tuition payment plans, and student bursary support with transparency and care.",
    imageUrl: "/images/school/leader-bursar.jpg",
    facebookUrl: "#",
    twitterUrl: "#",
    linkedinUrl: "#",
    sortOrder: 4,
  },
];

const NOTICES = [
  {
    title: "2026/2027 Academic Year Admissions Now Open (Preschool, Primary & JHS)",
    slug: "2026-2027-academic-year-admissions-open",
    category: "Admissions",
    excerpt:
      "El-Shadai School warmly welcomes applications for Preschool (Creche, Nursery, KG), Primary (Basic 1 to 6), and Junior High School (JHS 1 to 3) with Free One-Time Admission.",
    content:
      "We are delighted to announce that admissions for the upcoming academic year are officially open at El-Shadai School, Tema Newtown Manhean.\n\nOur admissions process is simple, transparent, and supportive:\n1. Complete the online application form on our website or pick up a form at the school administration office.\n2. Provide two recent passport-sized photographs, a copy of the child's birth certificate, and the most recent terminal report card (for transfer pupils).\n3. Schedule a placement assessment and brief family interview.\n\nEnjoy Free One-Time Admission and flexible termly tuition payment plans. Call +233 (0) 244 72 1828 or +233 (0) 244 13 4854 for inquiries.",
    coverImage: "/images/school/DSC_0064.jpg",
    isPinned: true,
    published: true,
    publishedAt: new Date("2026-09-01T08:00:00Z"),
  },
  {
    title: "First Term Resumption & Orientation Schedule for All Pupils",
    slug: "first-term-resumption-and-orientation-schedule",
    category: "Academic",
    excerpt:
      "Important resumption guidelines, reporting times, uniform inspection, and orientation details for new and returning students.",
    content:
      "Welcome back to another bright term at El-Shadai School! All returning and newly admitted students are expected to report to campus by 7:30 AM for morning assembly and classroom placement.\n\n• New Students & Parents Orientation: 8:30 AM at the Main School Forecourt.\n• Distribution of Termly Booklists & Timetables: Coordinated by class teachers.\n• Afternoon Dismissal: 2:30 PM for Preschool and 3:30 PM for Primary & JHS.\n\nParents are kindly reminded to ensure all textbooks and exercise books are clearly labeled with the student's full name and class.",
    coverImage: "/images/school/DSC_0311.jpg",
    isPinned: true,
    published: true,
    publishedAt: new Date("2026-09-10T09:00:00Z"),
  },
  {
    title: "Practical STEM & Computing Lab Sessions Expanded for Primary & JHS",
    slug: "practical-stem-and-computing-lab-sessions-expanded",
    category: "Academic",
    excerpt:
      "Hands-on science experiments, digital literacy, and computing workshops introduced to equip pupils with 21st-century problem-solving skills.",
    content:
      "As part of our commitment to holistic, future-ready education, El-Shadai School has expanded practical STEM (Science, Technology, Engineering, and Mathematics) and Computing sessions across Upper Primary and Junior High School.\n\nStudents engage in weekly laboratory practicals, basic coding and digital productivity training, and team science projects under the guidance of our dedicated STEM instructors.",
    coverImage: "/images/school/jhs-stem.jpeg",
    isPinned: false,
    published: true,
    publishedAt: new Date("2026-09-18T10:30:00Z"),
  },
  {
    title: "Termly Parent-Teacher Association (PTA) General Meeting Notice",
    slug: "termly-pta-general-meeting-notice",
    category: "PTA",
    excerpt:
      "All parents and guardians are cordially invited to our upcoming PTA General Meeting to discuss student academic progress and campus welfare.",
    content:
      "The Management and PTA Executive Committee of El-Shadai School cordially invite all parents and guardians to our Termly PTA General Meeting at the Tema Newtown Manhean campus.\n\nAgenda Highlights:\n• Headteacher's Academic & Discipline Report\n• BECE Preparation & Extra Classes for JHS Candidates\n• Campus Facility Updates & Student Welfare\n• Open Forum for Parent Feedback\n\nYour punctual attendance and active participation help us build a stronger learning community for every child.",
    coverImage: "/images/school/DSC_0738.jpg",
    isPinned: false,
    published: true,
    publishedAt: new Date("2026-09-25T12:00:00Z"),
  },
  {
    title: "Annual Cultural Day, Debate & Creative Arts Showcase",
    slug: "annual-cultural-day-and-creative-arts-showcase",
    category: "Events",
    excerpt:
      "Celebrating Ghanaian heritage, traditional music, drama, and inter-class debates across Preschool, Primary, and Junior High School.",
    content:
      "At El-Shadai School, we believe education thrives when academic rigor meets cultural pride and creative expression. Our Cultural & Creative Arts Day brings together students from every class to showcase traditional Ghanaian dances, poetry recitals, choral music, and inter-house debates.\n\nParents and community guests are welcome to cheer our young performers and view student art exhibitions.",
    coverImage: "/images/school/culture.jpeg",
    isPinned: false,
    published: true,
    publishedAt: new Date("2026-10-02T14:00:00Z"),
  },
  {
    title: "Inter-House Sports & Physical Education Festival",
    slug: "inter-house-sports-and-physical-education-festival",
    category: "Events",
    excerpt:
      "Building teamwork, endurance, discipline, and healthy sportsmanship through track events, football, and team relays.",
    content:
      "Physical fitness and teamwork are central to student life at El-Shadai School. Our Inter-House Sports Festival features track and field relays, football matches, lime-and-spoon races for Preschoolers, and house trophy presentations.\n\nStudents should wear their designated house jerseys and bring adequate drinking water.",
    coverImage: "/images/school/sports.jpeg",
    isPinned: false,
    published: true,
    publishedAt: new Date("2026-10-08T15:00:00Z"),
  },
];

const EVENTS = [
  {
    title: "Term Resumption & New Student Orientation",
    description: "Campus opens for all Preschool, Primary, and JHS students with morning assembly and new family orientation.",
    eventDate: new Date("2026-10-19T07:30:00Z"),
    timeString: "7:30 AM - 2:30 PM",
    location: "El-Shadai Campus, Tema Newtown Manhean",
    category: "Term Date",
    isFeatured: true,
  },
  {
    title: "PTA General Meeting & Open Day",
    description: "Interactive session between parents, teachers, and school leadership to review student progress.",
    eventDate: new Date("2026-10-30T09:00:00Z"),
    timeString: "9:00 AM - 12:00 PM",
    location: "Main Assembly Hall, Tema Newtown Manhean",
    category: "PTA",
    isFeatured: true,
  },
  {
    title: "Mid-Term Continuous Assessment Week",
    description: "Mid-term class assessments and practical computing/science evaluations across Primary and JHS.",
    eventDate: new Date("2026-11-09T08:00:00Z"),
    timeString: "8:00 AM - 3:00 PM",
    location: "All Classrooms & STEM Lab",
    category: "Exam",
    isFeatured: true,
  },
  {
    title: "Annual Cultural & Creative Arts Day",
    description: "Traditional dress, cultural drumming & dance, debate competition, and creative projects exhibition.",
    eventDate: new Date("2026-11-20T09:00:00Z"),
    timeString: "9:00 AM - 2:30 PM",
    location: "School Forecourt, Tema Newtown Manhean",
    category: "Sports & Culture",
    isFeatured: true,
  },
  {
    title: "JHS 3 Mock Examinations (BECE Prep)",
    description: "Comprehensive mock examinations for Junior High School candidates with personalized teacher feedback.",
    eventDate: new Date("2026-12-01T08:00:00Z"),
    timeString: "8:00 AM - 3:30 PM",
    location: "JHS Examination Block",
    category: "Exam",
    isFeatured: true,
  },
  {
    title: "End-of-Term Examinations & Speech Day",
    description: "Final term assessments followed by our end-of-term awards, report card collection, and vacation.",
    eventDate: new Date("2026-12-14T08:00:00Z"),
    timeString: "8:00 AM - 1:00 PM",
    location: "El-Shadai School Campus",
    category: "Term Date",
    isFeatured: true,
  },
];

const GALLERY_ITEMS = [
  // Featured Core Items
  { title: "Joyful Classroom Learning", caption: "Students actively participating in classroom lessons at El-Shadai School.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0064.jpg", featured: true, sortOrder: 1 },
  { title: "Preschool Foundation & Play", caption: "Laying the foundation for learning with creativity, play, and structured guidance.", category: "Classroom Learning", imageUrl: "/images/school/preschool.jpeg", featured: true, sortOrder: 2 },
  { title: "Primary School Excellence", caption: "Fostering academic excellence with a focus on reading, math, science, and social studies.", category: "Classroom Learning", imageUrl: "/images/school/primary.jpeg", featured: true, sortOrder: 3 },
  { title: "Hands-On STEM & Science Lab", caption: "Junior High and Primary pupils conducting practical science experiments.", category: "STEM & Projects", imageUrl: "/images/school/jhs-stem.jpeg", featured: true, sortOrder: 4 },
  { title: "Practical Science Discovery", caption: "Guided laboratory exploration inspiring curiosity and critical thinking.", category: "STEM & Projects", imageUrl: "/images/school/science.jpeg", featured: true, sortOrder: 5 },
  { title: "Sports & Physical Education", caption: "Building teamwork, discipline, and physical fitness on the field.", category: "Sports & Physical Education", imageUrl: "/images/school/sports.jpeg", featured: true, sortOrder: 6 },
  { title: "Cultural Day & Creative Arts", caption: "Celebrating Ghanaian culture, music, and student creativity.", category: "Creative Arts & Culture", imageUrl: "/images/school/culture.jpeg", featured: true, sortOrder: 7 },
  { title: "Moral & Character Development", caption: "Instilling values, discipline, and life skills for responsible citizenship.", category: "Events & Celebrations", imageUrl: "/images/school/moral-character.jpeg", featured: true, sortOrder: 8 },
  { title: "Dedicated Classroom Mentorship", caption: "Passionate teachers guiding every pupil to shine.", category: "Classroom Learning", imageUrl: "/images/school/DSC_9462.jpg", featured: true, sortOrder: 9 },
  { title: "Student Portrait & Confidence", caption: "Nurturing confident, disciplined future leaders in Tema.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0371.jpg", featured: true, sortOrder: 10 },
  { title: "Focused Academic Session", caption: "Interactive group learning and reading comprehension.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0311.jpg", featured: true, sortOrder: 11 },
  { title: "Campus Assembly & Fellowship", caption: "Morning assembly and student leadership at Tema Newtown Manhean.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0738.jpg", featured: true, sortOrder: 12 },
  { title: "Collaborative Student Life", caption: "Friendship, teamwork, and joyful learning across campus.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0771.jpg", featured: true, sortOrder: 13 },

  // Leadership Portraits in Gallery
  { title: "Mrs. Elisabeth Afua Quarshie Ackwornu", caption: "Headteacher, El-Shadai School", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9320.jpg", featured: false, sortOrder: 14 },
  { title: "Mrs. Patience Ankamah Addo", caption: "Director, El-Shadai School", category: "Teachers & Leadership", imageUrl: "/images/school/leader-director.jpg", featured: false, sortOrder: 15 },
  { title: "Mr. Nii Fosu Baddoo", caption: "Administrator, El-Shadai School", category: "Teachers & Leadership", imageUrl: "/images/school/leader-administrator.jpg", featured: false, sortOrder: 16 },
  { title: "Mrs. Sylvia Sackey", caption: "Bursar, El-Shadai School", category: "Teachers & Leadership", imageUrl: "/images/school/leader-bursar.jpg", featured: false, sortOrder: 17 },

  // Additional High-Resolution DSLR Campus Photos (August & September 2025)
  { title: "Interactive Lesson in Progress", caption: "Engaging classroom instruction and student participation.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0068.jpg", featured: false, sortOrder: 18 },
  { title: "Bright Smiles on Campus", caption: "Students enjoying a supportive and caring school atmosphere.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0072.jpg", featured: false, sortOrder: 19 },
  { title: "Future Leaders of Ghana", caption: "Dressed with pride and discipline at El-Shadai School.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0100.jpg", featured: false, sortOrder: 20 },
  { title: "Group Study & Reading", caption: "Developing strong literacy and communication skills.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0122.jpg", featured: false, sortOrder: 21 },
  { title: "Active Classroom Engagement", caption: "Every student is encouraged to ask questions and excel.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0127.jpg", featured: false, sortOrder: 22 },
  { title: "Faculty & Student Guidance", caption: "Personalized attention from qualified educators.", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9246.jpg", featured: false, sortOrder: 23 },
  { title: "Academic Dedication", caption: "Preparing students with knowledge and integrity.", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9252.jpg", featured: false, sortOrder: 24 },
  { title: "Educator Excellence", caption: "Committed to raising tomorrow's leaders in Tema.", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9261.jpg", featured: false, sortOrder: 25 },
  { title: "Leadership & Mentorship", caption: "Guiding students with warmth and high expectations.", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9263.jpg", featured: false, sortOrder: 26 },
  { title: "Staff Portrait", caption: "Passionate teaching team at El-Shadai School.", category: "Teachers & Leadership", imageUrl: "/images/school/DSC_9264.jpg", featured: false, sortOrder: 27 },
  { title: "Classroom Writing & Practice", caption: "Building strong foundational skills in Primary School.", category: "Classroom Learning", imageUrl: "/images/school/DSC_9421.jpg", featured: false, sortOrder: 28 },
  { title: "Focused Learning Environment", caption: "Structured lessons that help every child thrive.", category: "Classroom Learning", imageUrl: "/images/school/DSC_9424.jpg", featured: false, sortOrder: 29 },
  { title: "Student Achievement & Pride", caption: "Letting every child's light shine.", category: "Classroom Learning", imageUrl: "/images/school/DSC_9495.jpg", featured: false, sortOrder: 30 },
  { title: "Early Years Curiosity", caption: "Nurturing young minds in a safe, welcoming setting.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0316.jpg", featured: false, sortOrder: 31 },
  { title: "Teamwork in the Classroom", caption: "Peer learning and problem-solving activities.", category: "STEM & Projects", imageUrl: "/images/school/DSC_0360.jpg", featured: false, sortOrder: 32 },
  { title: "Creative Classroom Projects", caption: "Hands-on assignments that spark imagination.", category: "Creative Arts & Culture", imageUrl: "/images/school/DSC_0413.jpg", featured: false, sortOrder: 33 },
  { title: "Shared Discovery", caption: "Students collaborating during practical classwork.", category: "STEM & Projects", imageUrl: "/images/school/DSC_0414.jpg", featured: false, sortOrder: 34 },
  { title: "Joy of Learning", caption: "Vibrant energy across our Tema Newtown Manhean campus.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0416.jpg", featured: false, sortOrder: 35 },
  { title: "Classroom Participation", caption: "Confident learners sharing their ideas.", category: "Classroom Learning", imageUrl: "/images/school/DSC_0422.jpg", featured: false, sortOrder: 36 },
  { title: "Campus Community Moments", caption: "Celebrating unity and friendship at El-Shadai School.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0729.jpg", featured: false, sortOrder: 37 },
  { title: "Outdoor School Gathering", caption: "Students assembled for school-wide activities.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0730.jpg", featured: false, sortOrder: 38 },
  { title: "Co-Curricular Excellence", caption: "Developing well-rounded citizens beyond the classroom.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0731.jpg", featured: false, sortOrder: 39 },
  { title: "Student Leadership in Action", caption: "Instilling responsibility and respect.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0732.jpg", featured: false, sortOrder: 40 },
  { title: "Vibrant Campus Life", caption: "A welcoming school family in Tema.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0733.jpg", featured: false, sortOrder: 41 },
  { title: "School Spirit & Fellowship", caption: "Together we learn, grow, and shine.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0734.jpg", featured: false, sortOrder: 42 },
  { title: "Assembly Presentation", caption: "Students presenting during morning devotion and assembly.", category: "Creative Arts & Culture", imageUrl: "/images/school/DSC_0735.jpg", featured: false, sortOrder: 43 },
  { title: "Campus Celebration", caption: "Memorable moments from our academic calendar.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0736.jpg", featured: false, sortOrder: 44 },
  { title: "Shining Bright Together", caption: "El-Shadai School: Let Your Light Shine.", category: "Events & Celebrations", imageUrl: "/images/school/DSC_0737.jpg", featured: false, sortOrder: 45 },
];

async function main() {
  console.log("Seeding El-Shadai School database...");

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: DEFAULT_SETTINGS,
    create: DEFAULT_SETTINGS,
  });

  const leaderCount = await prisma.leaderMember.count();
  if (leaderCount === 0) {
    await prisma.leaderMember.createMany({ data: LEADERS });
    console.log(`Seeded ${LEADERS.length} leadership members.`);
  }

  for (const notice of NOTICES) {
    await prisma.notice.upsert({
      where: { slug: notice.slug },
      update: notice,
      create: notice,
    });
  }
  console.log(`Seeded ${NOTICES.length} school notices.`);

  const eventCount = await prisma.schoolEvent.count();
  if (eventCount === 0) {
    await prisma.schoolEvent.createMany({ data: EVENTS });
    console.log(`Seeded ${EVENTS.length} academic calendar events.`);
  }

  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({ data: GALLERY_ITEMS });
    console.log(`Seeded ${GALLERY_ITEMS.length} campus gallery photos.`);
  }

  console.log("Database seed completed successfully!");
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
