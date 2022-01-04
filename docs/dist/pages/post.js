// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {render} from "../index.js";
import {post as renderPost} from "../components/index.js";
import {getGist} from "../lib/github.js";
import {ENTRYPOINT, gists} from "../config.js";
export default async function post($) {
  const root = $("#root");
  const _post = $(".post");
  if (!_post) {
    const {pathname} = window.location;
    const [page, postId] = pathname.split("/");
    if (!gists[postId])
      return window.location.replace("/404.html");
    const data = await getGist(ENTRYPOINT, postId);
    render(renderPost, root);
  }
}
// @license-end
