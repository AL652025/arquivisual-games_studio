// =======================================================================
// ARQUIVISUAL GAMES - Main Application Logic
// Renderizado dinámico, Filtros, Modal de Juego, Sistema de Descargas
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Audio al primer click del usuario
    document.body.addEventListener('click', () => {
        if (window.soundFX) window.soundFX.init();
    }, { once: true });

    // 2. Inicializar el Arcade Game en la sección Hero
    let heroArcadeInstance = null;
    const heroCanvas = document.getElementById('hero-arcade-canvas');
    if (heroCanvas && window.ArcadeGame) {
        heroArcadeInstance = new window.ArcadeGame('hero-arcade-canvas');
    }

    // 3. Renderizado de Juegos
    const gamesGrid = document.getElementById('games-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-games-input');
    const totalGamesCountEl = document.getElementById('stat-total-games');

    if (totalGamesCountEl && window.ARQUIVISUAL_GAMES) {
        totalGamesCountEl.textContent = `${window.ARQUIVISUAL_GAMES.length}+`;
    }

    let currentFilter = 'all';
    let currentSearchQuery = '';

    function renderGames() {
        if (!gamesGrid || !window.ARQUIVISUAL_GAMES) return;

        let filtered = window.ARQUIVISUAL_GAMES.filter(game => {
            // Filtro por categoría o motor
            let matchesFilter = true;
            if (currentFilter === 'gdevelop') {
                matchesFilter = game.engine.toLowerCase().includes('gdevelop');
            } else if (currentFilter === 'itch') {
                matchesFilter = game.engine.toLowerCase().includes('itch');
            } else if (currentFilter === 'arcade') {
                matchesFilter = game.category === 'arcade';
            } else if (currentFilter === '3d') {
                matchesFilter = game.category === '3d';
            }

            // Filtro por búsqueda de texto
            let matchesSearch = true;
            if (currentSearchQuery.trim()) {
                const q = currentSearchQuery.toLowerCase();
                const inTitle = game.title.toLowerCase().includes(q);
                const inDesc = game.shortDesc.toLowerCase().includes(q) || game.description.toLowerCase().includes(q);
                const inEngine = game.engine.toLowerCase().includes(q);
                const inTags = game.tags.some(t => t.toLowerCase().includes(q));
                matchesSearch = inTitle || inDesc || inEngine || inTags;
            }

            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            gamesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
                    <div style="font-size: 40px; margin-bottom: 12px;">🎮🔍</div>
                    <h3 style="font-size: 22px; color: #fff; margin-bottom: 8px;">No se encontraron juegos</h3>
                    <p style="color: #94a3b8; font-size: 14px;">Intenta cambiar el término de búsqueda o selecciona otro filtro.</p>
                </div>
            `;
            return;
        }

        gamesGrid.innerHTML = filtered.map(game => `
            <article class="game-card" data-id="${game.id}">
                <div class="game-thumb" style="background: ${game.gradient};">
                    <!-- Arte vectorial SVG representativo -->
                    <svg class="game-thumb-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad-${game.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
                                <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad-${game.id})"/>
                        <!-- Cuadrícula perspectiva -->
                        <path d="M 0 150 L 400 150 M 0 170 L 400 170 M 0 190 L 400 190" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                        <path d="M 200 130 L 0 200 M 200 130 L 100 200 M 200 130 L 200 200 M 200 130 L 300 200 M 200 130 L 400 200" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                        <!-- Icono central estilizado -->
                        <circle cx="200" cy="85" r="42" fill="rgba(0,0,0,0.35)" stroke="#fff" stroke-width="2"/>
                        <text x="200" y="94" font-family="'Rajdhani', sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">
                            ${game.isBuiltin ? '⚡' : (game.engine.includes('GDevelop') ? '🎮' : '🏛️')}
                        </text>
                    </svg>

                    <span class="game-badge">${game.badge}</span>
                    <span class="game-engine-tag">${game.engine}</span>
                </div>

                <div class="game-info">
                    <div class="game-meta">
                        <span class="game-rating">★ ${game.rating} (${game.playsCount} jugados)</span>
                        <span>${game.version}</span>
                    </div>

                    <h3 class="game-title">${game.title}</h3>
                    <div class="game-subtitle">${game.subtitle}</div>
                    <p class="game-desc">${game.shortDesc}</p>

                    <div class="game-tags">
                        ${game.tags.map(t => `<span class="tag-item">${t}</span>`).join('')}
                    </div>

                    <div class="game-actions">
                        <button class="btn btn-primary btn-play-game" data-id="${game.id}">
                            <span>▶ JUGAR</span>
                        </button>
                        <button class="btn btn-secondary btn-download-game" data-id="${game.id}">
                            <span>📥 DESCARGAR</span>
                        </button>
                    </div>
                </div>
            </article>
        `).join('');

        // Enganchar eventos a los botones recién renderizados
        attachCardEvents();
    }

    function attachCardEvents() {
        document.querySelectorAll('.btn-play-game').forEach(btn => {
            btn.addEventListener('mouseenter', () => window.soundFX && window.soundFX.hover());
            btn.addEventListener('click', (e) => {
                if (window.soundFX) window.soundFX.click();
                const id = e.currentTarget.getAttribute('data-id');
                openPlayModal(id);
            });
        });

        document.querySelectorAll('.btn-download-game').forEach(btn => {
            btn.addEventListener('mouseenter', () => window.soundFX && window.soundFX.hover());
            btn.addEventListener('click', (e) => {
                if (window.soundFX) window.soundFX.click();
                const id = e.currentTarget.getAttribute('data-id');
                openDownloadModal(id);
            });
        });
    }

    // Filtros por pestaña
    filterButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => window.soundFX && window.soundFX.hover());
        btn.addEventListener('click', () => {
            if (window.soundFX) window.soundFX.click();
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderGames();
        });
    });

    // Búsqueda en tiempo real
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            renderGames();
        });
    }

    // 4. Modal de Juego
    const gameModal = document.getElementById('game-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-game-title');
    const modalViewport = document.getElementById('modal-game-viewport');
    const modalControlsDesc = document.getElementById('modal-controls-desc');
    const modalFeaturesList = document.getElementById('modal-features-list');
    const modalDownloadAction = document.getElementById('modal-download-action');
    const modalFullscreenBtn = document.getElementById('modal-fullscreen-btn');

    function openPlayModal(gameId) {
        const game = window.ARQUIVISUAL_GAMES.find(g => g.id === gameId);
        if (!game) return;

        if (window.soundFX) window.soundFX.gameStart();

        modalTitle.textContent = game.title;
        modalControlsDesc.textContent = `💻 PC: ${game.controls.pc} | 📱 Móvil: ${game.controls.mobile}`;
        
        modalFeaturesList.innerHTML = game.features.map(f => `<li>${f}</li>`).join('');
        modalDownloadAction.setAttribute('data-id', game.id);

        // Si es el juego integrado de canvas
        if (game.isBuiltin) {
            modalViewport.innerHTML = `
                <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0a0b12; text-align: center; padding: 20px;">
                    <div style="font-size: 48px; margin-bottom: 12px;">🕹️</div>
                    <h4 style="font-size: 24px; color: #06b6d4; margin-bottom: 10px;">¡Juego Interactivo Listo en Pantalla Principal!</h4>
                    <p style="color: #94a3b8; max-width: 500px; margin-bottom: 20px;">Puedes jugar a este juego directamente en la consola superior del Hero, o en el modo pantalla completa.</p>
                    <button class="btn btn-primary" id="focus-hero-arcade-btn">🎮 IR A LA CONSOLA ARCADE</button>
                </div>
            `;
            setTimeout(() => {
                const focusBtn = document.getElementById('focus-hero-arcade-btn');
                if (focusBtn) {
                    focusBtn.addEventListener('click', () => {
                        closeModal();
                        document.getElementById('hero-arcade-card').scrollIntoView({ behavior: 'smooth' });
                        if (heroArcadeInstance) heroArcadeInstance.startGame();
                    });
                }
            }, 50);
        } else {
            // Embebido de GDevelop o itch.io
            modalViewport.innerHTML = `
                <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0f121e; text-align: center; padding: 30px;">
                    <div style="font-size: 52px; margin-bottom: 15px;">🎮</div>
                    <h4 style="font-size: 22px; color: #fff; margin-bottom: 10px;">Cargando Servidor de Juego: ${game.engine}</h4>
                    <p style="color: #94a3b8; max-width: 550px; font-size: 14px; margin-bottom: 24px;">
                        ${game.engine.includes('GDevelop') 
                            ? 'Este juego está configurado para la carpeta local <code>games/' + game.id + '/index.html</code> exportada desde GDevelop.' 
                            : 'Este juego se conecta con tu canal de <strong>itch.io</strong>.'}
                    </p>
                    <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                        <a href="${game.playUrl}" target="_blank" class="btn btn-primary">
                            🚀 ABRIR EN VENTANA COMPLETA
                        </a>
                        <a href="${game.itchUrl}" target="_blank" class="btn btn-secondary">
                            🌐 VER EN ITCH.IO
                        </a>
                    </div>
                </div>
            `;
        }

        gameModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (window.soundFX) window.soundFX.click();
        gameModal.classList.remove('active');
        document.body.style.overflow = '';
        modalViewport.innerHTML = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (gameModal) {
        gameModal.addEventListener('click', (e) => {
            if (e.target === gameModal) closeModal();
        });
    }

    // Pantalla completa en modal
    if (modalFullscreenBtn) {
        modalFullscreenBtn.addEventListener('click', () => {
            if (modalViewport.requestFullscreen) {
                modalViewport.requestFullscreen();
            }
        });
    }

    // Modal de Descarga
    function openDownloadModal(gameId) {
        const game = window.ARQUIVISUAL_GAMES.find(g => g.id === gameId);
        if (!game) return;

        showToast(`📦 Iniciando panel de descarga para "${game.title}"...`);

        // Abrir modal con opciones de descarga
        modalTitle.textContent = `Descargar: ${game.title}`;
        modalControlsDesc.textContent = `Requisitos del Sistema: Windows 10/11 (64-bit), 4GB RAM, Soporte WebGL 2.0 / DirectX 11.`;
        modalFeaturesList.innerHTML = `
            <li>Versión disponible: <strong>${game.version}</strong></li>
            <li>Formato: Paquete instalador .EXE y versión portátil .ZIP</li>
            <li>Exportado desde: <strong>${game.engine}</strong></li>
            <li>Seguridad: Verificado sin malware / Compatible con SmartScreen</li>
        `;

        modalViewport.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; background: #0a0b12;">
                <div style="font-size: 56px; margin-bottom: 16px;">💾</div>
                <h3 style="font-size: 26px; color: #fff; margin-bottom: 12px;">Descarga ${game.title}</h3>
                <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 28px; font-size: 15px;">
                    Elige el formato de tu preferencia para disfrutar de este título sin conexión.
                </p>
                <div style="display: flex; flex-direction: column; gap: 14px; max-width: 420px; margin: 0 auto;">
                    <a href="${game.downloadUrl}" class="btn btn-primary" onclick="simulateDownload(event, '${game.title}', 'Windows .EXE')">
                        💻 Descargar para Windows (.exe) - 64-bit
                    </a>
                    <a href="${game.downloadUrl}" class="btn btn-secondary" onclick="simulateDownload(event, '${game.title}', 'Portable .ZIP')">
                        📦 Descargar Paquete Comprimido (.zip)
                    </a>
                    <a href="${game.itchUrl}" target="_blank" class="btn btn-accent">
                        🌐 Descargar o Apoyar en Itch.io
                    </a>
                </div>
            </div>
        `;

        gameModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.simulateDownload = function(e, title, format) {
        e.preventDefault();
        showToast(`⬇️ Descargando "${title}" (${format})... ¡Gracias por jugar!`);
        if (window.soundFX) window.soundFX.collect();
    };

    if (modalDownloadAction) {
        modalDownloadAction.addEventListener('click', () => {
            const id = modalDownloadAction.getAttribute('data-id');
            if (id) openDownloadModal(id);
        });
    }

    // 5. Mute Toggle
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn && window.soundFX) {
        soundToggleBtn.addEventListener('click', () => {
            const isMuted = window.soundFX.toggleMute();
            soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
            showToast(isMuted ? 'Audio Silenciado' : 'Efectos de Audio Activados');
        });
    }

    // 6. Botones de Sonido Globales
    document.querySelectorAll('.btn, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => window.soundFX && window.soundFX.hover());
    });

    // 7. Toast Helper
    const toast = document.getElementById('toast-notification');
    let toastTimeout = null;
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
    window.showToast = showToast;

    // Primer renderizado
    renderGames();
});
