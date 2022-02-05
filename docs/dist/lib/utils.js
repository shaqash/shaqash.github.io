// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
export async function getJSON(...args) {
  if (fetch) {
    return fetch(...args).then((res) => res.json());
  }
  throw new Error("No polyfill for fetch");
}
export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return params;
}
export function pipe(...fns) {
  return (param) => fns.reduce((x, y) => y(x), param);
}
export function withStash(fn, key, persistence = "session") {
  const wrapper = async (...args) => fn(...args);
  const storage = persistence === "session" ? sessionStorage : localStorage;
  async function inner(...args) {
    const stored = storage.getItem(key);
    if (stored) {
      const {data: data2} = JSON.parse(stored);
      return data2;
    }
    const data = await wrapper(...args);
    storage.setItem(key, JSON.stringify({data}));
    return data;
  }
  return inner;
}
// @license-end
