import github from './lib/github';
import { gists, USERNAME } from './config';
import { random } from './config';

export async function renderGists(slicer = 0) {
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
            <img class="small" src="${userGists[0].data.owner.avatar_url}" alt="" />
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

export function renderRandom() {
  const index = Math.floor(Math.random() * random.length);

  return random[index];
}

/**
 * @param {(...args: any) => any} fn 
 * @param {HTMLElement} node 
 */
export async function render(fn, node) {
  const wrapper = async (...args) => fn(...args);

  return node.innerHTML = await wrapper();
}

function main($) {
  const random = $('#random');
  const menu = $('.menu');

  // Sticky menu
  window.onscroll = () => {
    if (window.pageYOffset > menu.offsetTop) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
  }

  // Render
  render(renderRandom, random)
}

const query = (selector) => document.querySelector(selector);
main(query);