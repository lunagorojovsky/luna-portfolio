// Luna Gorojovsky — main.js

// Fade in proyectos al cargar
const proyectos = document.querySelectorAll('.proyecto');
proyectos.forEach((p, i) => {
  p.style.opacity = '0';
  p.style.transform = 'translateY(6px)';
  p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  setTimeout(() => {
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  }, 50 + i * 50);
});

// Movimiento suave del tablero en escritorio
const tablero = document.querySelector('.tablero');
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

if (tablero && window.innerWidth > 400 && !reducirMovimiento.matches) {
  tablero.animate(
    [
      { transform: 'translate3d(0, 0, 0)' },
      { transform: 'translate3d(-35px, -18px, 0)' },
      { transform: 'translate3d(-12px, -35px, 0)' },
      { transform: 'translate3d(0, 0, 0)' }
    ],
    {
      duration: 24000,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  );
}
