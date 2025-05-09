Learn

Schemas and Types

# Schemas and Types

Learn about the different elements of the GraphQL type system

The GraphQL [type system](https://spec.graphql.org/draft/#sec-Type-System) describes what data can be queried from the API. The collection of those capabilities is referred to as the service’s _schema_ and clients can use that schema to send queries to the API that return predictable results.

On this page, we’ll explore GraphQL’s [six kinds of named type definitions](https://spec.graphql.org/draft/#sec-Types) as well as other features of the type system to learn how they may be used to describe your data and the relationships between them. Since GraphQL can be used with any backend framework or programming language, we’ll avoid implementation-specific details and talk only about the concepts.

## Type system[](#type-system)

If you’ve seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:

Operation

Response

1.  We start with a special “root” object
2.  We select the `hero` field on that
3.  For the object returned by `hero`, we select the `name` and `appearsIn` fields

Because the shape of a GraphQL query closely matches the result, we can predict what the query will return without knowing that much about the server. But it’s useful to have an exact description of the data we can request. For example, what fields can we select? What kinds of objects might they return? What fields are available on those sub-objects?

That’s where the schema comes in. Every GraphQL service defines a set of types that completely describe the set of possible data we can query on that service. Then, when requests come in, they are validated and executed against that schema.

## Type language[](#type-language)

GraphQL services can be written in any language and there are many different approaches you can take when defining the types in a schema:

*   Some libraries have you construct the schema types, fields, and resolver functions together using the same programming language that was used to write the GraphQL implementation.
*   Some libraries allow you to define types and fields more ergonomically using what’s commonly called the schema definition language (or SDL) and then write the resolver functions for the corresponding fields separately.
*   Some libraries allow you to write and annotate the resolver functions, and then infer the schema from that.
*   Some libraries may even infer both the types and resolver functions for you, based on some underlying data source(s).

Since we can’t rely on a specific programming language to discuss GraphQL schemas in this guide, we’ll use SDL because it’s similar to the query language that we’ve seen so far and allows us to talk about GraphQL schemas in a language-agnostic way.

## Object types and fields[](#object-types-and-fields)

The most basic components of a GraphQL schema are [Object types](https://spec.graphql.org/draft/#sec-Objects), which just represent a kind of object you can fetch from your service, and what fields it has. In SDL, we represent it like this:

```nextra-code
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

The language is readable, but let’s go over it so that we can have a shared vocabulary:

*   `Character` is a [GraphQL Object type](/learn/schema/#object-types-and-fields), meaning it’s a type with some fields. Most of the types in your schema will be Object types.
*   `name` and `appearsIn` are [fields](/learn/schema/#object-types-and-fields) on the `Character` type. That means that `name` and `appearsIn` are the only fields that can appear in any part of a GraphQL query that operates on the `Character` type.
*   `String` is one of the built-in [Scalar types](/learn/schema/#scalar-types). These are types that resolve to a single scalar value and can’t have sub-selections in the query. We’ll go over Scalar types more later.
*   `String!` means that the field is a [Non-Null type](/learn/schema/#non-null), meaning the GraphQL service promises to give you a value whenever you query this field. In SDL, we represent those with an exclamation mark.
*   `[Episode!]!` represents a [List type](/learn/schema/#list) of `Episode` objects. When a List is Non-Null, you can always expect an array (with zero or more items) when you query the `appearsIn` field. In this case, since `Episode!` is also Non-Null within the list, you can always expect every item in the array to be an `Episode` object.

Now you know what a GraphQL Object type looks like and how to read the basics of SDL.

### Arguments[](#arguments)

Every field on a GraphQL Object type can have zero or more [arguments](https://spec.graphql.org/draft/#sec-Field-Arguments), for example, the `length` field below:

```nextra-code
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

All arguments are named. Unlike languages such as JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case, the `length` field has one defined argument called `unit`.

Arguments can be either required or optional. When an argument is optional, we can define a _default value_. If the `unit` argument is not passed, then it will be set to `METER` by default.

### The Query, Mutation, and Subscription types[](#the-query-mutation-and-subscription-types)

Every GraphQL schema must support `query` operations. The _entry point_ for this [root operation type](https://spec.graphql.org/draft/#sec-Root-Operation-Types) is a regular Object type called `Query` by default. So if you see a query that looks like this:

Operation

Response

That means that the GraphQL service needs to have a `Query` type with a `droid` field:

```nextra-code
type Query {
  droid(id: ID!): Droid
}
```

Schemas may also support `mutation` and `subscription` operations by adding additional `Mutation` and `Subscription` types and then defining fields on the corresponding root operation types.

It’s important to remember that other than the special status of being entry points into the schema, the `Query`, `Mutation`, and `Subscription` types are the same as any other GraphQL Object type, and their fields work exactly the same way.

You can name your root operation types differently too; if you choose to do so then you will need to inform GraphQL of the new names using the `schema` keyword:

```nextra-code
schema {
  query: MyQueryType
  mutation: MyMutationType
  subscription: MySubscriptionType
}
```

## Scalar types[](#scalar-types)

A GraphQL Object type has a name and fields, but at some point, those fields must resolve to some concrete data. That’s where the [Scalar types](https://spec.graphql.org/draft/#sec-Scalars) come in: they represent the leaf values of the query.

In the following query, the `name` and `appearsIn` fields will resolve to Scalar types:

Operation

Response

We know this because those fields don’t have any sub-fields—they are the leaves of the query.

GraphQL comes with a set of [default Scalar types](https://spec.graphql.org/draft/#sec-Scalars.Built-in-Scalars) out of the box:

*   `Int`: A signed 32‐bit integer.
*   `Float`: A signed double-precision floating-point value.
*   `String`: A UTF‐8 character sequence.
*   `Boolean`: `true` or `false`.
*   `ID`: A unique identifier, often used to refetch an object or as the key for a cache. The `ID` type is serialized in the same way as a `String`; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to specify custom Scalar types. For example, we could define a `Date` type:

```nextra-code
scalar Date
```

Then it’s up to our implementation to define how that type should be serialized, deserialized, and validated. For example, you could specify that the `Date` type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.

## Enum types[](#enum-types)

[Enum types](https://spec.graphql.org/draft/#sec-Enums), also known as enumeration types, are a special kind of scalar that is restricted to a particular set of allowed values. This allows you to:

1.  Validate that any arguments of this type are one of the allowed values
2.  Communicate through the type system that a field will always be one of a finite set of values

Here’s what an Enum type definition looks like in SDL:

```nextra-code
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

This means that wherever we use the type `Episode` in our schema, we expect it to be exactly one of `NEWHOPE`, `EMPIRE`, or `JEDI`.

GraphQL service implementations in various languages will have a language-specific way of dealing with Enum types. In languages that support enums as a first-class citizen, the implementation might take advantage of that; in a language like JavaScript with no enum support, these values might be internally mapped to a set of integers. However, these details don’t leak out to the client, which can operate entirely in terms of the string names of the Enum type’s values.

## Type modifiers[](#type-modifiers)

Types are assumed to be nullable and singular by default in GraphQL. However, when you use these named types in a schema (or in [query variable declarations](/learn/queries/#variables)) you can apply additional _type modifiers_ that will affect the meaning of those values.

As we saw with the Object type example above, GraphQL supports two type modifiers—the [List](https://spec.graphql.org/draft/#sec-List) and [Non-Null](https://spec.graphql.org/draft/#sec-Non-Null) types—and they can be used individually or in combination with each other.

### Non-Null[](#non-null)

Let’s look at an example:

```nextra-code
type Character {
  name: String!
}
```

Here, we’re using a `String` type and marking it as a Non-Null type by adding an exclamation mark (`!`) after the type name. This means that our server always expects to return a non-null value for this field, and if the resolver produces a null value, then that will trigger a GraphQL execution error, letting the client know that something has gone wrong.

As we saw in an example above, the Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument:

Operation

Response

### List[](#list)

Lists work in a similar way. We can use a type modifier to mark a type as a List type, which indicates that this field will return an array of that type. In SDL, this is denoted by wrapping the type in square brackets, `[` and `]`. It works the same for arguments, where the validation step will expect an array for that value. Here’s an example:

```nextra-code
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

As we see above, the Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null `String` types:

```nextra-code
myField: [String!]
```

This means that the _list itself_ can be null, but it can’t have any null members. For example, in JSON:

```nextra-code
myField: null // valid
myField: [] // valid
myField: ["a", "b"] // valid
myField: ["a", null, "b"] // error
```

Now, let’s say we defined a Non-Null List of `String` types:

```nextra-code
myField: [String]!
```

This means that the list itself cannot be null, but it can contain null values:

```nextra-code
myField: null // error
myField: [] // valid
myField: ["a", "b"] // valid
myField: ["a", null, "b"] // valid
```

Lastly, you can also have a Non-Null List of Non-Null `String` types:

```nextra-code
myField: [String!]!
```

This means that the list cannot be null and it cannot contain null values:

```nextra-code
myField: null // error
myField: [] // valid
myField: ["a", "b"] // valid
myField: ["a", null, "b"] // error
```

You can arbitrarily nest any number of Non-Null and List modifiers, according to your needs.

In GraphQL, there is no way to define a type so that the field’s data will only be considered valid if a non-empty list is provided. In other words, `[]` would still be a valid response for a Non-Null List of a Non-Null type.

## Interface types[](#interface-types)

Like many type systems, GraphQL supports _abstract types_. The first of these types that we’ll explore is an [Interface type](https://spec.graphql.org/draft/#sec-Interfaces), which defines a certain set of fields that a concrete Object type or other Interface type must also include to implement it.

For example, you could have a `Character` Interface type that represents any character in the Star Wars trilogy:

```nextra-code
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

This means that any type that _implements_ `Character` needs to have these exact fields as well as the same arguments and return types.

For example, here are some types that might implement `Character`:

```nextra-code
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
 
type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

You can see that both of these types have all of the fields from the `Character` Interface type, but also bring in extra fields—`totalCredits`, `starships` and `primaryFunction`—that are specific to that particular type of character.

Interface types are useful when you want to return an object or set of objects, but those might be of several different types. For example, note that the following query produces an error:

Operation

Response

The `hero` field returns the type `Character`, which means it might be either a `Human` or a `Droid` depending on the `episode` argument. In the query above, you can only ask for fields that exist on the `Character` Interface type, which doesn’t include `primaryFunction`.

To ask for a field on a specific Object type, you need to use an [inline fragment](/learn/queries/#inline-fragments):

Operation

Response

Interface types may also implement other Interface types:

```nextra-code
interface Node {
  id: ID!
}
 
interface Character implements Node {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

Note that Interface types may not implement themselves or contain any cyclic references to each other.

While types may share common fields in a GraphQL API, that may not always warrant the use of an Interface type to enforce that those fields remain consistently named. Interface types are a powerful way to indicate shared behavior across the types that implement them. When used, they should be semantically meaningful to client developers, just like `Character` is a useful abstraction for humans and droids.

## Union types[](#union-types)

GraphQL supports a second abstract type called a [Union type](https://spec.graphql.org/draft/#sec-Unions). Union types share similarities with Interface types, but they cannot define any shared fields among the constituent types.

A Union type is defined by indicating its member Object types:

```nextra-code
union SearchResult = Human | Droid | Starship
```

Wherever we return a `SearchResult` type in our schema, we might get a `Human`, a `Droid`, or a `Starship`. Note that members of a Union type need to be concrete Object types; you can’t define one using Interface types or other Union types as members.

In this case, if you query a field that returns the `SearchResult` Union type, you need to use an [inline fragment](/learn/queries/#inline-fragments) to be able to query any fields that are defined on the member Object types:

Operation

Response

The `__typename` field is a special _meta-field_ that automatically exists on every Object type and resolves to the name of that type, providing a way to differentiate between data types on the client.

Also, in this case, since `Human` and `Droid` share a common interface (`Character`), you can query their common fields in one place and still get the same result:

Operation

Response

Note that `name` is still specified on `Starship` because otherwise it wouldn’t show up in the results given that `Starship` is not a `Character`!

## Input Object types[](#input-object-types)

Most of the examples we’ve covered on this page demonstrate how Object, Scalar, Enum, Interface, and Union types may be used as _output types_ for the fields in a schema. But we have also seen that field arguments must specify their _input types_.

So far, we’ve only talked about using scalar values (like Enums or String types) as an input type for a field argument. However, you can also pass complex objects as arguments using an [Input Object type](https://spec.graphql.org/draft/#sec-Input-Objects), which is the last kind of named types in GraphQL that we’ll explore.

This is particularly valuable in the case of [mutations](/learn/mutations/), where you might want to pass in a whole object to be created. In SDL, Input Object types look similar to regular Object types, but with the keyword `input` instead of `type`:

```nextra-code
input ReviewInput {
  stars: Int!
  commentary: String
}
 
type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}
```

Here is how you could use the Input Object type in a mutation:

Operation

Response

The fields on an Input Object type can refer to other Input Object types, but you can’t mix input and output types in your schema. Input Object types also can’t have arguments on their fields.

## Directives[](#directives)

In certain instances where field arguments are insufficient or certain common behaviors must be replicated in multiple locations, [directives](https://spec.graphql.org/draft/#sec-Type-System.Directives) allow us to modify parts of a GraphQL schema or operation by using an `@` character followed by the directive’s name.

_Type system directives_ allow us to annotate the types, fields, and arguments in a schema so that they may be validated or executed differently.

Directives may also be defined for use in GraphQL operations as _executable directives_. [Read more about executable directives on the Queries page.](/learn/queries/#directives)

The GraphQL specification defines several [built-in directives](https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives). For example, for implementations that support SDL, the `@deprecated` directive will be available to annotate deprecated parts of the schema:

```nextra-code
type User {
  fullName: String
  name: String @deprecated(reason: "Use `fullName`.")
}
```

While you won’t need to define the `@deprecated` directive in your schema explicitly if you’re using a GraphQL implementation that supports SDL, it’s underlying definition would look like this:

```nextra-code
directive @deprecated(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE
```

Note that, just like fields, directives can accept arguments and those arguments can have default values. The `@deprecated` directive has a nullable `reason` argument that accepts a `String` as an input type and falls back to `"No longer supported"`. And with directives, we must specify where they may be used, such as on a `FIELD_DEFINITION` or `ENUM_VALUE` for the `@deprecated` directive.

In addition to GraphQL’s built-in directives, you may define your own _custom directives_. As with custom Scalar types, it’s up to your chosen GraphQL implementation to determine how to handle custom directives during query execution.

## Documentation[](#documentation)

### Descriptions[](#descriptions)

GraphQL allows you to add documentation to the types, fields, and arguments in a schema. In fact, the GraphQL specification encourages you to do this in all cases unless the name of the type, field, or argument is self-descriptive. Schema descriptions are defined using Markdown syntax and can be multiline or single line.

In SDL, they would look like this:

```nextra-code
"""
A character from the Star Wars universe
"""
type Character {
  "The name of the character."
  name: String!
}
 
"""
The episodes in the Star Wars trilogy
"""
enum Episode {
  "Star Wars Episode IV: A New Hope, released in 1977." 
  NEWHOPE
  "Star Wars Episode V: The Empire Strikes Back, released in 1980."
  EMPIRE
  "Star Wars Episode VI: Return of the Jedi, released in 1983."
  JEDI
}
 
"""
The query type, represents all of the entry points into our object graph
"""
type Query {
  """
  Fetches the hero of a specified Star Wars film.
  """
  hero(
    "The name of the film that the hero appears in."
    episode: Episode
  ): Character
}
```

In addition to making a GraphQL API schema more expressive, descriptions are helpful to client developers because they are available in [introspection queries](/learn/introspection/) and visible in developer tools such as [GraphiQL](https://github.com/graphql/graphiql).

### Comments[](#comments)

Occasionally, you may need to add comments in a schema that do not describe types, fields, or arguments, and are not meant to be seen by clients. In those cases, you can add a single-line comment to SDL by preceding the text with a `#` character:

```nextra-code
# This line is treated like whitespace and ignored by GraphQL
type Character {
  name: String!
}
```

Comments may also be added to client queries:

Operation

Response

## Next steps[](#next-steps)

To recap what we’ve learned about schemas and types:

*   Depending on what library is selected to build a GraphQL service, we can define a schema in a language-agnostic way using SDL or by compiling the schema from the code that provides data for its fields
*   There are six kinds of named type definitions in GraphQL: Object, Scalar, Enum, Interface, Union, and Input Object types
*   Object types contain fields that specify output types, and those fields may have arguments that specify input types
*   The `Int`, `Float`, `String`, `Boolean`, and `ID` Scalar types are built into GraphQL, and you can also define your own custom scalars
*   Like Scalar types, Enum types represent leaf values in a GraphQL schema but they are limited to a finite set of values
*   The List (`[]`) and Non-Null (`!`) type modifiers allow you to change the default behavior for a field’s output type or argument’s input type
*   Interface and Union types are abstract types that allow different concrete Object types to be output from a single field
*   Input Object types allow you to pass more complex values into a field argument or directive argument than Scalar and Enum types allow
*   Type system directives can be applied to the types, fields, and arguments in a schema to alter how they are validated and executed during a query
*   GraphQL supports schema documentation using type, field, and argument descriptions, and it also supports comments that are ignored by the parser

Now that you understand the key features of the type system, you’re ready to learn more about how to [query data from a GraphQL API](/learn/queries/).

[Introduction](/learn/ "Introduction")[Queries](/learn/queries/ "Queries")