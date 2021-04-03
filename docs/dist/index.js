async function c(...t){if(fetch)return fetch(...t).then(s=>s.json());throw new Error("No polyfill for fetch")}function m(t,s,e="session"){let o=async(...r)=>t(...r),n=e==="session"?sessionStorage:localStorage;async function a(...r){let i=n.getItem(s);if(i){let{data:y}=JSON.parse(i);return y}let u=await o(...r);return n.setItem(s,JSON.stringify({data:u})),u}return a}var p={"293bf01a19c36c6e301d2fa070c76e35":{title:"Object literals",description:`This article is here to show the capabilities of object literals
      and how with one syntax you can do many things in JS.`,filename:"oliterals.md"},"476db0500a89d5a97acf1332f4d71c44":{title:"Pizza",description:"Pizza recipe and tricks for home oven.",filename:"pizza.md",image:"images/pizza.jpg"}},f="https://api.github.com",l="shaqash",d=["This site is written with pure JS","Pizza time"];async function S(t,s){return c(`${t}/users/${s}`)}async function $(t,s){return(await c(`${t}/users/${s}/starred`)).filter(o=>o.owner.login===s)}async function b(t,s){let e=`${t}/gists/${s}`,[o,n]=await Promise.all([c(e),c(`${e}/comments`)]);return{data:o,comments:n}}async function j(t,s){return Promise.all(s.map(e=>b(t,e)))}var N={getUserData:(t=l)=>m(S,"SHAQ_USER")(f,t),getUserRepos:(t=l)=>m($,"SHAQ_REPOS")(f,t),getGists:t=>m(j,"SHAQ_GIST")(f,t)},g=N;async function E(t=0){let s=Object.keys(p),e=await g.getGists(s);return`
    <section>
      ${Object.values(p).map(({description:n,title:a,image:r},i)=>`
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
  `}function h(){let t=Math.floor(Math.random()*d.length);return d[t]}async function w(t,s){let e=async(...o)=>t(...o);return s.innerHTML=await e()}function O(t){let s=t("#random"),e=t(".menu");window.onscroll=()=>{window.pageYOffset>e.offsetTop?e.classList.add("sticky"):e.classList.remove("sticky")},w(h,s)}var R=t=>document.querySelector(t);O(R);export{w as render,E as renderGists,h as renderRandom};
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
// @license-end
//# sourceMappingURL=//dist//index.js.map
