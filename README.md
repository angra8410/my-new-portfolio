# Portfolio Minimalista y Profesional

Un portafolio personal moderno, minimalista y responsivo para GitHub Pages, diseñado para desarrolladores que quieren mostrar su trayectoria, habilidades y publicaciones de blog de manera profesional.

## 🎨 Características

- **Diseño Minimalista:** Interfaz limpia y moderna con enfoque en el contenido
- **Totalmente Responsivo:** Optimizado para dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva:** Barra de navegación sticky con enlaces suaves entre secciones
- **Sistema de Blog:** Gestión sencilla de publicaciones con orden cronológico
- **SEO Optimizado:** Meta tags y estructura semántica HTML5
- **Accesible:** Cumple con estándares de accesibilidad web (a11y)
- **Performance:** Optimizado para carga rápida y rendimiento

## 📂 Estructura del Proyecto

```
my-new-portfolio/
├── index.html              # Página principal
├── css/
│   ├── style.css          # Estilos principales
│   └── post.css           # Estilos para posts de blog
├── js/
│   └── main.js            # JavaScript para interactividad
├── posts/                 # Directorio de publicaciones del blog
│   └── [post-slug].html   # Archivos HTML de posts individuales
├── README.md              # Este archivo
└── .gitignore            # Archivos a ignorar en Git
```

## 🚀 Inicio Rápido

### Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/my-new-portfolio.git
   cd my-new-portfolio
   ```

2. **Abrir en tu navegador:**
   - Simplemente abre `index.html` en tu navegador preferido
   - O usa un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code

### Despliegue en GitHub Pages

1. **Habilitar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - En "Source", selecciona la rama `main` y la carpeta `/ (root)`
   - Haz clic en "Save"

2. **Acceder a tu sitio:**
   - Tu sitio estará disponible en `https://tu-usuario.github.io/my-new-portfolio/`
   - El despliegue puede tardar unos minutos

## ✏️ Personalización

### 1. Información Personal

Edita `index.html` y actualiza:

- **Nombre y título** en la sección hero
- **Sobre mí** en la sección about
- **Habilidades técnicas** en la sección expertise
- **Hobbies e intereses** en la sección hobbies
- **Enlaces de contacto** en la sección contact (Twitter/X, LinkedIn, GitHub, Email)

### 2. Colores y Estilos

Los colores se definen en variables CSS en `css/style.css`:

```css
:root {
    --primary-color: #2563eb;        /* Color principal */
    --primary-dark: #1e40af;         /* Color principal oscuro */
    --primary-light: #3b82f6;        /* Color principal claro */
    --text-primary: #0f172a;         /* Color de texto principal */
    --text-secondary: #475569;       /* Color de texto secundario */
    /* ... más variables ... */
}
```

Cambia estos valores para personalizar la paleta de colores.

### 3. Tipografía

El sitio usa la fuente [Inter](https://fonts.google.com/specimen/Inter). Para cambiarla:

1. Busca una fuente en [Google Fonts](https://fonts.google.com/)
2. Reemplaza el link en el `<head>` de `index.html`
3. Actualiza la variable `--font-family` en `css/style.css`

## 📝 Gestión de Posts del Blog

### Agregar un Nuevo Post

1. **Crear el archivo HTML:**
   - Copia un post existente de la carpeta `posts/`
   - Renómbralo según tu nuevo post (ej: `mi-nuevo-post.html`)

2. **Editar el contenido:**
   - Actualiza el título, fecha y contenido del post
   - Mantén la estructura HTML existente

3. **Registrar el post en el índice:**
   - Abre `js/main.js`
   - Agrega tu post al array `blogPosts`:

   ```javascript
   const blogPosts = [
       {
           title: 'Título de tu Post',
           date: '2024-03-20',  // Formato YYYY-MM-DD
           excerpt: 'Breve descripción del post...',
           slug: 'mi-nuevo-post'  // Nombre del archivo sin .html
       },
       // ... posts existentes ...
   ];
   ```

4. **Orden cronológico:**
   - Los posts se ordenan automáticamente por fecha (más reciente primero)
   - Asegúrate de usar el formato correcto de fecha (YYYY-MM-DD)

### Eliminar un Post

1. Elimina el archivo HTML de la carpeta `posts/`
2. Elimina la entrada correspondiente del array `blogPosts` en `js/main.js`

### Estructura de un Post

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción del post">
    <title>Título del Post | Portfolio</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/post.css">
</head>
<body>
    <!-- Navegación -->
    <nav class="navbar">...</nav>
    
    <!-- Contenido del Post -->
    <article class="post">
        <div class="container post-container">
            <header class="post-header">
                <a href="../index.html#blog" class="back-link">Volver al blog</a>
                <h1 class="post-title">Título del Post</h1>
                <div class="post-meta">
                    <span class="post-date">Fecha</span>
                    <span class="post-reading-time">• X min de lectura</span>
                </div>
            </header>
            
            <div class="post-content">
                <!-- Tu contenido aquí -->
            </div>
            
            <footer class="post-footer">
                <!-- Tags y botones de compartir -->
            </footer>
        </div>
    </article>
    
    <!-- Footer -->
    <footer class="footer">...</footer>
    
    <script src="../js/main.js"></script>
</body>
</html>
```

## 🎯 Secciones del Portfolio

### Inicio (Hero)
Presentación principal con título y llamadas a la acción.

### Sobre mí
Presentación profesional y personal. Cuenta tu historia, experiencia y valores.

### Experticia
Muestra tus habilidades técnicas, tecnologías que dominas y áreas de especialización.

### Hobbies
Comparte tus intereses personales, pasatiempos y actividades extracurriculares.

### Blog
Publicaciones organizadas cronológicamente. Comparte tutoriales, experiencias y conocimientos.

### Contacto
Enlaces directos a tus redes sociales y formas de contacto.

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica y accesible
- **CSS3:** Diseño moderno con variables CSS y Grid/Flexbox
- **JavaScript (Vanilla):** Interactividad sin dependencias
- **Google Fonts:** Tipografía Inter
- **GitHub Pages:** Hosting gratuito

## 📱 Responsividad

El sitio está optimizado para:
- 📱 Móviles (< 480px)
- 📱 Tablets (480px - 768px)
- 💻 Laptop (768px - 1200px)
- 🖥️ Desktop (> 1200px)

## ♿ Accesibilidad

- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores AA/AAA
- Texto alternativo en imágenes
- HTML semántico

## 🔧 Mantenimiento

### Actualizar Contenido
- Edita directamente los archivos HTML
- Los cambios se reflejan inmediatamente en GitHub Pages (puede tardar unos minutos)

### Agregar Nuevas Secciones
- Crea una nueva sección en `index.html`
- Agrega estilos correspondientes en `css/style.css`
- Agrega un enlace en la navegación

## 📄 Licencia

Este proyecto está disponible para uso personal y comercial.

## 🤝 Contribuciones

Si encuentras algún error o tienes sugerencias de mejora, no dudes en abrir un issue o pull request.

## 📧 Contacto

- Twitter/X: [@tu_usuario](https://twitter.com/tu_usuario)
- LinkedIn: [tu_usuario](https://linkedin.com/in/tu_usuario)
- GitHub: [tu_usuario](https://github.com/tu_usuario)
- Email: tu_email@example.com

---

**Construido con ❤️ y mucho café**
