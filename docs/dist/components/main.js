// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {posts, repositories, header, withLayout} from "./index.js";
import {USERNAME} from "../config.js";
import github from "../lib/github.js";
export default async function renderMain() {
  const [_posts, _repositories, _readme] = await Promise.all([
    posts(),
    repositories(),
    github.getReadme(USERNAME)
  ]);
  return withLayout(header({text: _readme}), _posts, _repositories);
}
// @license-end
