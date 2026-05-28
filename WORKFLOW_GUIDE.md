# 📖 Guía de Flujo de Trabajo: Portafolio .pbip

Esta guía explica cómo utilizar el sistema de automatización para mantener tu portafolio de datos organizado, versionado y actualizado.

---

## 1. Crear un Nuevo Proyecto
Cuando decidas empezar un nuevo análisis, usa el script de PowerShell para generar la arquitectura de carpetas profesional.

1. Abre PowerShell en la raíz de este repositorio.
2. Ejecuta el script:
   ```powershell
   ./Create-Project.ps1 -ProjectName "nombre-de-tu-proyecto" -InitGit
   ```
   *Esto creará la carpeta en: `C:\Users\antoi\OneDrive\MyPortfolio\nombre-de-tu-proyecto`*

---

## 2. Guardar en Power BI Desktop
Para aprovechar el control de versiones y el formato de texto (DAX/JSON):

1. En Power BI Desktop, ve a **Archivo > Guardar como**.
2. Selecciona el tipo: **Archivo de proyecto de Power BI (*.pbip)**.
3. **Ubicación Crítica:** Guarda el archivo dentro de la subcarpeta `powerbi` creada por el script.
   - *Ejemplo:* `...\nombre-de-tu-proyecto\powerbi\nombre-de-tu-proyecto.pbip`

---

## 3. Estructura del Proyecto
Tu proyecto ahora tiene un lugar para cada cosa:
- `assets/`: Capturas de pantalla para el portafolio.
- `docs/`: Diccionarios de datos o metodología.
- `powerbi/`: El reporte desglosado en archivos de texto (Git-friendly).
- `sql/`: Scripts de limpieza y transformación.
- `metadata.json`: Contiene la fecha de creación para tu portafolio.

---

## 4. Actualizar el Portafolio Web
Para que el nuevo proyecto aparezca en tu sitio web:

1. Abre `js/main.js`.
2. Busca el array `const projects = [...]`.
3. Añade un nuevo objeto copiando la fecha de `metadata.json`:
   ```javascript
   {
     title: 'Nombre del Proyecto',
     date: '2024-05-28', // La fecha de metadata.json
     category: 'Caso de estudio',
     image: 'img/tu-captura.png',
     excerpt: 'Breve descripción del impacto del proyecto...',
     tech: ['SQL', 'Power BI', 'DAX'],
     metrics: ['KPI 1', 'KPI 2'],
     detailUrl: 'projects/nombre-del-proyecto.html',
     repoUrl: 'https://github.com/tu-usuario/nombre-del-repo'
   }
   ```
4. **Badge de "Nuevo":** Si la fecha es de hace menos de 30 días, el sitio mostrará automáticamente el badge de "Nuevo".

---

## 5. Mejores Prácticas
- **Commits Claros:** Haz commits cuando termines una medida DAX compleja o un cambio visual importante. Git ahora puede leer esos cambios.
- **Capturas de Pantalla:** Guarda siempre una captura principal en `assets/screenshots/` para usarla como portada en el sitio web.
- **Documentación:** El script genera un `README.md` inicial; complétalo con el "Business Case" para impresionar a los reclutadores.
