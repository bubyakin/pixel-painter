'use strict';

function styleChildren (parent, rules) {
  for (let i = 0; i < parent.children.length; i++) {
    for (let prop in rules) {
      parent.children[i].style[prop] = rules[prop];
    }
  }
}
