// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import github from '../lib/github';

export default async function renderRepos() {
  const userRepos = await github.getUserRepos();

  const repos = userRepos.map((repo) => `
    <div class="post">
      <div>
        <a href="${repo.html_url}" >
          <h3>${repo.name}</h3>
        </a>
        <small>
        ${new Date(repo.created_at).toDateString()}
        ${repo.homepage ? `<a href="${repo.homepage}" class="emoji active" title="Demo">🌍</a>` : ''}
        </small>
        <p>
          ${repo.description}
        </p>
        <span class="circle ${repo.language}"></span>
        <small>${repo.language}</small>
        <small>${repo?.license?.name || ''}</small>
      </div>
    </div>
  `);

  return `
    <section>
      <h1>Top Repositories</h1>
      <div class="posts">
        ${repos.slice(0, 4).join('')}
      </div>
    </section>
  `;
}

// @license-end