'use strict';

function renderCanvas(container, resolution, pixel, handler) {
  container.style.width = `${resolution.w * pixel}px`;
  container.style.height = `${resolution.h * pixel}px`;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 0; i < resolution.w * resolution.h; i++) {
    container.appendChild(document.createElement('div'));
    container.lastChild.setAttribute('style', `width: ${pixel}px; height: ${pixel}px`);
    container.lastChild.addEventListener('mouseenter', handler);
    container.lastChild.addEventListener('click', handler);
  }
}
