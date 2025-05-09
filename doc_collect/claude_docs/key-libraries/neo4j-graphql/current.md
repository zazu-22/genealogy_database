[](https://neo4j.com/docs)

*   [Neo4j GraphQL Library](./)
*   [Introduction](./)

[Raise an issue](https://github.com/neo4j/docs-graphql/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/index.adoc%20\(ref:%207.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Introduction

This is the documentation of the GraphQL Library version 7. For the long-term support (LTS) version 5, refer to [GraphQL Library version 5 LTS](/docs/graphql/5/).

The Neo4j GraphQL Library is a highly flexible, low-code, open source JavaScript library that enables rapid API development for cross-platform and mobile applications by tapping into the power of connected data.

With Neo4j as the graph database, the GraphQL Library makes it simple for applications to have data treated as a graph natively from the frontend all the way to storage. This avoids duplicate schema work and ensures flawless integration between frontend and backend developers.

If you are new to Neo4j and GraphQL take a look at [Creating a new project](getting-started/) and [Neo4j GraphQL Toolbox](getting-started/toolbox/) to learn the fundamentals of the Neo4j GraphQL Library and how to create GraphQL APIs backed by a Neo4j graph database.

The GRANDstack starter app has been deprecated. For more information, read the section on [Deprecations](deprecations/).

## [](#_how_it_works)How it works

The Neo4j GraphQL Library requires a set of type definitions that describes the shape of your graph data. It can generate an entire executable schema with all of the additional types needed to execute queries and mutations to interact with your Neo4j database.

For every query and mutation that is executed against this generated schema, the Neo4j GraphQL Library generates a single Cypher query which is executed against the database. This eliminates the [N+1 Problem](https://www.google.com/search?q=graphql+n%2B1), which can make GraphQL implementations slow and inefficient.

*   Automatic generation of [Queries](queries-aggregations/queries/) and [Mutations](mutations/) for CRUD interactions.
    
*   [Types](types/), including temporal and spatial.
    
*   Support for both node and relationship properties.
    
*   Extensibility through the [`@cypher` directive](directives/custom-logic/#_cypher) and/or [Custom Resolvers](directives/custom-logic/#_customresolver).
    
*   Extensive [Filtering](filtering/) and [Sorting](queries-aggregations/sorting/) options.
    
*   Options for [Database mapping](directives/database-mapping/) and value [Autogeneration](directives/autogeneration/).
    
*   [Pagination](queries-aggregations/pagination/) options.
    
*   [Security options](security/) and additional [Schema Configuration](directives/schema-configuration/).
    
*   A [Toolbox](getting-started/toolbox/) (UI) to experiment with your Neo4j GraphQL API on Neo4j Desktop.
    

## [](#_interaction)Interaction

In the [Getting Started](getting-started/) guide, Apollo Server is used to host the GraphQL schema, so you can interact directly with your API with no frontend. In case you prefer to use frontend frameworks, these are some clients that interact with GraphQL APIs:

*   [React](https://reactjs.org/) - support through [Apollo Client](https://www.apollographql.com/docs/react/)
    
*   [Vue.js](https://vuejs.org/) - support through [Vue Apollo](https://apollo.vuejs.org/)
    
*   [AngularJS](https://angularjs.org/) - support through [Apollo Angular](https://apollo-angular.com/docs/).
    

## [](#_deployment)Deployment

There are a variety of methods for deploying GraphQL APIs. In the [Getting Started](getting-started/) guide, Apollo Server is being used for demonstration. You can check their own documentation about [Deployment](https://www.apollographql.com/docs/apollo-server/deployment) for more details.

## [](#_versioning)Versioning

The Neo4j GraphQL Library uses [Semantic Versioning](https://semver.org/). Given a version number `MAJOR.MINOR.PATCH`, the increment is based on:

*   `MAJOR` - incompatible API changes compared to the previous `MAJOR` version, for which you will likely have to migrate
    
*   `MINOR` - new features have been added in a backwards compatible manner
    
*   `PATCH` - bug fixes have been added in a backwards compatible manner.
    

Additionally, prerelease version numbers may have additional suffixes, for example `MAJOR.MINOR.PATCH-PRERELEASE.NUMBER`, where `PRERELEASE` is one of the following:

*   `alpha` - unstable prerelease artifacts, and the API may change between releases during this phase
    
*   `beta` - feature complete prerelease artifacts, which will be more stable than `alpha` releases but will likely still contain bugs
    
*   `rc` - release candidate including artifacts to be promoted to a stable release, in a last effort to find trailing bugs.
    

`NUMBER` in the suffix is simply an incrementing release number in each phase.

## [](#_requirements)Requirements

1.  [Neo4j Database](https://neo4j.com/deployment-center/#gdb-selfmanaged) or [Neo4j AuraDB](https://neo4j.com/product/auradb/) version 5.x with APOC core plugin. Note that with version 5.15 or higher you are using using the [`@vector` directive](directives/indexes-and-constraints/#_vector_index_search).
    
2.  [Node.js](https://nodejs.org/en/) 20+.
    

## [](#_resources)Resources

1.  [GitHub](https://github.com/neo4j/graphql)
    
2.  [Issue Tracker](https://github.com/neo4j/graphql/issues)
    
3.  [npm package](https://www.npmjs.com/package/@neo4j/graphql)
    

## [](#_license)License

Documentation license: [Creative Commons 4.0](https://neo4j.com/docs/license/)

Source: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Get hands-on with the [GraphQL course on GraphAcademy](https://graphacademy.neo4j.com/courses/graphql-basics/?ref=promo-graphql-basics).

[Creating a new project](getting-started/)