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

// Recorrer el tablero acercando el cursor a los bordes
if (document.querySelector('.tablero') && window.innerWidth > 400 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let recorriendo = false;
  let pausado = false;

  function velocidad(posicion, tamaño) {
    const borde = Math.min(180, tamaño * 0.2);
    if (posicion < borde) return -((borde - posicion) / borde) * 5;
    if (posicion > tamaño - borde) {
      return ((posicion - (tamaño - borde)) / borde) * 5;
    }
    return 0;
  }

  function recorrer() {
    if (!recorriendo) return;

    const dx = pausado ? 0 : velocidad(cursorX, window.innerWidth);
    const dy = pausado ? 0 : velocidad(cursorY, window.innerHeight);

    if (dx === 0 && dy === 0) {
      recorriendo = false;
      return;
    }

    window.scrollBy(dx, dy);
requestAnimationFrame(recorrer);

}

  window.addEventListener('pointermove', (evento) => {
    if (evento.pointerType !== 'mouse') return;

    cursorX = evento.clientX;
    cursorY = evento.clientY;

    if (!recorriendo && !pausado) {
      recorriendo = true;
      requestAnimationFrame(recorrer);
    }
  });

  window.addEventListener('pointerdown', () => { pausado = true; });
  window.addEventListener('pointerup', () => {
    pausado = false;
    recorriendo = false;
  });
}
