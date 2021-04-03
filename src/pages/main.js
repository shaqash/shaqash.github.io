import github from '../lib/github';
import { render, renderGists } from '../index';

async function renderRepos() {
  const userRepos = await github.getUserRepos();

  const repos = userRepos.map((repo) => `
    <div class="post">
      <div>
        <a href="${repo.html_url}" >
          <h3>${repo.name}</h3>
        </a>
        <small>
        Posted
        @ ${new Date(repo.created_at).toLocaleDateString()}
        ${repo.homepage ? `<a href="${repo.homepage}" title="Demo">🔗</a>` : ''}
        </small>
        <p>
          ${repo.description}
        </p>
        <span class="circle ${repo.language || ''}"></span>
        <strong>${repo.language || ''}</strong>
      </div>
    </div>
  `);

  return `
    <section>
      <h1>Top Repositories</h1>
      ${repos.slice(0, 4).join('')}
    </section>
  `;
}

function main($) {
  const gists = $('#gists');
  const repos = $('#repos');

  // Render
  render(renderGists, gists);
  render(renderRepos, repos);
}

const query = (selector) => document.querySelector(selector);
main(query);