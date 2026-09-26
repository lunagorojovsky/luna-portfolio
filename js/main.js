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

// Recorrer el tablero acercando el cursor a los bordes + inercia
if (document.querySelector('.tablero') && window.innerWidth > 400 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;

  let velocidadX = 0;
  let velocidadY = 0;

  let pausado = false;
  let activo = false;

  function velocidadObjetivo(posicion, tamaño) {
    const borde = Math.min(180, tamaño * 0.2);

    if (posicion < borde) {
      return -((borde - posicion) / borde) * 5;
    }

    if (posicion > tamaño - borde) {
      return ((posicion - (tamaño - borde)) / borde) * 5;
    }

    return 0;
  }

  function recorrer() {
    if (!activo) return;

    const objetivoX = pausado
      ? 0
      : velocidadObjetivo(cursorX, window.innerWidth);

    const objetivoY = pausado
      ? 0
      : velocidadObjetivo(cursorY, window.innerHeight);

    // Aceleración y desaceleración suaves
    velocidadX += (objetivoX - velocidadX) * 0.08;
    velocidadY += (objetivoY - velocidadY) * 0.08;

    // Evita movimientos microscópicos eternos
    if (Math.abs(velocidadX) < 0.01 && objetivoX === 0) {
      velocidadX = 0;
    }

    if (Math.abs(velocidadY) < 0.01 && objetivoY === 0) {
      velocidadY = 0;
    }

    window.scrollTo({
      left: window.scrollX + velocidadX,
      top: window.scrollY + velocidadY,
      behavior: 'auto'
    });

    // Solo se detiene cuando ya no queda inercia
    if (
      velocidadX === 0 &&
      velocidadY === 0 &&
      objetivoX === 0 &&
      objetivoY === 0
    ) {
      activo = false;
      return;
    }

    requestAnimationFrame(recorrer);
  }

  window.addEventListener('pointermove', (evento) => {
    if (evento.pointerType !== 'mouse') return;

    cursorX = evento.clientX;
    cursorY = evento.clientY;

    if (!activo) {
      activo = true;
      requestAnimationFrame(recorrer);
    }
  });

  window.addEventListener('pointerdown', () => {
    pausado = true;
  });

  window.addEventListener('pointerup', () => {
    pausado = false;

    if (!activo) {
      activo = true;
      requestAnimationFrame(recorrer);
    }
  });
}

// Transición al abrir un proyecto
const tablero = document.querySelector('.tablero');

if (tablero) {
  document.querySelectorAll('.proyecto').forEach((proyecto) => {

    proyecto.addEventListener('click', (evento) => {
      const enlace = proyecto.getAttribute('href');

      if (!enlace) return;

      evento.preventDefault();

      proyecto.classList.add('seleccionado');
      tablero.classList.add('abriendo');

      setTimeout(() => {
        window.location.href = enlace;
      }, 220);
    });

  });
}
