[](https://neo4j.com/docs)

*   [Neo4j JavaScript Driver Manual](./)
*   [Quickstart](./)

[Raise an issue](https://github.com/neo4j/docs-drivers/issues/new/?title=Docs%20Feedback%20javascript-manual/modules/ROOT/pages/index.adoc%20\(ref:%205.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Build applications with Neo4j and JavaScript

The Neo4j JavaScript driver is the official library to interact with a Neo4j instance through a JavaScript application.

At the hearth of Neo4j lies [Cypher](#Cypher), the query language to interact with a Neo4j database. While this guide does not _require_ you to be a seasoned Cypher querier, it is going to be easier to focus on the JavaScript-specific bits if you already know some Cypher. For this reason, although this guide does _also_ provide a gentle introduction to Cypher along the way, consider checking out [Getting started → Cypher](https://neo4j.com/docs/getting-started/cypher/) for a more detailed walkthrough of graph databases modelling and querying if this is your first approach. You may then apply that knowledge while following this guide to develop your JavaScript application.

## [](#_installation)Installation

Install the Neo4j Javascript driver with `npm`:

```bash hljs
npm i neo4j-driver
```

[More info on installing the driver →](install/#install-driver)

## [](#_connect_to_the_database)Connect to the database

Connect to a database by creating a [Driver](#Driver) object and providing a URL and an authentication token. Once you have a `Driver` instance, use the `.getServerInfo()` method to ensure that a working connection can be established.

```javascript hljs
var neo4j = require('neo4j-driver');
(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = ''
  const USER = ''
  const PASSWORD = ''
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();
```

[More info on connecting to a database →](connect/)

## [](#_query_the_database)Query the database

Execute a Cypher statement with the method `Driver.executeQuery()`. Do not hardcode or concatenate parameters: use placeholders and specify the parameters as key-value pairs.

```javascript hljs
// Get the name of all 42 year-olds
const { records, summary, keys } = await driver.executeQuery(
  'MATCH (p:Person {age: $age}) RETURN p.name AS name',
  { age: 42 },
  { database: 'neo4j' }
)

// Summary information
console.log(
  `>> The query ${summary.query.text} ` +
  `returned ${records.length} records ` +
  `in ${summary.resultAvailableAfter} ms.`
)

// Loop through results and do something with them
console.log('>> Results')
for(record of records) {
  console.log(record.get('name'))
}
```

[More info on querying the database →](query-simple/)

## [](#_run_your_own_transactions)Run your own transactions

For more advanced use-cases, you can run [transactions](#transaction). Use the methods `Session.executeRead()` and `Session.executeWrite()` to run managed transactions.

A transaction with multiple queries, client logic, and potential roll backs

```javascript hljs
const neo4j = require('neo4j-driver');

(async () => {
  const URI = ''
  const USER = ''
  const PASSWORD = ''
  let driver, session
  let employeeThreshold = 10

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    await driver.verifyConnectivity()
  } catch(err) {
    console.log(`-- Connection error --\n${err}\n-- Cause --\n${err.cause}`)
    await driver.close()
    return
  }

  session = driver.session({ database: 'neo4j' })
  for(let i=0; i {
      let result, orgInfo

      // Create new Person node with given name, if not already existing
      await tx.run(`
        MERGE (p:Person {name: $name})
        RETURN p.name AS name
        `, { name: name }
      )

      // Obtain most recent organization ID and number of people linked to it
      result = await tx.run(`
        MATCH (o:Organization)
        RETURN o.id AS id, COUNT{(p:Person)-[r:WORKS_FOR]->(o)} AS employeesN
        ORDER BY o.createdDate DESC
        LIMIT 1
      `)
      if(result.records.length > 0) {
        orgInfo = result.records[0]
      }

      if(orgInfo != undefined && orgInfo['employeesN'] == 0) {
        throw new Error('Most recent organization is empty.')
        // Transaction will roll back -> not even Person is created!
      }

      // If org does not have too many employees, add this Person to that
      if(orgInfo != undefined && orgInfo['employeesN'] (o)
          RETURN $orgId AS id
          `, { orgId: orgInfo['id'], name: name }
        )

      // Otherwise, create a new Organization and link Person to it
      } else {
        result = await tx.run(`
          MATCH (p:Person {name: $name})
          CREATE (o:Organization {id: randomuuid(), createdDate: datetime()})
          MERGE (p)-[r:WORKS_FOR]->(o)
          RETURN o.id AS id
          `, { name: name }
        )
      }

      // Return the Organization ID to which the new Person ends up in
      return result.records[0].get('id')
    })
    console.log(`User ${name} added to organization ${orgId}`)
  }
  await session.close()
  await driver.close()
})()
```

[More info on running transactions →](transactions/)

## [](#_close_connections_and_sessions)Close connections and sessions

Call the `.close()` method on the `Driver` instance when you are finished with it, to release any resources still held by it. The same applies to any open sessions.

```javascript hljs
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
let session = driver.session({ database: 'neo4j' })

// session/driver usage

session.close()
driver.close()
```

## [](#_api_documentation)API documentation

For in-depth information about driver features, check out the [API documentation](https://neo4j.com/docs/api/javascript-driver/5.28/).

## Glossary

LTS

A _Long Term Support_ release is one guaranteed to be supported for a number of years. Neo4j 4.4 is LTS, and Neo4j 5 will also have an LTS version.

Aura

[Aura](https://neo4j.com/product/auradb/) is Neo4j’s fully managed cloud service. It comes with both free and paid plans.

Cypher

[Cypher](https://neo4j.com/docs/cypher-manual/current/introduction/cypher-overview/) is Neo4j’s graph query language that lets you retrieve data from the database. It is like SQL, but for graphs.

APOC

[Awesome Procedures On Cypher (APOC)](/docs/apoc/current/) is a library of (many) functions that can not be easily expressed in Cypher itself.

Bolt

[Bolt](/docs/bolt/current/) is the protocol used for interaction between Neo4j instances and drivers. It listens on port 7687 by default.

ACID

Atomicity, Consistency, Isolation, Durability (ACID) are properties guaranteeing that database transactions are processed reliably. An ACID-compliant DBMS ensures that the data in the database remains accurate and consistent despite failures.

eventual consistency

A database is eventually consistent if it provides the guarantee that all cluster members will, _at some point in time_, store the latest version of the data.

causal consistency

A database is causally consistent if read and write queries are seen by every member of the cluster in the same order. This is stronger than _eventual consistency_.

NULL

The null marker is not a type but a placeholder for absence of value. For more information, see [Cypher → Working with `null`](/docs/cypher-manual/current/values-and-types/working-with-null/).

transaction

A transaction is a unit of work that is either _committed_ in its entirety or _rolled back_ on failure. An example is a bank transfer: it involves multiple steps, but they must _all_ succeed or be reverted, to avoid money being subtracted from one account but not added to the other.

backpressure

Backpressure is a force opposing the flow of data. It ensures that the client is not being overwhelmed by data faster than it can handle.

transaction function

A transaction function is a callback executed by an `executeRead` or `executeWrite` call. The driver automatically re-executes the callback in case of server failure.

Driver

A [`Driver`](/docs/api/javascript-driver/5.28/class/lib6/driver.js~Driver.html) object holds the details required to establish connections with a Neo4j database.

[Installation](install/)