# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a publicar tu portfolio en GitHub Pages.

## Paso a Paso

### 1. Preparar el Repositorio

Tu código ya está en GitHub. Verifica que todo esté actualizado:

```bash
git status
git push
```

### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/angra8410/my-new-portfolio`

2. Haz clic en **Settings** (Configuración) en la parte superior

3. En el menú lateral izquierdo, busca y haz clic en **Pages**

4. En la sección "Build and deployment":
   - **Source:** Selecciona "Deploy from a branch"
   - **Branch:** Selecciona `main` (o la rama donde esté tu código)
   - **Folder:** Selecciona `/ (root)`

5. Haz clic en **Save** (Guardar)

### 3. Esperar el Despliegue

- GitHub Pages comenzará a construir tu sitio automáticamente
- Esto puede tardar 1-5 minutos
- Recibirás una URL como: `https://angra8410.github.io/my-new-portfolio/`

### 4. Verificar el Sitio

Una vez desplegado:

1. Visita la URL proporcionada
2. Verifica que todas las secciones carguen correctamente
3. Prueba la navegación en móvil y desktop
4. Revisa que los posts del blog abran correctamente

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

GitHub Pages actualizará automáticamente tu sitio en unos minutos.

## 🌐 Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio:

1. Ve a Settings > Pages en tu repositorio
2. En "Custom domain", ingresa tu dominio (ej: `miportfolio.com`)
3. Haz clic en Save
4. Configura los DNS de tu dominio para apuntar a GitHub Pages:
   - Para apex domain (miportfolio.com):
     - Tipo: A
     - Nombre: @
     - Valor: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - Para subdomain (www.miportfolio.com):
     - Tipo: CNAME
     - Nombre: www
     - Valor: angra8410.github.io

## 🔒 HTTPS

GitHub Pages proporciona HTTPS automáticamente:
- Marca la casilla "Enforce HTTPS" en Settings > Pages
- Espera unos minutos para que se active el certificado SSL

## 📊 Verificar el Build

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el historial de despliegues
3. Un check verde ✅ indica éxito
4. Una X roja ❌ indica un error (revisa los logs)

## 🐛 Solución de Problemas

### El sitio no carga
- Verifica que GitHub Pages esté habilitado en Settings
- Asegúrate de que la rama y carpeta correctas estén seleccionadas
- Espera 5-10 minutos después de configurar

### Las imágenes o estilos no cargan
- Verifica que las rutas sean relativas (no absolutas)
- Revisa que los archivos existan en el repositorio
- Limpia la caché del navegador (Ctrl+Shift+R)

### Los posts del blog dan error 404
- Verifica que los archivos `.html` estén en la carpeta `posts/`
- Asegúrate de que los nombres de archivo coincidan con los slugs en `js/main.js`
- Los nombres son case-sensitive (sensibles a mayúsculas/minúsculas)

### Los cambios no se reflejan
- Espera 5-10 minutos después de hacer push
- Limpia la caché del navegador
- Prueba en modo incógnito
- Verifica el estado del build en Actions

## 📝 Checklist Pre-Deploy

Antes de desplegar, asegúrate de:

- [ ] Personalizar tu información en `index.html`
- [ ] Actualizar enlaces de redes sociales
- [ ] Verificar que todos los links funcionen localmente
- [ ] Revisar ortografía y gramática
- [ ] Probar en diferentes navegadores
- [ ] Verificar responsividad en móvil

## 🎉 ¡Listo!

Tu portfolio profesional está ahora en línea y accesible para todo el mundo.

### Comparte tu portfolio:
- LinkedIn
- Twitter/X
- CV y aplicaciones de empleo
- Tarjetas de presentación

---

**¿Necesitas más ayuda?** Consulta la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages).
