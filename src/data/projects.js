/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECT DATA — Single source of truth
   
   Used by:
     • HomePage Projects preview (shows first 3)
     • WorkPage full grid (filterable by category)
   
   category values: 'photo' | 'video' | 'website'
   
   (c) ADD YOUR REAL PROJECTS HERE — just push new
   objects into the array below. Each needs at minimum:
   { id, title, description, category, year, thumbnail }
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const projects = [
  /* ──────────────────────────────────
     PHOTOS (Graphic Design work)
     ────────────────────────────────── */
  {
    id: 1,
    title: 'Graphic Design Course Ad',
    description: 'Professional promotional graphic for NIT Legend highlighting a comprehensive Graphic Design training course.',
    category: 'photo',
    year: '2024',
    thumbnail: './projects/media_1787138979816.jpg',
    tags: ['Commercial Art', 'Graphic Design'],
  },
  {
    id: 2,
    title: 'Dahi Chiura Festival',
    description: 'Cultural festival creative celebrating the National Paddy Day (Dahi Chiura Khane Din) for NIT Legend.',
    category: 'photo',
    year: '2024',
    thumbnail: './projects/media_1787138979513.jpg',
    tags: ['Social Media', 'Graphic Design'],
  },
  {
    id: 3,
    title: 'Republic Day Greeting',
    description: 'Patriotic design created for Republic Day (Ganatantra Diwas), showcasing national pride.',
    category: 'photo',
    year: '2024',
    thumbnail: './projects/media_1787138979546.jpg',
    tags: ['Event Creative', 'Graphic Design'],
  },
  {
    id: 4,
    title: 'New Year 2083 Campaign',
    description: 'Vibrant New Year promotional banner featuring iconic Nepali landmarks and a special enrollment offer.',
    category: 'photo',
    year: '2024',
    thumbnail: './projects/media_1787138979749.jpg',
    tags: ['Promotional', 'Graphic Design'],
  },
  {
    id: 5,
    title: 'Nag Panchami Festival',
    description: 'Traditional artistic greeting for the Nag Panchami festival featuring cultural elements.',
    category: 'photo',
    year: '2024',
    thumbnail: './projects/media_1787138979843.jpg',
    tags: ['Social Media', 'Graphic Design'],
  },

  /* ──────────────────────────────────
     VIDEOS
     ────────────────────────────────── */
  {
    id: 6,
    title: 'SEE Farewell & Highlight Reel',
    description: 'Cinematic video edit featuring dynamic cuts, motion graphics, and color grading celebrating the SEE batch.',
    category: 'video',
    year: '2024',
    thumbnail: './projects/see-thumb.jpg',
    videoSrc: './projects/SEE.mp4',
    tags: ['Video Editing', 'Cinematic'],
  },
  {
    id: 7,
    title: 'Portfolio Showcase Reel',
    description: 'Dynamic visual showreel presenting creative design projects, interface builds, and video editing workflows.',
    category: 'video',
    year: '2025',
    thumbnail: './projects/portfolio-thumb.jpg',
    videoSrc: './projects/portfolio-vid.mp4',
    tags: ['Motion Graphics', 'Showreel'],
  },

  /* ──────────────────────────────────
     WEBSITES & APPS
     (c) Add your web/app projects here.
     `siteUrl` is shown in the fake browser URL bar
     and used as the external link target.
     ────────────────────────────────── */
  // Example (uncomment and fill in when ready):
  // {
  //   id: 201,
  //   title: 'NIT Legend Website',
  //   description: 'A modern responsive website for NIT Legend training institute built with React.',
  //   category: 'website',
  //   year: '2025',
  //   thumbnail: '/projects/website-thumb-1.jpg',
  //   siteUrl: 'https://nit-legend.com',
  //   tags: ['React', 'Web Design'],
  // },
];

export default projects;
