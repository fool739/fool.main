import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_BT88MMkg.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CLB5LfAF.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/","cacheDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/node_modules/.astro/","outDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/dist/","srcDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/src/","publicDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/public/","buildClientDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/dist/client/","buildServerDir":"file:///E:/Writing/code/Fool%20Remake/FM/fool.main/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"search/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/comments","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/comments\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/comments.ts","pathname":"/api/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.fool.ltd","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/search.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/comments@_@ts":"pages/api/comments.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C8kMgONk.mjs","E:/Writing/code/Fool Remake/FM/fool.main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C2IyXQQ7.mjs","E:\\Writing\\code\\Fool Remake\\FM\\fool.main\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","E:\\Writing\\code\\Fool Remake\\FM\\fool.main\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B84MIect.mjs","E:/Writing/code/Fool Remake/FM/fool.main/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.1GECj8oe.js","E:/Writing/code/Fool Remake/FM/fool.main/src/pages/blog/index.astro?astro&type=script&index=1&lang.ts":"_astro/index.astro_astro_type_script_index_1_lang.DmmYfmQY.js","E:/Writing/code/Fool Remake/FM/fool.main/src/components/SearchField.astro?astro&type=script&index=0&lang.ts":"_astro/SearchField.astro_astro_type_script_index_0_lang.B5fXS9pF.js","E:/Writing/code/Fool Remake/FM/fool.main/src/components/comments/CommentForm.astro?astro&type=script&index=0&lang.ts":"_astro/CommentForm.astro_astro_type_script_index_0_lang.CxcPNtcL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["E:/Writing/code/Fool Remake/FM/fool.main/src/pages/blog/index.astro?astro&type=script&index=1&lang.ts","const d=document.getElementById(\"sortBy\"),c=document.getElementById(\"filterTag\"),s=document.getElementById(\"posts-container\");function a(){if(!s)return;const o=d.value,r=c.value,n=Array.from(s.querySelectorAll(\".post-card\"));n.forEach(t=>{const e=t.dataset.tags||\"\";!r||e.split(\",\").includes(r)?t.style.display=\"block\":t.style.display=\"none\"});const l=n.filter(t=>t.style.display!==\"none\");l.sort((t,e)=>{switch(o){case\"date-desc\":return Number(e.dataset.date)-Number(t.dataset.date);case\"date-asc\":return Number(t.dataset.date)-Number(e.dataset.date);case\"title-asc\":return(t.dataset.title||\"\").localeCompare(e.dataset.title||\"\");case\"title-desc\":return(e.dataset.title||\"\").localeCompare(t.dataset.title||\"\");default:return 0}}),l.forEach(t=>s.appendChild(t))}d?.addEventListener(\"change\",a);c?.addEventListener(\"change\",a);a();"],["E:/Writing/code/Fool Remake/FM/fool.main/src/components/comments/CommentForm.astro?astro&type=script&index=0&lang.ts","const v=document.getElementById(\"comment-form\"),u=document.querySelectorAll(\".preset-name\"),i=document.getElementById(\"toggle-custom\"),E=document.getElementById(\"custom-name-container\"),a=document.getElementById(\"custom-name\"),I=document.getElementById(\"back-to-preset\"),b=document.getElementById(\"preset-names\"),c=document.getElementById(\"selected-name\"),r=document.getElementById(\"is-preset\"),o=document.getElementById(\"comment-content\"),d=document.getElementById(\"char-count\"),s=document.getElementById(\"submit-btn\"),p=document.getElementById(\"form-status\"),l=document.getElementById(\"status-message\");u.forEach(e=>{e.addEventListener(\"click\",()=>{u.forEach(t=>{t.removeAttribute(\"data-selected\"),t.classList.remove(\"bg-neutral-200\",\"dark:bg-neutral-800\")}),e.setAttribute(\"data-selected\",\"true\"),e.classList.add(\"bg-neutral-200\",\"dark:bg-neutral-800\"),c.value=e.dataset.name||\"\",r.value=\"true\"})});const y=u[0];y&&y.classList.add(\"bg-neutral-200\",\"dark:bg-neutral-800\");i?.addEventListener(\"click\",()=>{b?.classList.add(\"hidden\"),i.classList.add(\"hidden\"),E?.classList.remove(\"hidden\"),a?.focus(),r.value=\"false\"});I?.addEventListener(\"click\",()=>{E?.classList.add(\"hidden\"),b?.classList.remove(\"hidden\"),i?.classList.remove(\"hidden\"),a.value=\"\";const e=document.querySelector(\".preset-name[data-selected]\");e&&(c.value=e.dataset.name||\"\"),r.value=\"true\"});a?.addEventListener(\"input\",()=>{c.value=a.value});o?.addEventListener(\"input\",()=>{d&&(d.textContent=String(o.value.length))});v?.addEventListener(\"submit\",async e=>{e.preventDefault();const t=v.dataset.postSlug,g=c.value.trim(),f=o.value.trim(),h=r.value===\"true\";if(!g||!f){n(\"please fill in all fields.\",\"error\");return}s.disabled=!0,s.textContent=\"submitting...\";try{const m=await fetch(\"/api/comments\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({postSlug:t,author:g,content:f,isPresetName:h})}),B=await m.json();m.ok?(n(\"comment submitted! it will appear after moderation.\",\"success\"),o.value=\"\",d&&(d.textContent=\"0\")):n(B.error||\"failed to submit comment.\",\"error\")}catch{n(\"failed to submit comment. please try again.\",\"error\")}finally{s.disabled=!1,s.textContent=\"submit\"}});function n(e,t){p&&l&&(p.classList.remove(\"hidden\"),l.textContent=e,l.className=`text-sm ${t===\"success\"?\"text-green-600 dark:text-green-400\":\"text-red-600 dark:text-red-400\"}`)}"]],"assets":["/_astro/_slug_.CM-bPf3C.css","/_astro/search.BI3Q6s-N.css","/_astro/search.CYrcYCQZ.css","/alone.mp3","/cat and lune.mp3","/favicon/android-chrome-192x192.png","/favicon/android-chrome-512x512.png","/favicon/apple-touch-icon.png","/favicon/browserconfig.xml","/favicon/death.jpg","/favicon/fav.ico","/favicon/favicon-16x16.png","/favicon/favicon-32x32.png","/favicon/mstile-150x150.png","/favicon/safari-pinned-tab.svg","/favicon/site.webmanifest","/_astro/index.astro_astro_type_script_index_0_lang.1GECj8oe.js","/_astro/SearchField.astro_astro_type_script_index_0_lang.B5fXS9pF.js","/_astro/ui-core.NJJjWQRu.js","/blog/index.html","/rss.xml","/search/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"Jq1xY5fnPsq/spcPDJmXC9D9+W600WXJFj3sMkw/LI0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
