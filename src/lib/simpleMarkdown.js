// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { pipe } from '../lib/utils';

export default function getHtml(markdown) {
  return pipe(
    spaces,
    headers,
    tags,
    code,
    bold,
  )(markdown);
}

/** @param {string} content */
function spaces(content) {
  return content
    .replace(/(\n\n)/g, '\n');
}

/** @param {string} content */
function bold(content) {
  return content
    .replace(/\*\*(.*)\*\*/g, '<b>$1</b>');
}


/** @param {string} content */
function headers(content) {
  return content
    .replace(/#+ (.+)/g, '<h2>$1</h2>');
}

/** @param {string} content */
function tags(content) {
  return content.replace(/`(\w+)`/gm, '<code><i>$1</i></code>');
}

/** @param {string} content */
function code(content) {
  return content
    .replace(/```js|```ts/gm, '<pre style="background-color: #e3e3e322; padding: 1rem; border-radius: 0.2rem">')
    .replace(/```/gm, '</pre>');
}
// @license-end