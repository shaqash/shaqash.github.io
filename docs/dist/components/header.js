// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
export default function renderHeader({text}) {
  return `
  <div class="intro">
    <h1>What is this?</h1>
    <p>
      ${text}
    </p>
    <div class="menu">
      <div class="links">
        <a href="https://github.com/shaqash" class="emoji active" title="Find me on Github">🐙</a>
        <a href="mailto:ash.shaked@gmail.com" class="emoji active" title="Email Me">📬</a>
      </div>
    </div>
  </div>
  `;
}
// @license-end
