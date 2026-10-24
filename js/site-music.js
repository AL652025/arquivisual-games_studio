/* Música de estudio: autoplay cuando está permitido y activación con el primer gesto. */
(() => {
  const audio = document.getElementById('site-music');
  const button = document.getElementById('site-music-toggle');
  if (!audio || !button) return;
  const preferenceKey = 'arquivisual.music';
  let enabled = true;
  let playing = false;
  let failed = false;
  let pending = false;
  try { enabled = localStorage.getItem(preferenceKey) !== 'off'; } catch {}
  audio.volume = 0.15;
  function render() {
    playing = !audio.paused && enabled;
    button.hidden = false;
    button.setAttribute('aria-pressed', String(playing));
    button.textContent = failed ? '♫ Música no disponible' : playing ? '♫ Silenciar música' : '♫ Activar música';
    button.title = playing ? 'Música de fondo al 15 %. Pulsá para silenciar.' : 'Activar música de fondo';
    button.disabled = failed;
    audio.dataset.musicState = failed ? 'error' : playing ? 'playing' : enabled ? 'waiting' : 'off';
  }
  async function start() {
    if (!enabled || failed || pending || document.hidden || !audio.paused) return;
    pending = true;
    try {
      await audio.play();
      if (!enabled || document.hidden) audio.pause();
    } catch (error) {
      // Bloqueo de autoplay no es un fallo del archivo: se reintenta con un gesto.
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') failed = true;
    } finally { pending = false; render(); }
  }
  button.addEventListener('click', () => {
    enabled = !playing;
    try { localStorage.setItem(preferenceKey, enabled ? 'on' : 'off'); } catch {}
    if (enabled) start(); else audio.pause();
    render();
  });
  function unlock(event) {
    if (event.target.closest?.('.site-music')) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    start();
  }
  document.addEventListener('pointerdown', unlock, {passive:true});
  document.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause(); else start();
    render();
  });
  // Evitar competir con un video o con la consola arcade local.
  document.addEventListener('play', event => {
    if (event.target.tagName === 'VIDEO') { enabled = false; audio.pause(); render(); }
  }, true);
  document.getElementById('arcade-start')?.addEventListener('click', () => {
    enabled = false; audio.pause(); render();
  });
  audio.addEventListener('playing', render);
  audio.addEventListener('pause', render);
  audio.addEventListener('error', () => { failed = true; render(); });
  render();
  start();
})();
