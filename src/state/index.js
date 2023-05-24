// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
export default function makeState(stateObj) {
  const cbx = new Set();

  function register(...newCallbacks) {
    newCallbacks.forEach((cb) => cbx.add(cb));
  }
  function executeCbx(currentState, oldState) {
    cbx.forEach((cb) => cb(currentState, oldState));
  }

  return new Proxy({ ...stateObj, register }, {
    set(obj, key, val) {
      if (key === 'register') return false;
      executeCbx({ ...obj, [key]: val }, obj);
      return Reflect.set(obj, key, val);
    },
  });
}
// @license-end