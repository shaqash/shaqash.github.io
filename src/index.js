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

  function onCatch() {
    console.log('Unable to render dynamic content :/');

    return `
      <div>Something is missing here.. Please try again later.</div>
    `;
  }

  return Promise.all(
    nodes.map(async (n) => n.innerHTML = await wrapper().catch(onCatch))
  );
}

/**
 * @param {Promise} importPromise
 * @param {any[]} args
 */
async function loadPageCode(importPromise, ...args) {
  const { default: pageCode } = await importPromise;

  pageCode(...args);
}

/**
 * @param {typeof query} $
 * @param {typeof queryAll} _$;
 */
function main($, _$) {
  const random = $('#random');
  const menu = $('.menu');
  const { pathname } = window.location;

  // Routing
  switch (pathname) {
    case '/':
      loadPageCode(import('./pages/main.js'), $);
      break;
    case '/archive':
      loadPageCode(import('./pages/archive.js'), $);
      break;
    default:
      break;
  }

  // Sticky menu
  window.onscroll = () => {
    if (window.pageYOffset > menu.offsetTop) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
  };

  if (!random.getAttribute('innerHTML')) {
    // Was not rendered server side
    render(renderRandom, random);
  }
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
