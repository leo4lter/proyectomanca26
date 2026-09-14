# 🚀 Guía de Instalación en Hostinger para Manca Productora

## ✅ MÉTODO RECOMENDADO (simple y a prueba de errores): ZIP + Extraer

> ⚠️ IMPORTANTE: Si subís los archivos sueltos por arrastrar y soltar, es fácil que
> se olvide una carpeta (como `assets/`), y la web queda EN BLANCO con errores 404.
> El método ZIP evita eso porque incluye todo en un solo archivo.

### ¿Cómo se ve en blanco? Cuadro de error típico en el navegador
```
index-XXXXXX.js:1  Failed to load resource: the server responded with a status of 404 ()
index-XXXXXX.css:1 Failed to load resource: the server responded with a status of 404 ()
```
⇒ Significa que `index.html` está subido pero **la carpeta `assets/` NO llegó al hosting**.

### Pasos con ZIP
1. En la carpeta del proyecto, abrí una terminal y ejecutá:
   ```bash
   npm run deploy
   ```
   (compila la web y genera `deploy-manca.zip` con todo adentro).
2. En hPanel → Archivos (File Manager) → entrá a `public_html/`.
3. Subí `deploy-manca.zip`, hacé click derecho → **Extract** y esperá.
4. Borrá el `.zip`. Listo.

Verificación: `https://elmanca.com.ar/assets/index-....js` NO debe responder 404,
y `https://elmanca.com.ar/api/content.php` debe responder con un JSON.

---

## 📁 Archivos incluidos para Hostinger

En esta carpeta encontrarás los archivos listos para colocar en tu hosting:
1. `api/content.php` → Guarda y lee todo el contenido (`siteContent.json`) en tu servidor de Hostinger.
2. `api/upload.php` → Recibe las imágenes que subes desde el panel, las guarda en `/uploads/` y genera URLs reales (ej: `https://elmanca.com.ar/uploads/imagen.jpg`).
3. `api/.htaccess` → Configura los permisos CORS para que puedas editar tanto desde tu dominio como desde el panel de desarrollo.

---

## ⚡ Pasos Rápidos en el Administrador de Archivos de Hostinger (hPanel)

### Paso 1: Entrar a Hostinger
1. Inicia sesión en [hostinger.com](https://hostinger.com).
2. Ve a **Sitios Web** > **Administrar** en tu dominio (`elmanca.com.ar`).
3. Abre el **Administrador de Archivos** (File Manager) y entra a la carpeta `public_html/`.

### Paso 2: Crear o Subir la carpeta `api/`
1. Dentro de `public_html/`, crea una carpeta llamada `api/`.
2. Sube dentro de `api/`:
   - `content.php`
   - `upload.php`
   - `.htaccess`

### Paso 3: Crear la carpeta `uploads/`
1. En la raíz de `public_html/`, crea una carpeta llamada `uploads/`.
2. Asegúrate de que tenga permisos `755` (los permisos habituales de Hostinger).

### Paso 4: Subir la web compilada (si la alojas completa en Hostinger)
1. Cuando descargues el proyecto o ejecutes `npm run build`, se generará la carpeta `dist/`.
2. Todo el contenido de `dist/` (incluyendo `index.html`, `assets/`, y la carpeta `api/`) se copia dentro de `public_html/`.
3. ¡Listo! Al entrar a tu panel de administración, cada imagen que subas se guardará en `public_html/uploads/` y cada cambio de texto quedará grabado en Hostinger para siempre.

---

## 🔗 Probar que funciona
Abre en tu navegador:
`https://elmanca.com.ar/api/content.php`
Deberías ver un mensaje en formato JSON confirmando que la API está activa y lista.
