// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import github, {extractPostData} from "../lib/github.js";
import {gists, USERNAME} from "../config.js";
export default async function renderGists(slicer = 0) {
  const keys = Object.keys(gists);
  const userGists = await github.getGists(keys);
  const posts = Object.values(gists).map(({description, title, image}, index) => {
    const {avatar_url, login, created_at, comments} = extractPostData(userGists[index]);
    return `
      <div class="post" onclick="window.location.replace('https://gist.github.com/${USERNAME}/${keys[index]}')">
        <div>
          <a href="https://gist.github.com/${USERNAME}/${keys[index]}">
            <h2>${title}</h2>
          </a>
          <small>
            Posted by
            <img class="small" src="${avatar_url}" alt="" />
            <i>${login}</i>
            @ ${new Date(created_at).toDateString()}
          </small>
          <div>
            <div class="post-image">
              ${image ? `<img class="medium" src="${image}" alt="" />` : ""}
            </div>
            <p>
            ${description}
            </p>
          </div>
          <div>
            <small>${comments.length} comment/s</small>
          </div>
        </div>
      </div>
    `;
  });
  return `
    <section>
      <h1>Posts</h1>
      <div class="posts">
        ${posts.reduceRight((acc, cur) => [...acc, cur], []).slice(slicer).join("")}
      </div>
    </section>
  `;
}
// @license-end
