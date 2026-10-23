// =======================================================================
// ARQUIVISUAL GAMES - Arcade Engine: "CYBER ARQUITECTO: MATRIX RUN"
// Mini-juego interactivo de acción cyberpunk construido con HTML5 Canvas
// =======================================================================

class ArcadeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.width = 900;
        this.height = 450;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.state = 'idle'; // 'idle', 'playing', 'gameover'
        this.score = 0;
        this.highScore = 0;
        try { this.highScore = Math.max(0, parseInt(localStorage.getItem('arquivisual_highscore') || '0', 10) || 0); } catch {}
        this.speed = 6;
        this.gravity = 0.55;
        this.distance = 0;
        this.coins = 0;

        // Jugador
        this.player = {
            x: 100,
            y: 300,
            w: 36,
            h: 48,
            vy: 0,
            isGrounded: false,
            jumpsLeft: 2,
            trail: [],
            color: '#06b6d4'
        };

        // Entidades
        this.platforms = [];
        this.obstacles = [];
        this.particles = [];
        this.energyCores = [];
        this.gridOffset = 0;

        this.keys = {};
        this.initControls();
        this.resetGame();

        // Loop principal
        this.lastTime = 0;
        this.boundLoop = this.loop.bind(this);
        requestAnimationFrame(this.boundLoop);
    }

    initControls() {
        window.addEventListener('keydown', (e) => {
            if (document.activeElement !== this.canvas || document.hidden) return;
            if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
                e.preventDefault();
                this.handleJump();
            }
        });

        // Controles táctiles / ratón en el canvas
        this.canvas.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.canvas.focus({preventScroll:true});
            this.handleJump();
        });
    }

    handleJump() {
        if (this.state === 'idle' || this.state === 'gameover') {
            this.startGame();
            return;
        }

        if (this.player.jumpsLeft > 0) {
            this.player.vy = -12;
            this.player.jumpsLeft--;
            this.createJumpParticles(this.player.x + this.player.w / 2, this.player.y + this.player.h);
            if (window.soundFX) window.soundFX.jump();
        }
    }

    resetGame() {
        this.score = 0;
        this.coins = 0;
        this.speed = 6;
        this.distance = 0;

        this.player.x = 120;
        this.player.y = 250;
        this.player.vy = 0;
        this.player.jumpsLeft = 2;
        this.player.trail = [];

        // Generar piso inicial
        this.platforms = [
            { x: 0, y: 350, w: 1000, h: 100, color: '#6366f1' }
        ];
        this.obstacles = [];
        this.energyCores = [];
        this.particles = [];
    }

    startGame() {
        this.resetGame();
        this.state = 'playing';
        if (window.soundFX) window.soundFX.gameStart();
    }

    gameOver() {
        this.state = 'gameover';
        if (this.score > this.highScore) {
            this.highScore = Math.floor(this.score);
            try { localStorage.setItem('arquivisual_highscore', this.highScore); } catch {}
        }
        if (window.soundFX) window.soundFX.hit();

        // Explosión de partículas
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: this.player.x + this.player.w / 2,
                y: this.player.y + this.player.h / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12,
                size: Math.random() * 6 + 2,
                color: Math.random() > 0.5 ? '#ec4899' : '#06b6d4',
                life: 1.0
            });
        }
    }

    createJumpParticles(x, y) {
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 3 + 1,
                size: Math.random() * 4 + 2,
                color: '#06b6d4',
                life: 0.8
            });
        }
    }

    update() {
        if (this.state !== 'playing') {
            // Actualizar partículas decorativas en idle/gameover
            this.updateParticles();
            return;
        }

        // Aumentar velocidad progresivamente
        this.speed += 0.0008;
        this.distance += this.speed * 0.1;
        this.score = Math.floor(this.distance + this.coins * 50);

        // Física del jugador
        this.player.vy += this.gravity;
        this.player.y += this.player.vy;

        // Estela del jugador
        if (Math.random() > 0.3) {
            this.player.trail.push({
                x: this.player.x,
                y: this.player.y,
                alpha: 0.7
            });
        }
        this.player.trail.forEach(t => t.alpha -= 0.05);
        this.player.trail = this.player.trail.filter(t => t.alpha > 0);

        // Comprobación de plataformas
        this.player.isGrounded = false;
        for (const plat of this.platforms) {
            if (
                this.player.x + this.player.w > plat.x &&
                this.player.x < plat.x + plat.w &&
                this.player.y + this.player.h >= plat.y &&
                this.player.y + this.player.h <= plat.y + 20 &&
                this.player.vy >= 0
            ) {
                this.player.y = plat.y - this.player.h;
                this.player.vy = 0;
                this.player.isGrounded = true;
                this.player.jumpsLeft = 2;
                break;
            }
        }

        // Si cae al vacío
        if (this.player.y > this.height) {
            this.gameOver();
            return;
        }

        // Mover plataformas
        for (const plat of this.platforms) {
            plat.x -= this.speed;
        }
        // Limpiar plataformas fuera de pantalla
        this.platforms = this.platforms.filter(p => p.x + p.w > -50);

        // Generar nuevas plataformas
        const lastPlat = this.platforms[this.platforms.length - 1];
        if (lastPlat && lastPlat.x + lastPlat.w < this.width + 200) {
            const gap = Math.random() * 110 + 70;
            const newY = Math.min(380, Math.max(220, lastPlat.y + (Math.random() - 0.5) * 120));
            const newW = Math.random() * 300 + 260;
            const newPlat = {
                x: lastPlat.x + lastPlat.w + gap,
                y: newY,
                w: newW,
                color: Math.random() > 0.5 ? '#6366f1' : '#06b6d4'
            };
            this.platforms.push(newPlat);

            // Posibilidad de obstáculo sobre la plataforma
            if (Math.random() > 0.4 && newW > 160) {
                this.obstacles.push({
                    x: newPlat.x + newW / 2,
                    y: newPlat.y - 32,
                    w: 24,
                    h: 32,
                    color: '#ef4444'
                });
            }

            // Posibilidad de núcleo de energía
            if (Math.random() > 0.3) {
                this.energyCores.push({
                    x: newPlat.x + newW * 0.25 + (Math.random() * newW * 0.5),
                    y: newPlat.y - 45 - (Math.random() * 40),
                    size: 9,
                    floatOffset: Math.random() * Math.PI
                });
            }
        }

        // Mover obstáculos
        for (const obs of this.obstacles) {
            obs.x -= this.speed;

            // Colisión con el jugador
            if (
                this.player.x + this.player.w - 6 > obs.x &&
                this.player.x + 6 < obs.x + obs.w &&
                this.player.y + this.player.h - 4 > obs.y &&
                this.player.y + 4 < obs.y + obs.h
            ) {
                this.gameOver();
                return;
            }
        }
        this.obstacles = this.obstacles.filter(o => o.x + o.w > -50);

        // Mover y recolectar núcleos de energía
        for (let i = this.energyCores.length - 1; i >= 0; i--) {
            const core = this.energyCores[i];
            core.x -= this.speed;

            // Check colisión
            const dx = (this.player.x + this.player.w / 2) - core.x;
            const dy = (this.player.y + this.player.h / 2) - core.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 32) {
                this.coins++;
                if (window.soundFX) window.soundFX.collect();

                // Partículas del núcleo
                for (let p = 0; p < 8; p++) {
                    this.particles.push({
                        x: core.x,
                        y: core.y,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        size: Math.random() * 3 + 2,
                        color: '#facc15',
                        life: 0.6
                    });
                }
                this.energyCores.splice(i, 1);
            }
        }
        this.energyCores = this.energyCores.filter(c => c.x > -50);

        // Desplazamiento de la cuadrícula de fondo
        this.gridOffset = (this.gridOffset + this.speed * 0.4) % 40;

        this.updateParticles();
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.025;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Fondo Gradiente Espacial
        const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
        bgGrad.addColorStop(0, '#090a12');
        bgGrad.addColorStop(1, '#131728');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Cuadrícula Arquitectónica de Perspectiva (Cyber Grid)
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
        ctx.lineWidth = 1;

        // Líneas verticales en movimiento
        for (let x = -this.gridOffset; x < this.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }
        // Líneas horizontales
        for (let y = 0; y < this.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        // Dibujar plataformas arquitectónicas
        for (const plat of this.platforms) {
            // Superficie brillante con glow
            ctx.fillStyle = plat.color;
            ctx.shadowColor = plat.color;
            ctx.shadowBlur = 12;
            ctx.fillRect(plat.x, plat.y, plat.w, 8);

            // Bloque inferior semitransparente
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(25, 30, 50, 0.85)';
            ctx.fillRect(plat.x, plat.y + 8, plat.w, plat.h);

            // Línea de borde
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
        }

        // Dibujar obstáculos (Barreras láser de datos)
        for (const obs of this.obstacles) {
            ctx.save();
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 15;
            ctx.fillStyle = '#ef4444';
            
            // Prisma de advertencia
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

            // Núcleo brillante
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(obs.x + 4, obs.y + 4, obs.w - 8, obs.h - 8);
            ctx.restore();
        }

        // Dibujar núcleos de energía cuántica
        const timeNow = performance.now() * 0.005;
        for (const core of this.energyCores) {
            const floatY = core.y + Math.sin(timeNow + core.floatOffset) * 4;
            ctx.save();
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 16;
            ctx.fillStyle = '#facc15';
            
            // Rombo flotante
            ctx.beginPath();
            ctx.moveTo(core.x, floatY - core.size);
            ctx.lineTo(core.x + core.size, floatY);
            ctx.lineTo(core.x, floatY + core.size);
            ctx.lineTo(core.x - core.size, floatY);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(core.x, floatY, core.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Estela del jugador
        for (const t of this.player.trail) {
            ctx.fillStyle = `rgba(6, 182, 212, ${t.alpha * 0.4})`;
            ctx.fillRect(t.x, t.y, this.player.w, this.player.h);
        }

        // Dibujar Jugador (Arquitecto Cyber)
        if (this.state !== 'gameover') {
            ctx.save();
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 18;

            // Cuerpo
            ctx.fillStyle = '#06b6d4';
            ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);

            // Visor cibernético
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.player.x + 18, this.player.y + 10, 14, 6);

            // Acentos de neón
            ctx.fillStyle = '#ec4899';
            ctx.fillRect(this.player.x + 4, this.player.y + 24, 8, 16);
            ctx.restore();
        }

        // Partículas
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.restore();
        }

        // UI en pantalla (Puntuación, Núcleos, Record)
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 16px "Inter", "Segoe UI", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${this.score}`, 25, 35);
        
        ctx.fillStyle = '#facc15';
        ctx.fillText(`⚡ CORES: ${this.coins}`, 170, 35);

        ctx.fillStyle = '#a1a1aa';
        ctx.textAlign = 'right';
        ctx.fillText(`🏆 RECORD: ${this.highScore}`, this.width - 25, 35);

        // Pantallas de Estado (Idle / GameOver)
        if (this.state === 'idle') {
            ctx.fillStyle = 'rgba(10, 11, 16, 0.75)';
            ctx.fillRect(0, 0, this.width, this.height);

            ctx.textAlign = 'center';
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#06b6d4';
            ctx.font = '900 32px "Inter", sans-serif';
            ctx.fillText('CYBER ARQUITECTO: MATRIX RUN', this.width / 2, this.height / 2 - 30);

            ctx.shadowBlur = 0;
            ctx.fillStyle = '#e4e4e7';
            ctx.font = '500 16px "Inter", sans-serif';
            ctx.fillText('Presiona ESPACIO, W o TOCA LA PANTALLA para Jugar', this.width / 2, this.height / 2 + 15);

            ctx.fillStyle = '#a1a1aa';
            ctx.font = '400 14px "Inter", sans-serif';
            ctx.fillText('Doble salto disponible | Recoge núcleos dorados | Esquiva barreras rojas', this.width / 2, this.height / 2 + 45);
        } else if (this.state === 'gameover') {
            ctx.fillStyle = 'rgba(10, 11, 16, 0.82)';
            ctx.fillRect(0, 0, this.width, this.height);

            ctx.textAlign = 'center';
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 25;
            ctx.fillStyle = '#ef4444';
            ctx.font = '900 38px "Inter", sans-serif';
            ctx.fillText('SIMULACIÓN COLAPSADA', this.width / 2, this.height / 2 - 35);

            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffffff';
            ctx.font = '700 20px "Inter", sans-serif';
            ctx.fillText(`Puntuación Final: ${this.score}  |  Núcleos: ${this.coins}`, this.width / 2, this.height / 2 + 10);

            ctx.fillStyle = '#38bdf8';
            ctx.font = '600 16px "Inter", sans-serif';
            ctx.fillText('👉 Toca la pantalla o presiona ESPACIO para Reintentar', this.width / 2, this.height / 2 + 50);
        }
    }

    loop(timestamp) {
        const rect = this.canvas.getBoundingClientRect();
        const visible = !document.hidden && rect.bottom > 0 && rect.top < window.innerHeight;
        if (visible && (!this.lastTime || timestamp - this.lastTime >= 1000 / 60 - 1)) {
            this.update();
            this.draw();
            this.lastTime = timestamp;
        }
        requestAnimationFrame(this.boundLoop);
    }
}

window.ArcadeGame = ArcadeGame;
