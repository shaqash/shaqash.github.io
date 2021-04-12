// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {posts, repositories} from "../components/index.js";
import {render, query} from "../index.js";
function main($) {
  const gists = $("#gists");
  const repos = $("#repos");
  const post = $(".post");
  if (!post) {
    render(posts, gists);
    render(repositories, repos);
  }
}
main(query);
// @license-end
