import withLayout from './layout';
import { getQueryParams } from '../lib/utils';
import { gists } from '../config';
import github from '../lib/github';

export default async function renderPost() {
  const query = getQueryParams();
  const postId = query.get('pid');
  const postMetadata = gists[postId];
  if (!postMetadata) return window.location.replace('/404.html');

  const postData = await github.getGist(postId);
  console.log({ postData });
  const description = postData.data.description;
  const content = postData.data.files[postMetadata.filename]?.content;
  const { comments } = postData;

  return withLayout(`
    ${postMetadata.image ?
      `<img style="float:right" height="230px" src="${postMetadata.image}"></img>` : ''
    }
    <h1>${postMetadata.title}</h1>
    <p>${description}</p>
    <span style="white-space:break-spaces;">${content}</span>
    ${comments.length ? '<h2>Comments</h2>' : ''}
    ${comments.map((comment) => `
      <h3>${comment.user?.login}</h3>
      <p style="white-space:break-spaces;">${escapeHTML(comment.body)}</p>
    `)}
  `);
}

function escapeHTML(str) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}