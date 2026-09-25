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

// El tablero sigue suavemente el movimiento del cursor
const tablero = document.querySelector('.tablero');
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

if (tablero && window.innerWidth > 400 && !reducirMovimiento.matches) {
  let x = 0;
  let y = 0;
  let destinoX = 0;
  let destinoY = 0;
  let animacion = null;

  function moverTablero() {
    x += (destinoX - x) * 0.08;
    y += (destinoY - y) * 0.08;
    tablero.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (Math.abs(destinoX - x) > 0.1 || Math.abs(destinoY - y) > 0.1) {
      animacion = requestAnimationFrame(moverTablero);
    } else {
      animacion = null;
    }
  }

  window.addEventListener('pointermove', (evento) => {
    if (evento.pointerType !== 'mouse') return;

    destinoX = (0.5 - evento.clientX / window.innerWidth) * 100;
    destinoY = (0.5 - evento.clientY / window.innerHeight) * 70;

    if (animacion === null) {
      animacion = requestAnimationFrame(moverTablero);
    }
  });
}
