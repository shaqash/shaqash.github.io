// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import markdown from "../lib/simpleMarkdown.js";
export default function renderHeader({text}) {
  return `
  <div class="intro">
    <p>
      ${markdown(text)}
    </p>
  </div>
  `;
}
// @license-end
