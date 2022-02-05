// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {mainPage} from "../components/index.js";
import {render, query} from "../index.js";
export default function main($) {
  const root = $("#root");
  const post = $(".post");
  if (!post) {
    render(mainPage, root);
  }
}
// @license-end
