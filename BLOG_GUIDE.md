# Guía para Gestionar Posts del Blog

Esta guía te ayudará a agregar, modificar y eliminar publicaciones en tu portfolio de manera sencilla.

## 📝 Agregar un Nuevo Post

### Paso 1: Crear el archivo HTML del post

1. Ve a la carpeta `posts/`
2. Copia un post existente como plantilla (por ejemplo, `construyendo-aplicaciones-modernas-react.html`)
3. Renómbralo con el slug de tu nuevo post (usa guiones para separar palabras):
   ```
   mi-nuevo-articulo.html
   ```

### Paso 2: Editar el contenido del post

Abre el archivo HTML y actualiza lo siguiente:

#### En el `<head>`:
```html
<meta name="description" content="Descripción corta de tu post">
<title>Título del Post | Portfolio</title>
```

#### En el contenido:
```html
<!-- Actualiza el título -->
<h1 class="post-title">Título de Tu Post</h1>

<!-- Actualiza la fecha y tiempo de lectura -->
<div class="post-meta">
    <span class="post-date">DD de mes de YYYY</span>
    <span class="post-reading-time">• X min de lectura</span>
</div>

<!-- Actualiza el contenido -->
<div class="post-content">
    <p class="lead">Introducción destacada del post...</p>
    
    <h2>Tu Primer Subtítulo</h2>
    <p>Contenido del post...</p>
    
    <!-- Más contenido aquí -->
</div>

<!-- Actualiza los tags al final -->
<div class="post-tags">
    <span class="tag">Tag1</span>
    <span class="tag">Tag2</span>
    <span class="tag">Tag3</span>
</div>
```

### Paso 3: Registrar el post en el índice

1. Abre el archivo `js/main.js`
2. Busca el array `blogPosts` (está cerca del inicio del archivo)
3. Agrega tu nuevo post **al inicio del array** para que aparezca primero:

```javascript
const blogPosts = [
    {
        title: 'Título de Tu Nuevo Post',
        date: '2024-03-20',  // Formato: YYYY-MM-DD
        excerpt: 'Descripción breve y atractiva del post que aparecerá en la lista...',
        slug: 'mi-nuevo-articulo'  // Sin .html, debe coincidir con el nombre del archivo
    },
    // ... posts existentes ...
];
```

### Paso 4: Verificar

1. Guarda todos los archivos
2. Abre `index.html` en tu navegador
3. Navega a la sección "Blog"
4. Verifica que tu post aparezca en la lista
5. Haz clic en "Leer más" para verificar que el contenido se vea correctamente

## ✏️ Editar un Post Existente

1. Abre el archivo HTML del post en la carpeta `posts/`
2. Realiza tus cambios
3. Si cambias el título o fecha, actualiza también el objeto correspondiente en `js/main.js`
4. Guarda y verifica los cambios

## 🗑️ Eliminar un Post

1. Elimina el archivo HTML del post en la carpeta `posts/`
2. Abre `js/main.js` y elimina el objeto correspondiente del array `blogPosts`
3. Guarda los cambios

## 📋 Elementos de Contenido Disponibles

### Párrafos
```html
<p>Tu texto aquí...</p>
```

### Párrafo destacado (Lead)
```html
<p class="lead">Introducción importante...</p>
```

### Títulos
```html
<h2>Título Principal de Sección</h2>
<h3>Subtítulo</h3>
```

### Listas
```html
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
</ul>

<ol>
    <li>Primer paso</li>
    <li>Segundo paso</li>
</ol>
```

### Listas con énfasis
```html
<ul>
    <li><strong>Término importante:</strong> Descripción del término</li>
</ul>
```

### Código inline
```html
<p>Usa <code>const</code> para variables constantes.</p>
```

### Bloques de código
```html
<pre><code>function ejemplo() {
    console.log("Hola mundo");
    return true;
}</code></pre>
```

### Enlaces
```html
<a href="https://example.com">Texto del enlace</a>
```

### Citas
```html
<blockquote>
    <p>Texto de la cita...</p>
</blockquote>
```

### Imágenes
```html
<img src="../images/mi-imagen.jpg" alt="Descripción de la imagen">
```

## 🎨 Tags Recomendados

Usa tags relevantes para categorizar tus posts:

**Lenguajes:**
- JavaScript
- Python
- TypeScript
- Java
- Go

**Frontend:**
- React
- Vue.js
- CSS
- HTML
- Tailwind CSS

**Backend:**
- Node.js
- Django
- Express
- API
- GraphQL

**DevOps:**
- Docker
- Kubernetes
- CI/CD
- AWS
- Azure

**Conceptos:**
- Best Practices
- Tutorial
- Design Patterns
- Architecture
- Performance
- Security
- Testing

## 📅 Formato de Fecha

**En HTML (para mostrar):**
```html
<span class="post-date">15 de marzo de 2024</span>
```

**En JavaScript (para ordenar):**
```javascript
date: '2024-03-15'  // Siempre YYYY-MM-DD
```

Los meses en español:
- enero, febrero, marzo, abril, mayo, junio
- julio, agosto, septiembre, octubre, noviembre, diciembre

## 💡 Tips para Buenos Posts

1. **Título claro y descriptivo:** Debe explicar de qué trata el post
2. **Introducción atractiva:** Usa `<p class="lead">` para destacar el resumen
3. **Estructura clara:** Usa títulos H2 y H3 para organizar el contenido
4. **Código legible:** Usa bloques de código con indentación apropiada
5. **Tags relevantes:** 3-5 tags son suficientes
6. **Estimación de lectura:** Aproximadamente 200 palabras = 1 minuto
7. **Imágenes optimizadas:** Si usas imágenes, optimízalas para web

## 🔍 Solución de Problemas

### El post no aparece en la lista
- Verifica que agregaste el objeto en `blogPosts` en `js/main.js`
- Asegúrate de que el formato de fecha sea correcto (YYYY-MM-DD)
- Revisa que no haya errores de sintaxis en el JavaScript

### El post aparece pero el enlace no funciona
- Verifica que el `slug` en `js/main.js` coincida exactamente con el nombre del archivo (sin .html)
- Verifica que el archivo esté en la carpeta `posts/`

### El orden cronológico es incorrecto
- Los posts se ordenan automáticamente por fecha
- Verifica que la fecha esté en formato YYYY-MM-DD
- El post con fecha más reciente aparecerá primero

### Los estilos no se aplican correctamente
- Verifica que los enlaces a CSS estén correctos en el `<head>`:
  ```html
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/post.css">
  ```

## 📦 Estructura de un Post Completo

Aquí está la estructura mínima recomendada para un post:

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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Copiar la navegación de cualquier post existente -->
    <nav class="navbar" id="navbar">...</nav>

    <!-- Contenido del post -->
    <article class="post">
        <div class="container post-container">
            <header class="post-header">
                <a href="../index.html#blog" class="back-link">...</a>
                <h1 class="post-title">Tu Título</h1>
                <div class="post-meta">...</div>
            </header>

            <div class="post-content">
                <!-- Tu contenido aquí -->
            </div>

            <footer class="post-footer">
                <div class="post-tags">...</div>
                <div class="post-share">...</div>
            </footer>
        </div>
    </article>

    <!-- Copiar el footer de cualquier post existente -->
    <footer class="footer">...</footer>

    <script src="../js/main.js"></script>
</body>
</html>
```

## 🚀 Commit y Deploy

Después de agregar o modificar posts:

1. **Commit tus cambios:**
   ```bash
   git add .
   git commit -m "Add new blog post: [título del post]"
   git push
   ```

2. **GitHub Pages actualizará automáticamente** tu sitio en unos minutos

---

**¿Necesitas ayuda?** Consulta el README.md principal o revisa los posts de ejemplo en la carpeta `posts/`.
