// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
export default function withLayout(...components) {
  const menu = getMenu(window.location.pathname);
  return `
  <header>
  <div class="header-container">
  
    <div class="header-content">
      <h2>Pizza & Code</h2>
    </div>
    <div>
      <div class="links">
        <a href="https://github.com/shaqash" class="emoji2">🐱</a>
        <a href="mailto:ash.shaked@gmail.com" class="emoji2">📬</a>
      </div>
    </div>
  </div>
</header>
<div class="separator sep1"></div>
<span id="top"></span>
<div class="menu">
  <div class="links">
    ${menu.map(([key, val]) => {
    return `<a href="${key}"><code>${val}</code></a>`;
  }).join('')}
  </div>
  <div class="info">
    <i>
      <span id="random"></span>
    </i>
  </div>
</div>
<main>
  ${components.join('')}
</main>
<footer>
  <a href="#top">↑ <i>Back to top</i></a>
  <p>
    <ul>
      <li><a href="/ssr">Go SSR!</a></li>
    </ul>
  </p>
  <p>
    <small><strong>Licensed under ISC © Shaked Ashkenazi 2021</strong></small>
  </p>
  <p>
    <small>
      <i>
        This site does not collect user data.
      </i>
      😁
    </small>
  </p>
</footer>
  `;
}

function getMenu(currentPage) {
  const menuItems = {
    '/': '/home',
    '/archive': '/archive',
  };
  return Object.entries(menuItems).filter(([key, val]) => key !== currentPage);
}
// @license-end