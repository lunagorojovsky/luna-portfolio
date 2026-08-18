// Luna Gorojovsky — main.js

// Fade in proyectos al cargar
const proyectos = document.querySelectorAll('.proyecto');
proyectos.forEach((p, i) => {
  p.style.opacity = '0';
  p.style.transform = 'translateY(12px)';
  p.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
  setTimeout(() => {
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  }, 100 + i * 150);
});
