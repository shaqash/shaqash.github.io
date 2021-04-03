async function c(...t){if(fetch)return fetch(...t).then(e=>e.json());throw new Error("No polyfill for fetch")}function m(t,e,s="session"){let o=async(...a)=>t(...a),n=s==="session"?sessionStorage:localStorage;async function r(...a){let i=n.getItem(e);if(i){let{data:$}=JSON.parse(i);return $}let h=await o(...a);return n.setItem(e,JSON.stringify({data:h})),h}return r}var g={"293bf01a19c36c6e301d2fa070c76e35":{title:"Object literals",description:`This article is here to show the capabilities of object literals
      and how with one syntax you can do many things in JS.`,filename:"oliterals.md"},"476db0500a89d5a97acf1332f4d71c44":{title:"Pizza",description:"Pizza recipe and tricks for home oven.",filename:"pizza.md",image:"images/pizza.jpg"}},p="https://api.github.com",l="shaqash",f=["This site is written with pure JS","Pizza time"];async function y(t,e){return c(`${t}/users/${e}`)}async function S(t,e){return(await c(`${t}/users/${e}/starred`)).filter(o=>o.owner.login===e)}async function b(t,e){let s=`${t}/gists/${e}`,[o,n]=await Promise.all([c(s),c(`${s}/comments`)]);return{data:o,comments:n}}async function R(t,e){return Promise.all(e.map(s=>b(t,s)))}var j={getUserData:(t=l)=>m(y,"SHAQ_USER")(p,t),getUserRepos:(t=l)=>m(S,"SHAQ_REPOS")(p,t),getGists:t=>m(R,"SHAQ_GIST")(p,t)},d=j;async function w(t=0){let e=Object.keys(g),s=await d.getGists(e);return`
    <section>
      ${Object.values(g).map(({description:n,title:r,image:a},i)=>`
    <div class="post">
      <div>
        <a href="https://gist.github.com/${l}/${e[i]}">
          <h2>${r}</h2>
        </a>
        <small>
            Posted by
            <img class="small" src="${s[0].data.owner.avatar_url}" alt="" />
            <i>${s[i].data.owner.login}</i>
            @ ${new Date(s[i].data.created_at).toLocaleDateString()}
        </small>
        <p>
          ${n}
        </p>
        <small>${s[i].comments.length} comment/s</small>
      </div>
      <div>
        ${a?`<img class="medium" src="${a}" alt="" />`:""}
      </div>
    </div>
  `).reduceRight((n,r)=>[...n,r],[]).slice(t).join("")}
    </section>
  `}function v(){let t=Math.floor(Math.random()*f.length);return f[t]}async function u(t,e){let s=async(...o)=>t(...o);return e.innerHTML=await s()}function N(t){let e=t("#random"),s=t(".menu");window.onscroll=()=>{window.pageYOffset>s.offsetTop?s.classList.add("sticky"):s.classList.remove("sticky")},u(v,e)}var E=t=>document.querySelector(t);N(E);async function O(){return`
    <section>
      <h1>Top Repositories</h1>
      ${(await d.getUserRepos()).map(s=>`
    <div class="post">
      <div>
        <a href="${s.html_url}" >
          <h3>${s.name}</h3>
        </a>
        <small>
        Posted
        @ ${new Date(s.created_at).toLocaleDateString()}
        ${s.homepage?`<a href="${s.homepage}" title="Demo">🔗</a>`:""}
        </small>
        <p>
          ${s.description}
        </p>
        <span class="circle ${s.language||""}"></span>
        <strong>${s.language||""}</strong>
      </div>
    </div>
  `).slice(0,4).join("")}
    </section>
  `}function x(t){let e=t("#gists"),s=t("#repos");u(w,e),u(O,s)}var z=t=>document.querySelector(t);x(z);
// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
// @license-end
//# sourceMappingURL=//dist/pages//main.js.map
