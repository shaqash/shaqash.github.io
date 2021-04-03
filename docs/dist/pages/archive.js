async function c(...t){if(fetch)return fetch(...t).then(s=>s.json());throw new Error("No polyfill for fetch")}function m(t,s,e="session"){let o=async(...r)=>t(...r),n=e==="session"?sessionStorage:localStorage;async function a(...r){let i=n.getItem(s);if(i){let{data:y}=JSON.parse(i);return y}let g=await o(...r);return n.setItem(s,JSON.stringify({data:g})),g}return a}var f={"293bf01a19c36c6e301d2fa070c76e35":{title:"Object literals",description:`This article is here to show the capabilities of object literals
      and how with one syntax you can do many things in JS.`,filename:"oliterals.md"},"476db0500a89d5a97acf1332f4d71c44":{title:"Pizza",description:"Pizza recipe and tricks for home oven.",filename:"pizza.md",image:"images/pizza.jpg"}},d="https://api.github.com",l="shaqash",p=["This site is written with pure JS","Pizza time"];async function S(t,s){return c(`${t}/users/${s}`)}async function $(t,s){return(await c(`${t}/users/${s}/starred`)).filter(o=>o.owner.login===s)}async function b(t,s){let e=`${t}/gists/${s}`,[o,n]=await Promise.all([c(e),c(`${e}/comments`)]);return{data:o,comments:n}}async function j(t,s){return Promise.all(s.map(e=>b(t,e)))}var N={getUserData:(t=l)=>m(S,"SHAQ_USER")(d,t),getUserRepos:(t=l)=>m($,"SHAQ_REPOS")(d,t),getGists:t=>m(j,"SHAQ_GIST")(d,t)},h=N;async function w(t=0){let s=Object.keys(f),e=await h.getGists(s);return`
    <section>
      ${Object.values(f).map(({description:n,title:a,image:r},i)=>`
    <div class="post">
      <div>
        <a href="https://gist.github.com/${l}/${s[i]}">
          <h2>${a}</h2>
        </a>
        <small>
            Posted by
            <img class="small" src="${e[0].data.owner.avatar_url}" alt="" />
            <i>${e[i].data.owner.login}</i>
            @ ${new Date(e[i].data.created_at).toLocaleDateString()}
        </small>
        <p>
          ${n}
        </p>
        <small>${e[i].comments.length} comment/s</small>
      </div>
      <div>
        ${r?`<img class="medium" src="${r}" alt="" />`:""}
      </div>
    </div>
  `).reduceRight((n,a)=>[...n,a],[]).slice(t).join("")}
    </section>
  `}function E(){let t=Math.floor(Math.random()*p.length);return p[t]}async function u(t,s){let e=async(...o)=>t(...o);return s.innerHTML=await e()}function O(t){let s=t("#random"),e=t(".menu");window.onscroll=()=>{window.pageYOffset>e.offsetTop?e.classList.add("sticky"):e.classList.remove("sticky")},u(E,s)}var R=t=>document.querySelector(t);O(R);function v(t){let s=t("#gists");u(w,s)}var x=t=>document.querySelector(t);v(x);
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
// @license-end
//# sourceMappingURL=//dist/pages//archive.js.map
