import{r as t,h as n,g as e}from"./p-175eb10b.js";const a=class{constructor(n){t(this,n),this.comList=[],this.lastId=0}async addCom(){const t=this.el.querySelector(".nav-container"),n=document.createElement("page-one");[...t.children].filter(((n,e)=>e!==[...t.children].length-1)).forEach((t=>{t.className="cy-page hidden"}));const e=t.children[t.children.length-1];this.lastId++,n.style.zIndex=this.lastId+"",n.comId=this.lastId+"",n.className="cy-page",setTimeout((()=>{[...t.children][[...t.children].length-2].className="cy-page hidden"}),900),this.createAnimation(n),this.createHiddenAnimation(e),t.appendChild(n)}async pop(){this.lastId--;const t=this.el.querySelector(".nav-container");if(1==t.children.length)return;[...t.children].slice(0,[...t.children].length-2).forEach((t=>{t.className="hydrated hidden"})),t.children[t.children.length-2].className="cy-page hydrated";const n=t.children[t.children.length-1];this.createPopHiddenAnimation(n),setTimeout((()=>{t.removeChild(n)}),700)}createAnimation(t){t.animate([{transform:"translateX(100%)"},{transform:"translateX(0px)"}],{delay:0,duration:1e3,easing:"cubic-bezier(0.36, 0.66, 0.04, 1)",iterations:1,fill:"none",direction:"normal"})}createHiddenAnimation(t){t.animate([{transform:"translateX(0)",opacity:"1"},{transform:"translateX(-100%)",opacity:"0.8"}],{delay:0,duration:1e3,easing:"cubic-bezier(0.36, 0.66, 0.04, 1)",iterations:1,fill:"none",direction:"normal"})}createPopHiddenAnimation(t){t.animate([{transform:"translateX(0)",opacity:"1"},{transform:"translateX(100%)",opacity:"0.8"}],{delay:0,duration:1e3,easing:"cubic-bezier(0.36, 0.66, 0.04, 1)",iterations:1,fill:"none",direction:"normal"})}getLastComponent(){const t=this.el.querySelector(".nav-container");return t[t.length-1]}render(){return n("div",{class:"nav-container"},n("slot",null),this.comList.map((t=>n("page-one",{style:{"z-index":t+""},id:t+""}))))}get el(){return e(this)}};a.style=".hidden{display:none !important}cy-page{transform-origin:0 0}";export{a as cy_nav}