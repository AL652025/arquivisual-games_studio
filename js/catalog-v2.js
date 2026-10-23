document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('catalog-js');
  document.querySelectorAll('.share-game').forEach(button => button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.share-status');
    try {
      if (navigator.share) await navigator.share({title:button.dataset.shareTitle,url:button.dataset.shareUrl});
      else { await navigator.clipboard.writeText(button.dataset.shareUrl); status.textContent = 'Enlace copiado. Ya podés compartirlo.'; }
    } catch (error) { if (error.name !== 'AbortError') status.textContent = 'Podés copiar el enlace desde la barra del navegador.'; }
  }));
  const menu = document.getElementById('site-navigation');
  const toggle = document.querySelector('.menu-toggle');
  function closeMenu() { toggle?.setAttribute('aria-expanded', 'false'); menu?.classList.remove('is-open'); }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('is-open', open);
  });
  menu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

  const search = document.getElementById('catalog-search');
  const buttons = [...document.querySelectorAll('[data-catalog-filter]')];
  const cards = [...document.querySelectorAll('[data-catalog-item]')];
  let category = 'all';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filterCatalog() {
    const query = normalize(search?.value.trim() || '');
    let count = 0;
    for (const card of cards) {
      const visible = (category === 'all' || card.dataset.section === category) && normalize(card.dataset.search || '').includes(query);
      card.hidden = !visible;
      if (visible) count++;
    }
    document.querySelectorAll('[data-catalog-section]').forEach(section => {
      const visible = [...section.querySelectorAll('[data-catalog-item]')].filter(card => !card.hidden).length;
      section.hidden = visible === 0;
      const badge = section.querySelector('.section-count');
      if (badge) badge.textContent = String(visible);
    });
    const result = document.getElementById('catalog-result-count');
    if (result) result.textContent = `${count} ${count === 1 ? 'resultado' : 'resultados'}${query ? ' para tu búsqueda' : ''}`;
    const empty = document.getElementById('catalog-empty');
    if (empty) empty.hidden = count > 0;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.catalogFilter === category)));
  }
  search?.addEventListener('input', filterCatalog);
  document.getElementById('catalog-reset')?.addEventListener('click', () => {
    category = 'all';
    if (search) { search.value = ''; search.focus(); }
    filterCatalog();
  });
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.catalogFilter; filterCatalog(); }));
  document.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', () => {
    const destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && destination.pathname === location.pathname && link.hash && document.getElementById(link.hash.slice(1))?.matches('[data-catalog-section]')) {
      category = 'all'; if (search) search.value = ''; filterCatalog();
    }
  }));
  if (search) filterCatalog();

  let arcade = null;
  const start = document.getElementById('arcade-start');
  start?.addEventListener('click', () => {
    if (!arcade && window.ArcadeGame) arcade = new window.ArcadeGame('hero-arcade-canvas');
    if (arcade) { arcade.startGame(); document.querySelector('.arcade-placeholder')?.remove(); start.textContent = 'Reiniciar consola'; document.getElementById('hero-arcade-card')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}); document.getElementById('hero-arcade-canvas')?.focus({preventScroll:true}); }
  });
  const soundButton = document.getElementById('sound-toggle-btn');
  if (soundButton && window.soundFX) window.soundFX.muted = true;
  soundButton?.addEventListener('click', () => {
    if (!window.soundFX) return;
    window.soundFX.init();
    const muted = window.soundFX.toggleMute();
    soundButton.setAttribute('aria-pressed', String(!muted));
    soundButton.textContent = muted ? 'Activar sonido' : 'Silenciar sonido';
  });
});
