import{R as r,g as c,r as i}from"./vendor.2577096e.js";const{Link:d}=c,f=({tocItem:t})=>r.createElement(d,{href:`#${t.text}`,title:t.text},t.children&&r.createElement("div",{className:"catalog-container"},t.children.map(o=>r.createElement(f,{key:`${o.level}-${o.text}`,tocItem:o})))),p=(t,o=100)=>{let e=-1;return()=>{clearTimeout(e),e=setTimeout(t,o)}},u=p(()=>{const t=decodeURIComponent(location.hash).replace("#","");if(t){const o=document.getElementById(t);if(o){const e=o.offsetTop+414;window.scrollTo({top:e,behavior:"smooth"})}}}),v=({heads:t})=>{const o=i.exports.useMemo(()=>{const e=[];return t.forEach(({text:m,level:h})=>{const l={level:h,text:m};if(e.length===0)e.push(l);else{let n=e[e.length-1];if(l.level>n.level)for(let s=n.level+1;s<=6;s++){const{children:a}=n;if(!a){n.children=[l];break}if(n=a[a.length-1],l.level<=n.level){a.push(l);break}}else e.push(l)}}),e},[t]);return i.exports.useEffect(u,[t]),r.createElement(c,{affix:!1,showInkInFixed:!1},o.map(e=>r.createElement(f,{key:`${e.level}-${e.text}`,tocItem:e})))};var x=v;export{x as C};
