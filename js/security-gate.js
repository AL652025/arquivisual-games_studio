// =======================================================================
// ARQUIVISUAL GAMES - Sistema de Protección y Bloqueo de Acceso
// Evita que terceras personas no autorizadas accedan a la página
// =======================================================================

(function() {
    // Claves maestras por defecto (fáciles de recordar para el dueño)
    const DEFAULT_PINS = ['652025', 'ARQUI2026', 'arquivisual'];
    const STORAGE_KEY = 'arquivisual_access_granted';
    const CUSTOM_PIN_KEY = 'arquivisual_custom_pin';

    function isAuthorized() {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }

    function checkPin(input) {
        const trimmed = (input || '').trim();
        const customPin = localStorage.getItem(CUSTOM_PIN_KEY);
        if (customPin && trimmed === customPin) return true;
        return DEFAULT_PINS.includes(trimmed);
    }

    function unlockGate() {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        const gate = document.getElementById('security-gate');
        if (gate) {
            gate.classList.add('unlocked');
            setTimeout(() => {
                gate.style.display = 'none';
            }, 300);
        }
        if (window.soundFX) window.soundFX.collect();
        if (window.showToast) window.showToast('🔓 Acceso Autorizado. ¡Bienvenido a ARQUIVISUAL GAMES!');
    }

    function lockGate() {
        sessionStorage.removeItem(STORAGE_KEY);
        const gate = document.getElementById('security-gate');
        if (gate) {
            gate.style.display = 'flex';
            gate.classList.remove('unlocked');
            const passInput = document.getElementById('gate-pass-input');
            if (passInput) {
                passInput.value = '';
                passInput.focus();
            }
        }
        if (window.soundFX) window.soundFX.hit();
        if (window.showToast) window.showToast('🔒 Plataforma Bloqueada. Acceso restringido.');
    }

    window.lockStudio = lockGate;

    document.addEventListener('DOMContentLoaded', () => {
        const gate = document.getElementById('security-gate');
        const passInput = document.getElementById('gate-pass-input');
        const unlockBtn = document.getElementById('gate-unlock-btn');
        const errorMsg = document.getElementById('gate-error-msg');
        const lockNavBtn = document.getElementById('nav-lock-studio-btn');
        const changePinBtn = document.getElementById('gate-change-pin-btn');

        // Si ya está autorizado en la sesión actual, ocultar candado
        if (isAuthorized()) {
            if (gate) {
                gate.style.display = 'none';
                gate.classList.add('unlocked');
            }
        } else {
            if (gate) {
                gate.style.display = 'flex';
                gate.classList.remove('unlocked');
            }
            if (passInput) passInput.focus();
        }

        function handleAttempt() {
            if (!passInput) return;
            const val = passInput.value;
            if (checkPin(val)) {
                if (errorMsg) errorMsg.textContent = '';
                unlockGate();
            } else {
                if (window.soundFX) window.soundFX.hit();
                if (errorMsg) {
                    errorMsg.textContent = '❌ Clave incorrecta. Acceso Denegado.';
                    errorMsg.classList.add('shake');
                    setTimeout(() => errorMsg.classList.remove('shake'), 500);
                }
                passInput.value = '';
                passInput.focus();
            }
        }

        if (unlockBtn) unlockBtn.addEventListener('click', handleAttempt);

        if (passInput) {
            passInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    handleAttempt();
                }
            });
        }

        // Botón en la barra de navegación para bloquear en 1 clic
        if (lockNavBtn) {
            lockNavBtn.addEventListener('click', (e) => {
                e.preventDefault();
                lockGate();
            });
        }

        // Opción para cambiar la clave
        if (changePinBtn) {
            changePinBtn.addEventListener('click', () => {
                const current = prompt('Ingresa tu clave actual:');
                if (checkPin(current)) {
                    const newPin = prompt('Escribe tu NUEVA clave personalizada:');
                    if (newPin && newPin.trim().length >= 4) {
                        localStorage.setItem(CUSTOM_PIN_KEY, newPin.trim());
                        alert('✅ Clave de seguridad actualizada con éxito.');
                    } else {
                        alert('⚠️ La clave debe tener al menos 4 caracteres.');
                    }
                } else {
                    alert('❌ Clave incorrecta.');
                }
            });
        }
    });
})();
