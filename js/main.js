const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

let currentLang = 'es';

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

function setActiveNav(sectionId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
  });
}

function activateNavLink() {
  const offset = 140;
  const scrollPosition = window.scrollY + offset;
  const docHeight = document.documentElement.scrollHeight;
  const viewportBottom = window.scrollY + window.innerHeight;

  if (viewportBottom >= docHeight - 8) {
    setActiveNav('contact');
    return;
  }

  let currentSection = 'home';
  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) currentSection = section.getAttribute('id');
  });
  setActiveNav(currentSection);
}

window.addEventListener('scroll', activateNavLink);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetSelector = this.getAttribute('href');
    const target = document.querySelector(targetSelector);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

const blogPosts = [
  { title: 'Construyendo Aplicaciones Modernas con React', title_en: 'Building Modern Applications with React', date: '2024-03-15', excerpt: 'Exploramos las mejores prácticas para desarrollar aplicaciones React escalables y mantenibles, incluyendo hooks personalizados, optimización de rendimiento y gestión de estado.', excerpt_en: 'We explore best practices for building scalable, maintainable React applications, including custom hooks, performance optimization and state management.', slug: 'construyendo-aplicaciones-modernas-react', translations: { en: 'building-modern-react-apps' }, lang: 'es' },
  { title: 'Guía Completa de CSS Grid y Flexbox', title_en: 'Complete Guide to CSS Grid and Flexbox', date: '2024-03-10', excerpt: 'Un tutorial detallado sobre cómo utilizar CSS Grid y Flexbox para crear layouts responsivos y modernos. Aprende cuándo usar cada uno y cómo combinarlos efectivamente.', excerpt_en: 'A detailed tutorial on using CSS Grid and Flexbox to create responsive, modern layouts. Learn when to use each and how to combine them effectively.', slug: 'guia-completa-css-grid-flexbox', translations: { en: 'complete-guide-css-grid-flexbox' }, lang: 'es' },
  { title: 'Introducción a TypeScript para JavaScript Developers', title_en: 'Introduction to TypeScript for JavaScript Developers', date: '2024-03-05', excerpt: 'Descubre cómo TypeScript puede mejorar tu código JavaScript con tipado estático, interfaces y características avanzadas que aumentan la productividad.', excerpt_en: 'Discover how TypeScript can improve your JavaScript with static typing, interfaces and advanced features that boost productivity.', slug: 'introduccion-typescript-javascript', translations: { en: 'introduction-to-typescript' }, lang: 'es' },
  { title: 'Mejores Prácticas de Accesibilidad Web', title_en: 'Web Accessibility Best Practices', date: '2024-02-28', excerpt: 'La accesibilidad es fundamental en el desarrollo web moderno. Aprende técnicas esenciales para hacer tus sitios web más inclusivos y accesibles para todos.', excerpt_en: 'Accessibility is essential in modern web development. Learn core techniques to make your websites more inclusive and accessible for everyone.', slug: 'mejores-practicas-accesibilidad-web', translations: { en: 'web-accessibility-best-practices' }, lang: 'es' },
  { title: 'Optimización de Rendimiento en Aplicaciones Web', title_en: 'Web Performance Optimization', date: '2024-02-20', excerpt: 'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web, incluyendo lazy loading, code splitting y optimización de imágenes.', excerpt_en: 'Advanced techniques to improve the performance of your web applications, including lazy loading, code splitting and image optimization.', slug: 'optimizacion-rendimiento-aplicaciones-web', translations: { en: 'web-performance-optimization' }, lang: 'es' },
  { title: 'Deploy Continuo con GitHub Actions', title_en: 'Continuous Deployment with GitHub Actions', date: '2024-02-15', excerpt: 'Automatiza tu flujo de trabajo con GitHub Actions. Aprende a configurar pipelines de CI/CD para testing, building y deployment automático.', excerpt_en: 'Automate your workflow with GitHub Actions. Learn to configure CI/CD pipelines for testing, building and automated deployment.', slug: 'deploy-continuo-github-actions', translations: { en: 'continuous-deployment-github-actions' }, lang: 'es' }
];

const projects = [
  {
    title: 'Bellabeat Smart Device Usage Analysis',
    title_en: 'Bellabeat Smart Device Usage Analysis',
    category: 'Caso de estudio',
    category_en: 'Case Study',
    image: 'https://raw.githubusercontent.com/angra8410/bellabeat-device-usage-analysis/main/assets/images/thumbnail.png', // Placeholder if needed, or null
    excerpt: 'Análisis de uso de dispositivos inteligentes para identificar patrones de comportamiento, segmentación de usuarios y oportunidades de marketing basadas en datos.',
    excerpt_en: 'Smart device usage analysis to identify behavior patterns, user segmentation, and data-driven marketing opportunities.',
    tech: ['SQL', 'Power BI', 'Data Cleaning', 'EDA'],
    metrics: ['Segmentación de usuarios', 'Tendencias de uso', 'Insights de negocio'],
    metrics_en: ['User segmentation', 'Usage trends', 'Business insights'],
    detailUrl: 'projects/bellabeat-smart-device-usage-analysis.html',
    repoUrl: 'https://github.com/angra8410/bellabeat-device-usage-analysis'
  },
  {
    title: 'Data Engineering - Mercado Laboral Colombiano',
    title_en: 'Data Engineering - Colombian Labor Market',
    category: 'Ingeniería de datos',
    category_en: 'Data Engineering',
    image: 'img/main-photo.png',
    excerpt: 'Pipeline de datos end-to-end para el procesamiento de indicadores laborales en Colombia utilizando Microsoft Fabric.',
    excerpt_en: 'End-to-end data pipeline for processing Colombian labor indicators using Microsoft Fabric.',
    tech: ['Microsoft Fabric', 'PySpark', 'SQL', 'Delta Lake', 'Power BI'],
    metrics: ['Arquitectura Medallion', 'Automatización de pipelines', 'Dashboard interactivo'],
    metrics_en: ['Medallion Architecture', 'Pipeline automation', 'Interactive dashboard'],
    detailUrl: 'projects/data-engineering-politics-colombia.html',
    repoUrl: 'https://github.com/angra8410/data-engineering-politics-colombia'
  },
  {
    title: 'VitaPlus Colombia - Plataforma de datos sinteticos de salud en Microsoft Fabric',
    title_en: 'VitaPlus Colombia - Synthetic Healthcare Data Platform in Microsoft Fabric',
    category: 'Ingenieria de datos',
    category_en: 'Data Engineering',
    image: 'img/vitaplus_colombia_report_main.png',
    excerpt: 'Proyecto de practica en Microsoft Fabric con datos sinteticos de salud para modelado SQL, Lakehouse, Warehouse, modelo semantico y reporte Power BI.',
    excerpt_en: 'Microsoft Fabric practice project with synthetic healthcare data for SQL modeling, Lakehouse, Warehouse, semantic model, and Power BI reporting.',
    tech: ['Microsoft Fabric', 'SQL', 'Lakehouse', 'Warehouse', 'Power BI', 'Star Schema'],
    metrics: ['70,000 clientes ficticios', '100,000 ventas sinteticas', '6 anos de historial'],
    metrics_en: ['70,000 fictitious customers', '100,000 synthetic sales', '6 years of history'],
    detailUrl: 'projects/vitaplus_colombia.html',
    repoUrl: '#'
  }
];

function formatDate(dateString) {
  const locale = currentLang === 'en' ? 'en-US' : 'es-ES';
  return new Date(dateString).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function loadBlogPosts() {
  const blogContainer = document.getElementById('blogPosts');
  if (!blogContainer) return;
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  blogContainer.innerHTML = '';
  sortedPosts.forEach(post => {
    const isEnglish = currentLang === 'en';
    const title = isEnglish ? (post.title_en || post.title) : post.title;
    const excerpt = isEnglish ? (post.excerpt_en || post.excerpt) : post.excerpt;
    const readMoreText = isEnglish ? 'Read more' : 'Leer más';
    const linkSlug = isEnglish && post.translations?.en ? post.translations.en : post.slug;
    const blogCard = document.createElement('article');
    blogCard.className = 'blog-card';
    blogCard.innerHTML = `
      <div class="blog-meta"><span>${formatDate(post.date)}</span><span>${(post.lang || 'es').toUpperCase()}</span></div>
      <h3>${title}</h3>
      <p class="blog-card-excerpt">${excerpt}</p>
      <a href="posts/${linkSlug}.html" class="blog-card-link">${readMoreText}</a>
    `;
    blogContainer.appendChild(blogCard);
  });
}

function loadProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;
  const isEnglish = currentLang === 'en';
  const viewCaseText = isEnglish ? 'View case study' : 'Ver caso de estudio';
  const viewRepoText = isEnglish ? 'View repository' : 'Ver repositorio';
  projectsGrid.innerHTML = '';
  projects.forEach(project => {
    const title = isEnglish ? (project.title_en || project.title) : project.title;
    const category = isEnglish ? (project.category_en || project.category) : project.category;
    const excerpt = isEnglish ? (project.excerpt_en || project.excerpt) : project.excerpt;
    const metrics = isEnglish ? (project.metrics_en || project.metrics) : project.metrics;
    const article = document.createElement('article');
    article.className = 'project-card';
    
    let imageHtml = '';
    if (project.image) {
      imageHtml = `
        <div class="project-card-image">
          <img src="${project.image}" alt="${title}" loading="lazy">
        </div>
      `;
    }

    article.innerHTML = `
      ${imageHtml}
      <div class="project-card-content">
        <div class="project-card-header">
          <span class="project-category">${category}</span>
          <h3 class="project-title">${title}</h3>
        </div>
        <p class="project-excerpt">${excerpt}</p>
        <div class="project-tech-list">${project.tech.map(item => `<span class="project-tech">${item}</span>`).join('')}</div>
        <div class="project-metrics">${metrics.map(item => `<span class="project-metric">${item}</span>`).join('')}</div>
        <div class="project-actions">
          <a href="${project.detailUrl}" class="btn btn-primary">${viewCaseText}</a>
          <a href="${project.repoUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">${viewRepoText}</a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(article);
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

const translations = {
  es: {
    navBrand: 'Portafolio', navHome: 'Inicio', navAbout: 'Sobre mí', navExpertise: 'Experticia', navHobbies: 'Hobbies', navProjects: 'Proyectos', navBlog: 'Blog', navContact: 'Contacto',
    heroGreeting: 'Hola, soy', heroName: 'Antonio Gutierrez', heroSubtitle: 'Analista de Datos', ctaPrimary: 'Conocer más', ctaSecondary: 'Contactar',
    titleAbout: 'Sobre mí', titleExpertise: 'Experticia', titleHobbies: 'Hobbies & Intereses', titleProjects: 'Proyectos Destacados', titleBlog: 'Blog & Publicaciones', titleContact: 'Contacto',
    aboutP1: 'Soy un analista de datos apasionado por crear experiencias digitales excepcionales. Con +5 años de experiencia en el desarrollo de dashboards, me especializo en construir soluciones de analítica escalables y centradas en el usuario.',
    aboutP2: 'Mi enfoque combina conocimientos técnicos profundos con una comprensión clara de las necesidades del negocio, permitiéndome entregar soluciones que no solo funcionan bien, sino que también generan valor real.',
    aboutP3: 'Creo firmemente en el aprendizaje continuo, las mejores prácticas de desarrollo y la colaboración efectiva en equipo.',
    blogSubtitle: 'Artículos sobre desarrollo, tecnología y mejores prácticas', contactSubtitle: '¿Interesado en colaborar? ¡Conectemos!',
    projectsBadge: 'Casos de Estudio', projectsSubtitle: 'Casos de analítica, visualización y toma de decisiones basadas en datos.', projectsLoading: 'Cargando proyectos...',
    footerCopyright: '© 2024 Portfolio. Todos los derechos reservados.', footerNote: 'Construido con ❤️ y mucho café',
    expertiseCards: [
      { title: 'Power BI Dashboards', desc: 'Power BI, Power Query, DAX, modelado de datos, visualización avanzada', techs: ['Power BI', 'Power Query', 'DAX', 'Modelado de Datos'] },
      { title: 'Analítica en la Nube', desc: 'Power BI Cloud, Azure, Google BigQuery, automatización de reportes', techs: ['Power BI Cloud', 'Azure', 'Google BigQuery', 'Automatización de reportes'] },
      { title: 'Data Wrangling & Limpieza de Datos', desc: 'Pandas, SQL, Power Query, Excel', techs: ['Pandas', 'SQL', 'Power Query', 'Excel'] },
      { title: 'Integración de Datos con Microsoft Fabric & Lakehouses', desc: 'Fabric, Lakehouse, Dataflows Gen 2, Pipelines', techs: ['Fabric', 'Lakehouse', 'Dataflows Gen 2', 'Pipelines'] }
    ],
    hobbiesCards: [
      { title: 'Lectura Técnica', desc: 'Siempre aprendiendo sobre nuevas tecnologías, patrones de diseño y mejores prácticas de desarrollo.' },
      { title: 'Gaming', desc: 'Disfruto de los videojuegos como forma de relajación y también como inspiración para el diseño de interfaces.' },
      { title: 'Deportes', desc: 'Mantengo un estilo de vida activo con la natación y ciclismo, fundamentales para mantener la mente clara.' },
      { title: 'Escritura', desc: 'Comparto conocimientos y experiencias a través de artículos técnicos y tutoriales en mi blog.' }
    ]
  },
  en: {
    navBrand: 'Portfolio', navHome: 'Home', navAbout: 'About', navExpertise: 'Expertise', navHobbies: 'Hobbies', navProjects: 'Projects', navBlog: 'Blog', navContact: 'Contact',
    heroGreeting: "Hello, I'm", heroName: 'Antonio Gutierrez', heroSubtitle: 'Data Analyst', ctaPrimary: 'Learn more', ctaSecondary: 'Contact',
    titleAbout: 'About Me', titleExpertise: 'Expertise', titleHobbies: 'Hobbies & Interests', titleProjects: 'Featured Projects', titleBlog: 'Blog & Publications', titleContact: 'Contact',
    aboutP1: 'I am a data analyst passionate about creating exceptional digital experiences. With 5+ years of experience building dashboards, I specialize in creating scalable, user-centered analytics solutions.',
    aboutP2: 'My approach combines strong technical knowledge with a clear understanding of business needs, allowing me to deliver solutions that not only work well, but also create real value.',
    aboutP3: 'I strongly believe in continuous learning, development best practices, and effective teamwork.',
    blogSubtitle: 'Articles about development, technology, and best practices', contactSubtitle: 'Interested in collaborating? Let’s connect!',
    projectsBadge: 'Case Studies', projectsSubtitle: 'Analytics, visualization, and data-driven decision-making projects.', projectsLoading: 'Loading projects...',
    footerCopyright: '© 2024 Portfolio. All rights reserved.', footerNote: 'Built with ❤️ and lots of coffee',
    expertiseCards: [
      { title: 'Power BI Dashboards', desc: 'Power BI, Power Query, DAX, data modeling, advanced visualization', techs: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'] },
      { title: 'Cloud Analytics', desc: 'Power BI Cloud, Azure, Google BigQuery, report automation', techs: ['Power BI Cloud', 'Azure', 'Google BigQuery', 'Report Automation'] },
      { title: 'Data Wrangling & Data Cleaning', desc: 'Pandas, SQL, Power Query, Excel', techs: ['Pandas', 'SQL', 'Power Query', 'Excel'] },
      { title: 'Data Integration with Microsoft Fabric & Lakehouses', desc: 'Fabric, Lakehouse, Dataflows Gen 2, Pipelines', techs: ['Fabric', 'Lakehouse', 'Dataflows Gen 2', 'Pipelines'] }
    ],
    hobbiesCards: [
      { title: 'Technical Reading', desc: 'Always learning about new technologies, design patterns, and development best practices.' },
      { title: 'Gaming', desc: 'I enjoy video games as a way to relax and also as inspiration for interface design.' },
      { title: 'Sports', desc: 'I maintain an active lifestyle through swimming and cycling, both essential for keeping a clear mind.' },
      { title: 'Writing', desc: 'I share knowledge and experience through technical articles and tutorials on my blog.' }
    ]
  }
};

function updateStaticTexts(lang) {
  const t = translations[lang];
  const textMap = {
    navBrand: t.navBrand, navHome: t.navHome, navAbout: t.navAbout, navExpertise: t.navExpertise, navHobbies: t.navHobbies, navProjects: t.navProjects, navBlog: t.navBlog, navContact: t.navContact,
    heroGreeting: t.heroGreeting, heroName: t.heroName, heroSubtitle: t.heroSubtitle, ctaPrimary: t.ctaPrimary, ctaSecondary: t.ctaSecondary,
    titleAbout: t.titleAbout, titleExpertise: t.titleExpertise, titleHobbies: t.titleHobbies, titleProjects: t.titleProjects, titleBlog: t.titleBlog, titleContact: t.titleContact,
    aboutP1: t.aboutP1, aboutP2: t.aboutP2, aboutP3: t.aboutP3, blogSubtitle: t.blogSubtitle, contactSubtitle: t.contactSubtitle,
    projectsBadge: t.projectsBadge, projectsSubtitle: t.projectsSubtitle, projectsLoading: t.projectsLoading, footerCopyright: t.footerCopyright, footerNote: t.footerNote
  };
  Object.entries(textMap).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });

  const expertiseCards = document.querySelectorAll('.expertise-card');
  expertiseCards.forEach((card, index) => {
    const data = t.expertiseCards[index];
    if (!data) return;
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const techs = card.querySelectorAll('.tech-list li');
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    techs.forEach((tech, i) => { if (data.techs[i]) tech.textContent = data.techs[i]; });
  });

  const hobbyCards = document.querySelectorAll('.hobby-card');
  hobbyCards.forEach((card, index) => {
    const data = t.hobbiesCards[index];
    if (!data) return;
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
  });

  document.documentElement.lang = lang;
  if (langToggle) langToggle.textContent = lang.toUpperCase();
}

function setLanguage(lang) {
  currentLang = lang;
  updateStaticTexts(lang);
  loadBlogPosts();
  loadProjects();
  try { localStorage.setItem('language', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
  setLanguage(localStorage.getItem('language') || 'es');
  activateNavLink();
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'es' : 'en');
    });
  }
});
