[](https://neo4j.com/docs)

*   [Getting Started](../)
*   [Model data](./)

[Raise an issue](https://github.com/neo4j/docs-getting-started/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/data-modeling/index.adoc%20\(ref:%20main\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# What is graph data modeling?

Data modeling is a practice that defines the logic of queries and the structure of the data in storage. A well-designed model is the key to leveraging the strengths of a graph database as it improves query performance, supports flexible queries, and optimizes storage.

## [](#_how_to_create_a_graph_data_model)How to create a graph data model

To organize data into a [data model](#data-model), the first thing to do is to think about what questions you want to answer.

For example, assume that you work for a retail company and want to learn what products customers are buying. To answer that, you need to:

*   Have data on the products sold and the customers who bought them. This process is known as "entity extraction".
    
*   Understand how these entities relate to each other.
    
*   Think about what other details that need to be provided, i.e. what properties should be added to these entities (e.g. customer name).
    
*   Optionally, visualize the model before you create it using [no-code data modeling tools](data-modeling-tools/).
    
*   If satisfied, you can start writing the data into an database.
    

In this fictional scenario, you can start by adding this information to the graph:

```cypher hljs
CREATE (c:Customer {name: "John"})
CREATE (p:Product {name: “Camera”})
CREATE (c)-[:BUYS]->(p)
```

Then, you can test this model with a query (e.g. what did John buy):

```cypher hljs
MATCH (c:Customer {name: "John"})-[b:BUYS]->(p)
RETURN p
```

Keep in mind that graph data modeling is an iterative process. Your initial graph data model is only a starting point. As you learn more about your use cases or if they change, the model needs to adapt.

Additionally, you may find that, especially when the graph scales, you need to [refactor](graph-model-refactoring/) your model to ensure it is aligned with your business needs as they evolve.

In summary, the process of creating a data model includes the following:

1.  Understand the domain and define specific use cases (questions) for the application.
    
2.  Develop an initial graph data model by extracting entities and decide how they relate to each other.
    
3.  Test the use cases against the initial data model.
    
4.  Create the graph with test data using Cypher®.
    
5.  Test the use cases, including performance against the graph.
    
6.  Refactor the graph data model due to changes in the key use cases or for performance reasons.
    

## [](#_keep_learning)Keep learning

For a more hands-on approach to data modeling, try the following resources:

*   [GraphAcademy: Data Modeling Fundamentals](https://graphacademy.neo4j.com/courses/modeling-fundamentals/?ref=docs): enroll to an interactive course.
    
*   [From relational to graph](relational-to-graph-modeling/): learn how to adapt data from a relational to a graph data model.
    
*   [Data modeling tools](data-modeling-tools/): see a list of tools you can use to create your data model.
    
*   [Data modeling tips](modeling-tips/): check tips on how to improve your data modeling skills.
    
*   [Modeling designs](modeling-designs/): see examples of data modeling designs that can be used as strategy for your project.
    
*   [Neo4j GraphGists](https://neo4j.com/graphgists/): find examples of graph data modeling shared by the Neo4j community.
    

## Glossary

label

Marks a node as a member of a named and indexed subset. A node may be assigned zero or more labels.

labels

A label marks a node as a member of a named and indexed subset. A node may be assigned zero or more labels.

node

A node represents an entity or discrete object in your graph data model. Nodes can be connected by relationships, hold data in properties, and are classified by labels.

nodes

A node represents an entity or discrete object in your graph data model. Nodes can be connected by relationships, hold data in properties, and are classified by labels.

relationship

A relationship represents a connection between nodes in your graph data model. Relationships connect a source node to a target node, hold data in properties, and are classified by type.

relationships

A relationship represents a connection between nodes in your graph data model. Relationships connect a source node to a target node, hold data in properties, and are classified by type.

property

Properties are key-value pairs that are used for storing data on nodes and relationships.

properties

Properties are key-value pairs that are used for storing data on nodes and relationships.

cluster

A Neo4j DBMS that spans multiple servers working together to increase fault tolerance and/or read scalability. Databases on a cluster may be configured to replicate across servers in the cluster thus achieving read scalability or high availability.

clusters

A Neo4j DBMS that spans multiple servers working together to increase fault tolerance and/or read scalability. Databases on a cluster may be configured to replicate across servers in the cluster thus achieving read scalability or high availability.

graph

A logical representation of a set of nodes where some pairs are connected by relationships.

graphs

A logical representation of a set of nodes where some pairs are connected by relationships.

schema

The prescribed property existence and datatypes for nodes and relationships.

schemas

The prescribed property existence and datatypes for nodes and relationships.

\[\[database schema\]\]database schema

The prescribed property existence and datatypes for nodes and relationships.

indexes

Data structure that improves read performance of a database. [Read more about supported categories of indexes](https://neo4j.com/docs/cypher-manual/current/indexes/).

indexed

Data structure that improves read performance of a database. [Read more about supported categories of indexes](https://neo4j.com/docs/cypher-manual/current/indexes/).

constraints

Constraints are sets of data modeling rules that ensure the data is consistent and reliable. [See what constraints are available in Cypher](https://neo4j.com/docs/cypher-manual/current/constraints/).

data model

A data model defines how information is organized in a database. A good data model will make querying and understanding your data easier. In Neo4j, the data models have a graph structure.

data models

A data model defines how information is organized in a database. A good data model will make querying and understanding your data easier. In Neo4j, the data models have a graph structure.

[Cypher resources](../cypher-intro/resources/) [Create a data model](tutorial-data-modeling/)

[![](/docs/assets/img/nodes-25.png)

## Nov 6 2025

The Call for Papers is now open and we want to hear about your graph-related projects. Submit your talks by June 15

Submit your talk

](https://neo4j.com/nodes-2025/)