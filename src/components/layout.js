export default function withLayout(component) {
  return `
  <header>
  <div class="header-container">
    <div><img src="images/mypic_cluster.jpeg" loading="lazy" alt="logo" /></div>
    <div class="header-content">
      <h2>Shaked Ashkenazi</h2>
      <span>[shah-kehd] <i>Almond</i></span>
      <p>Software Developer</p>
    </div>
  </div>
</header>
<div class="separator sep1"></div>
<span id="top"></span>
<div class="menu">
  <div class="links">
    <a href="/">Go Home</a>
  </div>
  <div class="info">
    <i>
      <span id="random"></span>
    </i>
  </div>
</div>
<main>
  ${component}
</main>
<footer>
  <a href="#top">↑ <i>Back to top</i></a>
  <p>
    <small><strong>Licensed under ISC © Shaked Ashkenazi 2021</strong></small>
  </p>
  <p>
    <small>
      <i>
        Disclaimer: The posts are purely based on my opinion. This site does not collect user data.
      </i>
      😁
    </small>
  </p>
</footer>
  `;
}