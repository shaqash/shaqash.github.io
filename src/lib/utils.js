// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
/**
 * @template T
 * @param  {[string, any?]} args
 * @returns {Promise<T>}
 */
export async function getJSON(...args) {
  if (fetch) {
    return fetch(...args).then((res) => res.json());
  }
  throw new Error('No polyfill for fetch');
}

/**
 * @template T
 * @param  {(...args: any) => T | Promise<T>} fn
 * @param {('session' | 'local')} persistence
 * @returns {(...args: any) => Promise<T>}
 */
export function withStash(fn, key, persistence = 'session') {
  const wrapper = async (...args) => fn(...args);
  const storage = persistence === 'session' ? sessionStorage : localStorage;

  /**
   * @param  {...any} args
   * @returns {Promise<T>}
   */
  async function inner(...args) {
    const stored = storage.getItem(key);

    if (stored) {
      /** @type {{ data: T }} */
      const { data } = JSON.parse(stored);

      return data;
    }

    const data = await wrapper(...args);
    storage.setItem(key, JSON.stringify({ data }));
    return data;
  }

  return inner;
}
// @license-end
