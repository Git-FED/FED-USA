(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('#menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (menuButton && siteNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !isOpen);
    });
    siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      siteNav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
      }
    });
  }

  const progress = document.querySelector('.reading-progress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length && !reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  }

  const search = document.querySelector('[data-search-input]');
  const cards = [...document.querySelectorAll('[data-searchable]')];
  const emptyState = document.querySelector('.empty-state');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  let activeFilter = 'all';
  const filterStories = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach(card => {
      const category = card.dataset.category || '';
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
      const visible = matchesFilter && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyState) emptyState.style.display = visibleCount ? 'none' : 'block';
  };
  search?.addEventListener('input', filterStories);
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterStories();
  }));

  // Dark mode: the toggle button in the nav flips data-theme on <html>.
  // The saved choice in localStorage wins; otherwise the theme already set
  // by the small script in <head> (system setting) stands.
  const themeToggle = document.querySelector('#theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      const dark = theme === 'dark';
      themeToggle.textContent = dark ? '☀️ Light' : '🌙 Dark';
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'dark' ? '#101826' : '#15345a');
  };
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('fedusa-theme', next); } catch (e) {}
    applyTheme(next);
  });
})();
