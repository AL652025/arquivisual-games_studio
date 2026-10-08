# 🎮 ARQUIVISUAL GAMES - Portal Web Interactivo

Plataforma oficial de videojuegos de **Arquivisual Games Studio**. Diseñada para jugar online y descargar títulos desarrollados en **GDevelop**, **Itch.io** y tecnologías WebGL / HTML5.

![Banner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![GDevelop](https://img.shields.io/badge/Engine-GDevelop%205-blue)
![Itch.io](https://img.shields.io/badge/Store-Itch.io-red)
![HTML5](https://img.shields.io/badge/Frontend-HTML5%20%7C%20WebGL-orange)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-purple)

---

## 🌟 Características de la Web

1. **Consola Arcade en Vivo (Hero Section)**:
   - Mini-juego cyberpunk interactivo integrado (*Cyber Arquitecto: Matrix Run*) con generación procedural de plataformas, salto, doble salto, recolección de núcleos y audio sintetizado en tiempo real mediante la **Web Audio API**.
2. **Catálogo Dinámico de Videojuegos**:
   - Tarjetas interactivas con tags, puntuaciones, estado, requisitos de sistema y enlaces directos.
   - Filtros instantáneos (*Todos, GDevelop HTML5, Itch.io, 3D Arquitectura, Arcade*).
   - Buscador en tiempo real por título, género o tecnología.
3. **Modal de Juego y Descargas**:
   - **Jugar Online**: Embebido directo en pantalla con soporte para pantalla completa.
   - **Descargar**: Opciones de descarga directa para Windows (`.exe`), paquete portátil (`.zip`) y enlace directo a **itch.io**.
4. **Sistema de Efectos de Sonido Retro**:
   - Sintetizador procedural sci-fi (sin dependencias ni archivos pesados de audio).
   - Botón de silencio global (*Mute*).
5. **Listo para GitHub Pages**:
   - Incluye workflow de GitHub Actions (`.github/workflows/deploy.yml`) para despliegue automático con HTTPS gratuito.

---

## 📁 Estructura del Proyecto

```text
arquivisual-games/
├── index.html                 # Página principal interactiva
├── css/
│   └── styles.css             # Estilos Cyberpunk / Glassmorphism
├── js/
│   ├── app.js                 # Lógica de renderizado, búsqueda, modales y descargas
│   ├── games-data.js          # Base de datos editable de todos tus juegos
│   ├── arcade-engine.js       # Motor de mini-juego interactivo Canvas 60 FPS
│   └── sound-fx.js            # Sintetizador de audio Web Audio API
├── games/                     # Carpeta para tus juegos exportados de GDevelop
│   └── gdevelop-quest/        # Plantilla jugable HTML5 de GDevelop
│       └── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml         # Despliegue automático a GitHub Pages
└── README.md                  # Esta documentación
```

---

## 🚀 Cómo Agregar Tus Juegos de GDevelop

1. **Exportar desde GDevelop**:
   - Abre tu proyecto en GDevelop 5.
   - Haz clic en **Archivo** → **Exportar al juego**.
   - Selecciona **Web (carpeta local HTML5)**.
2. **Copiar a este proyecto**:
   - Crea una subcarpeta dentro de `/games/` (por ejemplo: `/games/mi-juego/`).
   - Pega allí todos los archivos exportados por GDevelop (`index.html`, imágenes, scripts).
3. **Registrarlo en la web**:
   - Abre `js/games-data.js` y añade tu nuevo juego al arreglo `ARQUIVISUAL_GAMES`:
   ```javascript
   {
       id: "mi-juego",
       title: "EL NOMBRE DE TU JUEGO",
       subtitle: "Acción & Aventura 2D",
       engine: "GDevelop",
       category: "action",
       playMode: "gdevelop_local",
       playUrl: "games/mi-juego/index.html",
       downloadUrl: "https://tu-usuario.itch.io/mi-juego",
       itchUrl: "https://tu-usuario.itch.io/mi-juego",
       shortDesc: "Tu descripción aquí...",
       tags: ["GDevelop", "HTML5", "Acción"]
   }
   ```
4. ¡Listo! Aparecerá automáticamente en la web con botones de jugar online y descargar.

---

## 🌐 Cómo Conectar tus Juegos de Itch.io

1. Sube tu juego a tu perfil de [itch.io](https://itch.io).
2. Si configuraste tu juego como ejecutable en el navegador en itch.io, puedes obtener el link de embed o el link público.
3. En `js/games-data.js`, coloca tu enlace en `itchUrl` y `downloadUrl`.

---

## 📦 Cómo Publicar en GitHub Pages

1. Inicia sesión en GitHub con tu cuenta.
2. Crea un nuevo repositorio público llamado `arquivisual-games`.
3. En tu terminal o consola:
   ```bash
   git init
   git add .
   git commit -m "Arquivisual Games v1.0"
   git branch -M main
   git remote add origin https://github.com/<TU_USUARIO>/arquivisual-games.git
   git push -u origin main
   ```
4. En GitHub, ve a **Settings** → **Pages** → en *Source* selecciona **GitHub Actions** (o la rama `main`).
5. ¡Tu web estará disponible al instante en `https://<TU_USUARIO>.github.io/arquivisual-games/`!
