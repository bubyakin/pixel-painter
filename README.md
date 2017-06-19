[https://pam.surge.sh/](https://pam.surge.sh/)

This is an incredibly simple application for making pixel art. It was one of the first exercises we did at Galvanize but I refactored it for fun and practice. Old version here: [https://ht44-pixel-art-maker.surge.sh/](https://ht44-pixel-art-maker.surge.sh/)

You can adjust the "resolution" of the canvas, as well as the side length used for each "pixel". A "fill" button applies the current color everywhere, and the color of the "eraser" will always match the color of the fill.

Written entirely with vanilla JavaScript, here is pretty much all the code:

```JavaScript
'use strict';
window.onload = () => {
  const grid = document.getElementById('grid');
  const ctrlPanel = document.getElementById('ctrl-panel');
  const load = document.querySelector('form');
  const zoom = document.getElementById('pixel');
  const colorPicker = document.getElementById('color');
  const fillButton = document.getElementById('fill');
  const gridToggle = document.getElementById('toggle');
  const eraseButton = document.getElementById('erase');

  const state = {
    resolution: {w: 60, h: 35},
    pixel: 50,
    mouseDown: false,
    grid: true,
    color: '#FFE91B',
    fillColor: '#003366'
  };

  renderCanvas(grid, state.resolution, state.pixel, function(ev) {
    if (state.mouseDown || ev.type == 'click')
      ev.target.style.backgroundColor = state.color;
  });

  grid.addEventListener('mousedown', function(ev) {
    state.mouseDown = true;
    ctrlPanel.style.pointerEvents = 'none';
  });
  document.addEventListener('mouseup', function(ev) {
    state.mouseDown = false;
    ctrlPanel.style.pointerEvents = 'auto';
  });

  load.addEventListener('submit', function(ev) {
    ev.preventDefault();
    state.resolution.w = this.width.value;
    state.resolution.h = this.height.value;
    renderCanvas(grid, state.resolution, state.pixel, function(ev) {
      if (state.mouseDown || ev.type == 'click')
        ev.target.style.backgroundColor = state.color;
    });
  });

  zoom.addEventListener('input', function(ev) {
    state.pixel = ev.target.value;
    grid.style.width = `${state.resolution.w * state.pixel}px`;
    grid.style.height = `${state.resolution.h * state.pixel}px`;
    styleChildren(grid, {width: `${state.pixel}px`, height: `${state.pixel}px`});
  });

  colorPicker.addEventListener('input', function(ev) {
    state.color = ev.target.value;
  });

  gridToggle.addEventListener('click', function(ev) {
    if (state.grid) {
      styleChildren(grid, {borderStyle: 'none'});
      state.grid = false;
    } else {
      styleChildren(grid, {borderStyle: 'solid'});
      state.grid = true;
    }
  });

  fillButton.addEventListener('click', function(ev) {
    state.fillColor = state.color;
    this.style.color = state.color;
    styleChildren(grid, {backgroundColor: state.color});
  });

  eraseButton.addEventListener('click', function(ev) {
    state.color = state.fillColor;
    colorPicker.value = state.color;
  });

};
```
