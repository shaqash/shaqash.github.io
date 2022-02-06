// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import withLayout from './layout';
import { getQueryParams } from '../lib/utils';
import { gists } from '../config';
import github from '../lib/github';
import markdown from '../lib/simpleMarkdown';

export default async function renderPost() {
  const query = getQueryParams();
  const postId = query.get('pid');
  const postMetadata = gists[postId];
  if (!postMetadata) return window.location.replace('/404.html');

  const postData = await github.getGist(postId);
  console.log({ postData });
  const { data: { description, files, html_url } } = postData;
  const content = files[postMetadata.filename]?.content;
  const { comments } = postData;

  return withLayout(`
  ${postMetadata.image ?
      `<img style="float:right" class="large" src="${postMetadata.image}"></img>` : ''
    }
  <h1>${postMetadata.title}</h1>
  <p>${description}</p>
  <span style="white-space:pre-wrap;">${markdown(content)}</span>
  ${comments.length ? `<strong>💬 ${comments.length}</strong>` : ''}
    <div class="fixed right">
      <a class="emoji-before medium border" title="View source & Comment" href="${html_url}">💬</a>
    </div>
  `);
}

function escapeHTML(str) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}
// @license-end