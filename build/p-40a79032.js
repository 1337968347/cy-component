let e,t,l,n=!1,o=!1,s=!1,i=!1,c=!1;const r="undefined"!=typeof window?window:{},f=r.document||{head:{}},a={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,l,n)=>e.addEventListener(t,l,n),rel:(e,t,l,n)=>e.removeEventListener(t,l,n),ce:(e,t)=>new CustomEvent(e,t)},u=e=>Promise.resolve(e),$=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),d=(e,t,l)=>{l&&l.map((([l,n,o])=>{const s=e,i=p(t,o),c=y(l);a.ael(s,n,i,c),(t.o=t.o||[]).push((()=>a.rel(s,n,i,c)))}))},p=(e,t)=>l=>{try{256&e.t?e.i[t](l):(e.u=e.u||[]).push([t,l])}catch(e){ce(e)}},y=e=>0!=(2&e),b=new WeakMap,h=e=>"sc-"+e.$,m={},w=e=>"object"==(e=typeof e)||"function"===e,g=(e,t,...l)=>{let n=null,o=null,s=null,i=!1,c=!1,r=[];const f=t=>{for(let l=0;l<t.length;l++)n=t[l],Array.isArray(n)?f(n):null!=n&&"boolean"!=typeof n&&((i="function"!=typeof e&&!w(n))&&(n+=""),i&&c?r[r.length-1].p+=n:r.push(i?v(null,n):n),c=i)};if(f(l),t){t.key&&(o=t.key),t.name&&(s=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}const a=v(e,null);return a.h=t,r.length>0&&(a.m=r),a.g=o,a.v=s,a},v=(e,t)=>({t:0,k:e,p:t,j:null,m:null,h:null,g:null,v:null}),k={},j=(e,t,l,n,o,s)=>{if(l!==n){let i=ie(e,t),c=t.toLowerCase();if("class"===t){const t=e.classList,o=O(l),s=O(n);t.remove(...o.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!o.includes(e))))}else if("style"===t){for(const t in l)n&&null!=n[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in n)l&&n[t]===l[t]||(t.includes("-")?e.style.setProperty(t,n[t]):e.style[t]=n[t])}else if("key"===t);else if("ref"===t)n&&n(e);else if(i||"o"!==t[0]||"n"!==t[1]){const c=w(n);if((i||c&&null!==n)&&!o)try{if(e.tagName.includes("-"))e[t]=n;else{let o=null==n?"":n;"list"===t?i=!1:null!=l&&e[t]==o||(e[t]=o)}}catch(e){}null==n||!1===n?!1===n&&""!==e.getAttribute(t)||e.removeAttribute(t):(!i||4&s||o)&&!c&&e.setAttribute(t,n=!0===n?"":n)}else t="-"===t[2]?t.slice(3):ie(r,c)?c.slice(2):c[2]+t.slice(3),l&&a.rel(e,t,l,!1),n&&a.ael(e,t,n,!1)}},S=/\s/,O=e=>e?e.split(S):[],C=(e,t,l,n)=>{const o=11===t.j.nodeType&&t.j.host?t.j.host:t.j,s=e&&e.h||m,i=t.h||m;for(n in s)n in i||j(o,n,s[n],void 0,l,t.t);for(n in i)j(o,n,s[n],i[n],l,t.t)},M=(o,c,r,a)=>{let u,$,d,p=c.m[r],y=0;if(n||(s=!0,"slot"===p.k&&(e&&a.classList.add(e+"-s"),p.t|=p.m?2:1)),null!==p.p)u=p.j=f.createTextNode(p.p);else if(1&p.t)u=p.j=f.createTextNode("");else{if(i||(i="svg"===p.k),u=p.j=f.createElementNS(i?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&p.t?"slot-fb":p.k),i&&"foreignObject"===p.k&&(i=!1),C(null,p,i),null!=e&&u["s-si"]!==e&&u.classList.add(u["s-si"]=e),p.m)for(y=0;y<p.m.length;++y)$=M(o,p,y,u),$&&u.appendChild($);"svg"===p.k?i=!1:"foreignObject"===u.tagName&&(i=!0)}return u["s-hn"]=l,3&p.t&&(u["s-sr"]=!0,u["s-cr"]=t,u["s-sn"]=p.v||"",d=o&&o.m&&o.m[r],d&&d.k===p.k&&o.j&&P(o.j,!1)),u},P=(e,t)=>{a.t|=1;const n=e.childNodes;for(let e=n.length-1;e>=0;e--){const o=n[e];o["s-hn"]!==l&&o["s-ol"]&&(E(o).insertBefore(o,L(o)),o["s-ol"].remove(),o["s-ol"]=void 0,s=!0),t&&P(o,t)}a.t&=-2},R=(e,t,n,o,s,i)=>{let c,r=e["s-cr"]&&e["s-cr"].parentNode||e;for(r.shadowRoot&&r.tagName===l&&(r=r.shadowRoot);s<=i;++s)o[s]&&(c=M(null,n,s,e),c&&(o[s].j=c,r.insertBefore(c,L(t))))},T=(e,t,l,n,s)=>{for(;t<=l;++t)(n=e[t])&&(s=n.j,U(n),o=!0,s["s-ol"]?s["s-ol"].remove():P(s,!0),s.remove())},x=(e,t)=>e.k===t.k&&("slot"===e.k?e.v===t.v:e.g===t.g),L=e=>e&&e["s-ol"]||e,E=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,W=(e,t)=>{const l=t.j=e.j,n=e.m,o=t.m,s=t.k,c=t.p;let r;null===c?(i="svg"===s||"foreignObject"!==s&&i,"slot"===s||C(e,t,i),null!==n&&null!==o?((e,t,l,n)=>{let o,s,i=0,c=0,r=0,f=0,a=t.length-1,u=t[0],$=t[a],d=n.length-1,p=n[0],y=n[d];for(;i<=a&&c<=d;)if(null==u)u=t[++i];else if(null==$)$=t[--a];else if(null==p)p=n[++c];else if(null==y)y=n[--d];else if(x(u,p))W(u,p),u=t[++i],p=n[++c];else if(x($,y))W($,y),$=t[--a],y=n[--d];else if(x(u,y))"slot"!==u.k&&"slot"!==y.k||P(u.j.parentNode,!1),W(u,y),e.insertBefore(u.j,$.j.nextSibling),u=t[++i],y=n[--d];else if(x($,p))"slot"!==u.k&&"slot"!==y.k||P($.j.parentNode,!1),W($,p),e.insertBefore($.j,u.j),$=t[--a],p=n[++c];else{for(r=-1,f=i;f<=a;++f)if(t[f]&&null!==t[f].g&&t[f].g===p.g){r=f;break}r>=0?(s=t[r],s.k!==p.k?o=M(t&&t[c],l,r,e):(W(s,p),t[r]=void 0,o=s.j),p=n[++c]):(o=M(t&&t[c],l,c,e),p=n[++c]),o&&E(u.j).insertBefore(o,L(u.j))}i>a?R(e,null==n[d+1]?null:n[d+1].j,l,n,c,d):c>d&&T(t,i,a)})(l,n,t,o):null!==o?(null!==e.p&&(l.textContent=""),R(l,null,t,o,0,o.length-1)):null!==n&&T(n,0,n.length-1),i&&"svg"===s&&(i=!1)):(r=l["s-cr"])?r.parentNode.textContent=c:e.p!==c&&(l.data=c)},A=e=>{let t,l,n,o,s,i,c=e.childNodes;for(l=0,n=c.length;l<n;l++)if(t=c[l],1===t.nodeType){if(t["s-sr"])for(s=t["s-sn"],t.hidden=!1,o=0;o<n;o++)if(i=c[o].nodeType,c[o]["s-hn"]!==t["s-hn"]||""!==s){if(1===i&&s===c[o].getAttribute("slot")){t.hidden=!0;break}}else if(1===i||3===i&&""!==c[o].textContent.trim()){t.hidden=!0;break}A(t)}},F=[],H=e=>{let t,l,n,s,i,c,r=0,f=e.childNodes,a=f.length;for(;r<a;r++){if(t=f[r],t["s-sr"]&&(l=t["s-cr"])&&l.parentNode)for(n=l.parentNode.childNodes,s=t["s-sn"],c=n.length-1;c>=0;c--)l=n[c],l["s-cn"]||l["s-nr"]||l["s-hn"]===t["s-hn"]||(N(l,s)?(i=F.find((e=>e.S===l)),o=!0,l["s-sn"]=l["s-sn"]||s,i?i.O=t:F.push({O:t,S:l}),l["s-sr"]&&F.map((e=>{N(e.S,l["s-sn"])&&(i=F.find((e=>e.S===l)),i&&!e.O&&(e.O=i.O))}))):F.some((e=>e.S===l))||F.push({S:l}));1===t.nodeType&&H(t)}},N=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,U=e=>{e.h&&e.h.ref&&e.h.ref(null),e.m&&e.m.map(U)},q=e=>ne(e).C,D=(e,t,l)=>{const n=q(e);return{emit:e=>V(n,t,{bubbles:!!(4&l),composed:!!(2&l),cancelable:!!(1&l),detail:e})}},V=(e,t,l)=>{const n=a.ce(t,l);return e.dispatchEvent(n),n},_=(e,t)=>{t&&!e.M&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.M=t)))},z=(e,t)=>{if(e.t|=16,!(4&e.t))return _(e,e.P),he((()=>B(e,t)));e.t|=512},B=(e,t)=>{const l=e.i;let n;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>Q(l,e,t))),e.u=null),n=Q(l,"componentWillLoad")),X(n,(()=>G(e,l,t)))},G=async(e,t,l)=>{const n=e.C,o=n["s-rc"];l&&(e=>{const t=e.R,l=e.C,n=t.t,o=((e,t)=>{let l=h(t),n=ae.get(l);if(e=11===e.nodeType?e:f,n)if("string"==typeof n){let t,o=b.get(e=e.head||e);o||b.set(e,o=new Set),o.has(l)||(t=f.createElement("style"),t.innerHTML=n,e.insertBefore(t,e.querySelector("link")),o&&o.add(l))}else e.adoptedStyleSheets.includes(n)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,n]);return l})(l.shadowRoot?l.shadowRoot:l.getRootNode(),t);10&n&&(l["s-sc"]=o,l.classList.add(o+"-h"),2&n&&l.classList.add(o+"-s"))})(e);I(e,t),o&&(o.map((e=>e())),n["s-rc"]=void 0);{const t=n["s-p"],l=()=>J(e);0===t.length?l():(Promise.all(t).then(l),e.t|=4,t.length=0)}},I=(i,c)=>{try{c=c.render(),i.t&=-17,i.t|=2,((i,c)=>{const r=i.C,u=i.R,$=i.T||v(null,null),d=(e=>e&&e.k===k)(c)?c:g(null,null,c);if(l=r.tagName,d.k=null,d.t|=4,i.T=d,d.j=$.j=r.shadowRoot||r,e=r["s-sc"],t=r["s-cr"],n=0!=(1&u.t),o=!1,W($,d),a.t|=1,s){let e,t,l,n,o,s;H(d.j);let i=0;for(;i<F.length;i++)e=F[i],t=e.S,t["s-ol"]||(l=f.createTextNode(""),l["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=l,t));for(i=0;i<F.length;i++)if(e=F[i],t=e.S,e.O){for(n=e.O.parentNode,o=e.O.nextSibling,l=t["s-ol"];l=l.previousSibling;)if(s=l["s-nr"],s&&s["s-sn"]===t["s-sn"]&&n===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&n!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),n.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}o&&A(d.j),a.t&=-2,F.length=0})(i,c)}catch(e){ce(e,i.C)}return null},J=e=>{const t=e.C,l=e.i,n=e.P;64&e.t||(e.t|=64,Y(t),Q(l,"componentDidLoad"),e.L(t),n||K()),e.W(t),e.M&&(e.M(),e.M=void 0),512&e.t&&be((()=>z(e,!1))),e.t&=-517},K=()=>{Y(f.documentElement),be((()=>V(r,"appload",{detail:{namespace:"app"}})))},Q=(e,t,l)=>{if(e&&e[t])try{return e[t](l)}catch(e){ce(e)}},X=(e,t)=>e&&e.then?e.then(t):t(),Y=e=>e.classList.add("hydrated"),Z=(e,t,l)=>{if(t.A){e.watchers&&(t.F=e.watchers);const n=Object.entries(t.A),o=e.prototype;if(n.map((([e,[n]])=>{31&n||2&l&&32&n?Object.defineProperty(o,e,{get(){return((e,t)=>ne(this).H.get(t))(0,e)},set(l){((e,t,l,n)=>{const o=ne(e),s=o.C,i=o.H.get(t),c=o.t,r=o.i;if(l=((e,t)=>null==e||w(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(l,n.A[t][0]),!(8&c&&void 0!==i||l===i)&&(o.H.set(t,l),r)){if(n.F&&128&c){const e=n.F[t];e&&e.map((e=>{try{r[e](l,i,t)}catch(e){ce(e,s)}}))}2==(18&c)&&z(o,!1)}})(this,e,l,t)},configurable:!0,enumerable:!0}):1&l&&64&n&&Object.defineProperty(o,e,{value(...t){const l=ne(this);return l.N.then((()=>l.i[e](...t)))}})})),1&l){const t=new Map;o.attributeChangedCallback=function(e,l,n){a.jmp((()=>{const l=t.get(e);this[l]=(null!==n||"boolean"!=typeof this[l])&&n}))},e.observedAttributes=n.filter((([e,t])=>15&t[0])).map((([e,l])=>{const n=l[1]||e;return t.set(n,e),n}))}}return e},ee=e=>{Q(e,"connectedCallback")},te=(e,t={})=>{const l=[],n=t.exclude||[],o=r.customElements,s=f.head,i=s.querySelector("meta[charset]"),c=f.createElement("style"),u=[];let p,y=!0;Object.assign(a,t),a.l=new URL(t.resourcesUrl||"./",f.baseURI).href,e.map((e=>e[1].map((t=>{const s={t:t[0],$:t[1],A:t[2],U:t[3]};s.A=t[2],s.U=t[3],s.F={};const i=s.$,c=class extends HTMLElement{constructor(e){super(e),se(e=this,s),1&s.t&&e.attachShadow({mode:"open"})}connectedCallback(){p&&(clearTimeout(p),p=null),y?u.push(this):a.jmp((()=>(e=>{if(0==(1&a.t)){const t=ne(e),l=t.R,n=()=>{};if(1&t.t)d(e,t,l.U),ee(t.i);else{t.t|=1,12&l.t&&(e=>{const t=e["s-cr"]=f.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let l=e;for(;l=l.parentNode||l.host;)if(l["s-p"]){_(t,t.P=l);break}}l.A&&Object.entries(l.A).map((([t,[l]])=>{if(31&l&&e.hasOwnProperty(t)){const l=e[t];delete e[t],e[t]=l}})),(async(e,t,l,n,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=fe(l)).then){const e=()=>{};o=await o,e()}o.isProxied||(l.F=o.watchers,Z(o,l,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(e){ce(e)}t.t&=-9,t.t|=128,e(),ee(t.i)}if(o.style){let e=o.style;const t=h(l);if(!ae.has(t)){const n=()=>{};((e,t,l)=>{let n=ae.get(e);$&&l?(n=n||new CSSStyleSheet,n.replace(t)):n=t,ae.set(e,n)})(t,e,!!(1&l.t)),n()}}}const s=t.P,i=()=>z(t,!0);s&&s["s-rc"]?s["s-rc"].push(i):i()})(0,t,l)}n()}})(this)))}disconnectedCallback(){a.jmp((()=>(()=>{if(0==(1&a.t)){const e=ne(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),Q(t,"disconnectedCallback")}})()))}componentOnReady(){return ne(this).q}};s.D=e[0],n.includes(i)||o.get(i)||(l.push(i),o.define(i,Z(c,s,1)))})))),c.innerHTML=l+"{visibility:hidden}.hydrated{visibility:inherit}",c.setAttribute("data-styles",""),s.insertBefore(c,i?i.nextSibling:s.firstChild),y=!1,u.length?u.map((e=>e.connectedCallback())):a.jmp((()=>p=setTimeout(K,30)))},le=new WeakMap,ne=e=>le.get(e),oe=(e,t)=>le.set(t.i=e,t),se=(e,t)=>{const l={t:0,C:e,R:t,H:new Map};return l.N=new Promise((e=>l.W=e)),l.q=new Promise((e=>l.L=e)),e["s-p"]=[],e["s-rc"]=[],d(e,l,t.U),le.set(e,l)},ie=(e,t)=>t in e,ce=(e,t)=>(0,console.error)(e,t),re=new Map,fe=e=>{const t=e.$.replace(/-/g,"_"),l=e.D,n=re.get(l);return n?n[t]:import(`./${l}.entry.js`).then((e=>(re.set(l,e),e[t])),ce)},ae=new Map,ue=[],$e=[],de=(e,t)=>l=>{e.push(l),c||(c=!0,t&&4&a.t?be(ye):a.raf(ye))},pe=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){ce(e)}e.length=0},ye=()=>{pe(ue),pe($e),(c=ue.length>0)&&a.raf(ye)},be=e=>u().then(e),he=de($e,!0);export{k as H,te as b,D as c,q as g,g as h,u as p,oe as r,he as w}