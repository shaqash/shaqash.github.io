// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {render} from "../index.js";
import {post as renderPost} from "../components/index.js";
export default async function post($) {
  const root = $("#root");
  const _post = $(".post");
  if (!_post) {
    render(renderPost, root);
  }
}
// @license-end
