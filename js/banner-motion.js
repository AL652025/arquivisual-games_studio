/* Efectos decorativos del banner. La imagen original siempre permanece completa. */
(() => {
  const banner = document.getElementById('studio-banner');
  const button = document.getElementById('banner-motion-toggle');
  if (!banner || !button) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let saved = null;
  try { saved = localStorage.getItem('arquivisual.banner.motion'); } catch {}
  let explicitMotion = saved === 'on';
  let enabled = explicitMotion || (saved !== 'off' && !reduced.matches);
  let visible = true;
  let frame = 0;
  let bounds;
  let point;
  function resetDepth() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; bounds = null; point = null;
    banner.style.removeProperty('--banner-x');
    banner.style.removeProperty('--banner-y');
  }
  function sync() {
    const running = enabled && visible && (!reduced.matches || explicitMotion) && !document.hidden;
    banner.dataset.bannerPreference = reduced.matches && !explicitMotion ? 'reduced' : 'full';
    banner.dataset.bannerMotion = running ? 'running' : 'paused';
    button.hidden = false;
    button.textContent = enabled ? '⏸ Pausar animación' : '▶ Activar animación';
    button.title = reduced.matches && !enabled ? 'Tu dispositivo prefiere reducir movimiento. Podés activar este banner si querés.' : 'Controlar los efectos del banner';
    if (!running) resetDepth();
  }
  button.addEventListener('click', () => {
    enabled = !enabled;
    explicitMotion = enabled;
    try { localStorage.setItem('arquivisual.banner.motion', enabled ? 'on' : 'off'); } catch {}
    sync();
  });
  banner.addEventListener('pointerenter', () => {
    if (finePointer.matches && banner.dataset.bannerMotion === 'running') bounds = banner.getBoundingClientRect();
  });
  banner.addEventListener('pointermove', event => {
    if (!bounds || !finePointer.matches || banner.dataset.bannerMotion !== 'running') return;
    point = {x:event.clientX,y:event.clientY};
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!bounds || !point) return;
      const x = Math.max(-1,Math.min(1,((point.x-bounds.left)/bounds.width-.5)*2));
      const y = Math.max(-1,Math.min(1,((point.y-bounds.top)/bounds.height-.5)*2));
      banner.style.setProperty('--banner-x', `${(x*7).toFixed(2)}px`);
      banner.style.setProperty('--banner-y', `${(y*5).toFixed(2)}px`);
    });
  });
  banner.addEventListener('pointerleave', resetDepth);
  window.addEventListener('resize', resetDepth, {passive:true});
  window.addEventListener('scroll', resetDepth, {passive:true});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => {explicitMotion=false;enabled=!reduced.matches;sync();});
  finePointer.addEventListener('change', resetDepth);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {visible=entries[0].isIntersecting;sync();},{threshold:0});
    observer.observe(banner);
  }
  sync();
})();
