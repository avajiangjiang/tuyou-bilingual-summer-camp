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

const accommodationSection = document.getElementById('accommodation');
if (accommodationSection) {
  const warmGalleryImages = () => {
    accommodationSection.querySelectorAll('source[srcset]').forEach(source => {
      const img = new Image();
      img.src = source.getAttribute('srcset');
    });
  };

  const galleryWarmObserver = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        warmGalleryImages();
        galleryWarmObserver.disconnect();
      }
    },
    { rootMargin: '800px 0px' }
  );
  galleryWarmObserver.observe(accommodationSection);

  document.querySelector('a[href="#accommodation"]')?.addEventListener('click', warmGalleryImages);
}
