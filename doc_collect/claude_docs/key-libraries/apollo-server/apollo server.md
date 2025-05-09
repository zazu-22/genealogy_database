[Home](/docs/)

/ [Apollo Server](/docs/apollo-server)

# Introduction to Apollo Server

Learn how to build scalable, production-ready GraphQL APIs

* * *

astro-island,astro-slot,astro-static-slot{display:contents}(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();;(()=>{var A=Object.defineProperty;var g=(i,o,a)=>o in i?A(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i\[o\]=a;var d=(i,o,a)=>g(i,typeof o!="symbol"?o+"":o,a);{let i={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},o=t=>{let\[l,e\]=t;return l in i?i\[l\](e):void 0},a=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map((\[l,e\])=>\[l,o(e)\]));class y extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island\[ssr\]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let c=this.querySelectorAll("astro-slot"),n={},h=this.querySelectorAll("template\[data-astro-template\]");for(let r of h){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n\[r.getAttribute("data-astro-template")||"default"\]=r.innerHTML,r.remove())}for(let r of c){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n\[r.getAttribute("name")||"default"\]=r.innerHTML)}let p;try{p=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(r){let s=this.getAttribute("component-url")||"",v=this.getAttribute("component-export");throw v&&(s+=\` (export ${v})\`),console.error(\`\[hydrate\] Error parsing props for component ${s}\`,this.getAttribute("props"),r),r}let u;await this.hydrator(this)(this.Component,p,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),c.disconnect(),this.childrenConnectedCallback()},c=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT\_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});c.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),c=this.getAttribute("client");if(Astro\[c\]===void 0){window.addEventListener(\`astro:${c}\`,()=>this.start(),{once:!0});return}try{await Astro\[c\](async()=>{let n=this.getAttribute("renderer-url"),\[h,{default:p}\]=await Promise.all(\[import(this.getAttribute("component-url")),n?import(n):()=>()=>{}\]),u=this.getAttribute("component-export")||"default";if(!u.includes("."))this.Component=h\[u\];else{this.Component=h;for(let f of u.split("."))this.Component=this.Component\[f\]}return this.hydrator=p,this.hydrate},e,this)}catch(n){console.error(\`\[astro-island\] Error hydrating ${this.getAttribute("component-url")}\`,n)}}attributeChangedCallback(){this.hydrate()}}d(y,"observedAttributes",\["props"\]),customElements.get("astro-island")||customElements.define("astro-island",y)}})();

> 📣 **Apollo Server 4 is generally available!**
> 
> [See what's new](https://www.apollographql.com/docs/apollo-server/migration/) or check out the [tutorial for migrating from Apollo Server 3](https://www.apollographql.com/tutorials/side-quest-as4?referrer=docs-content).
> 
> Docs for Apollo Server 3 are [available here](https://www.apollographql.com/docs/apollo-server/v3/).

**Apollo Server is an [open-source](https://github.com/apollographql/apollo-server), spec-compliant GraphQL server** that's compatible with any GraphQL client, including [Apollo Client](https://www.apollographql.com/docs/react). It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

![Diagram showing Apollo Server bridging GraphQL Operations to web apps and frameworks](https://www.apollographql.com/docs/_image/apollo-server/9b3731fe4dd2?w=800)

#### You can use Apollo Server as:

*   The GraphQL server for a [subgraph](https://www.apollographql.com/docs/apollo-server/using-federation/apollo-subgraph-setup) in a federated supergraph
    
*   An add-on to any new or existing Node.js apps—this includes apps running on [Express](https://www.apollographql.com/docs/apollo-server/api/express-middleware) (including [MERN stack](https://www.apollographql.com/docs/apollo-server/integrations/mern) apps), [AWS Lambda](https://www.npmjs.com/package/@as-integrations/aws-lambda), [Azure Functions](https://www.npmjs.com/package/@as-integrations/azure-functions), [Cloudflare](https://www.npmjs.com/package/@as-integrations/cloudflare-workers), [Fastify](https://www.npmjs.com/package/@as-integrations/fastify), and [more](https://www.apollographql.com/docs/apollo-server/integrations/integration-index)
    

#### Apollo Server provides:

*   **Straightforward setup**, so your client developers can start fetching data quickly
    
*   **Incremental adoption**, enabling you to add features as they're needed
    
*   **Universal compatibility** with any data source, any build tool, and any GraphQL client
    
*   **Production readiness**, enabling you to confidently run your graph in production
    

#### Ready to try it out?

[Get started!](https://www.apollographql.com/docs/apollo-server/getting-started)

[

Next

Get Started with Apollo Server

](/docs/apollo-server/getting-started)

Give FeedbackFeedback

[

Edit on GitHub



](https://github.com/apollographql/apollo-server/blob/main/docs/source/index.mdx)[

Ask Community



](https://community.apollographql.com/)(() => { const script = document.currentScript; const cssVariable = script?.getAttribute("data-css-variable"); const parent = script?.parentElement; if (!parent || !cssVariable || !parent) return; const updateHeight = () => { const height = parent.clientHeight; document.documentElement.style.setProperty( cssVariable, \`${height}px\` ); }; updateHeight(); const resizeObserver = new ResizeObserver(updateHeight); resizeObserver.observe(parent); })();

[

](https://www.apollographql.com)

© 2025 Apollo Graph Inc., d/b/a Apollo GraphQL.

[Privacy Policy](https://www.apollographql.com/privacy-policy)

## Company

*   [About Apollo](https://www.apollographql.com/about-us)
*   [Careers](https://www.apollographql.com/careers)
*   [Partners](https://www.apollographql.com/partners)

## Resources

*   [Blog](https://blog.apollographql.com)
*   [Tutorials](https://www.apollographql.com/tutorials)
*   [Content Library](https://www.apollographql.com/resources)

## Get in touch

*   [Contact Sales](https://www.apollographql.com/contact-sales)
*   [Contact Support](https://www.apollographql.com/support)