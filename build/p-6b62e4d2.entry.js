import{r as t,h as a,g as e}from"./p-c18fa1fb.js";const c=class{constructor(a){t(this,a)}back(){this.el.closest("cy-nav").pop()}render(){return a("div",{class:"cy-page"},a("cy-header",null,a("div",{slot:"start",class:"btn-box activatable",onClick:this.back.bind(this)},a("cy-icon",{name:"back"}),a("cy-ripple",{type:"unbounded"})),a("h3",null,"Header")),a("cy-content",null,"second Page"))}get el(){return e(this)}};export{c as nav_pagetwo}