## 

On this page

Copy as MD

*   [Built-in error codes](#built-in-error-codes)

*   [Custom errors](#custom-errors)

*   [Throwing errors](#throwing-errors)

*   [Including custom error details](#including-custom-error-details)

*   [Omitting or including stacktrace](#omitting-or-including-stacktrace)

*   [Masking and logging errors](#masking-and-logging-errors)

*   [For client responses](#for-client-responses)

*   [For Apollo Studio reporting](#for-apollo-studio-reporting)

*   [Setting HTTP status code and headers](#setting-http-status-code-and-headers)

[Home](/docs/)

/ [Apollo Server](/docs/apollo-server)

/ [Resolving Operations](/docs/apollo-server/data/resolvers)

/ [Error handling](/docs/apollo-server/data/errors)

[Apollo Server /](/docs/apollo-server)

[Resolving Operations](/docs/apollo-server/data/resolvers)

# Error Handling

Making errors actionable on the client and server

* * *

astro-island,astro-slot,astro-static-slot{display:contents}(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();;(()=>{var A=Object.defineProperty;var g=(i,o,a)=>o in i?A(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i\[o\]=a;var d=(i,o,a)=>g(i,typeof o!="symbol"?o+"":o,a);{let i={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},o=t=>{let\[l,e\]=t;return l in i?i\[l\](e):void 0},a=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map((\[l,e\])=>\[l,o(e)\]));class y extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island\[ssr\]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let c=this.querySelectorAll("astro-slot"),n={},h=this.querySelectorAll("template\[data-astro-template\]");for(let r of h){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n\[r.getAttribute("data-astro-template")||"default"\]=r.innerHTML,r.remove())}for(let r of c){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n\[r.getAttribute("name")||"default"\]=r.innerHTML)}let p;try{p=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(r){let s=this.getAttribute("component-url")||"",v=this.getAttribute("component-export");throw v&&(s+=\` (export ${v})\`),console.error(\`\[hydrate\] Error parsing props for component ${s}\`,this.getAttribute("props"),r),r}let u;await this.hydrator(this)(this.Component,p,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),c.disconnect(),this.childrenConnectedCallback()},c=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT\_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});c.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),c=this.getAttribute("client");if(Astro\[c\]===void 0){window.addEventListener(\`astro:${c}\`,()=>this.start(),{once:!0});return}try{await Astro\[c\](async()=>{let n=this.getAttribute("renderer-url"),\[h,{default:p}\]=await Promise.all(\[import(this.getAttribute("component-url")),n?import(n):()=>()=>{}\]),u=this.getAttribute("component-export")||"default";if(!u.includes("."))this.Component=h\[u\];else{this.Component=h;for(let f of u.split("."))this.Component=this.Component\[f\]}return this.hydrator=p,this.hydrate},e,this)}catch(n){console.error(\`\[astro-island\] Error hydrating ${this.getAttribute("component-url")}\`,n)}}attributeChangedCallback(){this.hydrate()}}d(y,"observedAttributes",\["props"\]),customElements.get("astro-island")||customElements.define("astro-island",y)}})();

> Apollo Server v4 introduced a regression where providing invalid variables yields a 200 status code instead of 400. To mitigate this regression, provide the `status400ForVariableCoercionErrors: true` option to your `ApolloServer` constructor. For more information, see the [migration guide](https://www.apollographql.com/docs/apollo-server/migration/#known-regressions).

Whenever Apollo Server encounters errors while processing a GraphQL operation, its response to the client includes an `errors` array containing each error that occurred. Each error in the array has an `extensions` field that provides additional useful information, including an error `code` and (while in development mode) a `stacktrace`.

Here's an example error response caused by misspelling the `__typename` field in a query:

Click to expand

JSON

copy

```
1{
2  "errors": [
3    {
4      "message": "Cannot query field \"__typenam\" on type \"Query\".",
5      "locations": [
6        {
7          "line": 1,
8          "column": 2
9        }
10      ],
11      "extensions": {
12        "code": "GRAPHQL_VALIDATION_FAILED",
13        "stacktrace": [
14          "GraphQLError: Cannot query field \"__typenam\" on type \"Query\".",
15          "    at Object.Field (/my_project/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.js:48:31)",
16          "    ...additional lines..."
17        ]
18      }
19    }
20  ]
21}
```

To help with debugging, Apollo Server provides an `ApolloServerErrorCode` enum, which you can use to check if your error is one of the [different types produced by Apollo Server](https://www.apollographql.com/docs/apollo-server/data/errors#built-in-error-codes).

You can check an error's `code` to determine why an error occurred and also add logic to respond to different types of errors, like so:

TypeScript

copy

```
1import { ApolloServerErrorCode } from '@apollo/server/errors';
2
3if (error.extensions?.code === ApolloServerErrorCode.GRAPHQL_PARSE_FAILED) {
4  // respond to the syntax error
5} else if (error.extensions?.code === "MY_CUSTOM_CODE") {
6  // do something else
7}
```

Apollo Server's variety of error codes enables requesting clients to respond differently to different error types. You can also [create your own custom errors and codes](https://www.apollographql.com/docs/apollo-server/data/errors#custom-errors).

## Built-in error codes

Code

Description

###### `GRAPHQL_PARSE_FAILED`

The GraphQL operation string contains a syntax error.

###### `GRAPHQL_VALIDATION_FAILED`

The GraphQL operation is not valid against the server's schema.

###### `BAD_USER_INPUT`

The GraphQL operation includes an invalid value for a field argument.

###### `PERSISTED_QUERY_NOT_FOUND`

A client sent the hash of a query string to execute via [automatic persisted queries](https://www.apollographql.com/docs/apollo-server/performance/apq/), but the query was not in the APQ cache.

###### `PERSISTED_QUERY_NOT_SUPPORTED`

A client sent the hash of a query string to execute via [automatic persisted queries](https://www.apollographql.com/docs/apollo-server/performance/apq/), but the server has disabled APQ.

###### `OPERATION_RESOLUTION_FAILURE`

The request was parsed successfully and is valid against the server's schema, but the server couldn't resolve which operation to run.This occurs when a request containing multiple named operations doesn't specify which operation to run (i.e.,`operationName`), or if the named operation isn't included in the request.

###### `BAD_REQUEST`

An error occurred before your server could attempt to parse the given GraphQL operation.

###### `INTERNAL_SERVER_ERROR`

An unspecified error occurred.When Apollo Server formats an error in a response, it sets the code extension to this value if no other code is set.

## Custom errors

You can create a custom errors and codes using the `graphql` package's `GraphQLError` class, like so:

TypeScript

copy

```
1import { GraphQLError } from 'graphql';
2
3throw new GraphQLError(message, {
4  extensions: { code: 'YOUR_ERROR_CODE', myCustomExtensions },
5});
```

Custom errors can provide additional context, enabling your clients to understand _why_ an error is happening. We recommend making clear errors for common cases, for example, when a user isn't logged in (`UNAUTHENTICATED`), or someone is forbidden from performing an action:

TypeScript

copy

```
1import { GraphQLError } from 'graphql';
2
3throw new GraphQLError('You are not authorized to perform this action.', {
4  extensions: {
5    code: 'FORBIDDEN',
6  },
7});
```

## Throwing errors

Apollo Server throws [errors](https://www.apollographql.com/docs/apollo-server/data/errors#built-in-error-codes) automatically when applicable. For example, it throws a `GRAPHQL_VALIDATION_FAILED` error whenever an incoming operation isn't valid against the server's schema.

Your resolvers can also throw errors in situations where Apollo Server doesn't do so automatically.

For example, this resolver throws a [custom error](https://www.apollographql.com/docs/apollo-server/data/errors#custom-errors) if the integer value provided for a user's ID is less than `1`:

Click to expand

TypeScript

copy

```
1import { GraphQLError } from 'graphql';
2
3const typeDefs = `#graphql
4  type Query {
5    userWithID(id: ID!): User
6  }
7
8  type User {
9    id: ID!
10    name: String!
11  }
12`;
13
14const resolvers = {
15  Query: {
16    userWithID: (_, args) => {
17      if (args.id  {
17      if (args.id  In the examples below, we use top-level [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) calls to start our server asynchronously. Check out our [Getting Started](https://www.apollographql.com/docs/apollo-server/getting-started#step-2-install-dependencies) guide to see how we configured our project to support this.

The `ApolloServer` constructor accepts a `formatError` hook that is run on each error before it's passed back to the client. You can use this function to log or mask particular errors.

The `formatError` hook receives two arguments: the first is the error formatted as a JSON object (to be sent with the response), and the second is the original error (wrapped in `GraphQLError` if thrown by a resolver).

> The `formatError` function does _not_ modify errors that are sent to Apollo Studio as part of usage reporting. See [For Apollo Studio reporting](https://www.apollographql.com/docs/apollo-server/data/errors#for-apollo-studio-reporting).

The below example returns a user-friendly message whenever Apollo Server throws a `GRAPHQL_VALIDATION_FAILED` error:

TypeScript

copy

```
1import { ApolloServer } from '@apollo/server';
2import { startStandaloneServer } from '@apollo/server/standalone';
3import { ApolloServerErrorCode } from '@apollo/server/errors';
4
5const server = new ApolloServer({
6  typeDefs,
7  resolvers,
8  formatError: (formattedError, error) => {
9    // Return a different error message
10    if (
11      formattedError.extensions.code ===
12      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
13    ) {
14      return {
15        ...formattedError,
16        message: "Your query doesn't match the schema. Try double-checking it!",
17      };
18    }
19
20    // Otherwise return the formatted error. This error can also
21    // be manipulated in other ways, as long as it's returned.
22    return formattedError;
23  },
24});
25
26const { url } = await startStandaloneServer(server);
27console.log(`🚀 Server listening at: ${url}`);
```

As another example, here we return a more generic error whenever the original error's message begins with `Database Error:` :

TypeScript

copy

```
1formatError: (formattedError, error) => {
2  if (formattedError.message.startsWith('Database Error: ')) {
3    return { message: 'Internal server error' };
4  }
5
6  // Otherwise return the formatted error.
7  return formattedError;
8},
```

If you want to access the originally thrown error (without the JSON formatting), you can use `formatError`'s second argument.

For example, if you are using a database package in your app and you'd like to do something when your server throws a specific type of database error:

TypeScript

copy

```
1 formatError: (formattedError, error) => {
2    if (error instanceof CustomDBError) {
3      // do something specific
4    }
5  },
```

Note, if a _resolver_ throws the error, a `GraphQLError` is wrapped around the initially thrown error. This `GraphQLError` neatly formats the error and contains useful fields, such as the `path` where the error occurred.

If you want to remove the outer `GraphQLError` to access the originally thrown error you can use `unwrapResolverError` from `@apollo/server/errors`. The `unwrapResolverError` function can remove the `GraphQLError` wrapping from a resolver error or return the error unaltered if it isn't from a resolver.

So, we can rewrite the above code snippet to work for errors thrown in and outside of resolvers, like so:

TypeScript

copy

```
1import { unwrapResolverError } from '@apollo/server/errors';
2
3new ApolloServer({
4  formatError: (formattedError, error) => {
5    // unwrapResolverError removes the outer GraphQLError wrapping from
6    // errors thrown in resolvers, enabling us to check the instance of
7    // the original error
8    if (unwrapResolverError(error) instanceof CustomDBError) {
9      return { message: 'Internal server error' };
10    }
11  },
12});
```

> To make context-specific adjustments to the error received by `formatError` (such as localization or personalization), consider [creating a plugin](https://www.apollographql.com/docs/apollo-server/integrations/plugins/) that uses the [`didEncounterErrors` lifecycle event](https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference/#didencountererrors) to attach additional properties to the error. These properties can be accessed from `formatError`.

### For Apollo Studio reporting

> **New in Apollo Server 4:** error details are [_not_ included in traces by default](https://www.apollographql.com/docs/apollo-server/migration#usage-reporting-and-inline-trace-plugins-mask-errors-by-default). Instead, `` replaces each error's message, and the `maskedBy` error extension replaces all other extensions. The `maskedBy` extension includes the name of the plugin that performed the masking (`ApolloServerPluginUsageReporting` or `ApolloServerPluginInlineTrace`).

You can use Apollo Studio to analyze your server's error rates. By default, the operations sent to Studio as detailed traces _don't_ contain error details.

If you _do_ want error information sent to Studio, you can send every error, or you can modify or redact specific errors before they're transmitted.

To send all errors to Studio you can pass `{ unmodified: true }` to `sendErrors`, like so:

TypeScript

copy

```
1new ApolloServer({
2  // etc.
3  plugins: [
4    ApolloServerPluginUsageReporting({
5      // If you pass unmodified: true to the usage reporting
6      // plugin, Apollo Studio receives ALL error details
7      sendErrors: { unmodified: true },
8    }),
9  ],
10});
```

If you want to report specific errors or modify an error before reporting it, you can pass a function to the `sendErrors.transform` option, like so:

TypeScript

copy

```
1new ApolloServer({
2  // etc.
3  plugins: [
4    ApolloServerPluginUsageReporting({
5      sendErrors: {
6        transform: (err) => {
7          if (err.extensions.code === 'MY_CUSTOM_CODE') {
8            // returning null will skip reporting this error
9            return null;
10          }
11
12          // All other errors are reported.
13          return err;
14        },
15      },
16    }),
17  ],
18});
```

> The [usage reporting plugin](https://www.apollographql.com/docs/apollo-server/api/plugin/usage-reporting/) is installed automatically with its default configuration if you provide an Apollo API key to Apollo Server. To customize the usage reporting plugin's behavior, you need to install it explicitly with a custom configuration, as shown in the examples below.

The function you pass to `transform` is called for each error (`GraphQLError`) to be reported to Studio. The error is provided as the function's first argument. The function can either:

*   Return a modified form of the error (e.g., by changing the `err.message` to remove potentially sensitive information)
    
*   Return `null` to prevent the error from being reported entirely
    

Note that returning `null` also affects Studio's aggregated statistics about how many operations contain errors and at what paths those errors appear.

[As mentioned above](https://www.apollographql.com/docs/apollo-server/data/errors#for-client-responses), you can use the `unwrapResolverError` (from `@apollo/server/errors`) to remove the `GraphQLError` wrapping an original error.

> **For federated graphs**, define your `transform` function in each subgraph's [inline trace plugin](https://www.apollographql.com/docs/apollo-server/api/plugin/inline-trace) to rewrite field errors. If you want to transform your gateway's parsing or validation errors, you can define your `transform` function in your gateway.

#### Example: Ignoring common low-severity errors

Let's say our server is `throw`ing an `UNAUTHENTICATED` error whenever a user enters an incorrect password. We can avoid reporting these errors to Apollo Studio by defining a `transform` function, like so:

TypeScript

copy

```
1import { ApolloServer } from '@apollo/server';
2import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
3const server = new ApolloServer({
4  typeDefs,
5  resolvers,
6  plugins: [
7    ApolloServerPluginUsageReporting({
8      sendErrors: {
9        transform: (err) => {
10          // Return `null` to avoid reporting `UNAUTHENTICATED` errors
11          if (err.extensions.code === 'UNAUTHENTICATED') {
12            return null;
13          }
14
15          // All other errors will be reported.
16          return err;
17        },
18      },
19    }),
20  ],
21});
```

This example configuration ensures that any `UNAUTHENTICATED` error that's thrown within a resolver is only reported to the client, and never sent to Apollo Studio. All other errors are transmitted to Studio normally.

#### Example: Filtering errors based on other properties

When generating an error (e.g., `new GraphQLError("Failure!")`), the error's `message` is the most common extension (in this case it's `Failure!`). However, any number of extensions can be attached to the error (such as a `code` extension).

We can check these extensions when determining whether an error should be reported to Apollo Studio using the `transform` function as follows:

TypeScript

copy

```
1import { ApolloServer } from '@apollo/server';
2import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
3
4const server = new ApolloServer({
5  typeDefs,
6  resolvers,
7  plugins: [
8    ApolloServerPluginUsageReporting({
9      sendErrors: {
10        transform: (err) => {
11          // Using a more stable, known error extension (e.g. `err.code`) would be
12          // more defensive, however checking the `message` might serve most needs!
13          if (err.message && err.message.startsWith('Known error message')) {
14            return null;
15          }
16
17          // All other errors should still be reported!
18          return err;
19        },
20      },
21    }),
22  ],
23});
```

This example configuration ensures that any error that starts with `Known error message` is not transmitted to Apollo Studio, but all other errors are sent as normal.

#### Example: Redacting information from an error message

[As mentioned above](https://www.apollographql.com/docs/apollo-server/data/errors#for-apollo-studio-reporting), by default, the operations sent to Studio as detailed traces don't contain error details.

If you _do_ want to send an error's details to Apollo Studio, but need to redact some information first, the `transform` function can help.

For example, if there is personally identifiable information in the error `message`, like an API key:

TypeScript

copy

```
1import { GraphQLError } from 'graphql';
2
3throw new GraphQLError(
4  "The x-api-key:12345 doesn't have sufficient privileges.",
5);
```

The `transform` function can ensure that such information is not sent to Apollo Studio and potentially revealed outside its intended scope:

TypeScript

copy

```
1import { ApolloServer } from '@apollo/server';
2import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
3
4const server = new ApolloServer({
5  typeDefs,
6  resolvers,
7  plugins: [
8    ApolloServerPluginUsageReporting({
9      sendErrors: {
10        transform: (err) => {
11          // Make sure that a specific pattern is removed from all error messages.
12          err.message = err.message.replace(/x-api-key:[A-Z0-9-]+/, 'REDACTED');
13          return err;
14        },
15      },
16    }),
17  ],
18});
```

In this case, the error above is reported to Apollo Studio as:

Text

copy

```
1The REDACTED doesn't have sufficient privileges.
```

## Setting HTTP status code and headers

GraphQL, by design, does not use the same conventions from REST to communicate via HTTP verbs and status codes. Client information should be contained in the schema or as part of the standard response `errors` field. We recommend using the included [Error Codes](https://www.apollographql.com/docs/apollo-server/data/errors#built-in-error-codes) or [Custom Errors](https://www.apollographql.com/docs/apollo-server/data/errors#custom-errors) for error consistency rather than directly modifying the HTTP response.

Apollo Server uses different HTTP status codes in various situations:

*   If Apollo Server hasn't correctly started up or is in the process of shutting down, it responds with a 500 status code.
    
*   The former can happen if you use a serverless integration and it sends requests to an Apollo Server instance that had an error on startup. The latter happens if you aren't properly [draining your server](https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/#using-the-plugin).
    
*   If Apollo Server can't parse the request into a legal GraphQL document and validate it against your schema, it responds with a 400 status code. This can also happen with other request problems, such as if a client attempts to send a batched HTTP request when `allowBatchedHttpRequests` isn't enabled or if CSRF prevention blocks a request.
    
*   If a request uses an invalid HTTP method (`GET` with a mutation, or any HTTP method other than `GET` or `POST`), then Apollo Server responds with a 405 status code.
    
*   If your `context` function throws, Apollo Server responds with a 500 status code.
    
*   If there is an unexpected error during the processing of the request (either a bug in Apollo Server or a plugin hook throws), Apollo Server responds with a 500 status code.
    
*   Otherwise, Apollo Server returns a 200 status code. This is essentially the case where the server can execute the GraphQL operation, and execution completes successfully (though this can still include resolver\-specific errors).
    

There are three ways to change an HTTP status code or set custom response headers, you can: throw an error in a resolver, throw an error in your `context` function, or write a [plugin](https://www.apollographql.com/docs/apollo-server/integrations/plugins).

While Apollo Server does enable you to set HTTP status codes based on errors thrown by resolvers, best practices for GraphQL over HTTP encourage sending 200 whenever an operation executes. So, we don't recommend using this mechanism in resolvers, just in the `context` function or in a plugin hooking into an early stage of the request pipeline.

Be aware that GraphQL client libraries might not treat all response status codes the same, so it will be up to your team to decide which patterns to use.

To change the HTTP status code and response headers based on an error thrown in either a resolver or `context` function, throw a `GraphQLError` with an `http` extension, like so:

TypeScript

copy

```
1import { GraphQLError } from 'graphql';
2
3const resolvers = {
4  Query: {
5    someField() {
6      throw new GraphQLError('the error message', {
7        extensions: {
8          code: 'SOMETHING_BAD_HAPPENED',
9          http: {
10            status: 404,
11            headers: new Map([
12              ['some-header', 'it was bad'],
13              ['another-header', 'seriously'],
14            ]),
15          },
16        },
17      });
18    }
19  }
20}
```

You don't need to include `status` unless you want to override the default status code (200 for a resolver or 500 for a `context` function). The optional `headers` field should provide a `Map` with lowercase header names.

If your setup includes multiple resolvers which throw errors that set status codes or set the same header, Apollo Server might resolve this conflict in an arbitrary way (which could change in future versions). Instead, we recommend writing a plugin (as shown below).

You can also set the HTTP status code and headers from a plugin. As an example, here is how you could set a custom response header and status code based on a GraphQL error:

TypeScript

copy

```
1const setHttpPlugin = {
2  async requestDidStart() {
3    return {
4      async willSendResponse({ response }) {
5        response.http.headers.set('custom-header', 'hello');
6        if (response.body.kind === 'single' &&
7            response.body.singleResult.errors?.[0]?.extensions?.code === 'TEAPOT') {
8          response.http.status = 418;
9        }
10      },
11    };
12  },
13};
14
15const server = new ApolloServer({
16  typeDefs,
17  resolvers,
18  plugins: [setHttpPlugin],
19});
```

[

Previous

Context and contextValue



](/docs/apollo-server/data/context)

[

Next

Subscriptions in Apollo Server

](/docs/apollo-server/data/subscriptions)

Give FeedbackFeedback

[

Edit on GitHub



](https://github.com/apollographql/apollo-server/blob/main/docs/source/data/errors.mdx)[

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