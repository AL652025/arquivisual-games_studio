// =======================================================================
// ARQUIVISUAL GAMES - Catálogo de Videojuegos (GDevelop, Itch.io, HTML5)
// Edita o agrega nuevos juegos en este archivo fácilmente.
// =======================================================================

const ARQUIVISUAL_GAMES = [
    {
        id: "cyber-runner",
        title: "CYBER ARQUITECTO: MATRIX RUN",
        subtitle: "Arcade Sci-Fi & Geometría Espacial",
        engine: "Arquivisual Engine (HTML5)",
        category: "arcade",
        isBuiltin: true,
        badge: "🔥 JUGABLE AQUÍ",
        version: "v1.2.0",
        rating: 4.9,
        playsCount: "14.2K",
        downloadsCount: "3.5K",
        gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        shortDesc: "Explora la megaestructura virtual esquivando barreras de datos, saltando sobre plataformas holográficas y recolectando núcleos de energía cuántica.",
        description: "En un futuro donde la arquitectura y los códigos digitales se fusionan, controlas a un arquitecto cibernético que debe calibrar las estructuras del metaverso. Salta, haz dash en el aire y recolecta núcleos antes de que colapse la simulación.",
        features: [
            "Físicas dinámicas de salto y aceleración en 60 FPS",
            "Generación procedural de plataformas de neón",
            "Efectos de partículas y síntesis de audio retro en tiempo real",
            "Jugable directamente en PC y Móvil con controles táctiles"
        ],
        controls: {
            pc: "ESPACIO / W / Flecha Arriba: Saltar | Doble Salto disponible",
            mobile: "Toca el botón 'SALTAR' o cualquier parte de la pantalla"
        },
        playMode: "builtin",
        playUrl: "#builtin-arcade",
        downloadUrl: "#descargar-cyber-runner",
        itchUrl: "https://itch.io",
        tags: ["HTML5", "GDevelop Ready", "Arcade", "Cyberpunk", "Pixel/Neon"]
    },
    {
        id: "gdevelop-quest",
        title: "NEON PROTOCOL: GDEVELOP ED.",
        subtitle: "Aventura Plataformas 2D en GDevelop",
        engine: "GDevelop",
        category: "platformer",
        isBuiltin: false,
        badge: "🎮 GDEVELOP HTML5",
        version: "v1.0.4",
        rating: 4.8,
        playsCount: "8.9K",
        downloadsCount: "2.1K",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        shortDesc: "Juego de acción y plataformas exportado directamente desde GDevelop en HTML5. Compatible con WebGL y ejecutable en cualquier navegador.",
        description: "Construido íntegramente con el motor GDevelop. Con físicas de plataformas avanzadas, enemigos con IA de patrulla, trampas láser y niveles diseñados con estética arquitectónica futurista.",
        features: [
            "Creado con el motor GDevelop 5",
            "Múltiples zonas con jefes mecánicos",
            "Soporte completo para teclado, gamepad y pantalla táctil",
            "Exportable a Windows .exe y Web HTML5"
        ],
        controls: {
            pc: "A/D o Flechas: Moverse | Espacio: Salto | J: Ataque de Plasma",
            mobile: "D-Pad táctil en pantalla"
        },
        playMode: "gdevelop_local",
        // Aquí puedes colocar la ruta relativa dentro de la carpeta /games/
        playUrl: "games/gdevelop-quest/index.html",
        downloadUrl: "https://itch.io",
        itchUrl: "https://itch.io",
        tags: ["GDevelop", "HTML5", "Plataformas", "Acción", "2D"]
    },
    {
        id: "arch-dimension-3d",
        title: "ARQUIVISUAL: ESPACIO DIMENSIONAL",
        subtitle: "Exploración Arquitectónica Interactiva",
        engine: "Itch.io",
        category: "3d",
        isBuiltin: false,
        badge: "🏛️ ITCH.IO EXCLUSIVE",
        version: "v2.0.1",
        rating: 5.0,
        playsCount: "19.4K",
        downloadsCount: "5.8K",
        gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
        shortDesc: "Camina por rascacielos paramétricos, museos flotantes y espacios arquitectónicos interactivos con iluminación global y modo cinemático.",
        description: "La joya de la corona del estudio Arquivisual Games. Una experiencia inmersiva que mezcla el diseño de interiores, arquitectura contemporánea y mecánicas de videojuegos.",
        features: [
            "Ambientes tridimensionales de alta fidelidad",
            "Modo cámara libre y modo captura fotográfica",
            "Banda sonora ambiental atmosférica",
            "Versión descargable para PC en alta resolución"
        ],
        controls: {
            pc: "WASD: Caminar | Ratón: Mirar | Shift: Correr | Espacio: Salto",
            mobile: "Sticks analógicos virtuales"
        },
        playMode: "itch_embed",
        playUrl: "https://itch.io",
        downloadUrl: "https://itch.io",
        itchUrl: "https://itch.io",
        tags: ["Itch.io", "Arquitectura 3D", "Inmersivo", "Render", "Exploración"]
    },
    {
        id: "retro-drift-velocity",
        title: "VELOCITY MATRIX: DRIFT 84",
        subtitle: "Carreras Arcade Synthwave",
        engine: "GDevelop",
        category: "arcade",
        isBuiltin: false,
        badge: "⚡ VELOCIDAD PURA",
        version: "v0.9.8",
        rating: 4.7,
        playsCount: "6.2K",
        downloadsCount: "1.4K",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        shortDesc: "Derrapes a toda velocidad por autopistas infinitas con estética synthwave, luces de neón y música electrónica retro.",
        description: "Un tributo a los arcades clásicos de los 80s con mecánicas modernas desarrolladas en GDevelop. Esquiva el tráfico, consigue nitros y desbloquea vehículos conceptuales inspirados en la arquitectura futurista.",
        features: [
            "Sistema de derrape y nitro con puntuación combo",
            "Música synthwave sincronizada",
            "Tabla de puntuaciones récord locales",
            "Optimizado para 60 FPS estables"
        ],
        controls: {
            pc: "Flechas Izq/Der o A/D: Dirección | Espacio: Freno de mano / Drift | Shift: Nitro",
            mobile: "Giroscopio o botones táctiles"
        },
        playMode: "gdevelop_local",
        playUrl: "games/velocity-matrix/index.html",
        downloadUrl: "https://itch.io",
        itchUrl: "https://itch.io",
        tags: ["GDevelop", "Arcade", "Carreras", "Synthwave", "Retro"]
    },
    {
        id: "quantum-architect-puzzle",
        title: "CHRONO ARCHITECT: PUZZLES",
        subtitle: "Rompecabezas Espaciales & Ópticos",
        engine: "Itch.io",
        category: "puzzle",
        isBuiltin: false,
        badge: "🧠 INGENIO & DISEÑO",
        version: "v1.1.0",
        rating: 4.9,
        playsCount: "11.1K",
        downloadsCount: "3.2K",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        shortDesc: "Modifica la gravedad y rota salas completas para crear caminos imposibles basados en las geometrías de M.C. Escher.",
        description: "Pon a prueba tu mente reconstruyendo planos y estructuras que desafían las leyes de la física. Cada nivel es una obra de arte arquitectónica interactiva.",
        features: [
            "Más de 30 niveles con dificultad progresiva",
            "Mecánica de rotación de gravedad en 4 ejes",
            "Efectos visuales de distorsión lumínica",
            "Disponible para jugar en navegador y descarga offline"
        ],
        controls: {
            pc: "Click y arrastrar: Rotar escenario | R: Reiniciar nivel | Z: Deshacer paso",
            mobile: "Gestos táctiles de swipe y pinza"
        },
        playMode: "itch_embed",
        playUrl: "https://itch.io",
        downloadUrl: "https://itch.io",
        itchUrl: "https://itch.io",
        tags: ["Itch.io", "Puzzle", "Geometría", "Lógica", "Arte"]
    }
];

// Helper para exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARQUIVISUAL_GAMES;
}
