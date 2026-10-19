(() => {
  const particleLayer = document.getElementById('particles');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the particle count low for smooth performance, especially on mobile.
  if (particleLayer && !reducedMotion) {
    const count = window.innerWidth < 600 ? 13 : 24;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.setProperty('--duration', `${13 + Math.random() * 16}s`);
      particle.style.setProperty('--delay', `${-Math.random() * 28}s`);
      particle.style.setProperty('--drift', `${Math.round(Math.random() * 100 - 50)}px`);
      particle.style.setProperty('--opacity', `${0.18 + Math.random() * 0.32}`);
      particle.style.width = particle.style.height = `${2 + Math.random() * 2}px`;
      particleLayer.appendChild(particle);
    }
  }

  // Hide the optional photo frame when profile.jpg is not present.
  const photo = document.getElementById('profilePhoto');
  const photoWrap = document.getElementById('photoWrap');
  if (photo && photoWrap) {
    photo.addEventListener('error', () => { photoWrap.hidden = true; });
    if (photo.complete && photo.naturalWidth === 0) photoWrap.hidden = true;
  }

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Mobile navigation toggle and close-after-selection.
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '×' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // Highlight the navigation item for the section currently in view.
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(anchor => {
            anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();


const seeMoreBtn = document.getElementById("seeMoreBtn");
const hiddenProjects = document.querySelectorAll(".hidden-project");

seeMoreBtn.addEventListener("click", () => {
  const isExpanded =
    seeMoreBtn.getAttribute("aria-expanded") === "true";

  hiddenProjects.forEach((project) => {
    project.style.display = isExpanded ? "none" : "block";
  });

  seeMoreBtn.textContent = isExpanded ? "See More" : "See Less";

  seeMoreBtn.setAttribute("aria-expanded", String(!isExpanded));
});

