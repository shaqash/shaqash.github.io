// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import withLayout from "./layout.js";
import {getQueryParams} from "../lib/utils.js";
import {gists} from "../config.js";
import github from "../lib/github.js";
import markdown from "../lib/simpleMarkdown.js";
export default async function renderPost() {
  var _a;
  const query = getQueryParams();
  const postId = query.get("pid");
  const postMetadata = gists[postId];
  if (!postMetadata)
    return window.location.replace("/404.html");
  const postData = await github.getGist(postId);
  const description = postData.data.description;
  const content = (_a = postData.data.files[postMetadata.filename]) == null ? void 0 : _a.content;
  const {comments} = postData;
  return withLayout(`
    ${postMetadata.image ? `<img style="float:right" height="230px" src="${postMetadata.image}"></img>` : ""}
    <h1>${postMetadata.title}</h1>
    <p>${description}</p>
    <span style="white-space:pre-wrap;">${markdown(content)}</span>
    ${comments.length ? `<strong><i>${comments.length} Comments</i></strong>` : ""}
  `);
}
function escapeHTML(str) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}
// @license-end
