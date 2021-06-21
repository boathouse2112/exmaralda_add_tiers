(this.webpackJsonpexmaralda_add_tiers=this.webpackJsonpexmaralda_add_tiers||[]).push([[0],{15:function(e,t,n){e.exports=n(28)},20:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(12),c=n.n(l),i=(n(20),n(9)),o=n(1),u=n(8),s=n(2);var d=function(e){var t=e.openFilesHandler;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"openFilesForm stack-small"},r.a.createElement("h2",null,"Upload Files"),r.a.createElement("form",null,r.a.createElement("input",{type:"file",multiple:!0,onChange:t}))),r.a.createElement("div",{className:"openFilesForm stack-small"},r.a.createElement("h2",null,"Upload Folder"),r.a.createElement("form",null,r.a.createElement("input",{type:"file",directory:"",webkitdirectory:"",onChange:t}))))};var m=function(e){var t=e.files,n=e.addTiersAndDownload,a=e.deleteFiles;return r.a.createElement("div",{className:""},r.a.createElement("h2",null,"Files:"),r.a.createElement("button",{type:"button",className:"btn full",onClick:n},"Add Tiers and Download"),r.a.createElement("button",{type:"button",className:"btn btn__danger full",onClick:a},"Reset Files"),r.a.createElement("ul",null,function(){var e=t.slice(0,5).map((function(e){return r.a.createElement("li",{key:e.id},"".concat(e.path,"/").concat(e.name))}));return t.length>5&&e.push(r.a.createElement("li",{key:Object(s.a)()},"...")),e}()))},f=n(7),p=n(5),b=["speaker","type","category"];var v=function(e){var t=e.deleteTier,n=e.tierData,a=e.updateTierData;function l(e){e.preventDefault();var t=e.target.labels;if(t){var r=t[0].innerText,l=e.target.value;a(n.id,r,l)}}var c=b.map((function(e){return r.a.createElement("form",{key:"".concat(n.id,"-").concat(e),className:"tierForm"},r.a.createElement("label",{htmlFor:"".concat(n.id,"-").concat(e)},e),r.a.createElement("input",{id:"".concat(n.id,"-").concat(e),type:"text",autoComplete:"off",value:n[e],onChange:l}))}));return r.a.createElement("li",{className:"tier"},c,r.a.createElement("button",{type:"button",className:"btn btn__danger",onClick:function(){return t(n.id)}},"delete"))};var E=function(e){var t=e.tiers,n=e.setTiers;function a(e,a,r){var l=Object(p.a)(t),c=t.findIndex((function(t){return t.id===e})),i=l[c];null!=c&&(l[c]=Object(o.a)(Object(o.a)({},i),{},Object(f.a)({},a,r)),n(l))}function l(e){n(t.filter((function(t){return t.id!==e})))}var c=t.map((function(e){return r.a.createElement(v,{key:e.id,tierData:e,updateTierData:a,deleteTier:l})}));return r.a.createElement("div",{className:"stack-small"},r.a.createElement("h2",null,"Tiers to Add"),r.a.createElement("div",{className:"col"},r.a.createElement("button",{type:"button",className:"btn",onClick:function(){return n(w)}},"referent annotation default"),r.a.createElement("button",{type:"button",className:"btn",onClick:function(){return n(_)}},"left dislocation default"),r.a.createElement("button",{type:"button",className:"btn",onClick:function(){return n(T)}},"Referent form annotation default"),r.a.createElement("button",{type:"button",className:"btn",onClick:function(){n([].concat(Object(p.a)(t),[new N]))}},"add new tier")),r.a.createElement("ul",null,c))},y=n(13),h=n.n(y),k=n(10),g=n.n(k);n(14);function j(e){return Object(o.a)({typeName:"FileData"},e)}var F=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],r=t[1];function l(e){return console.log(n),n.map((function(t){return function(e,t){if(-1===e.name.indexOf(".exb"))return e;var n=t.map((function(e,t){return function(e,t){return'<tier id="'.concat(t,'" speaker="').concat(e.speaker,'" category="').concat(e.category,'" type="').concat(e.type,'">')+"</tier>"}(e,200+t)})).concat(["</basic-body>"]).join("\n"),a=e.text.replace("</basic-body>",n);return j({id:e.id,name:e.name,path:e.path,text:a})}(t,e)}))}return{files:n,openFilesHandler:function(e){e.preventDefault();var t=e.target.files;null!=t&&Array.from(t).forEach((function(e){var t;t=function(e){return void 0!==e.webkitRelativePath}(e)?e.webkitRelativePath:"",e.text().then((function(n){var a=j({id:Object(s.a)(),name:e.name,path:t,text:n});r((function(e){return[].concat(Object(p.a)(e),[a])}))}))}))},addTiersAndDownload:function(e){var t=l(e);console.log(t),1===t.length?function(e){var t=new Blob([e.text],{type:"text/plain"});g.a.saveAs(t,e.name)}(t[0]):function(e){var t=new h.a;e.forEach((function(e){""===e.path?t.file(e.name,e.text):t.file(e.path,e.text)})),console.log(t),t.generateAsync({type:"blob"}).then((function(e){return g.a.saveAs(e,"exb_files_tiers_added.zip")}))}(t)},deleteFiles:function(){r([])}}},N=function e(){Object(u.a)(this,e),this.id=void 0,this.speaker="",this.type="",this.category="",this.id="tier-".concat(Object(s.a)())};function x(e){return Object(o.a)(Object(o.a)({},new N),{},{speaker:"norm",type:"a",category:e})}var O=[x("")],w=[x("referent"),x("r-type"),x("conj_referent")],_=[x("ld_referent"),x("ld_direction"),x("ld_np"),x("ld_pronoun"),x("ld_intervening")],T=[x("ref-form"),x("ref-mod"),x("ref-form2"),x("ref-mod2"),x("ref-form3"),x("ref-mod3"),x("ref-tracking"),x("ref-tracking2"),x("ref-tracking3")];var D=function(){var e=F(),t=e.files,n=e.openFilesHandler,l=e.addTiersAndDownload,c=e.deleteFiles,o=Object(a.useState)(O),u=Object(i.a)(o,2),s=u[0],f=u[1];return r.a.createElement("div",{className:"col stack-small"},r.a.createElement("h1",null,"Add Exmaralda Tiers"),r.a.createElement(d,{openFilesHandler:n}),r.a.createElement("div",{className:"row filesTiers"},r.a.createElement("div",{className:"col"},r.a.createElement(m,{files:t,addTiersAndDownload:function(){return l(s)},deleteFiles:c})),r.a.createElement(E,{tiers:s,setTiers:f})))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.bf0b4962.chunk.js.map