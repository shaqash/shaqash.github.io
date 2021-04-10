// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { random } from './config';

/***
 * @returns {string} Random string
 */
function renderRandom() {
  const index = Math.floor(Math.random() * random.length);

  return random[index];
}

/**
 * @param {() => any} fn
 * @param {HTMLElement[]} nodes
 */
export async function render(fn, ...nodes) {
  const wrapper = async () => fn();

  return Promise.all(nodes.map(async (n) => n.innerHTML = await wrapper()));
}

/**
 * @param {typeof query} $
 * @param {typeof queryAll} _$;
 */
function main($, _$) {
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

/** 
 * @param {string} selector 
 * @returns {NodeListOf<Element>}
 */
export const queryAll = (selector) => document.querySelectorAll(selector);
main(query, queryAll);

// @license-end
