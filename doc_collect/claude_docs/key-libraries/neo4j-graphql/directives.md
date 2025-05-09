[](https://neo4j.com/docs)

*   [Neo4j GraphQL Library](../)
*   [Directives](./)

[Raise an issue](https://github.com/neo4j/docs-graphql/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/directives/index.adoc%20\(ref:%207.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Directives

This is the documentation of the GraphQL Library version 7. For the long-term support (LTS) version 5, refer to [GraphQL Library version 5 LTS](/docs/graphql/5/).

The Neo4j GraphQL Library provides the following directives to be used whilst defining types:

## [](#_security)Security

 

Directive

Description

[`@authentication`](../security/authentication/)

Requires authentication checks when accessing the type.

[`@authorization`](../security/authorization/)

Specifies authorization rules for queries and mutations on the type.

[`@jwt`](../security/configuration/#_jwt)

Configures the JWT authentication and authorization filters to include additional JWT claims.

[`@jwtClaim`](../security/configuration/#_jwtclaim)

Used in combination with `@jwt`. Configures the JWT authentication and authorization filters to include an additional JWT claim which is either nested or using special characters not supported by GraphQL.

[`@subscriptionsAuthorization`](../security/subscriptions-authorization/)

Specifies authorization rules for subscriptions on the type.

## [](#_database_mapping)Database mapping

 

Directive

Description

[`@node`](database-mapping/#_node)

Specifies the configuration of a GraphQL object type which represents a Neo4j node.

[`@relationship`](database-mapping/#_relationship)

Configures [relationships](../types/relationships/) between object types. Also see [`@relationship` field configuration](schema-configuration/field-configuration/#_relationship).

[`@relationshipProperties`](database-mapping/#_relationshipproperties)

Required to differentiate interfaces that are used for relationship properties, and otherwise.

[`@alias`](database-mapping/#_alias)

Maps a GraphQL schema field to a Neo4j property on a node or relationship.

[`@declareRelationship`](../types/relationships/#_declarerelationship)

Configure relationships to be implemented on object types.

## [](#_autogeneration)Autogeneration

 

Directive

Description

[`@id`](autogeneration/#type-definitions-autogeneration-id)

Marks a field as the unique ID for an object type, and allows for autogeneration of IDs.

[`@timestamp`](autogeneration/#type-definitions-autogeneration-timestamp)

Flags fields to be used to store timestamps on `create` and `update` events.

## [](#_schema_configuration)Schema configuration

 

Directive

Description

[`@query`](schema-configuration/type-configuration/#_query)

Limits the availability of query operations in the library.

[`@mutation`](schema-configuration/type-configuration/#_mutation)

Limits the availability of Mutation operations in the library.

[`@subscription`](schema-configuration/type-configuration/#_subscription)

Limits subscription operations in the library.

[`@default`](schema-configuration/type-configuration/#type-definitions-default-values-default)

Allows the setting of a default value for a field during object creation.

[`@plural`](schema-configuration/type-configuration/#_plural)

Redefines how to compose the plural of the type for the generated operations. Particularly useful for types that are not correctly pluralized or are non-English words.

[`@selectable`](schema-configuration/field-configuration/#_selectable)

Sets the availability of fields on queries and aggregations.

[`@settable`](schema-configuration/field-configuration/#_settable)

Sets the availability of fields on the `create` and `update` inputs.

[`@filterable`](schema-configuration/field-configuration/#_filterable)

Defines the filters generated for a field.

## [](#_indexes_and_constraints)Indexes and constraints

 

Directive

Description

[`@fulltext`](indexes-and-constraints/#_fulltext)

Indicates that there should be a fulltext index inserted into the database for the specified Node and its properties.

[`@vector`](indexes-and-constraints/#_vector_index_search)

Perform a vector index search on your database either based by passing in a vector index or a search phrase.

## [](#_custom_logic)Custom logic

 

Directive

Description

[`@cypher`](custom-logic/#_cypher)

Overrides field resolution (including query and mutation fields), instead resolving with the specified Cypher.

[`@coalesce`](custom-logic/#_coalesce)

Exposes a mechanism for querying against non-existent, `null` values on a node.

[`@limit`](custom-logic/#_limit)

Used on nodes to inject values into Cypher `LIMIT` clauses.

[`@customResolver`](custom-logic/#_customresolver)

Specifies that a field is resolved by a custom resolver, and allows the specification of any required fields that is passed as arguments to the custom resolver.

[`@populatedBy`](custom-logic/#_populatedby)

Specifies a callback function (executed during GraphQL query parsing) to populate fields which have not been provided within the input.

## [](#_relay)Relay

 

Directive

Description

[`@relayId`](../integrations/relay-compatibility/#_relayid)

Specifies that the field should be used as the global node identifier for Relay.

[The `Neo4jGraphQL` class](../neo4jgraphql-class/) [Database mapping](database-mapping/)