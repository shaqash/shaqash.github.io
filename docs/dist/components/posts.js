// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import github, {extractPostData} from "../lib/github.js";
import {gists} from "../config.js";
export default async function renderGists(slicer = 0) {
  const keys = Object.keys(gists);
  const userGists = await github.getGists(keys);
  const posts = Object.values(gists).map(({description, title, image}, index) => {
    const {created_at, comments} = extractPostData(userGists[index]);
    return `
      <div class="post" onclick="window.location.assign('/post?pid=${keys[index]}')">
        <div>
          <a href="post?pid=${keys[index]}">
            <h3>${title}</h3>
          </a>
          <small>
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
      <h1># posts</h1>
      <div class="posts">
        ${posts.reduceRight((acc, cur) => [...acc, cur], []).slice(slicer).join("")}
      </div>
    </section>
  `;
}
// @license-end
