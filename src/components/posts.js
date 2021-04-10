// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import github from '../lib/github';
import { gists, USERNAME } from '../config';

export default async function renderGists(slicer = 0) {
  const keys = Object.keys(gists);
  const userGists = await github.getGists(keys);

  const posts = Object.values(gists).map(({ description, title, image }, index) => `
    <div class="post">
      <div>
        <a href="https://gist.github.com/${USERNAME}/${keys[index]}">
          <h2>${title}</h2>
        </a>
        <small>
            Posted by
            <img class="small" src="${userGists[index].data.owner.avatar_url}" alt="" />
            <i>${userGists[index].data.owner.login}</i>
            @ ${new Date(userGists[index].data.created_at).toLocaleDateString()}
        </small>
        <p>
          ${description}
        </p>
        <small>${userGists[index].comments.length} comment/s</small>
      </div>
      <div>
        ${image ? `<img class="medium" src="${image}" alt="" />` : ''}
      </div>
    </div>
  `);

  return `
    <section>
      ${posts.reduceRight((acc, cur) => [...acc, cur], []).slice(slicer).join('')}
    </section>
  `;
}

// @license-end