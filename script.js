'use strict';
// #eae4c2
window.onload = () => {
  const grid = document.querySelector('div > div');
  const ctrlPanel = document.querySelector('form');
  const zoom = document.querySelector('label:last-child > input');
  const colorPicker = document.querySelector('input[type=color]');
  const fillButton = document.querySelector('fieldset > button');
  const gridToggle = document.querySelectorAll('fieldset > button')[1];
  const eraseButton = document.querySelectorAll('fieldset > button')[2];
  const state = {
    resolution: {w: 60, h: 35},
    pixel: 50,
    mouseDown: false,
    grid: true,
    color: '#FFFFFF',
    fillColor: '#003366'
  };

  renderCanvas(grid, state.resolution, state.pixel, function(ev) {
    if (state.mouseDown || ev.type == 'click')
      ev.target.style.backgroundColor = state.color;
  });

// -----
  grid.addEventListener('mousedown', function(ev) {
    state.mouseDown = true;
    ctrlPanel.style.pointerEvents = 'none';
  });
  document.addEventListener('mouseup', function(ev) {
    state.mouseDown = false;
    ctrlPanel.style.pointerEvents = 'auto';
  });

  ctrlPanel.addEventListener('submit', function(ev) {
    ev.preventDefault();
    state.resolution.w = this.width.value;
    state.resolution.h = this.height.value;
    renderCanvas(grid, state.resolution, this.pixelSide.value, function(ev) {
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