// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
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
async function lazyLoad(importPromise, ...args) {
  const { default: pageCode } = await importPromise;

  return pageCode(...args);
}

/** @param {string} pathname */
function router(pathname) {
  const withRegExp = (pageName) => new RegExp(`^\/${pageName}(\.html)*$`);
  if (withRegExp('index').test(pathname) || pathname === '/') {
    return './pages/main.js';
  } else if (withRegExp('archive').test(pathname)) {
    return './pages/archive.js';
  } else if (withRegExp('post').test(pathname) || pathname === '/post.html') {
    return './pages/post.js';
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


/**
 * @param {typeof query} $
 * @param {typeof queryAll} $a;
 */
(async function main($, $a) {
  const scriptPath = router(window.location.pathname);
  console.log(scriptPath);
  await lazyLoad(import(router(window.location.pathname)), $);

  console.log(3);
  window.addEventListener('load', () => {
    console.log(1);
    const header = query('.header-content').querySelector('h2');
    header.ondblclick = () => {
      query('body').style.backgroundColor = "var(--matrix-green)";
    };
  });

})(query, queryAll);

// @license-end
