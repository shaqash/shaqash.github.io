// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {pipe} from "./utils.js";
export default function getHtml(markdown) {
  return pipe(spaces, headers, tags, code, bold)(markdown);
}
function spaces(content) {
  return content.replace(/(\n\n)/g, "\n");
}
function bold(content) {
  return content.replace(/\*\*(.*)\*\*/g, "<b>$1</b>");
}
function headers(content) {
  return content.replace(/^#+ (.+)/gm, '<h2 style="margin-top: 0.5rem">$1</h2>');
}
function tags(content) {
  return content.replace(/\s`([\w\s\{\}]+)`/gm, " <code><i>$1</i></code>");
}
function code(content) {
  return content.replace(/```js|```ts/gm, '<pre style="background-color: #e3e3e322; padding: 1rem; border-radius: 0.2rem">').replace(/```/gm, "</pre>");
}
// @license-end
