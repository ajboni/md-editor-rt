import{r,u as n,R as t}from"./index.2d863257.js";import{E as u,a as i}from"./md-editor-rt.es.3566e945.js";import{v as d}from"./package.5ba65ca1.js";import{A as p,C as E}from"./index.3e7b118e.js";var h=()=>{const[o,s]=r.exports.useState(""),[c,m]=r.exports.useState([]),a=n(e=>e),l=()=>{i.get(`/doc-${a.lang}.md`).then(({data:e})=>{s(e.replace(/\$\{EDITOR_VERSION\}/g,d))}).catch(e=>{console.error(e),s("\u6587\u6863\u8BFB\u53D6\u5931\u8D25\uFF01")})};return r.exports.useEffect(l,[a.lang]),t.createElement("div",{className:"container"},t.createElement("div",{className:"doc"},t.createElement("div",{className:"content"},t.createElement(u,{theme:a.theme,language:a.lang,modelValue:o,previewTheme:a.previewTheme,previewOnly:!0,showCodeRowNumber:!0,onGetCatalog:e=>{m(e)}})),t.createElement("div",{className:"catalog"},t.createElement(p,{offsetTop:16},t.createElement(E,{heads:c})))))};export{h as default};