const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.highlight-card, .growth-item, .objective-card, .review-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

function markGalleryImageLoaded(img) {
  const reveal = () => img.classList.add('is-loaded');
  if (img.complete && img.naturalWidth > 0) {
    reveal();
  } else {
    img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', reveal, { once: true });
  }
}

document.querySelectorAll('.gallery-item img[src]').forEach(markGalleryImageLoaded);

function loadDeferredGallery(section) {
  section.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
    markGalleryImageLoaded(img);
  });
}

const momentsSection = document.getElementById('moments');
if (momentsSection) {
  let momentsStarted = false;
  const startMomentsGallery = () => {
    if (momentsStarted) return;
    momentsStarted = true;
    loadDeferredGallery(momentsSection);
    momentsWarmObserver.disconnect();
    accommodationWarmObserver?.disconnect();
  };

  const momentsWarmObserver = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        startMomentsGallery();
      }
    },
    { rootMargin: '900px 0px' }
  );
  momentsWarmObserver.observe(momentsSection);

  const accommodationSection = document.getElementById('accommodation');
  let accommodationWarmObserver;
  if (accommodationSection) {
    accommodationWarmObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          startMomentsGallery();
        }
      },
      { rootMargin: '200px 0px' }
    );
    accommodationWarmObserver.observe(accommodationSection);
  }
}
