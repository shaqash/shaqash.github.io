// docs/dist/lib/utils.js
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
async function getJSON(...args) {
  if (fetch) {
    return fetch(...args).then((res) => res.json());
  }
  throw new Error("No polyfill for fetch");
}
function withStash(fn, key, persistence = "session") {
  const wrapper = async (...args) => fn(...args);
  const storage = persistence === "session" ? sessionStorage : localStorage;
  async function inner(...args) {
    const stored = storage.getItem(key);
    if (stored) {
      const {data: data2} = JSON.parse(stored);
      return data2;
    }
    const data = await wrapper(...args);
    storage.setItem(key, JSON.stringify({data}));
    return data;
  }
  return inner;
}
// @license-end

// docs/dist/config.js
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
var gists = {
  "293bf01a19c36c6e301d2fa070c76e35": {
    title: "Object literals",
    description: `This article is here to show the capabilities of object literals
      and how with one syntax you can do many things in JS.`,
    filename: "oliterals.md"
  },
  "476db0500a89d5a97acf1332f4d71c44": {
    title: "Pizza",
    description: `Pizza recipe and tricks for home oven.`,
    filename: "pizza.md",
    image: "images/pizza.jpg"
  }
};
var ENTRYPOINT = "https://api.github.com";
var USERNAME = "shaqash";
var random = [
  "This site is written with pure JS",
  "Pizza time"
];
// @license-end

// docs/dist/lib/github.js
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
async function getUserData(entrypoint, username) {
  return getJSON(`${entrypoint}/users/${username}`);
}
async function getUserRepos(entrypoint, username) {
  const repos = await getJSON(`${entrypoint}/users/${username}/starred`);
  return repos.filter((repo) => repo.owner.login === username);
}
async function getGist(entrypoint, gistId) {
  const url = `${entrypoint}/gists/${gistId}`;
  const [data, comments] = await Promise.all([
    getJSON(url),
    getJSON(`${url}/comments`)
  ]);
  return {
    data,
    comments
  };
}
async function getGists(entrypoint, gistIds) {
  return Promise.all(gistIds.map((id) => getGist(entrypoint, id)));
}
var def = {
  getUserData: (username = USERNAME) => withStash(getUserData, "SHAQ_USER")(ENTRYPOINT, username),
  getUserRepos: (username = USERNAME) => withStash(getUserRepos, "SHAQ_REPOS")(ENTRYPOINT, username),
  getGists: (gistIds) => withStash(getGists, "SHAQ_GIST")(ENTRYPOINT, gistIds)
};
var github_default = def;
// @license-end

// docs/dist/index.js
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
async function renderGists(slicer = 0) {
  const keys = Object.keys(gists);
  const userGists = await github_default.getGists(keys);
  const posts = Object.values(gists).map(({description, title, image}, index) => `
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
        ${image ? `<img class="medium" src="${image}" alt="" />` : ""}
      </div>
    </div>
  `);
  return `
    <section>
      ${posts.reduceRight((acc, cur) => [...acc, cur], []).slice(slicer).join("")}
    </section>
  `;
}
function renderRandom() {
  const index = Math.floor(Math.random() * random.length);
  return random[index];
}
async function render(fn, node) {
  const wrapper = async (...args) => fn(...args);
  return node.innerHTML = await wrapper();
}
function main($) {
  const random2 = $("#random");
  const menu = $(".menu");
  window.onscroll = () => {
    if (window.pageYOffset > menu.offsetTop) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
  };
  render(renderRandom, random2);
}
var query = (selector) => document.querySelector(selector);
main(query);
// @license-end

// docs/dist/pages/archive.js
function main2($) {
  const gists2 = $("#gists");
  render(renderGists, gists2);
}
var query2 = (selector) => document.querySelector(selector);
main2(query2);
//# sourceMappingURL=//dist/pages//archive.js.map
