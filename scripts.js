// scripts.js
(function(){
  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
    // Update label
    this.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  });

  // Close nav on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && primaryNav.classList.contains('open')){
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      navToggle.setAttribute('aria-label','Open menu');
      navToggle.focus();
    }
  });

  // Keyboard: allow Enter on .issue-card to open link
  document.querySelectorAll('.issue-card').forEach(card => {
    card.tabIndex = 0; // make focusable
    card.addEventListener('keypress', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        const link = card.querySelector('.issue-link');
        if(link) link.click();
      }
    });
  });

  // Simple lazy loader for thumbnail images (uses data-src)
  const lazyImgs = document.querySelectorAll('.lazy-img');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if(src){
            img.src = src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, {rootMargin: "200px"});
    lazyImgs.forEach(i => io.observe(i));
  } else {
    // Fallback: load immediately
    lazyImgs.forEach(img => {
      const src = img.getAttribute('data-src');
      if(src) img.src = src;
    });
  }

  // Accessibility: focus main on "Browse issues" click
  document.querySelectorAll('.btn-primary, .nav-link').forEach(el => {
    el.addEventListener('click', function(e){
      const href = (this.getAttribute('href') || '');
      if(href.startsWith('#')){
        const id = href.slice(1);
        const target = document.getElementById(id);
        if(target){
          setTimeout(()=> target.querySelector('h2, h1')?.focus?.(), 250);
        }
      }
    });
  });

})();
