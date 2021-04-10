// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { random } from './config';

/***
 * @returns {string} Random string
 */
export function renderRandom() {
  const index = Math.floor(Math.random() * random.length);

  return random[index];
}

/**
 * @param {(...args: any) => any} fn
 * @param {HTMLElement} node
 */
export async function render(fn, node) {
  const wrapper = async (...args) => fn(...args);

  return node.innerHTML = await wrapper();
}

function main($) {
  const random = $('#random');
  const menu = $('.menu');

  // Sticky menu
  window.onscroll = () => {
    if (window.pageYOffset > menu.offsetTop) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
  };

  // Render
  render(renderRandom, random);
}

/** 
 * @param {string} selector 
 * @returns {HTMLElement}
 */
export const query = (selector) => document.querySelector(selector);
main(query);

// @license-end
