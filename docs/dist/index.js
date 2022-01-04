// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {random} from "./config.js";
function renderRandom() {
  const index = Math.floor(Math.random() * random.length);
  return random[index];
}
export async function render(fn, ...nodes) {
  const wrapper = async () => fn();
  function onCatch() {
    console.log("Unable to render dynamic content :/");
    return `
      <div>Something is missing here.. Please try again later.</div>
    `;
  }
  return Promise.all(nodes.map(async (n) => n.innerHTML = await wrapper().catch(onCatch)));
}
async function lazyLoad(importPromise, ...args) {
  const {default: pageCode} = await importPromise;
  pageCode(...args);
}
function main($, _$) {
  const random2 = $("#random");
  const menu = $(".menu");
  const {pathname} = window.location;
  console.log(pathname);
  if (/^\/index$/.test(pathname) || pathname === "/") {
    lazyLoad(import("./pages/main.js"), $);
  } else if (/^\/archive$/.test(pathname)) {
    lazyLoad(import("./pages/archive.js"), $);
  } else if (/^\/p\/*/.test(pathname) || pathname === "/p.html") {
    lazyLoad(import("./pages/post.js"), $);
  }
  if (menu) {
    window.onscroll = () => {
      if (window.pageYOffset > menu.offsetTop) {
        menu.classList.add("sticky");
      } else {
        menu.classList.remove("sticky");
      }
    };
  }
  if (random2 && !random2.getAttribute("innerHTML")) {
    render(renderRandom, random2);
  }
}
export const query = (selector) => document.querySelector(selector);
export const queryAll = (selector) => document.querySelectorAll(selector);
main(query, queryAll);
// @license-end
