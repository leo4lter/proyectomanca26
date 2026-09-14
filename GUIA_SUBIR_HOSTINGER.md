# 🚀 GUÍA DEFINITIVA: Subir la web de Manca a Hostinger

> **¿Por qué se veía en blanco?**
> Tu `index.html` SÍ estaba subido en Hostinger, pero la carpeta **`assets/`** (con el
> programa de la web `index-....js`, los estilos `index-....css` y las imágenes) **NO llegó**.
> Por eso el navegador pedía `assets/index-....js` y el servidor respondía **404** →
> página en blanco.
>
> Con el método ZIP que explicamos abajo es **imposible** que se vuelva a olvidar una
> carpeta: todo va en un solo archivo.

---

## 🧱 Paso 0: Generar el ZIP (una sola vez por actualización)

En la carpeta del proyecto (donde está `package.json`) abrí una terminal y ejecutá:

```bash
npm run deploy
```

Esto hace **dos cosas automáticamente**:
1. Compila la web (`npm run build`).
2. Crea el archivo **`deploy-manca.zip`** dentro de la carpeta del proyecto,
   con TODO lo que necesita la web: `index.html`, `assets/`, `api/` y `uploads/`.

> 💡 Si `npm run deploy` da error, primero probá `npm install` y volvé a intentar.

---

## 📂 Paso 1: Entrar al panel de Hostinger

1. Entrá a [hostinger.com](https://hostinger.com) e iniciá sesión.
2. Andá a **Sitios Web** → botón **Administrar** en tu dominio (`elmanca.com.ar`).
3. Buscá y abrí el **Administrador de Archivos** (File Manager).

---

## 📤 Paso 2: Subir el ZIP

1. En el Administrador de Archivos, entrá a la carpeta **`public_html/`**.
2. Arriba a la izquierda, click en **Subir** (Upload) y seleccioná
   `deploy-manca.zip` (el archivo que generaste en el Paso 0).
3. Esperá a que termine de subir (100%).

---

## 📦 Paso 3: Extraer el ZIP

1. Cuando el archivo termine de subir, verás `deploy-manca.zip` dentro de `public_html/`.
2. Hacé **click derecho** sobre el ZIP → **Extraer** (Extract).
3. Esperá a que termine. Al extraerse, quedará así dentro de `public_html/`:

```
public_html/
├── index.html        ← la página principal
├── assets/           ← el JS, CSS e imágenes (¡lo que faltaba!)
├── api/              ← la API del panel de administración
├── uploads/          ← fotos del panel
└── deploy-manca.zip  ← BORRALO
```

4. **Borrá el archivo `deploy-manca.zip`** (click derecho → Eliminar).

---

## ✅ Paso 4: Verificar que quedó bien

Abrí estas direcciones en el navegador (reemplazá `elmanca.com.ar` por tu dominio):

| Dirección | Resultado correcto |
|---|---|
| `https://elmanca.com.ar/` | La web completa, NO en blanco |
| `https://elmanca.com.ar/api/content.php` | Un texto JSON con "API activa" |

**Verificación extra (la más importante):**
Inspeccioná la página con **F12 → pestaña Network (Red)** y recargá con **Ctrl+F5**.
No debe haber líneas en **rojo** con error 404.

> 🔍 Tip: Si usás un dominio de Hostinger nuevo o cambiás algo, esperá unos minutos
> y recargá con **Ctrl+F5** (recarga forzada, limpia la caché del navegador).

---

## 🔧 Solo si la web SIGUE sin verse

1. **¿El error 404 sigue saliendo en `assets/...`?**
   → El `assets/` no llegó. Rehacé el ZIP (`npm run deploy`) y volvé a subirlo
   con los pasos 2 y 3 (esta vez verificá que la carpeta `assets/` aparezca
   extraída en `public_html/`).

2. **¿Usaste otro método (FTP/FileZilla)?**
   → Si preferís FTP, seleccioná **TODOS** los archivos dentro de `dist/`
   (incluida la carpeta `assets/`) y arrastralos a `public_html/`. Nunca subas
   la carpeta `dist` en sí.

3. **¿El panel de administración falta?**
   → Abrí `https://elmanca.com.ar/#admin` (o tu dominio + `#admin`).

---

## 🔄 Para futuras actualizaciones

1. Cambiá el contenido que quieras.
2. En la terminal del proyecto: `npm run deploy`.
3. Subí el nuevo `deploy-manca.zip` a `public_html/` y extraelo (pasos 1 a 3).
   El servidor reemplaza los archivos viejos automáticamente.