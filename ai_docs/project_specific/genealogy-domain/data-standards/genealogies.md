*   Getting Started
*   [Getting Started](https://www.familysearch.org/en/developers/docs/guides/getting-started)
*   [App Approval Considerations](https://www.familysearch.org/en/developers/docs/guides/app-approval)
*   [Authentication](https://www.familysearch.org/en/developers/docs/guides/authentication)
*   [OAuth 2.0 for Native Apps](https://www.familysearch.org/en/developers/docs/guides/oauth2-native-apps)
*   API
*   [API Evolution](https://www.familysearch.org/en/developers/docs/guides/evolution)
*   [Caching](https://www.familysearch.org/en/developers/docs/guides/caching)
*   [Collections](https://www.familysearch.org/en/developers/docs/guides/collections)
*   [HTTP](https://www.familysearch.org/en/developers/docs/guides/http)
*   [HTTP Status Codes](https://www.familysearch.org/en/developers/docs/guides/http-status-codes)
*   [Hypermedia](https://www.familysearch.org/en/developers/docs/guides/hypermedia)
*   [Internationalization](https://www.familysearch.org/en/developers/docs/guides/internationalization)
*   [Linking](https://www.familysearch.org/en/developers/docs/guides/linking)
*   [Persistent Identifiers](https://www.familysearch.org/en/developers/docs/guides/persistent-identifiers)
*   [Synchronization](https://www.familysearch.org/en/developers/docs/guides/synchronization)
*   [Throttling](https://www.familysearch.org/en/developers/docs/guides/throttling)
*   Family Tree
*   [Change History](https://www.familysearch.org/en/developers/docs/guides/change-history)
*   [Collaboration](https://www.familysearch.org/en/developers/docs/guides/scoe-model)
*   [Data Model](https://www.familysearch.org/en/developers/docs/guides/FamilyTree-data-objects)
*   [Dates](https://www.familysearch.org/en/developers/docs/guides/dates)
*   [Facts](https://www.familysearch.org/en/developers/docs/guides/facts)
*   [Family Tree Search](https://www.familysearch.org/en/developers/docs/guides/familytree-search)
*   [Family Tree Match](https://www.familysearch.org/en/developers/docs/guides/familytree-match)
*   [Merging](https://www.familysearch.org/en/developers/docs/guides/merging)
*   [Names](https://www.familysearch.org/en/developers/docs/guides/names)
*   [Pedigree](https://www.familysearch.org/en/developers/docs/guides/pedigree)
*   [Persons](https://www.familysearch.org/en/developers/docs/guides/persons)
*   [Private Spaces](https://www.familysearch.org/en/developers/docs/guides/private-spaces)
*   [Search and Match](https://www.familysearch.org/en/developers/docs/guides/search)
*   [Sources](https://www.familysearch.org/en/developers/docs/guides/sources)
*   Other
*   [Authorities](https://www.familysearch.org/en/developers/docs/guides/authorities)
*   [Client Credentials Authentication](https://www.familysearch.org/en/developers/docs/guides/client-secret)
*   [GEDCOM](https://www.familysearch.org/en/developers/docs/guides/gedcom)
*   [GEDCOM X](https://www.familysearch.org/en/developers/docs/guides/gedcom-x)
*   [Genealogies](https://www.familysearch.org/en/developers/docs/guides/genealogies)
*   [Glossary](https://www.familysearch.org/en/developers/docs/guides/glossary)
*   [Memories](https://www.familysearch.org/en/developers/docs/guides/memories)
*   [Ordinances](https://www.familysearch.org/en/developers/docs/guides/ordinances)
*   [Places](https://www.familysearch.org/en/developers/docs/guides/places)
*   [Source Create Destination Page](https://www.familysearch.org/en/developers/docs/guides/createsource)
*   [User](https://www.familysearch.org/en/developers/docs/guides/users)
*   [Generic Relationships Update](https://www.familysearch.org/en/developers/docs/guides/generic-relationships-update)
*   [Generic Relationships Search Update](https://www.familysearch.org/en/developers/docs/guides/generic-relationships-search-update)

# FamilySearch Genealogies

**Prototype**: This resource is currently in a prototype development state. It may or may not be operational and the interface may change prior to release. Feedback is welcome.

The FamilySearch Genealogies API provides a database that stores non-collaborative, user-submitted genealogies. The data submitted to FamilySearch Genealogies is separate from the data in FamilySearch Family Tree. With the exception of living persons, genealogies data will be publicly visible and searchable, and can be matched against the FamilySearch Historical Records. The Genealogies data is not subject to the same constraints and certification restrictions as is data that is submitted to the FamilySearch Family Tree.

The Genealogies API is provided with the intent that the data in the FamilySearch Genealogies database will inform the collaborative research of the Family Tree and contribute to its accuracy and quality.

Like the Family Tree API, the Genealogies API conforms to the [GEDCOM X specification set](gedcom-x), but the data validation rules are generally less restrictive than are the rules of the Family Tree. For example, the Genealogies API supports more fact types and can support multiple values for facts like birth, death, burial, etc. Clients that conform to the GEDCOM X specification set can be used to access both the Family Tree API and the Genealogies API.

The FamilySearch Genealogies database is separated into multiple "trees" that can contain persons. A user can create a tree and add/update/remove persons from the tree. Relationships can be created between two persons in a tree, but are not read outside the context of the person.

For more information about the Genealogies API, refer to the [Genealogies section of the API documentation](https://familysearch.org/developers/docs/api/resources#genealogies).

# Syncing Data to Genealogies

In order to sync data to the Genealogies system, use the following process:

1.  Obtain access token for the user.
2.  Create a new Genealogies Tree.
3.  Add data to the Genealogies Tree.
4.  Update persons and relationships.
5.  Get the matches.

## Step 1: Obtain access token for the user

This is accomplished by sending the user through the OAuth 2 authentication and authorization process. More information can be [found here](https://www.familysearch.org/developers/docs/guides/authentication). To obtain a temporary access token for testing, you can go to the following pages:

*   [Integration Access Token](https://integration.familysearch.org/platform/)
*   [Beta Access Token](https://beta.familysearch.org/platform/)
*   [Production Access Token](https://api.familysearch.org/platform/)

## Step 2: Create a Genealogies Tree

A Tree in the Genealogies system is the container which will hold all of the tree persons and information regarding the user's tree. This is roughly equivalent to the user's file containing tree information for a desktop genealogy application. A user can create and access multiple trees, so it is important to keep a mapping to the ID of the tree created. Only the authenticated user that created the tree has access to edit or delete that tree.

To create the Tree, send a `POST` request to the [Genealogies Tree](https://www.familysearch.org/developers/docs/api/genealogies/Genealogies_Trees_resource) resource. The documentation provides an [example request](https://www.familysearch.org/developers/docs/api/genealogies/Create_Genealogies_Tree_usecase) for creating the tree.

### Example Requests - Create a Genealogies Tree

*   [Create Tree](https://documenter.getpostman.com/view/13174354/TVmFifAF#ddf7d30c-ff0e-4adb-9987-2a8ca4581f3c)

## Step 3: Add Data to the Genealogies Tree

There are a few different methods for adding information to the user's tree.

### Working with the Genealogies Data Model

The Genealogies system uses a GEDCOM X data model consisting of [Person](https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#person), [Relationship](https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#22-the-relationship-data-type), and [SourceDescription](https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#23-the-sourcedescription-data-type) records.

The relationship model is different from the GEDCOM 5.x model consisting of Person and Family records. Two relationship types are used by GEDCOM X, namely `http://gedcomx.org/ParentChild` and `http://gedcomx.org/Couple`. The `ParentChild` relationship is a directional relationship, meaning that `person1` represents the parent and `person2` represents the child. The `Couple` relationship is not a directional relationship, however standard convention suggests that `person1` is generally a male while `person2` is generally female. The order of `person1` and `person2` will be preserved. From these two relationship types, you represent the relationships implied in the Family record individually.

For more information, see the [GEDCOM X Conceptual Model](https://github.com/FamilySearch/gedcomx/blob/master/specifications/conceptual-model-specification.md#23-the-sourcedescription-data-type) documentation.

### Strategies for Adding Data

You can either add persons and relationships one at a time, or add multiple persons and relationships in in bulk.

#### Adding persons and relationships

To add one or more persons, send a `POST` request to the [Genealogies Tree](https://www.familysearch.org/developers/docs/api/genealogies/Genealogies_Tree_resource) resource. The `Genealogies Tree` resource will accept a payload containing up to 100 persons represented in a GEDCOM X document. ((TODO: HOW TO MAP IDS))

To add one or more relationships or sources, send a `POST` request to the [Genealogies Tree](https://www.familysearch.org/developers/docs/api/genealogies/Genealogies_Tree_resource) resource. It is advised to add all persons to the the tree prior to adding the relationships or sources, so that you have identifiers for all persons represented in the requests. --Relationship IDs are composed of the IDs of the persons involved in the relationships.-- Sources may be referenced by multiple Persons records, so it is best to create the source description after the persons IDs are known. ((TODO: DOCUMENT RELATIONSHIP IDS))

##### Example Requests - Adding persons and relationships

*   [Add Persons to Tree](https://documenter.getpostman.com/view/13174354/TVmFifAF#2a7a3123-a400-407b-9e41-1df7ba208bae)
*   [Read Tree Persons](https://documenter.getpostman.com/view/13174354/TVmFifAF#45671c50-dd7c-421c-aa73-388befbc24c7)
*   [Read Person](https://documenter.getpostman.com/view/13174354/TVmFifAF#232f0712-6e67-40c4-9ac9-a744652b2dfa)
*   [Add Relationship to Tree](https://documenter.getpostman.com/view/13174354/TVmFifAF#835a490d-9d90-4135-938b-8f2f5eb8ed7e)
*   [Add Fact to Relationship](https://documenter.getpostman.com/view/13174354/TVmFifAF#d7d7b501-6d4e-4c74-9466-09f7ae03fe08)
*   [Add Source to Tree](https://documenter.getpostman.com/view/13174354/TVmFifAF#8fbc0adb-cf4f-485c-af86-505c292b4f74)
*   [Read Source](https://documenter.getpostman.com/view/13174354/TVmFifAF#e9349f9c-2c0c-4cc3-85c2-d27899e56c2f)

### Step 4: Update Persons, Relationships, and Sources

As person data changes in your application, you will need to keep the user's data in sync with the tree found in the Genealogies system. The Genealogies API supports additions and deletions. If the same fact value is written twice, ((TODO: does it ignore the new one or update the timestamp?)). ((TODO: What happens to the old IDs when data is deleted with a dependency?))

TODO: Information on Relationship updates.

The strategy for keeping the data up to date depends upon the capabilities of your system.

#### Example Requests - Update Persons, Relationships, and Sources

*   [Update Person](.)
*   [Delete Person](.)
*   [Update Relationship](.)
*   [Delete Relationship](https://documenter.getpostman.com/view/13174354/TVmFifAF#da5cee83-97e1-4694-8904-9c2cc3af0c81)
*   [Update Relationship Fact](.)
*   [Delete Relationship Fact](https://documenter.getpostman.com/view/13174354/TVmFifAF#4ce1503f-9d1d-4fc2-bb20-a2dff8538987)
*   [Update Source Description](.)
*   [Delete Source Description](.)

#### Change Tracking Method

If your system is able to track individual changes in the form of a change log, then the process to keep the Genealogies Tree up to date is a matter of replaying the same changes on the remote tree.

*   If a new person with new relationships was added to the local tree, your application would add the new person with the new relationships to the remote tree.
*   If a new fact was added on the local tree, the new fact could be added to the person in the remote tree.
*   If a fact was changed on the local tree, the previous fact would be deleted and the new fact added.

#### Compare and Modify Method

If your system does not keep track of changes, then the best way to keep in sync is to compare your data with what is in the Genealogies system and to calculate the difference.

One approach for doing this would be to create a GEDCOM X representation of the person and to compare that GEDCOM X representation to the GEDCOM X person read from the Genealogies system. As you develop this method, it may be helpful to test your comparison algorithms by following these steps:

1.  Create a GEDCOM X document representing your local person. Let's call this `gx1`.
2.  `POST` this person to the Genealogies API. You will receive back the ID for this person.
3.  `GET` the person from the Genealogies API. Let's call this `gx1'`.
4.  Compare `gx1` to `gx1'`. Your comparison algorithm should indicate that they are the same.

### Step 5: Get Matches

The last step in this process is to get matches (or hints) from the Genealogies API. The match resource will support the ability to read matches for both Family Tree persons as well as historical records.

#### Example Requests - Get Matches

*   [Get Records Hints](https://documenter.getpostman.com/view/13174354/TVmFifAF#288b3869-4129-44ca-9abc-48b8b4913eb2)
*   [Get FamilyTree Hints](https://documenter.getpostman.com/view/13174354/TVmFifAF#ab6495a0-c913-43f6-a926-3e901763a25d)