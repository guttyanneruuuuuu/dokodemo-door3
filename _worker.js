var Ae=Object.defineProperty;var qt=t=>{throw TypeError(t)};var Re=(t,e,i)=>e in t?Ae(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var p=(t,e,i)=>Re(t,typeof e!="symbol"?e+"":e,i),Nt=(t,e,i)=>e.has(t)||qt("Cannot "+i);var a=(t,e,i)=>(Nt(t,e,"read from private field"),i?i.call(t):e.get(t)),y=(t,e,i)=>e.has(t)?qt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),u=(t,e,i,r)=>(Nt(t,e,"write to private field"),r?r.call(t,i):e.set(t,i),i),m=(t,e,i)=>(Nt(t,e,"access private method"),i);var Bt=(t,e,i,r)=>({set _(s){u(t,e,s,i)},get _(){return a(t,e,r)}});var Yt=(t,e,i)=>(r,s)=>{let n=-1;return o(0);async function o(c){if(c<=n)throw new Error("next() called multiple times");n=c;let l,d=!1,h;if(t[c]?(h=t[c][0][0],r.req.routeIndex=c):h=c===t.length&&s||void 0,h)try{l=await h(r,()=>o(c+1))}catch(f){if(f instanceof Error&&e)r.error=f,l=await e(f,r),d=!0;else throw f}else r.finalized===!1&&i&&(l=await i(r));return l&&(r.finalized===!1||d)&&(r.res=l),r}},Ee=Symbol(),Oe=async(t,e=Object.create(null))=>{const{all:i=!1,dot:r=!1}=e,n=(t instanceof ce?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?Me(t,{all:i,dot:r}):{}};async function Me(t,e){const i=await t.formData();return i?je(i,e):{}}function je(t,e){const i=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?$e(i,s,r):i[s]=r}),e.dot&&Object.entries(i).forEach(([r,s])=>{r.includes(".")&&(Le(i,r,s),delete i[r])}),i}var $e=(t,e,i)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(i):t[e]=[t[e],i]:e.endsWith("[]")?t[e]=[i]:t[e]=i},Le=(t,e,i)=>{if(/(?:^|\.)__proto__\./.test(e))return;let r=t;const s=e.split(".");s.forEach((n,o)=>{o===s.length-1?r[n]=i:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},se=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Pe=t=>{const{groups:e,path:i}=Ce(t),r=se(i);return ke(r,e)},Ce=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(i,r)=>{const s=`@${r}`;return e.push([s,i]),s}),{groups:e,path:t}},ke=(t,e)=>{for(let i=e.length-1;i>=0;i--){const[r]=e[i];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[i][1]);break}}return t},Lt={},Se=(t,e)=>{if(t==="*")return"*";const i=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(i){const r=`${t}#${e}`;return Lt[r]||(i[2]?Lt[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,i[1],new RegExp(`^${i[2]}(?=/${e})`)]:[t,i[1],new RegExp(`^${i[2]}$`)]:Lt[r]=[t,i[1],!0]),Lt[r]}return null},Qt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,i=>{try{return e(i)}catch{return i}})}},Te=t=>Qt(t,decodeURI),ne=t=>{const e=t.url,i=e.indexOf("/",e.indexOf(":")+4);let r=i;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const n=e.indexOf("?",r),o=e.indexOf("#",r),c=n===-1?o===-1?void 0:o:o===-1?n:Math.min(n,o),l=e.slice(i,c);return Te(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(s===63||s===35)break}return e.slice(i,r)},Ie=t=>{const e=ne(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},nt=(t,e,...i)=>(i.length&&(e=nt(e,...i)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),ae=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),i=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){i.length===0&&r===""?i.push("/"):i.push(r);const n=s.replace("?","");r+="/"+n,i.push(r)}else r+="/"+s}),i.filter((s,n,o)=>o.indexOf(s)===n)},Ft=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Qt(t,le):t):t,oe=(t,e,i)=>{let r;if(!i&&e&&!/[%+]/.test(e)){let o=t.indexOf("?",8);if(o===-1)return;for(t.startsWith(e,o+1)||(o=t.indexOf(`&${e}`,o+1));o!==-1;){const c=t.charCodeAt(o+e.length+1);if(c===61){const l=o+e.length+2,d=t.indexOf("&",l);return Ft(t.slice(l,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";o=t.indexOf(`&${e}`,o+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const o=t.indexOf("&",n+1);let c=t.indexOf("=",n);c>o&&o!==-1&&(c=-1);let l=t.slice(n+1,c===-1?o===-1?void 0:o:c);if(r&&(l=Ft(l)),n=o,l==="")continue;let d;c===-1?d="":(d=t.slice(c+1,o===-1?void 0:o),r&&(d=Ft(d))),i?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(d)):s[l]??(s[l]=d)}return e?s[e]:s},He=oe,De=(t,e)=>oe(t,e,!0),le=decodeURIComponent,Kt=t=>Qt(t,le),lt,M,F,de,he,Ut,U,Jt,ce=(Jt=class{constructor(t,e="/",i=[[]]){y(this,F);p(this,"raw");y(this,lt);y(this,M);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});y(this,U,t=>{const{bodyCache:e,raw:i}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):e[t]=i[t]()});this.raw=t,this.path=e,u(this,M,i),u(this,lt,{})}param(t){return t?m(this,F,de).call(this,t):m(this,F,he).call(this)}query(t){return He(this.url,t)}queries(t){return De(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((i,r)=>{e[r]=i}),e}async parseBody(t){return Oe(this,t)}json(){return a(this,U).call(this,"text").then(t=>JSON.parse(t))}text(){return a(this,U).call(this,"text")}arrayBuffer(){return a(this,U).call(this,"arrayBuffer")}blob(){return a(this,U).call(this,"blob")}formData(){return a(this,U).call(this,"formData")}addValidatedData(t,e){a(this,lt)[t]=e}valid(t){return a(this,lt)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ee](){return a(this,M)}get matchedRoutes(){return a(this,M)[0].map(([[,t]])=>t)}get routePath(){return a(this,M)[0].map(([[,t]])=>t)[this.routeIndex].path}},lt=new WeakMap,M=new WeakMap,F=new WeakSet,de=function(t){const e=a(this,M)[0][this.routeIndex][1][t],i=m(this,F,Ut).call(this,e);return i&&/\%/.test(i)?Kt(i):i},he=function(){const t={},e=Object.keys(a(this,M)[0][this.routeIndex][1]);for(const i of e){const r=m(this,F,Ut).call(this,a(this,M)[0][this.routeIndex][1][i]);r!==void 0&&(t[i]=/\%/.test(r)?Kt(r):r)}return t},Ut=function(t){return a(this,M)[1]?a(this,M)[1][t]:t},U=new WeakMap,Jt),Ne={Stringify:1},fe=async(t,e,i,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(s?s[0]+=t:s=[t],Promise.all(n.map(c=>c({phase:e,buffer:s,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(l=>fe(l,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},Fe="text/plain; charset=UTF-8",_t=(t,e)=>({"Content-Type":t,...e}),xt=(t,e)=>new Response(t,e),Rt,Et,I,ct,H,O,Ot,dt,ht,Z,Mt,jt,Q,at,Xt,_e=(Xt=class{constructor(t,e){y(this,Q);y(this,Rt);y(this,Et);p(this,"env",{});y(this,I);p(this,"finalized",!1);p(this,"error");y(this,ct);y(this,H);y(this,O);y(this,Ot);y(this,dt);y(this,ht);y(this,Z);y(this,Mt);y(this,jt);p(this,"render",(...t)=>(a(this,dt)??u(this,dt,e=>this.html(e)),a(this,dt).call(this,...t)));p(this,"setLayout",t=>u(this,Ot,t));p(this,"getLayout",()=>a(this,Ot));p(this,"setRenderer",t=>{u(this,dt,t)});p(this,"header",(t,e,i)=>{this.finalized&&u(this,O,xt(a(this,O).body,a(this,O)));const r=a(this,O)?a(this,O).headers:a(this,Z)??u(this,Z,new Headers);e===void 0?r.delete(t):i!=null&&i.append?r.append(t,e):r.set(t,e)});p(this,"status",t=>{u(this,ct,t)});p(this,"set",(t,e)=>{a(this,I)??u(this,I,new Map),a(this,I).set(t,e)});p(this,"get",t=>a(this,I)?a(this,I).get(t):void 0);p(this,"newResponse",(...t)=>m(this,Q,at).call(this,...t));p(this,"body",(t,e,i)=>m(this,Q,at).call(this,t,e,i));p(this,"text",(t,e,i)=>!a(this,Z)&&!a(this,ct)&&!e&&!i&&!this.finalized?new Response(t):m(this,Q,at).call(this,t,e,_t(Fe,i)));p(this,"json",(t,e,i)=>m(this,Q,at).call(this,JSON.stringify(t),e,_t("application/json",i)));p(this,"html",(t,e,i)=>{const r=s=>m(this,Q,at).call(this,s,e,_t("text/html; charset=UTF-8",i));return typeof t=="object"?fe(t,Ne.Stringify,!1,{}).then(r):r(t)});p(this,"redirect",(t,e)=>{const i=String(t);return this.header("Location",/[^\x00-\xFF]/.test(i)?encodeURI(i):i),this.newResponse(null,e??302)});p(this,"notFound",()=>(a(this,ht)??u(this,ht,()=>xt()),a(this,ht).call(this,this)));u(this,Rt,t),e&&(u(this,H,e.executionCtx),this.env=e.env,u(this,ht,e.notFoundHandler),u(this,jt,e.path),u(this,Mt,e.matchResult))}get req(){return a(this,Et)??u(this,Et,new ce(a(this,Rt),a(this,jt),a(this,Mt))),a(this,Et)}get event(){if(a(this,H)&&"respondWith"in a(this,H))return a(this,H);throw Error("This context has no FetchEvent")}get executionCtx(){if(a(this,H))return a(this,H);throw Error("This context has no ExecutionContext")}get res(){return a(this,O)||u(this,O,xt(null,{headers:a(this,Z)??u(this,Z,new Headers)}))}set res(t){if(a(this,O)&&t){t=xt(t.body,t);for(const[e,i]of a(this,O).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=a(this,O).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,i)}u(this,O,t),this.finalized=!0}get var(){return a(this,I)?Object.fromEntries(a(this,I)):{}}},Rt=new WeakMap,Et=new WeakMap,I=new WeakMap,ct=new WeakMap,H=new WeakMap,O=new WeakMap,Ot=new WeakMap,dt=new WeakMap,ht=new WeakMap,Z=new WeakMap,Mt=new WeakMap,jt=new WeakMap,Q=new WeakSet,at=function(t,e,i){const r=a(this,O)?new Headers(a(this,O).headers):a(this,Z)??new Headers;if(typeof e=="object"&&"headers"in e){const n=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[o,c]of n)o.toLowerCase()==="set-cookie"?r.append(o,c):r.set(o,c)}if(i)for(const[n,o]of Object.entries(i))if(typeof o=="string")r.set(n,o);else{r.delete(n);for(const c of o)r.append(n,c)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??a(this,ct);return xt(t,{status:s,headers:r})},Xt),w="ALL",Ue="all",Qe=["get","post","put","delete","options","patch"],ue="Can not add a route since the matcher is already built.",pe=class extends Error{},Ge="__COMPOSED_HANDLER",We=t=>t.text("404 Not Found",404),Zt=(t,e)=>{if("getResponse"in t){const i=t.getResponse();return e.newResponse(i.body,i)}return console.error(t),e.text("Internal Server Error",500)},$,b,ge,L,Y,Pt,Ct,ft,qe=(ft=class{constructor(e={}){y(this,b);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");y(this,$,"/");p(this,"routes",[]);y(this,L,We);p(this,"errorHandler",Zt);p(this,"onError",e=>(this.errorHandler=e,this));p(this,"notFound",e=>(u(this,L,e),this));p(this,"fetch",(e,...i)=>m(this,b,Ct).call(this,e,i[1],i[0],e.method));p(this,"request",(e,i,r,s)=>e instanceof Request?this.fetch(i?new Request(e,i):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${nt("/",e)}`,i),r,s)));p(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(m(this,b,Ct).call(this,e.request,e,void 0,e.request.method))})});[...Qe,Ue].forEach(n=>{this[n]=(o,...c)=>(typeof o=="string"?u(this,$,o):m(this,b,Y).call(this,n,a(this,$),o),c.forEach(l=>{m(this,b,Y).call(this,n,a(this,$),l)}),this)}),this.on=(n,o,...c)=>{for(const l of[o].flat()){u(this,$,l);for(const d of[n].flat())c.map(h=>{m(this,b,Y).call(this,d.toUpperCase(),a(this,$),h)})}return this},this.use=(n,...o)=>(typeof n=="string"?u(this,$,n):(u(this,$,"*"),o.unshift(n)),o.forEach(c=>{m(this,b,Y).call(this,w,a(this,$),c)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??ne:Ie}route(e,i){const r=this.basePath(e);return i.routes.map(s=>{var o;let n;i.errorHandler===Zt?n=s.handler:(n=async(c,l)=>(await Yt([],i.errorHandler)(c,()=>s.handler(c,l))).res,n[Ge]=s.handler),m(o=r,b,Y).call(o,s.method,s.path,n)}),this}basePath(e){const i=m(this,b,ge).call(this);return i._basePath=nt(this._basePath,e),i}mount(e,i,r){let s,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?s=l=>l:s=r.replaceRequest));const o=n?l=>{const d=n(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};s||(s=(()=>{const l=nt(this._basePath,e),d=l==="/"?0:l.length;return h=>{const f=new URL(h.url);return f.pathname=f.pathname.slice(d)||"/",new Request(f,h)}})());const c=async(l,d)=>{const h=await i(s(l.req.raw),...o(l));if(h)return h;await d()};return m(this,b,Y).call(this,w,nt(e,"*"),c),this}},$=new WeakMap,b=new WeakSet,ge=function(){const e=new ft({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,u(e,L,a(this,L)),e.routes=this.routes,e},L=new WeakMap,Y=function(e,i,r){e=e.toUpperCase(),i=nt(this._basePath,i);const s={basePath:this._basePath,path:i,method:e,handler:r};this.router.add(e,i,[r,s]),this.routes.push(s)},Pt=function(e,i){if(e instanceof Error)return this.errorHandler(e,i);throw e},Ct=function(e,i,r,s){if(s==="HEAD")return(async()=>new Response(null,await m(this,b,Ct).call(this,e,i,r,"GET")))();const n=this.getPath(e,{env:r}),o=this.router.match(s,n),c=new _e(e,{path:n,matchResult:o,env:r,executionCtx:i,notFoundHandler:a(this,L)});if(o[0].length===1){let d;try{d=o[0][0][0][0](c,async()=>{c.res=await a(this,L).call(this,c)})}catch(h){return m(this,b,Pt).call(this,h,c)}return d instanceof Promise?d.then(h=>h||(c.finalized?c.res:a(this,L).call(this,c))).catch(h=>m(this,b,Pt).call(this,h,c)):d??a(this,L).call(this,c)}const l=Yt(o[0],this.errorHandler,a(this,L));return(async()=>{try{const d=await l(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return m(this,b,Pt).call(this,d,c)}})()},ft),ye=[];function Be(t,e){const i=this.buildAllMatchers(),r=((s,n)=>{const o=i[s]||i[w],c=o[2][n];if(c)return c;const l=n.match(o[0]);if(!l)return[[],ye];const d=l.indexOf("",1);return[o[1][d],l]});return this.match=r,r(t,e)}var St="[^/]+",bt=".*",At="(?:|/.*)",ot=Symbol(),Ye=new Set(".\\+*[^]$()");function Ke(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===bt||t===At?1:e===bt||e===At?-1:t===St?1:e===St?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var z,V,P,tt,Ze=(tt=class{constructor(){y(this,z);y(this,V);y(this,P,Object.create(null))}insert(e,i,r,s,n){if(e.length===0){if(a(this,z)!==void 0)throw ot;if(n)return;u(this,z,i);return}const[o,...c]=e,l=o==="*"?c.length===0?["","",bt]:["","",St]:o==="/*"?["","",At]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const h=l[1];let f=l[2]||St;if(h&&l[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw ot;if(d=a(this,P)[f],!d){if(Object.keys(a(this,P)).some(g=>g!==bt&&g!==At))throw ot;if(n)return;d=a(this,P)[f]=new tt,h!==""&&u(d,V,s.varIndex++)}!n&&h!==""&&r.push([h,a(d,V)])}else if(d=a(this,P)[o],!d){if(Object.keys(a(this,P)).some(h=>h.length>1&&h!==bt&&h!==At))throw ot;if(n)return;d=a(this,P)[o]=new tt}d.insert(c,i,r,s,n)}buildRegExpStr(){const i=Object.keys(a(this,P)).sort(Ke).map(r=>{const s=a(this,P)[r];return(typeof a(s,V)=="number"?`(${r})@${a(s,V)}`:Ye.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof a(this,z)=="number"&&i.unshift(`#${a(this,z)}`),i.length===0?"":i.length===1?i[0]:"(?:"+i.join("|")+")"}},z=new WeakMap,V=new WeakMap,P=new WeakMap,tt),Tt,$t,te,ze=(te=class{constructor(){y(this,Tt,{varIndex:0});y(this,$t,new Ze)}insert(t,e,i){const r=[],s=[];for(let o=0;;){let c=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return s[o]=[d,l],o++,c=!0,d}),!c)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[c]=s[o];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(c)!==-1){n[l]=n[l].replace(c,s[o][1]);break}}return a(this,$t).insert(n,e,r,a(this,Tt),i),r}buildRegExp(){let t=a(this,$t).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const i=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,o)=>n!==void 0?(i[++e]=Number(n),"$()"):(o!==void 0&&(r[Number(o)]=++e),"")),[new RegExp(`^${t}`),i,r]}},Tt=new WeakMap,$t=new WeakMap,te),Ve=[/^$/,[],Object.create(null)],kt=Object.create(null);function me(t){return kt[t]??(kt[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,i)=>i?`\\${i}`:"(?:|/.*)")}$`))}function Je(){kt=Object.create(null)}function Xe(t){var d;const e=new ze,i=[];if(t.length===0)return Ve;const r=t.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,f],[g,v])=>h?1:g?-1:f.length-v.length),s=Object.create(null);for(let h=0,f=-1,g=r.length;h<g;h++){const[v,R,k]=r[h];v?s[R]=[k.map(([C])=>[C,Object.create(null)]),ye]:f++;let j;try{j=e.insert(R,f,v)}catch(C){throw C===ot?new pe(R):C}v||(i[f]=k.map(([C,x])=>{const S=Object.create(null);for(x-=1;x>=0;x--){const[yt,Ht]=j[x];S[yt]=Ht}return[C,S]}))}const[n,o,c]=e.buildRegExp();for(let h=0,f=i.length;h<f;h++)for(let g=0,v=i[h].length;g<v;g++){const R=(d=i[h][g])==null?void 0:d[1];if(!R)continue;const k=Object.keys(R);for(let j=0,C=k.length;j<C;j++)R[k[j]]=c[R[k[j]]]}const l=[];for(const h in o)l[h]=i[o[h]];return[n,l,s]}function st(t,e){if(t){for(const i of Object.keys(t).sort((r,s)=>s.length-r.length))if(me(i).test(e))return[...t[i]]}}var G,W,It,ve,ee,ti=(ee=class{constructor(){y(this,It);p(this,"name","RegExpRouter");y(this,G);y(this,W);p(this,"match",Be);u(this,G,{[w]:Object.create(null)}),u(this,W,{[w]:Object.create(null)})}add(t,e,i){var c;const r=a(this,G),s=a(this,W);if(!r||!s)throw new Error(ue);r[t]||[r,s].forEach(l=>{l[t]=Object.create(null),Object.keys(l[w]).forEach(d=>{l[t][d]=[...l[w][d]]})}),e==="/*"&&(e="*");const n=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=me(e);t===w?Object.keys(r).forEach(d=>{var h;(h=r[d])[e]||(h[e]=st(r[d],e)||st(r[w],e)||[])}):(c=r[t])[e]||(c[e]=st(r[t],e)||st(r[w],e)||[]),Object.keys(r).forEach(d=>{(t===w||t===d)&&Object.keys(r[d]).forEach(h=>{l.test(h)&&r[d][h].push([i,n])})}),Object.keys(s).forEach(d=>{(t===w||t===d)&&Object.keys(s[d]).forEach(h=>l.test(h)&&s[d][h].push([i,n]))});return}const o=ae(e)||[e];for(let l=0,d=o.length;l<d;l++){const h=o[l];Object.keys(s).forEach(f=>{var g;(t===w||t===f)&&((g=s[f])[h]||(g[h]=[...st(r[f],h)||st(r[w],h)||[]]),s[f][h].push([i,n-d+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(a(this,W)).concat(Object.keys(a(this,G))).forEach(e=>{t[e]||(t[e]=m(this,It,ve).call(this,e))}),u(this,G,u(this,W,void 0)),Je(),t}},G=new WeakMap,W=new WeakMap,It=new WeakSet,ve=function(t){const e=[];let i=t===w;return[a(this,G),a(this,W)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(n=>[n,r[t][n]]):[];s.length!==0?(i||(i=!0),e.push(...s)):t!==w&&e.push(...Object.keys(r[w]).map(n=>[n,r[w][n]]))}),i?Xe(e):null},ee),q,D,ie,ei=(ie=class{constructor(t){p(this,"name","SmartRouter");y(this,q,[]);y(this,D,[]);u(this,q,t.routers)}add(t,e,i){if(!a(this,D))throw new Error(ue);a(this,D).push([t,e,i])}match(t,e){if(!a(this,D))throw new Error("Fatal error");const i=a(this,q),r=a(this,D),s=i.length;let n=0,o;for(;n<s;n++){const c=i[n];try{for(let l=0,d=r.length;l<d;l++)c.add(...r[l]);o=c.match(t,e)}catch(l){if(l instanceof pe)continue;throw l}this.match=c.match.bind(c),u(this,q,[c]),u(this,D,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(a(this,D)||a(this,q).length!==1)throw new Error("No active router has been determined yet.");return a(this,q)[0]}},q=new WeakMap,D=new WeakMap,ie),wt=Object.create(null),ii=t=>{for(const e in t)return!0;return!1},B,E,J,ut,A,N,K,pt,ri=(pt=class{constructor(e,i,r){y(this,N);y(this,B);y(this,E);y(this,J);y(this,ut,0);y(this,A,wt);if(u(this,E,r||Object.create(null)),u(this,B,[]),e&&i){const s=Object.create(null);s[e]={handler:i,possibleKeys:[],score:0},u(this,B,[s])}u(this,J,[])}insert(e,i,r){u(this,ut,++Bt(this,ut)._);let s=this;const n=Pe(i),o=[];for(let c=0,l=n.length;c<l;c++){const d=n[c],h=n[c+1],f=Se(d,h),g=Array.isArray(f)?f[0]:d;if(g in a(s,E)){s=a(s,E)[g],f&&o.push(f[1]);continue}a(s,E)[g]=new pt,f&&(a(s,J).push(f),o.push(f[1])),s=a(s,E)[g]}return a(s,B).push({[e]:{handler:r,possibleKeys:o.filter((c,l,d)=>d.indexOf(c)===l),score:a(this,ut)}}),s}search(e,i){var h;const r=[];u(this,A,wt);let n=[this];const o=se(i),c=[],l=o.length;let d=null;for(let f=0;f<l;f++){const g=o[f],v=f===l-1,R=[];for(let j=0,C=n.length;j<C;j++){const x=n[j],S=a(x,E)[g];S&&(u(S,A,a(x,A)),v?(a(S,E)["*"]&&m(this,N,K).call(this,r,a(S,E)["*"],e,a(x,A)),m(this,N,K).call(this,r,S,e,a(x,A))):R.push(S));for(let yt=0,Ht=a(x,J).length;yt<Ht;yt++){const Gt=a(x,J)[yt],_=a(x,A)===wt?{}:{...a(x,A)};if(Gt==="*"){const it=a(x,E)["*"];it&&(m(this,N,K).call(this,r,it,e,a(x,A)),u(it,A,_),R.push(it));continue}const[be,Wt,mt]=Gt;if(!g&&!(mt instanceof RegExp))continue;const T=a(x,E)[be];if(mt instanceof RegExp){if(d===null){d=new Array(l);let rt=i[0]==="/"?1:0;for(let vt=0;vt<l;vt++)d[vt]=rt,rt+=o[vt].length+1}const it=i.substring(d[f]),Dt=mt.exec(it);if(Dt){if(_[Wt]=Dt[0],m(this,N,K).call(this,r,T,e,a(x,A),_),ii(a(T,E))){u(T,A,_);const rt=((h=Dt[0].match(/\//))==null?void 0:h.length)??0;(c[rt]||(c[rt]=[])).push(T)}continue}}(mt===!0||mt.test(g))&&(_[Wt]=g,v?(m(this,N,K).call(this,r,T,e,_,a(x,A)),a(T,E)["*"]&&m(this,N,K).call(this,r,a(T,E)["*"],e,_,a(x,A))):(u(T,A,_),R.push(T)))}}const k=c.shift();n=k?R.concat(k):R}return r.length>1&&r.sort((f,g)=>f.score-g.score),[r.map(({handler:f,params:g})=>[f,g])]}},B=new WeakMap,E=new WeakMap,J=new WeakMap,ut=new WeakMap,A=new WeakMap,N=new WeakSet,K=function(e,i,r,s,n){for(let o=0,c=a(i,B).length;o<c;o++){const l=a(i,B)[o],d=l[r]||l[w],h={};if(d!==void 0&&(d.params=Object.create(null),e.push(d),s!==wt||n&&n!==wt))for(let f=0,g=d.possibleKeys.length;f<g;f++){const v=d.possibleKeys[f],R=h[d.score];d.params[v]=n!=null&&n[v]&&!R?n[v]:s[v]??(n==null?void 0:n[v]),h[d.score]=!0}}},pt),X,re,si=(re=class{constructor(){p(this,"name","TrieRouter");y(this,X);u(this,X,new ri)}add(t,e,i){const r=ae(e);if(r){for(let s=0,n=r.length;s<n;s++)a(this,X).insert(t,r[s],i);return}a(this,X).insert(t,e,i)}match(t,e){return a(this,X).search(t,e)}},X=new WeakMap,re),xe=class extends qe{constructor(t={}){super(t),this.router=t.router??new ei({routers:[new ti,new si]})}},ni=t=>{const i={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(n=>typeof n=="string"?n==="*"?i.credentials?o=>o||null:()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(i.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(i.allowMethods);return async function(o,c){var h;function l(f,g){o.res.headers.set(f,g)}const d=await r(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),i.credentials&&l("Access-Control-Allow-Credentials","true"),(h=i.exposeHeaders)!=null&&h.length&&l("Access-Control-Expose-Headers",i.exposeHeaders.join(",")),o.req.method==="OPTIONS"){(i.origin!=="*"||i.credentials)&&l("Vary","Origin"),i.maxAge!=null&&l("Access-Control-Max-Age",i.maxAge.toString());const f=await s(o.req.header("origin")||"",o);f.length&&l("Access-Control-Allow-Methods",f.join(","));let g=i.allowHeaders;if(!(g!=null&&g.length)){const v=o.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(l("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await c(),(i.origin!=="*"||i.credentials)&&o.header("Vary","Origin",{append:!0})}};const et=new xe;et.use("/api/*",ni());const gt=[{id:"rome",emoji:"🏛",name:"古代ローマ",eraLabel:"紀元117年",place:"ROME · ITALIA",palette:["#fab062","#ffe7c2","#7baee6"]},{id:"edo",emoji:"⛩",name:"江戸 · 日本橋",eraLabel:"江戸 · 1750年",place:"EDO · JAPAN",palette:["#ff9970","#ffc99f","#39456e"]},{id:"egypt",emoji:"🏺",name:"古代エジプト",eraLabel:"紀元前2560年",place:"GIZA · EGYPT",palette:["#ffcf7a","#ffe8b0","#87a6d0"]},{id:"medieval",emoji:"🏰",name:"中世ヨーロッパ",eraLabel:"1350年",place:"BAVARIA · EUROPE",palette:["#6b7d9a","#a8b5c4","#3a4255"]},{id:"nyc1924",emoji:"🎷",name:"1920年代 NY",eraLabel:"1924年",place:"NEW YORK · USA",palette:["#e5a87a","#ffd2a8","#6d83a6"]},{id:"tokyo2150",emoji:"🌃",name:"未来の東京",eraLabel:"2150年",place:"NEO TOKYO · JAPAN",palette:["#a86bff","#ff4dcf","#04050f"]},{id:"mars2200",emoji:"🪐",name:"火星コロニー",eraLabel:"2200年",place:"OLYMPUS · MARS",palette:["#b04830","#d47040","#301418"]},{id:"atlantis",emoji:"🌊",name:"アトランティス",eraLabel:"神話",place:"LOST CITY",palette:["#0b4060","#1a7090","#041422"]},{id:"ancient-china",emoji:"🏯",name:"唐の長安",eraLabel:"唐 · 750年",place:"CHANG'AN · CHINA",palette:["#d46040","#ffb880","#2a2040"]},{id:"venice-1600",emoji:"🛶",name:"ヴェネツィア",eraLabel:"1600年",place:"VENEZIA · ITALY",palette:["#c0d0e5","#ffe0c0","#6a7ba0"]},{id:"space-station",emoji:"🛰",name:"軌道ステーション",eraLabel:"2450年",place:"ORBITAL EPSILON",palette:["#000008","#8aa0ff","#1a2030"]}];function ai(t){const[e,i,r]=t.palette,s=Array.from({length:40}).map(()=>{const c=Math.random()*600,l=Math.random()*400*.6,d=Math.random()*1.4+.2;return`<circle cx="${c.toFixed(1)}" cy="${l.toFixed(1)}" r="${d.toFixed(1)}" fill="#fff" opacity="${(Math.random()*.7+.15).toFixed(2)}"/>`}).join(""),n={rome:`
      <g opacity="0.85">
        <!-- Colosseum -->
        <ellipse cx="300" cy="380" rx="180" ry="60" fill="${r}" opacity="0.6"/>
        <path d="M 140 380 Q 140 260 300 260 Q 460 260 460 380 Z" fill="#2a1a1a"/>
        <g fill="#1a0f0f">
          ${Array.from({length:7}).map((c,l)=>`<rect x="${170+l*40}" y="295" width="16" height="30" rx="2"/>`).join("")}
          ${Array.from({length:6}).map((c,l)=>`<rect x="${185+l*40}" y="335" width="16" height="30" rx="2"/>`).join("")}
        </g>
      </g>
      <!-- Pine tree silhouette -->
      <g fill="#1c1010" opacity="0.9">
        <rect x="60" y="310" width="6" height="70"/>
        <ellipse cx="63" cy="305" rx="30" ry="40"/>
      </g>
    `,edo:`
      <!-- Fuji mountain -->
      <path d="M -50 380 L 200 180 L 250 210 L 330 150 L 420 220 L 650 380 Z" fill="#2a1f2e" opacity="0.9"/>
      <path d="M 210 192 L 250 210 L 270 195 L 255 185 Z" fill="#fff" opacity="0.85"/>
      <!-- Torii -->
      <g fill="#3a1010" opacity="0.95">
        <rect x="100" y="280" width="6" height="100"/>
        <rect x="180" y="280" width="6" height="100"/>
        <rect x="90" y="268" width="106" height="8"/>
        <rect x="85" y="256" width="116" height="10"/>
      </g>
      <!-- sakura -->
      ${Array.from({length:18}).map(()=>{const c=Math.random()*600,l=Math.random()*380,d=Math.random()*3+1.2;return`<circle cx="${c.toFixed(1)}" cy="${l.toFixed(1)}" r="${d.toFixed(1)}" fill="#ffd0e0" opacity="0.7"/>`}).join("")}
    `,egypt:`
      <!-- Pyramids -->
      <path d="M 100 380 L 260 180 L 420 380 Z" fill="#3a2a18" opacity="0.9"/>
      <path d="M 260 180 L 320 225 L 420 380 Z" fill="#281a10" opacity="0.9"/>
      <path d="M 360 380 L 470 250 L 580 380 Z" fill="#3a2a18" opacity="0.85"/>
      <path d="M 470 250 L 520 285 L 580 380 Z" fill="#281a10" opacity="0.85"/>
      <!-- palm tree -->
      <g fill="#1e1208">
        <rect x="46" y="295" width="5" height="85"/>
        <path d="M 48 295 Q 30 275 10 282 Q 25 275 48 290"/>
        <path d="M 48 295 Q 66 275 86 282 Q 70 275 48 290"/>
        <path d="M 48 295 Q 30 280 14 262 Q 28 275 48 293"/>
      </g>
      <circle cx="480" cy="110" r="34" fill="#ffce80" opacity="0.8"/>
    `,medieval:`
      <!-- Castle on hill -->
      <path d="M -20 380 Q 200 320 310 320 Q 500 320 620 380 Z" fill="#1a2018" opacity="0.95"/>
      <g fill="#0f1210">
        <rect x="260" y="220" width="20" height="100"/>
        <rect x="285" y="195" width="28" height="125"/>
        <rect x="318" y="220" width="20" height="100"/>
        <polygon points="260,220 270,205 280,220"/>
        <polygon points="285,195 299,175 313,195"/>
        <polygon points="318,220 328,205 338,220"/>
        <rect x="294" y="260" width="8" height="14" fill="#ffd880"/>
      </g>
      <!-- Pine trees -->
      ${Array.from({length:6}).map((c,l)=>`
        <g fill="#0f1712" opacity="0.9" transform="translate(${40+l*90}, ${290+Math.random()*30})">
          <rect x="-2" y="30" width="4" height="24"/>
          <polygon points="0,0 14,30 -14,30"/>
          <polygon points="0,10 12,35 -12,35"/>
        </g>
      `).join("")}
    `,nyc1924:`
      <!-- Art deco skyline -->
      <g fill="#0f0a08" opacity="0.95">
        <rect x="20" y="220" width="60" height="160"/>
        <rect x="85" y="180" width="80" height="200"/>
        <polygon points="125,180 125,150 140,130 155,150 155,180"/>
        <rect x="170" y="200" width="50" height="180"/>
        <rect x="225" y="160" width="70" height="220"/>
        <polygon points="260,160 260,120 265,110 270,120 270,160"/>
        <rect x="300" y="190" width="60" height="190"/>
        <rect x="365" y="170" width="90" height="210"/>
        <polygon points="410,170 410,140 425,115 440,140 440,170"/>
        <rect x="460" y="210" width="60" height="170"/>
        <rect x="525" y="190" width="70" height="190"/>
        <!-- lit windows -->
        ${Array.from({length:40}).map(()=>{const c=40+Math.random()*540,l=180+Math.random()*180;return`<rect x="${c.toFixed(0)}" y="${l.toFixed(0)}" width="3" height="3" fill="#ffd470" opacity="${(Math.random()*.8+.2).toFixed(2)}"/>`}).join("")}
      </g>
    `,tokyo2150:`
      <!-- Cyberpunk silhouette -->
      <g fill="#050310" opacity="0.96">
        <rect x="10" y="160" width="50" height="220"/>
        <rect x="65" y="190" width="40" height="190"/>
        <rect x="110" y="130" width="70" height="250"/>
        <rect x="185" y="170" width="45" height="210"/>
        <rect x="235" y="100" width="90" height="280"/>
        <rect x="330" y="150" width="55" height="230"/>
        <rect x="390" y="180" width="70" height="200"/>
        <rect x="465" y="120" width="60" height="260"/>
        <rect x="530" y="170" width="60" height="210"/>
      </g>
      <!-- neon signs -->
      ${Array.from({length:36}).map(()=>{const c=20+Math.random()*570,l=130+Math.random()*230,d=["#ff2e8a","#2ee8ff","#c974ff","#ffdd00"][Math.floor(Math.random()*4)],h=2+Math.random()*6;return`<rect x="${c.toFixed(0)}" y="${l.toFixed(0)}" width="${h.toFixed(1)}" height="2" fill="${d}" opacity="${(Math.random()*.8+.4).toFixed(2)}"/>`}).join("")}
      <!-- flying vehicles -->
      <ellipse cx="120" cy="85" rx="12" ry="3" fill="#ff2e8a" opacity="0.7"/>
      <ellipse cx="420" cy="60" rx="10" ry="2.5" fill="#2ee8ff" opacity="0.7"/>
    `,mars2200:`
      <!-- Mars horizon -->
      <path d="M 0 300 Q 150 260 300 285 Q 450 310 600 275 L 600 400 L 0 400 Z" fill="#5a1f18" opacity="0.95"/>
      <path d="M 0 340 Q 200 320 400 335 Q 500 340 600 325 L 600 400 L 0 400 Z" fill="#3a120a" opacity="0.95"/>
      <!-- Dome colonies -->
      <path d="M 120 330 Q 120 275 175 275 Q 230 275 230 330 Z" fill="#ffb070" opacity="0.25" stroke="#ffa050" stroke-width="1.2"/>
      <path d="M 330 320 Q 330 255 400 255 Q 470 255 470 320 Z" fill="#ffb070" opacity="0.25" stroke="#ffa050" stroke-width="1.2"/>
      <!-- Two moons -->
      <circle cx="470" cy="90" r="14" fill="#fff" opacity="0.8"/>
      <circle cx="120" cy="130" r="8" fill="#ffe0c0" opacity="0.85"/>
    `,atlantis:`
      <!-- Underwater sun rays -->
      <g opacity="0.18" fill="#80e0ff">
        <polygon points="200,0 180,400 220,400"/>
        <polygon points="320,0 295,400 345,400"/>
        <polygon points="440,0 420,400 460,400"/>
      </g>
      <!-- Atlantean temple -->
      <g fill="#02242f" opacity="0.96">
        <rect x="220" y="260" width="180" height="130"/>
        <polygon points="210,260 310,215 410,260"/>
        ${Array.from({length:7}).map((c,l)=>`<rect x="${225+l*25}" y="290" width="5" height="90" fill="#052935"/>`).join("")}
      </g>
      <!-- Fish + bubbles -->
      ${Array.from({length:30}).map(()=>{const c=Math.random()*600,l=80+Math.random()*300,d=Math.random()*3+1;return`<circle cx="${c.toFixed(0)}" cy="${l.toFixed(0)}" r="${d.toFixed(1)}" fill="#a0e8ff" opacity="${(Math.random()*.6+.2).toFixed(2)}"/>`}).join("")}
    `,"ancient-china":`
      <!-- Pagoda -->
      <g fill="#2a0a08" opacity="0.95">
        <rect x="265" y="310" width="70" height="70"/>
        <polygon points="250,310 300,275 350,310"/>
        <rect x="272" y="245" width="56" height="50"/>
        <polygon points="258,245 300,215 342,245"/>
        <rect x="279" y="190" width="42" height="40"/>
        <polygon points="266,190 300,165 334,190"/>
        <rect x="285" y="145" width="30" height="30"/>
        <polygon points="273,145 300,123 327,145"/>
      </g>
      <!-- Lanterns -->
      <circle cx="80" cy="220" r="10" fill="#ff6020" opacity="0.9"/>
      <circle cx="520" cy="200" r="8" fill="#ff6020" opacity="0.85"/>
      <circle cx="150" cy="260" r="7" fill="#ff6020" opacity="0.8"/>
      <!-- Mountains -->
      <path d="M 0 320 Q 100 270 200 310 Q 300 330 400 290 Q 500 260 600 320 L 600 400 L 0 400 Z" fill="#1a0608" opacity="0.95"/>
    `,"venice-1600":`
      <!-- Canal buildings -->
      <g fill="#0a0a12" opacity="0.92">
        <rect x="0" y="210" width="110" height="170"/>
        <rect x="115" y="180" width="90" height="200"/>
        <rect x="210" y="220" width="100" height="160"/>
        <rect x="315" y="170" width="80" height="210"/>
        <path d="M 395 170 L 435 170 L 435 150 L 435 170 Z"/>
        <rect x="400" y="200" width="90" height="180"/>
        <rect x="495" y="185" width="105" height="195"/>
      </g>
      <!-- Campanile -->
      <rect x="250" y="130" width="28" height="100" fill="#0a0a12" opacity="0.95"/>
      <polygon points="250,130 264,100 278,130" fill="#0a0a12"/>
      <!-- Canal reflection -->
      <rect x="0" y="330" width="600" height="70" fill="${e}" opacity="0.3"/>
      <!-- Gondola -->
      <path d="M 160 350 Q 190 342 220 350 L 215 356 L 165 356 Z" fill="#000" opacity="0.9"/>
    `,"space-station":`
      <!-- Earth below -->
      <circle cx="300" cy="540" r="280" fill="#1e4a8a" opacity="0.9"/>
      <circle cx="300" cy="540" r="280" fill="url(#earthGlow-${t.id})" opacity="1"/>
      <!-- Clouds/continents -->
      <path d="M 180 420 Q 220 415 270 430 Q 320 445 370 430 Q 410 420 430 435 L 450 470 Q 380 475 310 465 Q 240 455 180 450 Z" fill="#4a7b4a" opacity="0.7"/>
      <!-- Station silhouette -->
      <g fill="#eae6dc" opacity="0.92">
        <rect x="50" y="200" width="500" height="14" rx="4"/>
        <rect x="260" y="150" width="80" height="50" rx="6"/>
        <rect x="70" y="180" width="40" height="40"/>
        <rect x="490" y="180" width="40" height="40"/>
      </g>
    `},o=n[t.id]||n.rome;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky-${t.id}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${r}"/>
        <stop offset="55%" stop-color="${e}"/>
        <stop offset="100%" stop-color="${i}"/>
      </linearGradient>
      <radialGradient id="earthGlow-${t.id}" cx="50%" cy="50%" r="60%">
        <stop offset="70%" stop-color="#1e4a8a" stop-opacity="1"/>
        <stop offset="100%" stop-color="#0a1a2a" stop-opacity="1"/>
      </radialGradient>
      <filter id="blur-${t.id}"><feGaussianBlur stdDeviation="0.6"/></filter>
    </defs>
    <rect width="600" height="400" fill="url(#sky-${t.id})"/>
    <g>${s}</g>
    <g filter="url(#blur-${t.id})">${o}</g>
    <rect width="600" height="400" fill="url(#sky-${t.id})" opacity="0.08"/>
  </svg>`}et.get("/api/cover/:id",t=>{const e=t.req.param("id"),i=gt.find(s=>s.id===e)||gt[0],r=ai(i);return new Response(r,{headers:{"Content-Type":"image/svg+xml","Cache-Control":"public, max-age=86400"}})});const zt=["Yuki","Ren","Aoi","Haru","Sora","Kai","Mei","Riku","Lena","Marco","Aya","Taro","Sakura","Leo","Nao","Jun","Emma","Noah","Olivia","Liam","Mia","Yuto","Rin","Kento"];et.get("/api/live-feed",t=>{const e=Array.from({length:8},()=>{const i=gt[Math.floor(Math.random()*gt.length)],r=zt[Math.floor(Math.random()*zt.length)],s=Math.floor(Math.random()*58)+1;return{name:r,worldId:i.id,worldName:i.name,emoji:i.emoji,minutesAgo:s}});return t.json({onlineNow:120+Math.floor(Math.random()*520),totalWarpsToday:4200+Math.floor(Math.random()*3800),feed:e})});et.get("/api/daily-theme",t=>{const e=[{id:"golden",title:"黄金時代",desc:"ノスタルジックな夕日の時代へ",worldIds:["rome","edo","ancient-china"]},{id:"neon",title:"ネオンの夜",desc:"未来都市で光に溺れる一夜",worldIds:["tokyo2150","nyc1924"]},{id:"ancient",title:"古代の神秘",desc:"ピラミッドと神殿の世界",worldIds:["egypt","rome","atlantis"]},{id:"castle",title:"騎士の記憶",desc:"霧の中の城下町",worldIds:["medieval","venice-1600"]},{id:"space",title:"宇宙の縁",desc:"人類が宇宙に築いた街",worldIds:["tokyo2150","mars2200","space-station"]},{id:"water",title:"水の記憶",desc:"運河と海底の世界",worldIds:["venice-1600","atlantis"]},{id:"east",title:"東方の風",desc:"唐と江戸、アジアの夢",worldIds:["ancient-china","edo"]}],i=new Date,r=i.getUTCFullYear()*1e3+i.getUTCMonth()*40+i.getUTCDate(),s=e[r%e.length];return t.json({date:i.toISOString().slice(0,10),...s})});et.get("/api/share-card/:worldId",t=>{const e=t.req.param("worldId"),i=gt.find(s=>s.id===e)||gt[0],r=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1a0a40"/>
        <stop offset="60%" stop-color="#050216"/>
        <stop offset="100%" stop-color="#000"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <g opacity="0.3">
      ${Array.from({length:70}).map(()=>{const s=Math.random()*1200,n=Math.random()*630,o=Math.random()*2+.5;return`<circle cx="${s}" cy="${n}" r="${o}" fill="#fff"/>`}).join("")}
    </g>
    <text x="600" y="120" text-anchor="middle" font-family="serif" font-size="22" fill="#c9a96a" letter-spacing="8">
      WARPDOOR — 時空間旅行
    </text>
    <text x="600" y="300" text-anchor="middle" font-size="180">${i.emoji}</text>
    <text x="600" y="430" text-anchor="middle" font-family="serif" font-size="72" font-weight="bold" fill="#fff" letter-spacing="4">
      ${i.name}
    </text>
    <text x="600" y="490" text-anchor="middle" font-family="serif" font-size="22" fill="rgba(255,255,255,0.5)" letter-spacing="6">
      にワープしました
    </text>
    <text x="600" y="570" text-anchor="middle" font-family="monospace" font-size="18" fill="rgba(255,255,255,0.3)" letter-spacing="10">
      warpdoor — 扉を開ければ、そこへ
    </text>
  </svg>`;return new Response(r,{headers:{"Content-Type":"image/svg+xml","Cache-Control":"public, max-age=3600"}})});et.get("/",t=>t.html(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#000000" />
<title>WARPDOOR — 扉を開ければ、そこへ</title>
<meta name="description" content="ブラウザだけで本物のどこでもドア体験。扉を開けば、古代ローマへ、未来の東京へ、火星へ。歩ける・視点を変えられる3D没入型ワープサービス。" />
<meta property="og:title" content="WARPDOOR — どこでもドア3D体験" />
<meta property="og:description" content="扉を開ければ、そこは1000年前か1000年後。リアルに歩ける没入型ワープ体験。" />
<meta property="og:image" content="/api/share-card/rome" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=IBM+Plex+Mono:wght@300;400;500&family=Shippori+Mincho:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/static/warpdoor.css" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚪</text></svg>" />
</head>
<body>
  <div class="first-load" id="firstLoad">
    <div class="spinner"></div>
    <div class="label">WARPDOOR · LOADING</div>
  </div>
  <div id="root"></div>
  <canvas id="bg-canvas"></canvas>

  <!-- Top HUD -->
  <div class="top-hud">
    <div class="brand">
      <div class="brand-mark">🚪</div>
      <div>WARPDOOR</div>
    </div>
    <div class="hud-right">
      <div class="hud-chip" id="liveChip"><span class="pulse-dot"></span><span id="liveCount">— online</span></div>
      <div class="hud-chip" id="collectionChip" style="cursor:pointer;">◉ <span id="collectionCount">0</span> / 12</div>
    </div>
  </div>

  <!-- Landing screen -->
  <section class="screen active" id="screen-landing">
    <div class="veil"></div>
    <div class="landing-content">
      <div class="landing-kicker">A DOOR TO ANYWHERE · ANYTIME</div>
      <h1 class="landing-title">どこでもドア、<br/>ひらく。</h1>
      <p class="landing-sub">
        ブラウザだけで、時代と場所を超える。<br/>
        古代ローマの石畳、未来の東京の雨、火星の赤い大地。<br/>
        扉を開けば、そこへ。
      </p>
      <div class="landing-cta">
        <button class="cta-primary" id="openDoor">扉をひらく</button>
        <div class="cta-hint">TAP / CLICK TO BEGIN</div>
      </div>
    </div>
  </section>

  <!-- Destination Picker -->
  <section class="screen" id="screen-picker">
    <div class="picker-back" id="pickerBack" title="戻る">←</div>
    <div class="picker-wrap">
      <div class="picker-header">
        <div class="picker-kicker">SELECT YOUR DESTINATION</div>
        <h2 class="picker-title">どこへ、いつへ。</h2>
        <p class="picker-sub">時代を選べば、ドアがそこへ繋がる。歩いて、見て、触れて、また戻ってこよう。</p>
      </div>

      <div class="daily-banner" id="dailyBanner">
        <div class="daily-left">
          <div class="daily-kicker">TODAY'S JOURNEY</div>
          <div class="daily-title" id="dailyTitle">今日のテーマ</div>
          <div class="daily-desc" id="dailyDesc">毎日異なるテーマがあなたを迎えます。</div>
        </div>
        <button class="daily-go" id="dailyGo">→ ワープ</button>
      </div>

      <div class="quick-actions">
        <button class="quick-btn" id="randomWarp">🎲 ランダムでワープ</button>
      </div>

      <div class="filter-bar" id="filterBar"></div>
      <div class="dest-grid" id="destGrid"></div>
    </div>
  </section>

  <!-- Transition -->
  <section class="screen" id="screen-transition">
    <div class="transition-status">
      <div class="transition-title" id="transitionTitle">接続しています...</div>
      <div class="transition-sub" id="transitionSub">QUANTUM TUNNEL · OPENING</div>
      <div class="transition-bar"><span></span></div>
    </div>
  </section>

  <!-- World UI -->
  <section class="screen" id="screen-world">
    <div class="world-ui">
      <div class="world-info">
        <div class="world-era" id="worldEra">—</div>
        <div class="world-name" id="worldName">—</div>
      </div>

      <div class="world-actions">
        <button class="wa-btn" id="btnShare" title="シェア">⇪</button>
        <button class="wa-btn" id="btnPhoto" title="スナップショット">◎</button>
        <button class="wa-btn leave" id="btnLeave" title="扉に戻る">⤺</button>
      </div>

      <div class="controls-hint" id="controlsHint">
        <span class="desktop-only"><span class="kbd">W</span><span class="kbd">A</span><span class="kbd">S</span><span class="kbd">D</span> 移動</span>
        <span class="desktop-only">マウスで視点</span>
        <span class="desktop-only"><span class="kbd">SPACE</span> ジャンプ</span>
        <span class="mobile-only">ジョイスティックで移動 · スワイプで視点</span>
      </div>

      <!-- mobile joystick -->
      <div class="joystick" id="joystick">
        <div class="base"></div>
        <div class="knob" id="knob"></div>
      </div>

      <!-- jump btn mobile -->
      <button class="jump-btn" id="jumpBtn">JUMP</button>

      <!-- view toggle -->
      <div class="view-toggle" id="viewToggle">
        <button id="viewToggleBtn" title="視点切替">👁</button>
      </div>

      <!-- coordinates -->
      <div class="coord-hud" id="coordHud">— —</div>
    </div>
  </section>

  <!-- Modal: collection -->
  <div class="modal" id="collectionModal">
    <div class="modal-box">
      <button class="modal-close" id="modalClose">✕</button>
      <div class="modal-title">あなたの旅の記憶</div>
      <div class="modal-sub">訪れた世界はここに蓄積されます。全12世界を制覇しよう。</div>
      <div class="collection-grid" id="collectionGrid"></div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast"></div>

  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
    }
  }
  <\/script>
  <script type="module" src="/static/warpdoor.js"><\/script>

  <style>
    .desktop-only { display: inline-flex; align-items: center; gap: 4px; }
    .mobile-only { display: none; }
    @media (pointer: coarse) {
      .desktop-only { display: none; }
      .mobile-only { display: inline; }
    }
  </style>
</body>
</html>`));const Vt=new xe,oi=Object.assign({"/src/index.tsx":et});let we=!1;for(const[,t]of Object.entries(oi))t&&(Vt.all("*",e=>{let i;try{i=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,i)}),Vt.notFound(e=>{let i;try{i=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,i)}),we=!0);if(!we)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Vt as default};
