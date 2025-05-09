[](https://neo4j.com/docs)

*   [Cypher Manual](../../introduction/)
*   [Values and types](../)
*   [Spatial values](./)

[Raise an issue](https://github.com/neo4j/docs-cypher/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/values-and-types/spatial.adoc%20\(ref:%205.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Spatial values

Cypher® has built-in support for handling spatial values (`POINT` values), which can be stored as properties on nodes and relationships in Neo4j databases.

This section begins with an explanation of the `POINT` type. It then proceeds to discuss Cypher’s support of Coordinate Reference Systems, and how to work with spatial instants in Cypher, including how spatial point instants work with Cypher indexing. Finally, it briefly explains comparability and orderability with regard to spatial instants.

For more information about spatial functions, allowing for the creation and manipulation of spatial values, see the section on [Spatial functions](../../functions/spatial/).

For more information about the comparison and ordering of spatial values, see the section on [Ordering spatial and temporal values](../ordering-equality-comparison/#ordering-spatial-temporal).

## [](#spatial-values-point-type)The POINT type

Neo4j supports the `POINT` type for values of spatial geometry.

Values with the `POINT` type have the following characteristics:

*   Each point can have either 2 or 3 dimensions. This means it contains either 2 or 3 64-bit `FLOAT` values, which together are called the _Coordinate_.
    
*   Each point will also be associated with a specific [Coordinate Reference System](#spatial-values-crs) (CRS) that determines the meaning of the values in the _Coordinate_.
    
*   Instances of `POINT` and `LIST` can be assigned to node and relationship properties.
    
*   Nodes and relationships with `POINT` or `LIST` properties can be indexed using a [point index](../../indexes/search-performance-indexes/managing-indexes/#indexes-create-a-node-point-index). This is true for all CRSs (and for both 2D and 3D).
    
*   The [distance function](../../functions/spatial/#functions-distance) will work on points in all CRS and in both 2D and 3D, but only if the two points have the same CRS (and therefore also same dimension).
    

## [](#spatial-values-crs)Coordinate Reference Systems

Four Coordinate Reference Systems (CRS) are supported, each of which falls within one of two types: _geographic coordinates_, modeling points on the earth, or _Cartesian coordinates_, modeling points in euclidean space:

Data within different coordinate systems are entirely incomparable, and cannot be implicitly converted from one to the other. This is true even if they are both Cartesian or both geographic but of a different dimension. For example, if you search for 3D points using a 2D range, you will get no results. However, they can be ordered, as discussed in more detail in the section about [Ordering spatial and temporal values](../ordering-equality-comparison/#ordering-spatial-temporal).

### [](#spatial-values-crs-geographic)Geographic coordinate reference systems

Two Geographic Coordinate Reference Systems (CRS) are supported, modeling points on the earth:

*   [WGS 84 2D](https://spatialreference.org/ref/epsg/4326/)
    
    *   A 2D geographic point in the _WGS 84_ CRS is specified in one of two ways:
        
        *   `longitude` and `latitude` (if these are specified, and the `crs` is not, then the `crs` is assumed to be `WGS-84`).
            
        *   `x` and `y` (in this case the `crs` must be specified, or will be assumed to be Cartesian).
            
        
    *   Specifying this CRS can be done using either the name 'wgs-84' or the SRID 4326 as described in [point() - WGS 84 2D](../../functions/spatial/#functions-point-wgs84-2d).
        
    
*   [WGS 84 3D](https://spatialreference.org/ref/epsg/4979/)
    
    *   A 3D geographic point in the _WGS 84_ CRS is specified one of in two ways:
        
        *   `longitude`, `latitude` and either `height` or `z` (if these are specified, and the `crs` is not, then the `crs` is assumed to be `WGS-84-3D`).
            
        *   `x`, `y` and `z` (in this case the `crs` must be specified, or will be assumed to be Cartesian-3D).
            
        
    *   Specifying this CRS can be done using either the name 'wgs-84-3d' or the SRID 4979 as described in [point() - WGS 84 3D](../../functions/spatial/#functions-point-wgs84-3d).
        
    

### [](#spatial-values-converting-coordinates)Converting coordinate units

The units of the `latitude` and `longitude` fields are in decimal degrees, and need to be specified as floating point numbers using Cypher literals. It is not possible to use any other format, such as 'degrees, minutes, seconds'. The units of the `height` field are in meters. When geographic points are passed to the [distance function](../../functions/spatial/#functions-distance), the result will always be in meters. If the coordinates are in any other format or unit than those supported, it is necessary to explicitly convert them.

For example, if the incoming `$height` is a `STRING` field in kilometers, it would be necessary to add `height: toFloat($height) * 1000` to the query. Likewise if the results of the `distance` function are expected to be returned in kilometers, an explicit conversion is required. The below query is an example of this conversion:

Query

```cypher hljs
WITH
  point({latitude: toFloat('13.43'), longitude: toFloat('56.21')}) AS p1,
  point({latitude: toFloat('13.10'), longitude: toFloat('56.41')}) AS p2
RETURN toInteger(point.distance(p1, p2)/1000) AS km
```

Table 1. Result 

km

`42`

Rows: 1

### [](#spatial-values-crs-cartesian)Cartesian coordinate reference systems

Two Cartesian Coordinate Reference Systems (CRS) are supported, modeling points in euclidean space:

*   **Cartesian 2D**
    
    *   A 2D point in the _Cartesian_ CRS is specified with a map containing `x` and `y` coordinate values
        
    *   Specifying this CRS can be done using either the name 'cartesian' or the SRID 7203 as described in [point() - Cartesian 2D](../../functions/spatial/#functions-point-cartesian-2d)
        
    
*   **Cartesian 3D**
    
    *   A 3D point in the _Cartesian_ CRS is specified with a map containing `x`, `y` and `z` coordinate values
        
    *   Specifying this CRS can be done using either the name 'cartesian-3d' or the SRID 9157 as described in [point() - Cartesian 3D)](../../functions/spatial/#functions-point-cartesian-3d)
        
    

The units of the `x`, `y`, and `z` fields are unspecified. This means that when two Cartesian points are passed to the `distance` function, the resulting value will be in the same units as the original coordinates. This is true for both 2D and 3D points, as the _Pythagoras_ equation used is generalized to any number of dimensions. However, just as you cannot compare geographic points to Cartesian points, you cannot calculate the distance between a 2D point and a 3D point. If you need to do that, explicitly transform the one type into the other. For example:

Query

```cypher hljs
WITH
  point({x: 3, y: 0}) AS p2d,
  point({x: 0, y: 4, z: 1}) AS p3d
RETURN
  point.distance(p2d, p3d) AS bad,
  point.distance(p2d, point({x: p3d.x, y: p3d.y})) AS good
```

Table 2. Result  

bad

good

``

`5.0`

Rows: 1

## [](#spatial-values-spatial-instants)Spatial instants

All `POINT` types are created from two components:

*   The _Coordinate_ containing either 2 or 3 `FLOAT` values (64-bit).
    
*   The Coordinate Reference System (or CRS) defining the meaning (and possibly units) of the values in the _Coordinate_.
    

For most use cases, it is not necessary to specify the CRS explicitly as it will be deduced from the keys used to specify the coordinate. Two rules are applied to deduce the CRS from the coordinate:

*   Choice of keys:
    
    *   If the coordinate is specified using the keys `latitude` and `longitude` the CRS will be assumed to be _Geographic_ and therefor either `WGS-84` or `WGS-84-3D`.
        
    *   If instead `x` and `y` are used, then the default CRS would be `Cartesian` or `Cartesian-3D`.
        
    
*   Number of dimensions:
    
    *   If there are 2 dimensions in the coordinate, `x` & `y` or `longitude` & `latitude` the CRS will be a 2D CRS.
        
    *   If there is a third dimensions in the coordinate, `z` or `height` the CRS will be a 3D CRS.
        
    

All fields are provided to the `point` function in the form of a map of explicitly named arguments. Neo4j does not support an ordered list of coordinate fields because of the contradictory conventions between geographic and cartesian coordinates, where geographic coordinates normally list `y` before `x` (`latitude` before `longitude`).

The following query which returns points created in each of the four supported CRSs. Take particular note of the order and keys of the coordinates in the original `point` function, and how those values are displayed in the results:

Query

```cypher hljs
RETURN
  point({x: 3, y: 0}) AS cartesian_2d,
  point({x: 0, y: 4, z: 1}) AS cartesian_3d,
  point({latitude: 12, longitude: 56}) AS geo_2d,
  point({latitude: 12, longitude: 56, height: 1000}) AS geo_3d
```

Table 3. Result    

cartesian\_2d

cartesian\_3d

geo\_2d

geo\_3d

`point({srid:7203, x: 3.0, y: 0.0})`

`point({srid:9157, x: 0.0, y: 4.0, z: 1.0})`

`point({srid:4326, x: 56.0, y: 12.0})`

`point({rid:4979, x: 56.0, y: 12.0, z: 1000.0})`

Rows: 1

For the geographic coordinates, it is important to note that the `latitude` value should always lie in the interval `[-90, 90]`. Any other value outside this range will throw an exception. The `longitude` value should always lie in the interval `[-180, 180]`. Any other value outside this range will be wrapped around to fit in this range. The `height` value and any Cartesian coordinates are not explicitly restricted. Any value within the allowed range of the signed 64-bit floating point type will be accepted.

### [](#spatial-values-spatial-instants-accessing-components)Components of points

Components of `POINT` values can be accessed as properties.

Table 4. Components of `POINT` instances and where they are supported        

Component

Description

Type

Range/Format

WGS-84

WGS-84-3D

Cartesian

Cartesian-3D

`instant.x`

The first element of the _Coordinate_

`FLOAT`

Number literal, range depends on CRS

`instant.y`

The second element of the _Coordinate_

`FLOAT`

Number literal, range depends on CRS

`instant.z`

The third element of the _Coordinate_

`FLOAT`

Number literal, range depends on CRS

`instant.longitude`

The _first_ element of the _Coordinate_ for geographic CRSs, degrees East of the prime meridian

`FLOAT`

Number literal, `-180.0` to `180.0`

`instant.latitude`

The _second_ element of the _Coordinate_ for geographic CRS, degrees North of the equator

`FLOAT`

Number literal, `-90.0` to `90.0`

`instant.height`

The third element of the _Coordinate_ for geographic CRSs, meters above the ellipsoid defined by the datum (WGS-84)

`FLOAT`

Number literal, range limited only by the underlying 64-bit floating point type

`instant.crs`

The name of the CRS

`STRING`

One of `wgs-84`, `wgs-84-3d`, `cartesian`, `cartesian-3d`

`instant.srid`

The internal Neo4j ID for the CRS

`INTEGER`

One of `4326`, `4979`, `7203`, `9157`

### [](#_examples)Examples

The following query shows how to extract the components of a _Cartesian 2D_ `POINT` value:

Query

```cypher hljs
WITH point({x: 3, y: 4}) AS p
RETURN
  p.x AS x,
  p.y AS y,
  p.crs AS crs,
  p.srid AS srid
```

Table 5. Result    

x

y

crs

srid

`3.0`

`4.0`

`"cartesian"`

`7203`

Rows: 1

The following query shows how to extract the components of a _WGS-84 3D_ `POINT` value:

Query

```cypher hljs
WITH point({latitude: 3, longitude: 4, height: 4321}) AS p
RETURN
  p.latitude AS latitude,
  p.longitude AS longitude,
  p.height AS height,
  p.x AS x,
  p.y AS y,
  p.z AS z,
  p.crs AS crs,
  p.srid AS srid
```

Table 6. Result        

latitude

longitude

height

x

y

z

crs

srid

`3.0`

`4.0`

`4321.0`

`4.0`

`3.0`

`4321.0`

`"wgs-84-3d"`

`4979`

Rows: 1

## [](#spatial-values-point-index)Spatial values and indexes

If there is a range or point index on a particular node or relationship property, and a spatial point is assigned to that property on a node or relationship, the node or relationship will be indexed.

In a point index, Neo4j uses space filling curves in 2D or 3D over an underlying generalized B+Tree. Point indexes are optimized for distance and bounding box queries. For more information, see [Managing indexes → Point indexes](../../indexes/search-performance-indexes/managing-indexes/#create-point-index).

In a range index, the points will be sorted according to their lexicographic ordering per coordinate reference system. For point values, this index has support for equality checks. For more information, see [Managing indexes → Range indexes](../../indexes/search-performance-indexes/managing-indexes/#create-range-index).

## [](#spatial-values-comparability-orderability)Comparability and orderability

Cypher does not support comparing spatial values using the inequality operators, ``, and `>=`. Attempting to do so will return `null`.

To compare spatial points within a specific range, instead use the spatial functions [point.distance](../../functions/spatial/#functions-distance) or [point.withinBBox](../../functions/spatial/#functions-withinBBox).

[Temporal values](../temporal/) [Lists](../lists/)

[![](/docs/assets/img/nodes-25.png)

## Nov 6 2025

The Call for Papers is now open and we want to hear about your graph-related projects. Submit your talks by June 15

Submit your talk

](https://neo4j.com/nodes-2025/)