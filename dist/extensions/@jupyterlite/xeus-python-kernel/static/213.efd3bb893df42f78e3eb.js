/*! For license information please see 213.efd3bb893df42f78e3eb.js.LICENSE.txt */
(()=>{var e={213:(e,t,r)=>{var s;void 0===(s=(()=>(()=>{"use strict";var e={};(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);const t=Symbol("Comlink.proxy"),r=Symbol("Comlink.endpoint"),s=Symbol("Comlink.releaseProxy"),n=Symbol("Comlink.finalizer"),i=Symbol("Comlink.thrown"),o=e=>"object"==typeof e&&null!==e||"function"==typeof e,a=new Map([["proxy",{canHandle:e=>o(e)&&e[t],serialize(e){const{port1:t,port2:r}=new MessageChannel;return l(e,t),[r,[r]]},deserialize:e=>(e.start(),p(e,[],void 0))}],["throw",{canHandle:e=>o(e)&&i in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function l(e,r=globalThis,s=["*"]){r.addEventListener("message",(function o(a){if(!a||!a.data)return;if(!function(e,t){for(const r of e){if(t===r||"*"===r)return!0;if(r instanceof RegExp&&r.test(t))return!0}return!1}(s,a.origin))return void console.warn(`Invalid origin '${a.origin}' for comlink proxy`);const{id:u,type:d,path:c}=Object.assign({path:[]},a.data),m=(a.data.argumentList||[]).map(y);let p;try{const r=c.slice(0,-1).reduce(((e,t)=>e[t]),e),s=c.reduce(((e,t)=>e[t]),e);switch(d){case"GET":p=s;break;case"SET":r[c.slice(-1)[0]]=y(a.data.value),p=!0;break;case"APPLY":p=s.apply(r,m);break;case"CONSTRUCT":p=function(e){return Object.assign(e,{[t]:!0})}(new s(...m));break;case"ENDPOINT":{const{port1:t,port2:r}=new MessageChannel;l(e,r),p=function(e,t){return g.set(e,t),e}(t,[t])}break;case"RELEASE":p=void 0;break;default:return}}catch(e){p={value:e,[i]:0}}Promise.resolve(p).catch((e=>({value:e,[i]:0}))).then((t=>{const[s,i]=E(t);r.postMessage(Object.assign(Object.assign({},s),{id:u}),i),"RELEASE"===d&&(r.removeEventListener("message",o),h(r),n in e&&"function"==typeof e[n]&&e[n]())})).catch((e=>{const[t,s]=E({value:new TypeError("Unserializable return value"),[i]:0});r.postMessage(Object.assign(Object.assign({},t),{id:u}),s)}))})),r.start&&r.start()}function h(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function u(e){if(e)throw new Error("Proxy has been released and is not useable")}function d(e){return w(e,{type:"RELEASE"}).then((()=>{h(e)}))}const c=new WeakMap,m="FinalizationRegistry"in globalThis&&new FinalizationRegistry((e=>{const t=(c.get(e)||0)-1;c.set(e,t),0===t&&d(e)}));function p(e,t=[],n=function(){}){let i=!1;const o=new Proxy(n,{get(r,n){if(u(i),n===s)return()=>{!function(e){m&&m.unregister(e)}(o),d(e),i=!0};if("then"===n){if(0===t.length)return{then:()=>o};const r=w(e,{type:"GET",path:t.map((e=>e.toString()))}).then(y);return r.then.bind(r)}return p(e,[...t,n])},set(r,s,n){u(i);const[o,a]=E(n);return w(e,{type:"SET",path:[...t,s].map((e=>e.toString())),value:o},a).then(y)},apply(s,n,o){u(i);const a=t[t.length-1];if(a===r)return w(e,{type:"ENDPOINT"}).then(y);if("bind"===a)return p(e,t.slice(0,-1));const[l,h]=f(o);return w(e,{type:"APPLY",path:t.map((e=>e.toString())),argumentList:l},h).then(y)},construct(r,s){u(i);const[n,o]=f(s);return w(e,{type:"CONSTRUCT",path:t.map((e=>e.toString())),argumentList:n},o).then(y)}});return function(e,t){const r=(c.get(t)||0)+1;c.set(t,r),m&&m.register(e,t,e)}(o,e),o}function f(e){const t=e.map(E);return[t.map((e=>e[0])),(r=t.map((e=>e[1])),Array.prototype.concat.apply([],r))];var r}const g=new WeakMap;function E(e){for(const[t,r]of a)if(r.canHandle(e)){const[s,n]=r.serialize(e);return[{type:"HANDLER",name:t,value:s},n]}return[{type:"RAW",value:e},g.get(e)||[]]}function y(e){switch(e.type){case"HANDLER":return a.get(e.name).deserialize(e.value);case"RAW":return e.value}}function w(e,t,r){return new Promise((s=>{const n=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(r){r.data&&r.data.id&&r.data.id===n&&(e.removeEventListener("message",t),s(r.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:n},t),r)}))}const _=new TextEncoder,v=new TextDecoder("utf-8"),b={0:!1,1:!0,2:!0,64:!0,65:!0,66:!0,129:!0,193:!0,514:!0,577:!0,578:!0,705:!0,706:!0,1024:!0,1025:!0,1026:!0,1089:!0,1090:!0,1153:!0,1154:!0,1217:!0,1218:!0,4096:!0,4098:!0};class P{constructor(e){this.fs=e}open(e){const t=this.fs.realPath(e.node);this.fs.FS.isFile(e.node.mode)&&(e.file=this.fs.API.get(t))}close(e){if(!this.fs.FS.isFile(e.node.mode)||!e.file)return;const t=this.fs.realPath(e.node),r=e.flags;let s="string"==typeof r?parseInt(r,10):r;s&=8191;let n=!0;s in b&&(n=b[s]),n&&this.fs.API.put(t,e.file),e.file=void 0}read(e,t,r,s,n){if(s<=0||void 0===e.file||n>=(e.file.data.length||0))return 0;const i=Math.min(e.file.data.length-n,s);return t.set(e.file.data.subarray(n,n+i),r),i}write(e,t,r,s,n){var i;if(s<=0||void 0===e.file)return 0;if(e.node.timestamp=Date.now(),n+s>((null===(i=e.file)||void 0===i?void 0:i.data.length)||0)){const t=e.file.data?e.file.data:new Uint8Array;e.file.data=new Uint8Array(n+s),e.file.data.set(t)}return e.file.data.set(t.subarray(r,r+s),n),s}llseek(e,t,r){let s=t;if(1===r)s+=e.position;else if(2===r&&this.fs.FS.isFile(e.node.mode)){if(void 0===e.file)throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM);s+=e.file.data.length}if(s<0)throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EINVAL);return s}}class S{constructor(e){this.fs=e}getattr(e){return{...this.fs.API.getattr(this.fs.realPath(e)),mode:e.mode,ino:e.id}}setattr(e,t){for(const[r,s]of Object.entries(t))switch(r){case"mode":e.mode=s;break;case"timestamp":e.timestamp=s;break;default:console.warn("setattr",r,"of",s,"on",e,"not yet implemented")}}lookup(e,t){const r=this.fs.PATH.join2(this.fs.realPath(e),t),s=this.fs.API.lookup(r);if(!s.ok)throw this.fs.FS.genericErrors[this.fs.ERRNO_CODES.ENOENT];return this.fs.createNode(e,t,s.mode,0)}mknod(e,t,r,s){const n=this.fs.PATH.join2(this.fs.realPath(e),t);return this.fs.API.mknod(n,r),this.fs.createNode(e,t,r,s)}rename(e,t,r){this.fs.API.rename(e.parent?this.fs.PATH.join2(this.fs.realPath(e.parent),e.name):e.name,this.fs.PATH.join2(this.fs.realPath(t),r)),e.name=r,e.parent=t}unlink(e,t){this.fs.API.rmdir(this.fs.PATH.join2(this.fs.realPath(e),t))}rmdir(e,t){this.fs.API.rmdir(this.fs.PATH.join2(this.fs.realPath(e),t))}readdir(e){return this.fs.API.readdir(this.fs.realPath(e))}symlink(e,t,r){throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM)}readlink(e){throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM)}}class N{constructor(e,t,r,s,n){this._baseUrl=e,this._driveName=t,this._mountpoint=r,this.FS=s,this.ERRNO_CODES=n}request(e){const t=new XMLHttpRequest;t.open("POST",encodeURI(this.endpoint),!1);try{t.send(JSON.stringify(e))}catch(e){console.error(e)}if(t.status>=400)throw new this.FS.ErrnoError(this.ERRNO_CODES.EINVAL);return JSON.parse(t.responseText)}lookup(e){return this.request({method:"lookup",path:this.normalizePath(e)})}getmode(e){return Number.parseInt(this.request({method:"getmode",path:this.normalizePath(e)}))}mknod(e,t){return this.request({method:"mknod",path:this.normalizePath(e),data:{mode:t}})}rename(e,t){return this.request({method:"rename",path:this.normalizePath(e),data:{newPath:this.normalizePath(t)}})}readdir(e){const t=this.request({method:"readdir",path:this.normalizePath(e)});return t.push("."),t.push(".."),t}rmdir(e){return this.request({method:"rmdir",path:this.normalizePath(e)})}get(e){const t=this.request({method:"get",path:this.normalizePath(e)}),r=t.content,s=t.format;switch(s){case"json":case"text":return{data:_.encode(r),format:s};case"base64":{const e=atob(r),t=e.length,n=new Uint8Array(t);for(let r=0;r<t;r++)n[r]=e.charCodeAt(r);return{data:n,format:s}}default:throw new this.FS.ErrnoError(this.ERRNO_CODES.ENOENT)}}put(e,t){switch(t.format){case"json":case"text":return this.request({method:"put",path:this.normalizePath(e),data:{format:t.format,data:v.decode(t.data)}});case"base64":{let r="";for(let e=0;e<t.data.byteLength;e++)r+=String.fromCharCode(t.data[e]);return this.request({method:"put",path:this.normalizePath(e),data:{format:t.format,data:btoa(r)}})}}}getattr(e){const t=this.request({method:"getattr",path:this.normalizePath(e)});return t.atime=new Date(t.atime),t.mtime=new Date(t.mtime),t.ctime=new Date(t.ctime),t.size=t.size||0,t}normalizePath(e){return e.startsWith(this._mountpoint)&&(e=e.slice(this._mountpoint.length)),this._driveName&&(e=`${this._driveName}:${e}`),e}get endpoint(){return`${this._baseUrl}api/drive`}}class T{constructor(e){this.FS=e.FS,this.PATH=e.PATH,this.ERRNO_CODES=e.ERRNO_CODES,this.API=new N(e.baseUrl,e.driveName,e.mountpoint,this.FS,this.ERRNO_CODES),this.driveName=e.driveName,this.node_ops=new S(this),this.stream_ops=new P(this)}mount(e){return this.createNode(null,e.mountpoint,16895,0)}createNode(e,t,r,s){const n=this.FS;if(!n.isDir(r)&&!n.isFile(r))throw new n.ErrnoError(this.ERRNO_CODES.EINVAL);const i=n.createNode(e,t,r,s);return i.node_ops=this.node_ops,i.stream_ops=this.stream_ops,i}getMode(e){return this.API.getmode(e)}realPath(e){const t=[];let r=e;for(t.push(r.name);r.parent!==r;)r=r.parent,t.push(r.name);return t.reverse(),this.PATH.join.apply(null,t)}}globalThis.Module={};class O extends S{getNode(e){return e.node?e.node:e}lookup(e,t){return super.lookup(this.getNode(e),t)}getattr(e){return super.getattr(this.getNode(e))}setattr(e,t){super.setattr(this.getNode(e),t)}mknod(e,t,r,s){return super.mknod(this.getNode(e),t,r,s)}rename(e,t,r){super.rename(this.getNode(e),this.getNode(t),r)}rmdir(e,t){super.rmdir(this.getNode(e),t)}readdir(e){return super.readdir(this.getNode(e))}}class R extends T{constructor(e){super(e),this.node_ops=new O(this)}}let k;return globalThis.toplevel_promise=null,globalThis.toplevel_promise_py_proxy=null,self.get_stdin=async function(){return new Promise((e=>{k=e}))},l(new class{constructor(){this._drive=null,this._ready=new Promise((e=>{this.initialize(e)}))}async ready(){return await this._ready}mount(e,t,r){const{FS:s,PATH:n,ERRNO_CODES:i}=globalThis.Module;s&&(this._drive=new R({FS:s,PATH:n,ERRNO_CODES:i,baseUrl:r,driveName:e,mountpoint:t}),s.mkdir(t),s.mount(this._drive,{},t),s.chdir(t))}cd(e){e&&globalThis.Module.FS&&globalThis.Module.FS.chdir(e)}async processMessage(e){await this._ready,null!==globalThis.toplevel_promise&&null!==globalThis.toplevel_promise_py_proxy&&(await globalThis.toplevel_promise,globalThis.toplevel_promise_py_proxy.delete(),globalThis.toplevel_promise_py_proxy=null,globalThis.toplevel_promise=null),"input_reply"===e.msg.header.msg_type?k(e.msg):this._raw_xserver.notify_listener(e.msg)}async initialize(e){importScripts("xpython_wasm.js"),globalThis.Module=await createXeusModule({});try{await globalThis.Module.bootstrap_from_empack_packed_environment("./empack_env_meta.json",".",!1),await this.waitRunDependency(),this._raw_xkernel=new globalThis.Module.xkernel,this._raw_xserver=this._raw_xkernel.get_server(),this._raw_xkernel||console.error("Failed to start kernel!"),this._raw_xkernel.start()}catch(e){if("number"==typeof e){const t=globalThis.Module.get_exception_message(e);throw console.error(t),new Error(t)}throw console.error(e),e}e()}async waitRunDependency(){const e=new Promise((e=>{globalThis.Module.monitorRunDependencies=t=>{0===t&&e()}}));return globalThis.Module.addRunDependency("dummy"),globalThis.Module.removeRunDependency("dummy"),e}}),e})()).call(t,r,t,e))||(e.exports=s)}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={exports:{}};return e[s](i,i.exports,r),i.exports}r.m=e,r.c=t,r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{r.S={};var e={},t={};r.I=(s,n)=>{n||(n=[]);var i=t[s];if(i||(i=t[s]={}),!(n.indexOf(i)>=0)){if(n.push(i),e[s])return e[s];r.o(r.S,s)||(r.S[s]={}),r.S[s];var o=[];return e[s]=o.length?Promise.all(o).then((()=>e[s]=1)):1}}})(),r(213)})();