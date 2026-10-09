// =======================================================================
// ARQUIVISUAL GAMES STUDIOS - Base de Datos Central
// 4 CATEGORÍAS OFICIALES:
// 1. VIDEOGAMES (Videojuegos Completos)
// 2. MINI GAMES (Mini Videojuegos Arcade / HTML5 para jugar y descargar)
// 3. ASSETS (Modelos 3D, Texturas, UI y Sprites)
// 4. GAME SYSTEMS (Mecánicas, Plantillas y Lógica de Juego)
// =======================================================================

// CONFIGURACIÓN DE LOS 4 BANNERS DE CATEGORÍA
const ARQUIVISUAL_CATEGORIES = {
    videogames: {
        id: "videogames",
        name: "Videojuegos",
        title: "VIDEOJUEGOS COMPLETOS",
        subtitle: "Aventuras inmersivas, mundos 3D y títulos destacados",
        badge: "🎮 CATEGORÍA PRINCIPAL",
        gradient: "linear-gradient(135deg, #0284c7 0%, #3b82f6 50%, #1e1b4b 100%)",
        icon: "🎮",
        // Aquí puedes poner la ruta de tu banner personalizado (ej: 'assets/banner-videogames.png')
        bannerImg: "assets/banner-videogames.png",
        description: "Videojuegos de producción completa desarrollados por Arquivisual Games Studios. Disponibles para jugar en el navegador y con descargas para Windows y móviles."
    },
    minigames: {
        id: "minigames",
        name: "Mini Videojuegos",
        title: "MINI VIDEOJUEGOS & ARCADE",
        subtitle: "Juegos rápidos, acción instantánea en navegador y descargas ligeras",
        badge: "⚡ JUGAR AL INSTANTE",
        gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #311042 100%)",
        icon: "🕹️",
        bannerImg: "assets/banner-minigames.png",
        description: "Partidas rápidas, arcades a 60 FPS con físicas dinámicas y controles accesibles. Cualquiera puede jugarlos online sin instalar nada o descargarlos portables."
    },
    assets: {
        id: "assets",
        name: "Assets",
        title: "ASSETS & RECURSOS 3D / 2D",
        subtitle: "Modelos 3D, texturas, props arquitectónicos, UI y sprites",
        badge: "📦 RECURSOS DE DESARROLLO",
        gradient: "linear-gradient(135deg, #059669 0%, #10b981 50%, #064e3b 100%)",
        icon: "📦",
        bannerImg: "assets/banner-assets.png",
        description: "Paquetes de recursos optimizados para creadores en Blender, GDevelop, Unity y Godot. Descarga directa en formatos estándar (.blend, .fbx, .png)."
    },
    gamesystems: {
        id: "gamesystems",
        name: "Game Systems",
        title: "GAME SYSTEMS & PLANTILLAS",
        subtitle: "Sistemas de mecánicas, lógica interactiva y controladores listos para usar",
        badge: "⚙️ PLANTILLAS & LÓGICA",
        gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #451a03 100%)",
        icon: "⚙️",
        bannerImg: "assets/banner-gamesystems.png",
        description: "Sistemas modulares, controladores de personajes, kits de físicas e inteligencias artificiales para acelerar el desarrollo de tus propios juegos."
    }
};

// CATÁLOGO DE ELEMENTOS POR CATEGORÍA
const ARQUIVISUAL_GAMES = [
    // -------------------------------------------------------------
    // 1. VIDEOGAMES (Videojuegos Completos)
    // -------------------------------------------------------------
    {
        id: "hop-hop-islands",
        title: "HOP HOP ISLANDS",
        subtitle: "Aventura 3D Arcade - Reconstruye el Gran Arcoíris",
        category: "videogames",
        categoryName: "Videojuegos",
        engine: "Itch.io (Unity / HTML5)",
        isBuiltin: false,
        badge: "⭐ ESTRELLA OFICIAL",
        version: "v1.1.0",
        rating: 5.0,
        playsCount: "25.8K",
        downloadsCount: "4.2K",
        gradient: "linear-gradient(135deg, #0284c7 0%, #f43f5e 100%)",
        coverImg: "https://img.itch.zone/aW1nLzMwNjY2NjA0LnBuZw==/508x254%23mb/BT%2B9r7.png",
        bannerImg: "https://img.itch.zone/aW1nLzMwNjY3MTM5LnBuZw==/original/VR15Tv.png",
        shortDesc: "El Gran Arcoíris se ha roto. Ayuda a Pip a saltar de isla en isla flotante, recoger gemas y salvar el mundo.",
        description: "Juego oficial insigne de Arquivisual Games Studios. Con físicas de salto por carga ('hold and release'), combos con dianas perfectas, 4 mundos temáticos y skins desbloqueables.",
        features: [
            "Jugabilidad adictiva 'One-Touch' accesible para todos",
            "4 niveles con metas de puntuación y dificultad creciente",
            "Islas móviles, flotantes y plataformas con físicas dinámicas",
            "Disponible para jugar en navegador o descargar a PC y Android"
        ],
        controls: {
            pc: "Mantén ESPACIO / W / Clic Izquierdo y suelta para saltar | M: Silenciar",
            mobile: "Toca y mantén la pantalla, suelta para saltar"
        },
        playMode: "itch_embed",
        playUrl: "https://html-classic.itch.zone/html/19653865/index.html?v=1791552549",
        itchUrl: "https://arquivisualgames.itch.io/hop-hop-islands",
        downloadUrl: "https://arquivisualgames.itch.io/hop-hop-islands#download",
        downloads: [
            { name: "Windows 64-bit (.ZIP)", file: "HopHopIslands_Windows.zip", size: "30 MB", url: "https://arquivisualgames.itch.io/hop-hop-islands/purchase" },
            { name: "Android APK (7.1+)", file: "HopHopIslands_Android.apk", size: "21 MB", url: "https://arquivisualgames.itch.io/hop-hop-islands/purchase" }
        ],
        tags: ["Itch.io", "3D", "Arcade", "Casual", "Unity", "Windows", "Android"]
    },
    {
        id: "arch-dimension-3d",
        title: "ARQUIVISUAL: ESPACIO DIMENSIONAL",
        subtitle: "Exploración Arquitectónica Interactiva 3D",
        category: "videogames",
        categoryName: "Videojuegos",
        engine: "Itch.io / WebGL",
        isBuiltin: false,
        badge: "🏛️ ARQUITECTURA 3D",
        version: "v2.0.1",
        rating: 5.0,
        playsCount: "19.4K",
        downloadsCount: "5.8K",
        gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
        shortDesc: "Camina por rascacielos paramétricos, museos flotantes y espacios arquitectónicos con iluminación global en tiempo real.",
        description: "Una experiencia inmersiva que une la arquitectura contemporánea y los videojuegos interactivos con modo cinemático y captura fotográfica.",
        features: [
            "Escenarios 3D fotorrealistas de alta fidelidad",
            "Modo cámara libre y modo exploración en primera persona",
            "Descarga ejecutable de alta resolución para Windows"
        ],
        controls: {
            pc: "WASD: Caminar | Ratón: Mirar | Shift: Correr | Espacio: Salto",
            mobile: "Joysticks virtuales en pantalla"
        },
        playMode: "itch_embed",
        playUrl: "https://arquivisualgames.itch.io",
        downloadUrl: "https://arquivisualgames.itch.io",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Windows 64-bit (.ZIP)", file: "Arquivisual3D_Win64.zip", size: "120 MB", url: "https://arquivisualgames.itch.io" }
        ],
        tags: ["Arquitectura 3D", "Inmersivo", "WebGL", "Exploración"]
    },
    {
        id: "charlie-the-frog-wip",
        title: "CHARLIE THE FROG ADVENTURES",
        subtitle: "Aventura en la Selva & Plataformas 3D - En Producción",
        category: "videogames",
        categoryName: "Videojuegos",
        engine: "Unity & GDevelop 3D",
        isBuiltin: false,
        isWip: true,
        wipPercent: 65,
        badge: "🚧 WORK IN PROGRESS",
        version: "Early Beta v0.3",
        rating: 5.0,
        playsCount: "En producción",
        downloadsCount: "Coming Soon",
        gradient: "linear-gradient(135deg, #15803d 0%, #166534 50%, #064e3b 100%)",
        coverImg: "assets/charlie-the-frog.png",
        shortDesc: "Acompaña a Charlie la rana en una odisea a través de pantanos misteriosos, aldeas arbóreas y lagos nocturnos. Banda sonora oficial y próximamente en Itch.io.",
        description: "El nuevo videojuego oficial de Arquivisual Games Studios. Charlie The Frog Adventures combina exploración en 3D, saltos acrobáticos, música original compuesta para el videojuego y una atmósfera nocturna inmersiva.",
        features: [
            "Música y banda sonora oficial compuesta para el videojuego",
            "Físicas dinámicas de salto acrobático y exploración vertical",
            "Entornos nocturnos detallados con aldeas y pantanos bajo la luna",
            "Lanzamiento confirmado muy pronto en la tienda oficial de Itch.io"
        ],
        controls: {
            pc: "En desarrollo (Compatible con Teclado & Gamepad)",
            mobile: "En desarrollo (Controles táctiles optimizados)"
        },
        itchUrl: "https://arquivisualgames.itch.io",
        tags: ["Work In Progress", "3D", "Plataformas", "Aventura", "Itch.io", "Early Beta"]
    },

    // -------------------------------------------------------------
    // 2. MINI GAMES (Mini Videojuegos para jugar online y descargar)
    // -------------------------------------------------------------
    {
        id: "cyber-runner",
        title: "CYBER ARQUITECTO: MATRIX RUN",
        subtitle: "Mini Arcade Cyberpunk 60 FPS",
        category: "minigames",
        categoryName: "Mini Juegos",
        engine: "HTML5 Canvas (Integrado)",
        isBuiltin: true,
        badge: "⚡ JUGAR AQUÍ MISMO",
        version: "v1.2.0",
        rating: 4.9,
        playsCount: "14.2K",
        downloadsCount: "3.5K",
        gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        shortDesc: "Salta plataformas de neón, haz doble salto y recolecta núcleos cuánticos esquivando barreras de datos a alta velocidad.",
        description: "Mini juego arcade de reflejos rápidos. Diseñado para cargarse instantáneamente en cualquier navegador y funcionar fluido en PC y dispositivos móviles.",
        features: [
            "Físicas dinámicas y doble salto a 60 FPS estables",
            "Generación procedural de niveles y obstáculos",
            "Síntesis de audio retro en tiempo real sin descargas pesadas",
            "Descargable en paquete portátil sin conexión"
        ],
        controls: {
            pc: "ESPACIO / W / Flecha Arriba: Saltar y Doble Salto",
            mobile: "Toca cualquier parte de la pantalla táctil"
        },
        playMode: "builtin",
        playUrl: "#hero-arcade-card",
        downloadUrl: "#descargar-cyber-runner",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Versión Portátil (.ZIP)", file: "MatrixRun_Portable.zip", size: "8 MB", url: "#descarga" }
        ],
        tags: ["Mini Juego", "Arcade", "HTML5", "60 FPS", "Cyberpunk"]
    },
    {
        id: "gdevelop-quest",
        title: "NEON PROTOCOL: GDEVELOP ED.",
        subtitle: "Mini Plataformas 2D de Acción",
        category: "minigames",
        categoryName: "Mini Juegos",
        engine: "GDevelop 5 (HTML5)",
        isBuiltin: false,
        badge: "🎮 GDEVELOP ENGINE",
        version: "v1.0.4",
        rating: 4.8,
        playsCount: "8.9K",
        downloadsCount: "2.1K",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        shortDesc: "Mini juego de plataformas exportado directamente desde GDevelop en HTML5. Compatible con WebGL y ejecutable en cualquier navegador.",
        description: "Construido íntegramente con el motor GDevelop. Incluye patrullas enemigas, gemas flotantes y físicas clásicas de plataformas.",
        features: [
            "Exportación nativa de GDevelop 5",
            "Colección de gemas con multiplicador de bonus",
            "Descarga directa en paquete .ZIP para jugar sin internet"
        ],
        controls: {
            pc: "A/D o Flechas: Moverse | Espacio o W: Salto",
            mobile: "Botones en pantalla"
        },
        playMode: "gdevelop_local",
        playUrl: "games/gdevelop-quest/index.html",
        downloadUrl: "https://arquivisualgames.itch.io",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Windows Portable (.ZIP)", file: "NeonProtocol_Win.zip", size: "15 MB", url: "https://arquivisualgames.itch.io" }
        ],
        tags: ["Mini Juego", "GDevelop", "HTML5", "Plataformas", "2D"]
    },
    {
        id: "retro-drift-velocity",
        title: "VELOCITY MATRIX: DRIFT 84",
        subtitle: "Mini Carreras Synthwave & Derrapes",
        category: "minigames",
        categoryName: "Mini Juegos",
        engine: "GDevelop / WebGL",
        isBuiltin: false,
        badge: "🏎️ VELOCIDAD ARCADE",
        version: "v0.9.8",
        rating: 4.7,
        playsCount: "6.2K",
        downloadsCount: "1.4K",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        shortDesc: "Derrapes a toda velocidad por autopistas infinitas con luces de neón, combos y música electrónica retro.",
        description: "Mini juego arcade de conducción con derrapes continuos, turbo nitro y puntuaciones récord guardadas localmente.",
        features: [
            "Físicas de derrape y nitro con combo score",
            "Optimizado para cargar en menos de 2 segundos",
            "Jugable en teclado y gamepad"
        ],
        controls: {
            pc: "Flechas o A/D: Conducir | Espacio: Freno/Derrape | Shift: Nitro",
            mobile: "Botones táctiles de dirección"
        },
        playMode: "gdevelop_local",
        playUrl: "games/velocity-matrix/index.html",
        downloadUrl: "https://arquivisualgames.itch.io",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Windows Standalone (.ZIP)", file: "Drift84_Windows.zip", size: "22 MB", url: "https://arquivisualgames.itch.io" }
        ],
        tags: ["Mini Juego", "Carreras", "Synthwave", "Arcade"]
    },

    // -------------------------------------------------------------
    // 3. ASSETS (Recursos 3D, Texturas, UI, Sprites - PAGOS VÍA PAYPAL)
    // -------------------------------------------------------------
    {
        id: "asset-sci-fi-props",
        title: "PACK PROPS ARQUITECTURA SCI-FI 3D",
        subtitle: "Modelos 3D Optimizados para Blender & Motores",
        category: "assets",
        categoryName: "Assets",
        engine: "Blender 3D (.BLEND / .FBX)",
        isBuiltin: false,
        isPaid: true,
        price: "$9.99 USD",
        paypalAccount: "albertoeizzi.com",
        badge: "💳 $9.99 USD (PAYPAL)",
        version: "v1.0",
        rating: 4.9,
        playsCount: "3.2K",
        downloadsCount: "1.8K",
        gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        shortDesc: "Colección de más de 25 modelos arquitectónicos modulares futuristas, paneles holográficos y estructuras de neón.",
        description: "Paquete completo de assets tridimensionales modelados con topología limpia, UVs desempaquetadas y materiales PBR listos para Blender, Unity, Unreal o GDevelop 3D.",
        features: [
            "25+ Modelos 3D Low-Poly y Mid-Poly optimizados",
            "Formatos incluidos: .BLEND nativo, .FBX y .OBJ",
            "Texturas PBR 2K (Albedo, Normal, Roughness, Emission)",
            "Licencia comercial completa incluida con tu compra vía PayPal"
        ],
        controls: {
            pc: "Importa los archivos .FBX o .BLEND a tu software 3D favorito",
            mobile: "N/A"
        },
        playMode: "external",
        playUrl: "https://arquivisualgames.itch.io",
        downloadUrl: "https://www.paypal.me/albertoeizzi",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Comprar Pack (.ZIP)", file: "Arquivisual_SciFi_Props.zip", size: "65 MB", url: "https://www.paypal.me/albertoeizzi" }
        ],
        tags: ["Assets", "Pago PayPal", "3D Models", "Blender", "FBX", "PBR", "Sci-Fi"]
    },
    {
        id: "asset-cyber-ui-kit",
        title: "CYBERPUNK NEON UI & HUD KIT",
        subtitle: "Iconos, Botones y Marcos para Interfaces de Juego",
        category: "assets",
        categoryName: "Assets",
        engine: "PNG / SVG Vectorial",
        isBuiltin: false,
        isPaid: true,
        price: "$4.99 USD",
        paypalAccount: "albertoeizzi.com",
        badge: "💳 $4.99 USD (PAYPAL)",
        version: "v1.2",
        rating: 5.0,
        playsCount: "5.1K",
        downloadsCount: "2.4K",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
        shortDesc: "Kit gráfico de interfaz con barras de salud neón, botones interactivos, cursores y marcos holográficos.",
        description: "Todo lo que necesitas para diseñar menús futuristas, pantallas de carga y HUDs para tus juegos en GDevelop o cualquier motor.",
        features: [
            "Más de 80 elementos de interfaz listos para arrastrar",
            "Formatos PNG con canal transparente y SVG escalable",
            "Estados interactivos: Normal, Hover y Clic incluidos",
            "Licencia comercial para uso en juegos y apps"
        ],
        controls: {
            pc: "Arrastra los archivos PNG o SVG directamente a tu motor de juegos",
            mobile: "N/A"
        },
        playMode: "external",
        playUrl: "https://arquivisualgames.itch.io",
        downloadUrl: "https://www.paypal.me/albertoeizzi",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Comprar UI Kit (.ZIP)", file: "Cyber_UI_Kit.zip", size: "18 MB", url: "https://www.paypal.me/albertoeizzi" }
        ],
        tags: ["Assets", "Pago PayPal", "UI Kit", "HUD", "Cyberpunk", "PNG", "SVG"]
    },

    // -------------------------------------------------------------
    // 4. GAME SYSTEMS (Mecánicas, Plantillas y Lógica - PAGOS VÍA PAYPAL)
    // -------------------------------------------------------------
    {
        id: "system-platformer-controller",
        title: "SISTEMA DE PLATAFORMAS ADVANCED 2D",
        subtitle: "Controlador de Movimiento & Físicas Suaves para GDevelop",
        category: "gamesystems",
        categoryName: "Game Systems",
        engine: "GDevelop 5 Template",
        isBuiltin: false,
        isPaid: true,
        price: "$14.99 USD",
        paypalAccount: "albertoeizzi.com",
        badge: "💳 $14.99 USD (PAYPAL)",
        version: "v2.0",
        rating: 4.9,
        playsCount: "4.7K",
        downloadsCount: "2.9K",
        gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
        shortDesc: "Plantilla completa para GDevelop con coyote time, buffer de salto, aceleración gradual y detector de suelo perfecto.",
        description: "Olvídate de controles toscos. Este sistema incluye la lógica pulida que usan los mejores juegos de plataformas indie, documentada y comentada paso a paso.",
        features: [
            "Lógica de Coyote Time y Jump Buffering integrada",
            "Soporte inmediato para Teclado, Gamepad y Touch",
            "Fácil de importar con 1 solo clic en GDevelop 5",
            "Código visual con eventos comentados en español"
        ],
        controls: {
            pc: "Abre el archivo .json en GDevelop 5 para editar o probar",
            mobile: "N/A"
        },
        playMode: "external",
        playUrl: "https://arquivisualgames.itch.io",
        downloadUrl: "https://www.paypal.me/albertoeizzi",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Comprar Plantilla GDevelop (.ZIP)", file: "GDevelop_Platformer_System.zip", size: "6 MB", url: "https://www.paypal.me/albertoeizzi" }
        ],
        tags: ["Game Systems", "Pago PayPal", "GDevelop", "Mecánicas", "Físicas", "Plantilla"]
    },
    {
        id: "system-procedural-runner",
        title: "SISTEMA RUNNER PROCEDURAL & COMBO SCORE",
        subtitle: "Generador de Obstáculos y Multiplicador de Puntos",
        category: "gamesystems",
        categoryName: "Game Systems",
        engine: "JavaScript / HTML5 / GDevelop",
        isBuiltin: false,
        isPaid: true,
        price: "$12.99 USD",
        paypalAccount: "albertoeizzi.com",
        badge: "💳 $12.99 USD (PAYPAL)",
        version: "v1.1",
        rating: 4.8,
        playsCount: "3.9K",
        downloadsCount: "1.6K",
        gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
        shortDesc: "El motor de generación infinita que usamos en Cyber Matrix Run, empaquetado para que crees tu propio runner.",
        description: "Contiene el algoritmo de espaciado dinámico de plataformas, spawn de coleccionables, cálculo de dificultad progresiva y tabla de récords.",
        features: [
            "Algoritmo anti-bloqueo: plataformas siempre alcanzables",
            "Sistema de combo multiplicador y partículas de impacto",
            "Guardado automático de high-score en localStorage"
        ],
        controls: {
            pc: "Código limpio modular listo para integrar",
            mobile: "N/A"
        },
        playMode: "external",
        playUrl: "https://arquivisualgames.itch.io",
        downloadUrl: "https://www.paypal.me/albertoeizzi",
        itchUrl: "https://arquivisualgames.itch.io",
        downloads: [
            { name: "Comprar Script y Proyecto (.ZIP)", file: "Procedural_Runner_Engine.zip", size: "4 MB", url: "https://www.paypal.me/albertoeizzi" }
        ],
        tags: ["Game Systems", "Pago PayPal", "Procedural", "Lógica", "Arcade", "Runner"]
    }
];

// Helper para exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARQUIVISUAL_CATEGORIES, ARQUIVISUAL_GAMES };
}
