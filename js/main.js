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
        slug: 'construyendo-aplicaciones-modernas-react'
    },
    {
        title: 'Guía Completa de CSS Grid y Flexbox',
        date: '2024-03-10',
        excerpt: 'Un tutorial detallado sobre cómo utilizar CSS Grid y Flexbox para crear layouts responsivos y modernos. Aprende cuándo usar cada uno y cómo combinarlos efectivamente.',
        slug: 'guia-completa-css-grid-flexbox'
    },
    {
        title: 'Introducción a TypeScript para JavaScript Developers',
        date: '2024-03-05',
        excerpt: 'Descubre cómo TypeScript puede mejorar tu código JavaScript con tipado estático, interfaces y características avanzadas que aumentan la productividad.',
        slug: 'introduccion-typescript-javascript'
    },
    {
        title: 'Mejores Prácticas de Accesibilidad Web',
        date: '2024-02-28',
        excerpt: 'La accesibilidad es fundamental en el desarrollo web moderno. Aprende técnicas esenciales para hacer tus sitios web más inclusivos y accesibles para todos.',
        slug: 'mejores-practicas-accesibilidad-web'
    },
    {
        title: 'Optimización de Rendimiento en Aplicaciones Web',
        date: '2024-02-20',
        excerpt: 'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web, incluyendo lazy loading, code splitting, y optimización de imágenes.',
        slug: 'optimizacion-rendimiento-aplicaciones-web'
    },
    {
        title: 'Deploy Continuo con GitHub Actions',
        date: '2024-02-15',
        excerpt: 'Automatiza tu flujo de trabajo con GitHub Actions. Aprende a configurar pipelines de CI/CD para testing, building y deployment automático.',
        slug: 'deploy-continuo-github-actions'
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
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
                <h3>${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="posts/${post.slug}.html" class="blog-card-link">
                    Leer más
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
