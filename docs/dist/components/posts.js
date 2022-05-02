// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import github, {extractPostData} from "../lib/github.js";
import {gists} from "../config.js";
export default async function renderGists(slicer = 0) {
  const keys = Object.keys(gists);
  const userGists = await github.getGists(keys);
  const posts = Object.values(gists).map(({description, title, image}, index) => {
    const {created_at, comments, updated_at} = extractPostData(userGists[index]);
    const dateCreated = new Date(created_at);
    return `
      <div class="post" onclick="window.location.assign('/post?pid=${keys[index]}')">
        <div class="post-date"> 
          <h2>${dateCreated.getDate()}</h2>
          <span>${dateCreated.toLocaleDateString(void 0, {month: "long"})}</span>
        </div>
        <div>
          <a href="post?pid=${keys[index]}">
            <h3>${title}</h3>
          </a>
          <small>
            Last updated @ ${new Date(updated_at).toDateString()}
          </small>
          <div>
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
