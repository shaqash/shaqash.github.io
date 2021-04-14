// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {render} from "../index.js";
import {posts} from "../components/index.js";
export default function archive($) {
  const gists = $("#gists");
  const post = $(".post");
  if (!post) {
    render(posts, gists);
  }
}
// @license-end
