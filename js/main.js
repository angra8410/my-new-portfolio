// ===================================
// Navigation Toggle for Mobile
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Smooth Scroll with Offset
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Blog Posts Management
// ===================================
const blogPosts = [
    {
        title: 'Construyendo Aplicaciones Modernas con React',
        date: '2024-03-15',
        excerpt: 'Exploramos las mejores prácticas para desarrollar aplicaciones React escalables y mantenibles, incluyendo hooks personalizados, optimización de rendimiento y gestión de estado.',
        slug: 'construyendo-aplicaciones-modernas-react',
        lang: 'es',
        translations: { en: 'building-modern-react-apps' },
        title_en: 'Building Modern Applications with React',
        excerpt_en: 'We explore best practices for building scalable, maintainable React applications, including custom hooks, performance optimization and state management.'
    },
    {
        title: 'Guía Completa de CSS Grid y Flexbox',
        date: '2024-03-10',
        excerpt: 'Un tutorial detallado sobre cómo utilizar CSS Grid y Flexbox para crear layouts responsivos y modernos. Aprende cuándo usar cada uno y cómo combinarlos efectivamente.',
        slug: 'guia-completa-css-grid-flexbox',
        lang: 'es',
        translations: { en: 'complete-guide-css-grid-flexbox' },
        title_en: 'Complete Guide to CSS Grid and Flexbox',
        excerpt_en: 'A detailed tutorial on using CSS Grid and Flexbox to create responsive, modern layouts. Learn when to use each and how to combine them effectively.'
    },
    {
        title: 'Introducción a TypeScript para JavaScript Developers',
        date: '2024-03-05',
        excerpt: 'Descubre cómo TypeScript puede mejorar tu código JavaScript con tipado estático, interfaces y características avanzadas que aumentan la productividad.',
        slug: 'introduccion-typescript-javascript',
        lang: 'es',
        translations: { en: 'introduction-to-typescript' },
        title_en: 'Introduction to TypeScript for JavaScript Developers',
        excerpt_en: 'Discover how TypeScript can improve your JavaScript with static typing, interfaces and advanced features that boost productivity.'
    },
    {
        title: 'Mejores Prácticas de Accesibilidad Web',
        date: '2024-02-28',
        excerpt: 'La accesibilidad es fundamental en el desarrollo web moderno. Aprende técnicas esenciales para hacer tus sitios web más inclusivos y accesibles para todos.',
        slug: 'mejores-practicas-accesibilidad-web',
        lang: 'es',
        translations: { en: 'web-accessibility-best-practices' },
        title_en: 'Web Accessibility Best Practices',
        excerpt_en: 'Accessibility is essential in modern web development. Learn core techniques to make your websites more inclusive and accessible for everyone.'
    },
    {
        title: 'Optimización de Rendimiento en Aplicaciones Web',
        date: '2024-02-20',
        excerpt: 'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web, incluyendo lazy loading, code splitting, y optimización de imágenes.',
        slug: 'optimizacion-rendimiento-aplicaciones-web',
        lang: 'es',
        translations: { en: 'web-performance-optimization' },
        title_en: 'Web Performance Optimization',
        excerpt_en: 'Advanced techniques to improve the performance of your web applications, including lazy loading, code splitting and image optimization.'
    },
    {
        title: 'Deploy Continuo con GitHub Actions',
        date: '2024-02-15',
        excerpt: 'Automatiza tu flujo de trabajo con GitHub Actions. Aprende a configurar pipelines de CI/CD para testing, building y deployment automático.',
        slug: 'deploy-continuo-github-actions',
        lang: 'es',
        translations: { en: 'continuous-deployment-github-actions' },
        title_en: 'Continuous Deployment with GitHub Actions',
        excerpt_en: 'Automate your workflow with GitHub Actions. Learn to configure CI/CD pipelines for testing, building and automated deployment.'
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const locale = (window.currentLang && window.currentLang === 'en') ? 'en-US' : 'es-ES';
    return date.toLocaleDateString(locale, options);
}

// Function to load blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blogPosts');
    
    if (!blogContainer) return;
    
    // Sort posts by date (most recent first)
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Clear loading message
    blogContainer.innerHTML = '';
    
    // Create blog cards
    sortedPosts.forEach(post => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        
        const readMoreText = (window.currentLang === 'en') ? 'Read more' : 'Leer más';
        const postLang = post.lang || 'es';
        // if the post has translations mapping, prefer a matching slug for the current language
        const linkSlug = (post.translations && post.translations[window.currentLang]) ? post.translations[window.currentLang] : post.slug;

        blogCard.innerHTML = `
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${formatDate(post.date)}
                    </span>
                </div>
                <div class="blog-card-lang">${postLang.toUpperCase()}</div>
                <h3>${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="posts/${linkSlug}.html" class="blog-card-link">
                    ${readMoreText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        `;
        
        blogContainer.appendChild(blogCard);
    });
}

// Load blog posts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
});

// ===================================
// Theme Toggle (Dark / Light)
// ===================================
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // ignore
    }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // small button animation
            themeToggle.classList.add('animating');
            setTimeout(() => themeToggle.classList.remove('animating'), 320);

            const isDark = document.documentElement.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }
});

// ===================================
// Language Toggle (ES / IN)
// ===================================
const langToggle = document.getElementById('langToggle');

const translations = {
    es: {
        navBrand: 'Portafolio',
        navHome: 'Inicio',
        navAbout: 'Sobre mí',
        navExpertise: 'Experticia',
        navHobbies: 'Hobbies',
        navBlog: 'Blog',
        navContact: 'Contacto',
        heroGreeting: 'Hola, soy',
        heroName: 'Antonio Gutierrez',
        heroSubtitle: 'Analista de Datos',
        ctaPrimary: 'Conocer más',
        ctaSecondary: 'Contactar',
        read_more: 'Leer más',
        titleAbout: 'Sobre mí',
        titleExpertise: 'Experticia',
        titleHobbies: 'Hobbies',
        titleBlog: 'Blog',
        titleContact: 'Contacto',
        aboutP1: 'Soy un analista de datos apasionado por crear experiencias digitales excepcionales. Con +5 años de experiencia en el desarrollo de dashboards, me especializo en construir aplicaciones de analítica, escalables y centradas en el usuario.',
        aboutP2: 'Mi enfoque combina conocimientos técnicos profundos con una comprensión clara de las necesidades del negocio, permitiéndome entregar soluciones que no solo funcionan bien, sino que también generan valor real.',
        aboutP3: 'Creo firmemente en el aprendizaje continuo, las mejores prácticas de desarrollo y la colaboración efectiva en equipo.',
        blogSubtitle: 'Artículos sobre desarrollo, tecnología y mejores prácticas',
        contactSubtitle: '¿Interesado en colaborar? ¡Conectemos!'
        ,
        expertiseCards: [
            {
                title: 'Power BI Dashboards',
                desc: 'Power BI, Power Query, DAX, modelado de datos, visualización avanzada',
                techs: ['Power BI','Power Query','DAX','Modelado de Datos']
            },
            {
                title: 'Analítica en la Nube',
                desc: 'Power BI Cloud, Azure, Google BigQuery, Automatización de reportes',
                techs: ['Power BI Cloud','Azure','Google BigQuery','Automatización de reportes']
            },
            {
                title: 'Data Wrangling & Limpieza de Datos',
                desc: 'Pandas, SQL, Power Query, Excel',
                techs: ['Pandas','SQL','Power Query','Excel']
            },
            {
                title: 'Integración de Datos con Microsoft Fabric & Lakehouses',
                desc: 'Fabric, Lakehouse, Dataflows Gen 2, Pipelines',
                techs: ['Fabric','Lakehouse','Dataflows Gen 2','Pipelines']
            }
        ],
        hobbiesCards: [
            { title: 'Lectura Técnica', desc: 'Siempre aprendiendo sobre nuevas tecnologías, patrones de diseño y mejores prácticas de desarrollo.' },
            { title: 'Gaming', desc: 'Disfruto de los videojuegos como forma de relajación y también como inspiración para el diseño de interfaces.' },
            { title: 'Deportes', desc: 'Mantengo un estilo de vida activo con la natación y ciclismo, fundamentales para mantener la mente clara.' },
            { title: 'Escritura', desc: 'Comparto conocimientos y experiencias a través de artículos técnicos y tutoriales en mi blog.' }
        ]
    },
    en: {
        navBrand: 'Portfolio',
        navHome: 'Home',
        navAbout: 'About',
        navExpertise: 'Expertise',
        navHobbies: 'Hobbies',
        navBlog: 'Blog',
        navContact: 'Contact',
        heroGreeting: 'Hello, I\'m',
        heroName: 'Antonio Gutierrez',
        heroSubtitle: 'Data Analyst',
        ctaPrimary: 'Learn more',
        ctaSecondary: 'Contact',
        read_more: 'Read more',
        titleAbout: 'About',
        titleExpertise: 'Expertise',
        titleHobbies: 'Hobbies',
        titleBlog: 'Blog',
        titleContact: 'Contact',
        aboutP1: 'I am a data analyst passionate about creating exceptional digital experiences. With 5+ years of experience building dashboards, I specialize in creating scalable, user-centered analytics applications.',
        aboutP2: 'My approach combines deep technical knowledge with a clear understanding of business needs, enabling me to deliver solutions that not only work well but also create real value.',
        aboutP3: 'I strongly believe in continuous learning, development best practices, and effective team collaboration.',
        blogSubtitle: 'Articles about development, technology and best practices',
        contactSubtitle: 'Interested in collaborating? Let\'s connect!'
        ,
        expertiseCards: [
            {
                title: 'Power BI Dashboards',
                desc: 'Power BI, Power Query, DAX, data modeling, advanced visualization',
                techs: ['Power BI','Power Query','DAX','Data Modeling']
            },
            {
                title: 'Cloud Analytics',
                desc: 'Power BI Cloud, Azure, Google BigQuery, report automation',
                techs: ['Power BI Cloud','Azure','Google BigQuery','Report Automation']
            },
            {
                title: 'Data Wrangling & Cleaning',
                desc: 'Pandas, SQL, Power Query, Excel',
                techs: ['Pandas','SQL','Power Query','Excel']
            },
            {
                title: 'Data Integration with Microsoft Fabric & Lakehouses',
                desc: 'Fabric, Lakehouse, Dataflows Gen 2, Pipelines',
                techs: ['Fabric','Lakehouse','Dataflows Gen 2','Pipelines']
            }
        ],
        hobbiesCards: [
            { title: 'Technical Reading', desc: 'Always learning about new technologies, design patterns and development best practices.' },
            { title: 'Gaming', desc: 'I enjoy video games for relaxation and also as inspiration for UI design.' },
            { title: 'Sports', desc: 'I maintain an active lifestyle with swimming and cycling, important for keeping a clear mind.' },
            { title: 'Writing', desc: 'I share knowledge and experiences through technical articles and tutorials on my blog.' }
        ]
    }
};

function applyLanguage(lang) {
    window.currentLang = lang;
    const dict = translations[lang] || translations.es;

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('navBrand', dict.navBrand);
    setText('navHome', dict.navHome);
    setText('navAbout', dict.navAbout);
    setText('navExpertise', dict.navExpertise);
    setText('navHobbies', dict.navHobbies);
    setText('navBlog', dict.navBlog);
    setText('navContact', dict.navContact);

    // Hero: combine greeting + name
    const heroTitle = document.getElementById('heroTitle');
    const heroName = document.getElementById('heroName');
    if (heroTitle && heroName) {
        heroTitle.innerHTML = `${dict.heroGreeting} <span class="highlight" id="heroName">${dict.heroName}</span>`;
    }
    setText('heroSubtitle', dict.heroSubtitle);
    setText('ctaPrimary', dict.ctaPrimary);
    setText('ctaSecondary', dict.ctaSecondary);

    // Section titles (if present)
    setText('titleAbout', dict.titleAbout);
    setText('titleExpertise', dict.titleExpertise);
    setText('titleHobbies', dict.titleHobbies);
    setText('titleBlog', dict.titleBlog);
    setText('titleContact', dict.titleContact);

    setText('aboutP1', dict.aboutP1);
    setText('aboutP2', dict.aboutP2);
    setText('aboutP3', dict.aboutP3);
    setText('blogSubtitle', dict.blogSubtitle);
    setText('contactSubtitle', dict.contactSubtitle);

    // Update expertise cards
    try {
        const expertiseEls = document.querySelectorAll('.expertise-card');
        if (expertiseEls && dict.expertiseCards) {
            expertiseEls.forEach((el, i) => {
                const card = dict.expertiseCards[i];
                if (!card) return;
                const h3 = el.querySelector('h3');
                const p = el.querySelector('p');
                const techLis = el.querySelectorAll('.tech-list li');
                if (h3) h3.textContent = card.title;
                if (p) p.textContent = card.desc;
                if (techLis && card.techs) {
                    card.techs.forEach((t, j) => {
                        if (techLis[j]) techLis[j].textContent = t;
                    });
                }
            });
        }
    } catch (e) {}

    // Update hobbies cards
    try {
        const hobbyEls = document.querySelectorAll('.hobby-card');
        if (hobbyEls && dict.hobbiesCards) {
            hobbyEls.forEach((el, i) => {
                const card = dict.hobbiesCards[i];
                if (!card) return;
                const h3 = el.querySelector('h3');
                const p = el.querySelector('p');
                if (h3) h3.textContent = card.title;
                if (p) p.textContent = card.desc;
            });
        }
    } catch (e) {}

    // Update lang toggle label to show opposite (action)
    if (langToggle) {
        langToggle.textContent = (lang === 'es') ? 'EN' : 'ES';
    }

    try {
        localStorage.setItem('lang', lang);
    } catch (e) {}

    // Re-render blog posts to update "Read more" text
    loadBlogPosts();
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');
    const lang = savedLang || 'es';
    applyLanguage(lang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // small button animation
            langToggle.classList.add('animating');
            setTimeout(() => langToggle.classList.remove('animating'), 320);

            const newLang = (window.currentLang === 'es') ? 'en' : 'es';
            applyLanguage(newLang);
        });
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.expertise-card, .hobby-card, .blog-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ===================================
// Utility Functions
// ===================================

// Add post dynamically (for future use)
function addBlogPost(post) {
    blogPosts.unshift(post);
    loadBlogPosts();
}

// Search posts (for future implementation)
function searchPosts(query) {
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogPosts,
        addBlogPost,
        searchPosts,
        loadBlogPosts
    };
}
