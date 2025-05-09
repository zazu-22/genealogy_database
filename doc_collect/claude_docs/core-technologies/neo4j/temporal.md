[](https://neo4j.com/docs)

*   [Cypher Manual](../../introduction/)
*   [Values and types](../)
*   [Temporal values](./)

[Raise an issue](https://github.com/neo4j/docs-cypher/issues/new/?title=Docs%20Feedback%20modules/ROOT/pages/values-and-types/temporal.adoc%20\(ref:%205.x\)&body=%3E%20Do%20not%20include%20confidential%20information,%20personal%20data,%20sensitive%20data,%20or%20other%20regulated%20data.)

# Temporal values

Cypher® has built-in support for handling temporal values, which can be stored as properties on nodes and relationships in Neo4j databases. This section will discuss how Cypher handles time zones, before exploring temporal values in more detail.

*   Refer to [Temporal functions - instant types](../../functions/temporal/) for information regarding temporal _functions_ allowing for the creation and manipulation of temporal values.
    
*   Refer to [Temporal operators](../../expressions/temporal-operators/) for information regarding temporal _operators_.
    
*   Refer to [Equality, ordering, and comparison of value types](../ordering-equality-comparison/) for information regarding the comparison and ordering of temporal values.
    

## [](#_temporal_value_types)Temporal value types

The following table lists the temporal value types and their supported components:

   

Type

Date support

Time support

Time zone support

`DATE`

`LOCAL TIME`

`ZONED TIME`

`LOCAL DATETIME`

`ZONED DATETIME`

`DURATION`

`-`

`-`

`-`

`DATE`, `LOCAL TIME`, `ZONED TIME`, `LOCAL DATETIME`, and `ZONED DATETIME` are _temporal instant_ types. A temporal instant value expresses a point in time with varying degrees of precision.

By contrast, `DURATION` is not a temporal instant type. A `DURATION` represents a temporal amount, capturing the difference in time between two instants, and can be negative. `DURATION` captures the amount of time between two instants, it does not capture a start time and end time.

Starting from Neo4j 5.9, some temporal types have been renamed. The table below shows the current as well as the old names of the temporal types.

 

Type

Old type name

`DATE`

`Date`

`LOCAL TIME`

`LocalTime`

`ZONED TIME`

`Time`

`LOCAL DATETIME`

`LocalDateTime`

`ZONED DATETIME`

`DateTime`

`DURATION`

`Duration`

## [](#cypher-temporal-timezones)Time zones

Time zones are represented either as an offset from UTC, or as a logical identifier of a _named time zone_ (these are based on the [IANA time zone database](https://www.iana.org/time-zones)). In either case, the time is stored as UTC internally, and the time zone offset is only applied when the time is presented. This means that temporal instants can be ordered without taking time zone into account. If, however, two times are identical in UTC, then they are ordered by timezone.

When creating a time using a named time zone, the offset from UTC is computed from the rules in the time zone database to create a time instant in UTC, and to ensure the named time zone is a valid one.

It is possible for time zone rules to change in the IANA time zone database. For example, there could be alterations to the rules for daylight savings time in a certain area. If this occurs after the creation of a temporal instant, the presented time could differ from the originally-entered time, insofar as the local timezone is concerned. However, the absolute time in UTC would remain the same.

There are three ways of specifying a time zone in Cypher:

*   Specifying the offset from UTC in hours and minutes ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).
    
*   Specifying a named time zone.
    
*   Specifying both the offset and the time zone name (with the requirement that these match).
    

See [specifying time zones](#cypher-temporal-specify-time-zone) for examples.

The named time zone form uses the rules of the IANA time zone database to manage _daylight savings time_ (DST).

The default time zone of the database can be configured using the configuration option [`db.temporal.timezone`](/docs/operations-manual/current/configuration/configuration-settings#config_db.temporal.timezone). This configuration option influences the creation of temporal types for the following functions:

*   Getting the current date and time without specifying a time zone.
    
*   Creating a temporal type from its components without specifying a time zone.
    
*   Creating a temporal type by parsing a `STRING` without specifying a time zone.
    
*   Creating a temporal type by combining or selecting values that do not have a time zone component, and without specifying a time zone.
    
*   Truncating a temporal value that does not have a time zone component, and without specifying a time zone.
    

## [](#cypher-temporal-instants)Temporal instants

### [](#cypher-temporal-specifying-temporal-instants)Specifying temporal instants

A temporal instant consists of three parts; the `date`, the `time`, and the `timezone`. These parts can be combined to produce the various temporal value types. The character `T` is a literal character.

 

Temporal instant type

Composition of parts

`DATE`

``

`LOCAL TIME`

`` or `T`

`ZONED TIME`

`` or `T`

`LOCAL DATETIME`\*

`T`

`ZONED DATETIME`\*

`T`

\*When `date` and `time` are combined, `date` must be complete; i.e. fully identify a particular day.

### [](#cypher-temporal-specify-date)Specifying dates

  

Component

Format

Description

Year

`YYYY`

Specified with at least four digits ([special rules apply in certain cases](#cypher-temporal-year)).

Month

`MM`

Specified with a double digit number from `01` to `12`.

Week

`ww`

Always prefixed with `W` and specified with a double digit number from `01` to `53`.

Quarter

`q`

Always prefixed with `Q` and specified with a single digit number from `1` to `4`.

Day of the month

`DD`

Specified with a double digit number from `01` to `31`.

Day of the week

`D`

Specified with a single digit number from `1` to `7`.

Day of the quarter

`DD`

Specified with a double digit number from `01` to `92`.

Ordinal day of the year

`DDD`

Specified with a triple digit number from `001` to `366`.

If the year is before `0000` or after `9999`, the following additional rules apply:

*   Minus sign, `-` must prefix any year before `0000`, (e.g. `-3000-01-01`).
    
*   Plus sign, `+` must prefix any year after `9999`, (e.g. `+11000-01-01`).
    
*   The year must be separated with `-` from the next component:
    
    *   if the next component is month, (e.g. `+11000-01`).
        
    *   if the next component is day of the year, (e.g. `+11000-123`).
        
    

If the year component is prefixed with either `-` or `+`, and is separated from the next component, `Year` is allowed to contain up to nine digits. Thus, the allowed range of years is between -999,999,999 and +999,999,999. For all other cases, i.e. the year is between `0000` and `9999` (inclusive), `Year` must have exactly four digits (the year component is interpreted as a year of the Common Era (CE)).

The following formats are supported for specifying dates:

   

Format

Description

Example

Interpretation of example

`YYYY-MM-DD`

Calendar date: `Year-Month-Day`

`2015-07-21`

`2015-07-21`

`YYYYMMDD`

Calendar date: `Year-Month-Day`

`20150721`

`2015-07-21`

`YYYY-MM`

Calendar date: `Year-Month`

`2015-07`

`2015-07-01`

`YYYYMM`

Calendar date: `Year-Month`

`201507`

`2015-07-01`

`YYYY-Www-D`

Week date: `Year-Week-Day`

`2015-W30-2`

`2015-07-21`

`YYYYWwwD`

Week date: `Year-Week-Day`

`2015W302`

`2015-07-21`

`YYYY-Www`

Week date: `Year-Week`

`2015-W30`

`2015-07-20`

`YYYYWww`

Week date: `Year-Week`

`2015W30`

`2015-07-20`

`YYYY-Qq-DD`

Quarter date: `Year-Quarter-Day`

`2015-Q2-60`

`2015-05-30`

`YYYYQqDD`

Quarter date: `Year-Quarter-Day`

`2015Q260`

`2015-05-30`

`YYYY-Qq`

Quarter date: `Year-Quarter`

`2015-Q2`

`2015-04-01`

`YYYYQq`

Quarter date: `Year-Quarter`

`2015Q2`

`2015-04-01`

`YYYY-DDD`

Ordinal date: `Year-Day`

`2015-202`

`2015-07-21`

`YYYYDDD`

Ordinal date: `Year-Day`

`2015202`

`2015-07-21`

`YYYY`

Year

`2015`

`2015-01-01`

The smallest components can be omitted. Cypher will assume omitted components to have their lowest possible value. For example, `2013-06` will be interpreted as being the same date as `2013-06-01`.

### [](#cypher-temporal-specify-time)Specifying times

  

Component

Format

Description

`Hour`

`HH`

Specified with a double digit number from `00` to `23`.

`Minute`

`MM`

Specified with a double digit number from `00` to `59`.

`Second`

`SS`

Specified with a double digit number from `00` to `59`.

`fraction`

`sssssssss`

Specified with a number from `0` to `999999999`. It is not required to specify leading zeros. `fraction` is an optional, sub-second component of `Second`. This can be separated from `Second` using either a full stop (`.`) or a comma (`,`). The `fraction` is in addition to the two digits of `Second`.

Cypher does not support leap seconds; [UTC-SLS](https://www.cl.cam.ac.uk/~mgk25/time/utc-sls/) (_UTC with Smoothed Leap Seconds_) is used to manage the difference in time between UTC and TAI (_International Atomic Time_).

The following formats are supported for specifying times:

   

Format

Description

Example

Interpretation of example

`HH:MM:SS.sssssssss`

`Hour:Minute:Second.fraction`

`21:40:32.142`

`21:40:32.142`

`HHMMSS.sssssssss`

`Hour:Minute:Second.fraction`

`214032.142`

`21:40:32.142`

`HH:MM:SS`

`Hour:Minute:Second`

`21:40:32`

`21:40:32.000`

`HHMMSS`

`Hour:Minute:Second`

`214032`

`21:40:32.000`

`HH:MM`

`Hour:Minute`

`21:40`

`21:40:00.000`

`HHMM`

`Hour:Minute`

`2140`

`21:40:00.000`

`HH`

`Hour`

`21`

`21:00:00.000`

The smallest components can be omitted. For example, a time may be specified with `Hour` and `Minute`, leaving out `Second` and `fraction`. On the other hand, specifying a time with `Hour` and `Second`, while leaving out `Minute`, is not possible.

#### [](#cypher-temporal-specify-time-zone)Specifying time zones

The time zone is specified in one of the following ways:

*   As an offset from UTC.
    
*   Using the `Z` shorthand for the UTC (`±00:00`) time zone.
    

When specifying a time zone as an offset from UTC, the rules below apply:

*   The time zone always starts with either a plus (`+`) or minus (`-`) sign.
    
    *   Positive offsets, i.e. time zones beginning with `+`, denote time zones east of UTC.
        
    *   Negative offsets, i.e. time zones beginning with `-`, denote time zones west of UTC.
        
    
*   A double-digit hour offset follows the `+`/`-` sign.
    
*   An optional double-digit minute offset follows the hour offset, optionally separated by a colon (`:`).
    
*   The time zone of the International Date Line is denoted either by `+12:00` or `-12:00`, depending on country.
    

When creating values of the `ZONED DATETIME` temporal instant type, the time zone may also be specified using a named time zone, using the names from the IANA time zone database. This may be provided either in addition to, or in place of the offset. The named time zone is given last and is enclosed in square brackets (`[]`). Should both the offset and the named time zone be provided, the offset must match the named time zone.

The following formats are supported for specifying time zones:

    

Format

Description

Example

Supported for `ZONED DATETIME`

Supported for `ZONED TIME`

`Z`

UTC

`Z`

`±HH:MM`

`Hour:Minute`

`+09:30`

`±HH:MM[ZoneName]`

`Hour:Minute[ZoneName]`

`+08:45[Australia/Eucla]`

`±HHMM`

`Hour:Minute`

`+0100`

`±HHMM[ZoneName]`

`Hour:Minute[ZoneName]`

`+0200[Africa/Johannesburg]`

`±HH`

`Hour`

`-08`

`±HH[ZoneName]`

`Hour[ZoneName]`

`+08[Asia/Singapore]`

`[ZoneName]`

`[ZoneName]`

`[America/Regina]`

### [](#cypher-temporal-accessing-components-temporal-instants)Components of temporal instants

Components of temporal instant values can be accessed as properties.

Components of temporal instant values and where they are supported         

Component

Description

Type

Range/Format

`DATE`

`ZONED DATETIME`

`LOCAL DATETIME`

`ZONED TIME`

`LOCAL TIME`

`instant.year`

The `year` component represents the [astronomical year number](https://en.wikipedia.org/wiki/Astronomical_year_numbering) of the instant.\[[1](#_footnotedef_1 "View footnote.")\]

`INTEGER`

At least 4 digits. For more information, see the [rules for using the `Year` component](#cypher-temporal-year).

`instant.quarter`

The _quarter-of-the-year_ component.

`INTEGER`

`1` to `4`.

`instant.month`

The _month-of-the-year_ component.

`INTEGER`

`1` to `12`.

`instant.week`

The _week-of-the-year_ component.\[[2](#_footnotedef_2 "View footnote.")\]

`INTEGER`

`1` to `53`.

`instant.weekYear`

The _year_ that the _week-of-year_ component belongs to.\[[3](#_footnotedef_3 "View footnote.")\]

`INTEGER`

At least 4 digits. For more information, see the [rules for using the `Year` component](#cypher-temporal-year).

`instant.dayOfQuarter`

The _day-of-the-quarter_ component.

`INTEGER`

`1` to `92`.

`instant.quarterDay`

The _day-of-the-quarter_ component (alias for `instant.dayOfQuarter`).

`INTEGER`

`1` to `92`.

`instant.day`

The _day-of-the-month_ component.

`INTEGER`

`1` to `31`.

`instant.ordinalDay`

The _day-of-the-year_ component.

`INTEGER`

`1` to `366`.

`instant.dayOfWeek`

The _day-of-the-week_ component (the first day of the week is _Monday_).

`INTEGER`

`1` to `7`.

`instant.weekDay`

The _day-of-the-week_ component (alias for `instant.dayOfWeek`).

`INTEGER`

`1` to `7`.

`instant.hour`

The _hour_ component.

`INTEGER`

`0` to `23`.

`instant.minute`

The _minute_ component.

`INTEGER`

`0` to `59`.

`instant.second`

The _second_ component.\[[4](#_footnotedef_4 "View footnote.")\]

`INTEGER`

`0` to `59`.

`instant.millisecond`

The _millisecond_ component.

`INTEGER`

`0` to `999`.

`instant.microsecond`

The _microsecond_ component.

`INTEGER`

`0` to `999999`.

`instant.nanosecond`

The _nanosecond_ component.

`INTEGER`

`0` to `999999999`.

`instant.timezone`

The _timezone_ component.

`STRING`

Depending on how the [time zone was specified](#cypher-temporal-specify-time-zone), this is either a time zone name or an offset from UTC in the format `±HHMM`.

`instant.offset`

The _timezone_ offset.

`STRING`

In the format `±HHMM`.

`instant.offsetMinutes`

The _timezone_ offset in minutes.

`INTEGER`

`-1080` to `+1080`.

`instant.offsetSeconds`

The _timezone_ offset in seconds.

`INTEGER`

`-64800` to `+64800`.

`instant.epochMillis`

The number of milliseconds between `1970-01-01T00:00:00+0000` and the instant.\[[5](#_footnotedef_5 "View footnote.")\]

`INTEGER`

Positive for instants after and negative for instants before `1970-01-01T00:00:00+0000`.

`instant.epochSeconds`

The number of seconds between `1970-01-01T00:00:00+0000` and the instant.\[[6](#_footnotedef_6 "View footnote.")\]

`INTEGER`

Positive for instants after and negative for instants before `1970-01-01T00:00:00+0000`.

### [](#cypher-temporal-specify-instant-examples)Examples

To work with a particular temporal instant type, its corresponding [function](../../functions/temporal/) must be used. For example, in order to create a property value of type `ZONED DATETIME`, the [`datetime()`](../../functions/temporal/#functions-datetime) function must be used.

For specific examples, see:

*   [`DATE`](#examples-date)
    
*   [`LOCAL TIME`](#examples-localtime)
    
*   [`ZONED TIME`](#examples-zonedtime)
    
*   [`LOCAL DATETIME`](#examples-local-datetime)
    
*   [`ZONED DATETIME`](#examples-zoned-datetime)
    
*   [Truncating temporal values](#examples-truncate)
    

#### [](#examples-date)`DATE`

To work with `DATE` values, including creating, parsing, and extracting components, use the [`date()`](../../functions/temporal/#functions-date) function.

Example 1. `DATE`

Create a `DATE` property value

```cypher hljs
CREATE (n:Label)
SET n.date = date("2025-02-18")
RETURN n.date AS date, valueType(n.date) AS temporalValueType
```

Result  

date

temporalValueType

`2025-02-18`

`"DATE NOT NULL"`

Rows: 1

Create a `DATE` property value using components

```cypher hljs
CREATE (n:Label)
SET n.date = date({year: 2025, month: 2, day: 18})
RETURN n.date AS date, valueType(n.date) AS temporalValueType
```

Result  

date

temporalValueType

`2025-02-18`

`"DATE NOT NULL"`

Rows: 1

Parse a `DATE` using the week date format:

```cypher hljs
RETURN date('+2015-W13-4') AS theDate
```

Result 

theDate

`2015-03-26`

Rows: 1

Get the components of a `DATE` value

```cypher hljs
WITH date({year: 1984, month: 10, day: 11}) AS d
RETURN d.year, d.quarter, d.month, d.week, d.weekYear, d.day, d.ordinalDay, d.dayOfWeek, d.dayOfQuarter
```

Result         

d.year

d.quarter

d.month

d.week

d.weekYear

d.day

d.ordinalDay

d.dayOfWeek

d.dayOfQuarter

`1984`

`4`

`10`

`41`

`1984`

`11`

`285`

`4`

`11`

Rows: 1

#### [](#examples-localtime)`LOCAL TIME`

To work with `LOCAL TIME` values, including creating, parsing, and extracting components, use the [`localtime()`](../../functions/temporal/#functions-localtime) function.

Example 2. `LOCAL TIME`

Create a `LOCAL TIME` property value

```cypher hljs
CREATE (n:Label)
SET n.localTime = localtime("12:34:56.789")
RETURN n.localTime AS localTime, valueType(n.localTime) AS temporalValueType
```

Result  

localTime

temporalValueType

`12:34:56.789`

`"LOCAL TIME NOT NULL"`

Rows: 1

Create a `LOCAL TIME` property value using components

```cypher hljs
CREATE (n:Label)
SET n.localTime = localtime({hour: 12, minute: 34, second: 56, millisecond: 789})
RETURN n.localTime AS localTime, valueType(n.localTime) AS temporalValueType
```

Result  

localTime

temporalValueType

`12:34:56.789`

`"LOCAL TIME NOT NULL"`

Rows: 1

Get the components of a `LOCAL TIME` value

```cypher hljs
WITH localtime({hour: 12, minute: 34, second: 56, millisecond: 789}) AS t
RETURN t.hour, t.minute, t.second, t.millisecond
```

Result    

t.hour

t.minute

t.second

t.millisecond

`12`

`34`

`56`

`789`

Rows: 1

#### [](#examples-zonedtime)`ZONED TIME`

To work with `ZONED TIME` values, including creating, parsing, and extracting components, use the [`time()`](../../functions/temporal/#functions-time) function.

Example 3. `ZONED TIME`

Create a `ZONED TIME` property value with an offset

```cypher hljs
CREATE (n:Label)
SET n.zonedTime = time("12:34:56.789+02:00")
RETURN n.zonedTime AS zonedTime, valueType(n.zonedTime) AS temporalValueType
```

Result  

zonedTime

temporalValueType

`12:34:56.789+02:00`

`"ZONED TIME NOT NULL"`

Rows: 1

Create a `ZONED TIME` property value with components and a time zone

```cypher hljs
CREATE (n:Label)
SET n.zonedTime = time({hour: 12, minute: 34, second: 56, millisecond: 789, timezone: 'Europe/Stockholm'})
RETURN n.zonedTime AS zonedTime, valueType(n.zonedTime) AS temporalValueType
```

Result  

time

temporalValueType

`12:34:56.789+01:00`

`"ZONED TIME NOT NULL"`

Rows: 1

Get the components of a `ZONED TIME` value

```cypher hljs
WITH time("12:34:56.789+02:00") AS t
RETURN t.hour, t.minute, t.second, t.millisecond, t.offset
```

Result     

t.hour

t.minute

t.second

t.millisecond

t.offset

`12`

`34`

`56`

`789`

`"+02:00"`

Rows: 1

#### [](#examples-local-datetime)`LOCAL DATETIME`

To work with `LOCAL DATETIME` values, including creating, parsing, and extracting components, use the [`localdatetime()`](../../functions/temporal/#functions-localdatetime) function.

Example 4. `LOCAL DATETIME`

Create a `LOCAL DATETIME` property value using the ordinal date format:

```cygher hljs
CREATE (n:Label)
SET n.localDateTime = localdatetime("2025-02-18T12:34:56")
RETURN n.localDateTime AS localDateTime, valueType(n.localDateTime) AS temporalValueType
```

Result  

localDateTime

temporalValueType

`2025-02-18T12:34:56`

`"LOCAL DATETIME NOT NULL"`

Rows: 1

Create a `LOCAL DATETIME` property value using temporal components

```cypher hljs
CREATE (n:Label)
SET n.localDateTime = localdatetime({year: 2025, month: 2, day: 18, hour: 12, minute: 34, second: 56, millisecond: 789})
RETURN n.localDateTime AS localDateTime, valueType(n.localDateTime) AS temporalValueType
```

Result  

localDatetime

temporalValueType

`2025-02-18T12:34:56.789`

`"LOCAL DATETIME NOT NULL"`

Rows: 1

Parse a `LOCAL DATETIME` using the ordinal date format:

```cypher hljs
RETURN localdatetime('2015185T19:32:24') AS theLocalDateTime
```

Result 

theLocalDateTime

`2015-07-04T19:32:24`

Rows: 1

Get the components of a `LOCAL DATETIME` value

```cypher hljs
WITH localdatetime({year: 2025, month: 2, day: 19, hour: 12, minute: 34, second: 56, millisecond: 789}) AS t
RETURN t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond
```

Result       

t.year

t.month

t.day

t.hour

t.minute

t.second

t.millisecond

`2025`

`2`

`19`

`12`

`34`

`56`

`789`

Rows: 1

#### [](#examples-zoned-datetime)`ZONED DATETIME`

To work with `ZONED DATETIME` values, including creating, parsing, and extracting components, use the [`datetime()`](../../functions/temporal/#functions-datetime) function.

Example 5. `ZONED DATETIME`

Create a `ZONED DATETIME` property value using calendar date format

```cypher hljs
CREATE (n:Label)
SET n.zonedDateTime = datetime("2025-02-18T12:34:56.789+02:00")
RETURN n.zonedDateTime AS zonedDateTime, valueType(n.zonedDateTime) AS temporalValueType
```

Result  

zonedDateTime

temporalValueType

`2025-02-18T12:34:56.789+02:00`

`"ZONED DATETIME NOT NULL"`

Rows: 1

Create a `ZONED DATETIME` property value using temporal components

```cypher hljs
CREATE (n:Label)
SET n.zonedDateTime = datetime({year: 2025, month: 2, day: 18, hour: 12, minute: 34, second: 56, millisecond: 789, timezone: 'Europe/Stockholm'})
RETURN n.zonedDateTime, valueType(n.zonedDateTime) AS temporalValueType
```

Result  

zonedDateTime

temporalValueType

`2025-02-18T12:34:56.789+01:00[Europe/Stockholm]`

`"ZONED DATETIME NOT NULL"`

Rows: 1

Create a `ZONED DATETIME` property value using a timezone

```cypher hljs
CREATE (n:Label)
SET n.zonedDateTime = datetime({timezone: 'Europe/Stockholm'})
RETURN n.zonedDateTime AS zonedDateTime, valueType(n.zonedDateTime) AS temporalValueType
```

Result  

zonedDateTime

temporalValueType

`2025-02-18T15:22:48.227+01:00[Europe/Stockholm]`

`"ZONED DATETIME NOT NULL"`

Rows: 1

Parse a `ZONED DATETIME` using the calendar date format

```cypher hljs
RETURN datetime('2015-06-24T12:50:35.556+0100') AS theDateTime
```

Result 

theDateTime

`2015-06-24T12:50:35.556+01:00`

Rows: 1

Get the date-related components of a `ZONED DATETIME` value:

```cypher hljs
WITH datetime({
  year: 1984, month: 11, day: 11,
  hour: 12, minute: 31, second: 14, nanosecond: 645876123,
  timezone: 'Europe/Stockholm'
}) AS d
RETURN d.year, d.quarter, d.month, d.week, d.weekYear, d.day, d.ordinalDay, d.dayOfWeek, d.dayOfQuarter
```

Result         

d.year

d.quarter

d.month

d.week

d.weekYear

d.day

d.ordinalDay

d.dayOfWeek

d.dayOfQuarter

`1984`

`4`

`11`

`45`

`1984`

`11`

`316`

`7`

`42`

Rows: 1

Get the time-related components of a `ZONED DATETIME` value:

```cypher hljs
WITH datetime({
  year: 1984, month: 11, day: 11,
  hour: 12, minute: 31, second: 14, nanosecond: 645876123,
  timezone: 'Europe/Stockholm'
}) AS d
RETURN d.hour, d.minute, d.second, d.millisecond, d.microsecond, d.nanosecond
```

Result      

d.hour

d.minute

d.second

d.millisecond

d.microsecond

d.nanosecond

`12`

`31`

`14`

`645`

`645876`

`645876123`

Rows: 1

Get the epoch time and timezone-related components of a `ZONED DATETIME` value:

```cypher hljs
WITH datetime({
  year: 1984, month: 11, day: 11,
  hour: 12, minute: 31, second: 14, nanosecond: 645876123,
  timezone: 'Europe/Stockholm'
}) AS d
RETURN d.timezone, d.offset, d.offsetMinutes, d.epochSeconds, d.epochMillis
```

Result     

d.timezone

d.offset

d.offsetMinutes

d.epochSeconds

d.epochMillis

`"Europe/Stockholm"`

`"+01:00"`

`60`

`469020674`

`469020674645`

Rows: 1

#### [](#examples-truncate)Truncating temporal values

The truncate functions in Neo4j allow you to reduce the precision of temporal values by truncating them to a specified component such as `year`, `month`, or `second`.

Example 6. Truncate `DATE` values

To truncate `DATE` values, use the [`date.truncate()`](../../functions/temporal/#functions-date-truncate) function.

Get the first day of the current year:

```cypher hljs
RETURN date.truncate('year') AS firstDay
```

Result 

firstDay

`2022-01-01`

Rows: 1

Get the date of the Thursday in the week of a specific date:

```cypher hljs
RETURN date.truncate('week', date('2019-10-01'), {dayOfWeek: 4}) AS thursday
```

Result 

thursday

`2019-10-03`

Rows: 1

Example 7. Truncate `LOCAL TIME` values

To truncate `LOCAL TIME` values, use the [`localtime.truncate()`](../../functions/temporal/#functions-localtime-truncate) function.

Get the start of the current minute for a specific `LOCAL TIME` value

```cypher hljs
RETURN localtime.truncate('minute', localtime("12:34:56.789")) AS truncatedMinute
```

Result 

truncatedMinute

`12:34`

Rows: 1

Get the start of the current second using the system’s `LOCAL TIME`

```cypher hljs
RETURN localtime.truncate('second') AS currentSecond
```

Result 

currentSecond

`10:12:28`

Rows: 1

Example 8. Truncate `ZONED TIME` values

To truncate `ZONED TIME` values, use the [`time.truncate()`](../../functions/temporal/#functions-time-truncate) function.

Get the start of the current minute for a specific `ZONED TIME` value

```cypher hljs
RETURN time.truncate('minute', time("12:34:56.789+02:00")) AS truncatedMinute
```

Result 

truncatedMinute

`12:34+02:00`

Rows: 1

Get the current `ZONED TIME` truncated to the nearest minute

```cypher hljs
RETURN time.truncate('minute', time()) AS currentTime
```

Result 

truncatedTime

`10:20Z`

Rows: 1

Example 9. Truncate `LOCAL DATETIME` values

To truncate `LOCAL DATETIME` values, use the [`localdatetime.truncate()`](../../functions/temporal/#functions-localdatetime-truncate) function.

Get the start of the hour for a specific `LOCAL DATETIME`

```cypher hljs
RETURN localdatetime.truncate('hour', localdatetime("2025-02-18T12:34:56.789")) AS truncatedHour
```

Result 

truncatedHour

`2025-02-18T12:00`

Rows: 1

Get the start of the current month in `LOCAL DATETIME`

```cypher hljs
RETURN localdatetime.truncate('month') AS truncatedMonth
```

Result 

truncatedMonth

`2025-02-01T00:00`

Rows: 1

Example 10. Truncate `ZONED DATETIME` values

To truncate `ZONED DATETIME` values, use the [`datetime.truncate()`](../../functions/temporal/#functions-datetime-truncate) function.

Get the start of the minute for a specific `ZONED DATETIME`

```cypher hljs
RETURN datetime.truncate('minute', datetime("2025-02-18T12:34:56.789+02:00")) AS truncatedZonedDateTime
```

Result 

truncatedZonedDateTime

`2025-02-18T12:34+02:00`

Rows: 1

Get the start of Wednesday for the current week in `ZONED DATETIME`

```cypher hljs
RETURN datetime.truncate('week', datetime(), {dayOfWeek: 3}) AS startOfWednesday
```

Result 

startOfWednesday

`2025-02-19T00:00Z`

Rows: 1

## [](#cypher-temporal-durations)Durations

### [](#cypher-temporal-specifying-durations)Specifying durations

A `DURATION` represents a temporal amount, capturing the difference in time between two instants, and can be negative.

The specification of a `DURATION` is prefixed with a `P`, and can use either a _unit-based form_ or a _date-and-time-based form_:

*   Unit-based form: `P[nY][nM][nW][nD][T[nH][nM][nS]]`
    
    *   The square brackets (`[]`) denote an optional component (components with a zero value may be omitted).
        
    *   The `n` denotes a numeric value within the bounds of a 64-bit integer.
        
    *   The value of the last — and smallest — component may contain a decimal fraction.
        
    *   Each component must be suffixed by a component identifier denoting the unit.
        
    *   The unit-based form uses `M` as a suffix for both months and minutes. Therefore, time parts must always be preceded with `T`, even when no components of the date part are given.
        
    *   The maximum total length of a duration is bounded by the number of seconds that can be held in a 64-bit integer.
        
    
*   Date-and-time-based form: `PT`.
    
    *   Unlike the unit-based form, this form requires each component to be within the bounds of a valid `LOCAL DATETIME`.
        
    

The following table lists the component identifiers for the unit-based form:

  

Component identifier

Description

Comments

`Y`

Years

`M`

Months

Must be specified before `T`.

`W`

Weeks

`D`

Days

`H`

Hours

`M`

Minutes

Must be specified after `T`.

`S`

Seconds

### [](#cypher-temporal-accessing-components-durations)Components of durations

A `DURATION` can have several components, each categorized into _Months_, _Days_, and _Seconds_ groups.

Components of `DURATION` values are truncated within their component groups as follows:

First order `DURATION` components     

Component Group

Component

Description

Type

Details

_Months_

`duration.years`

The total number of _years_.

`INTEGER`

Each set of `4` _quarters_ is counted as `1` _year_; each set of `12` _months_ is counted as `1` _year_.

`duration.quarters`

The total number of _quarters_.

`INTEGER`

Each _year_ is counted as `4` _quarters_; each set of `3` _months_ is counted as `1` _quarter_.

`duration.months`

The total number of _months_.

`INTEGER`

Each _year_ is counted as `12` _months_; each\_quarter\_ is counted as `3` _months_.

_Days_

`duration.weeks`

The total number of _weeks_.

`INTEGER`

Each set of `7` _days_ is counted as `1` _week_.

`duration.days`

The total number of _days_.

`INTEGER`

Each _week_ is counted as `7` _days_.

_Seconds_

`duration.hours`

The total number of _hours_.

`INTEGER`

Each set of `60` _minutes_ is counted as `1` _hour_; each set of `3600` _seconds_ is counted as `1` _hour_.

`duration.minutes`

The total number of _minutes_.

`INTEGER`

Each _hour_ is counted as `60` _minutes_; each set of `60` _seconds_ is counted as `1` _minute_.

`duration.seconds`

The total number of _seconds_.

`INTEGER`

Each _hour_ is counted as `3600` _seconds_; each _minute_ is counted as `60` _seconds_.

`duration.milliseconds`

The total number of _milliseconds_

`INTEGER`

Each set of `1000` _milliseconds_ is counted as `1` _second_.

`duration.microseconds`

The total number of _microseconds_.

`INTEGER`

Each _millisecond_ is counted as `1000` _microseconds_.

`duration.nanoseconds`

The total number of _nanoseconds_.

`INTEGER`

Each _microsecond_ is counted as `1000` _nanoseconds_.

Please note that:

*   Cypher uses [UTC-SLS](https://www.cl.cam.ac.uk/~mgk25/time/utc-sls/) when handling leap seconds.
    
*   There are not always `24` _hours_ in `1` _day_; when switching to/from daylight savings time, a _day_ can have `23` or `25` _hours_.
    
*   There are not always the same number of _days_ in a _month_.
    
*   Due to leap years, there are not always the same number of _days_ in a _year_.
    

It is also possible to access the second order components of a component group bounded by the first order component of the group:

Second order `DURATION` components    

Component

Component Group

Description

Type

`duration.quartersOfYear`

Months

The number of _quarters_ in the group that do not make a whole _year_.

`INTEGER`

`duration.monthsOfYear`

Months

The number of _months_ in the group that do not make a whole _year_.

`INTEGER`

`duration.monthsOfQuarter`

Months

The number of _months_ in the group that do not make a whole _quarter_.

`INTEGER`

`duration.daysOfWeek`

Days

The number of _days_ in the group that do not make a whole _week_.

`INTEGER`

`duration.minutesOfHour`

Seconds

The number of _minutes_ in the group that do not make a whole _hour_.

`INTEGER`

`duration.secondsOfMinute`

Seconds

The number of _seconds_ in the group that do not make a whole _minute_.

`INTEGER`

`duration.millisecondsOfSecond`

Seconds

The number of _milliseconds_ in the group that do not make a whole _second_.

`INTEGER`

`duration.microsecondsOfSecond`

Seconds

The number of _microseconds_ in the group that do not make a whole _second_.

`INTEGER`

`duration.nanosecondsOfSecond`

Seconds

The number of _nanoseconds_ in the group that do not make a whole _second_

`INTEGER`

### [](#cypher-temporal-examples)Examples

Below are examples of parsing durations using the `duration()` function. More information can be found [here](../../functions/temporal/duration/).

Example 11. Return a duration of `14` _days_, `16` _hours_, and `12` _minutes_

Query

```cypher hljs
RETURN duration('P14DT16H12M') AS theDuration
```

Result 

theDuration

`P14DT16H12M`

Rows: 1

Example 12. Return a duration of `5` _months_, `1` _day_, and `12` _hours_

Query

```cypher hljs
RETURN duration('P5M1.5D') AS theDuration
```

Result 

theDuration

`P5M1DT12H`

Rows: 1

Example 13. Return a duration of `45` seconds

Query

```cypher hljs
RETURN duration('PT0.75M') AS theDuration
```

Result 

theDuration

`PT45S`

Rows: 1

Example 14. Return a duration of `2` _weeks_, `3` _days_, and `12` _hours_

Query

```cypher hljs
RETURN duration('P2.5W') AS theDuration
```

Result 

theDuration

`P17DT12H`

Rows: 1

Example 15. Get the month-based components of a `DURATION` value

Query

```cypher hljs
WITH duration({years: 1, months: 5, days: 111, minutes: 42}) AS d
RETURN d.years, d.quarters, d.quartersOfYear, d.months, d.monthsOfYear, d.monthsOfQuarter
```

Result      

d.years

d.quarters

d.quartersOfYear

d.months

d.monthsOfYear

d.monthsOfQuarter

`1`

`5`

`1`

`17`

`5`

`2`

Rows: 1

`d.quarters` has a value of `5` because the year of the duration has four quarters and there is another quarter in the five months. `d.months` has a value of `17` because it adds the 12 months in the year of the duration to the five months. `d.quartersOfYear` is the remaining quarter, counting towards the next full year. Similarly, `d.monthsOfYear` and `d.monthsOfQuarter` count towards the next full year and quarter respectively. See tables _First order `DURATION` components_ and _Second order `DURATION` components_ in [Components of durations](#cypher-temporal-accessing-components-durations).

Example 16. Get the days-based components of a `DURATION` value

Query

```cypher hljs
WITH duration({months: 5, days: 25, hours: 1}) AS d
RETURN d.weeks, d.days, d.daysOfWeek
```

Result   

d.weeks

d.days

d.daysOfWeek

`3`

`25`

`4`

Rows: 1

`d.weeks` has a value of 3 because the 25 days from the query are three full weeks (or 21 days). `d.daysOfWeek` are the remaining days, counting towards the next full week. See tables _First order `DURATION` components_ and _Second order `DURATION` components_ in [Components of durations](#cypher-temporal-accessing-components-durations).

Example 17. Get the first order seconds-based components of a `DURATION` value

Query

```cypher hljs
WITH duration({
  years: 1, months:1, days:1, hours: 1,
  minutes: 1, seconds: 1, nanoseconds: 111111111
}) AS d
RETURN d.hours, d.minutes, d.seconds, d.milliseconds, d.microseconds, d.nanoseconds
```

Result      

d.hours

d.minutes

d.seconds

d.milliseconds

d.microseconds

d.nanoseconds

`1`

`61`

`3661`

`3661111`

`3661111111`

`3661111111111`

Rows: 1

`d.minutes` is the sum of 60 minutes of the hour and the one minute from the query as both `duration.hours` and `duration.minutes` are both seconds-based components. Similarly, `d.seconds`, `d.milliseconds`, `d.microseconds` and `d.nanoseconds` are sum values of the relevant seconds-based components from the query.

`d.hours` does not take the day from the query into account because `duration.days` is a days-based component.

See table _First order `DURATION` components_ in [Components of durations](#cypher-temporal-accessing-components-durations).

Example 18. Get the second order seconds-based components of a `DURATION` value

Query

```cypher hljs
WITH duration({
  years: 1, months:1, days:1,
  hours: 1, minutes: 1, seconds: 1, nanoseconds: 111111111
}) AS d
RETURN d.minutesOfHour, d.secondsOfMinute, d.millisecondsOfSecond, d.microsecondsOfSecond, d.nanosecondsOfSecond
```

Result     

d.minutesOfHour

d.secondsOfMinute

d.millisecondsOfSecond

d.microsecondsOfSecond

d.nanosecondsOfSecond

`1`

`1`

`111`

`111111`

`111111111`

Rows: 1

The returned values all count towards the next full hour, minute or second respectively. For example, `d.microsecondsOfSecond` has a value of `111111` because it is the `111111111` nanoseconds from the query in microseconds (rounded down) but it is not another full second.

See table _Second order `DURATION` components_ in [Components of durations](#cypher-temporal-accessing-components-durations).

Example 19. Create a duration representing 1.5 _days_

Query

```cypher hljs
RETURN duration({days: 1, hours: 12}) AS theDuration
```

Result 

theDuration

`P1DT12H`

Rows: 1

Example 20. Compute the `DURATION` between two temporal instants

Query

```cypher hljs
RETURN duration.between(date('1984-10-11'), date('2015-06-24')) AS theDuration
```

Result 

theDuration

`P30Y8M13D`

Rows: 1

Example 21. Compute the number of days between two `DATE` values

Query

```cypher hljs
RETURN duration.inDays(date('2014-10-11'), date('2015-08-06')) AS theDuration
```

Result 

theDuration

`P299D`

Rows: 1

Example 22. Get the `DATE` of the last day of the next month

Query

```cypher hljs
RETURN date.truncate('month', date() + duration('P2M')) - duration('P1D') AS lastDay
```

Result 

lastDay

`2022-07-31`

Rows: 1

Example 23. Add a `DURATION` to a `DATE`

Query

```cypher hljs
RETURN time('13:42:19') + duration({days: 1, hours: 12}) AS theTime
```

Result 

theTime

`01:42:19.000000000+00:00`

Rows: 1

Example 24. Add two `DURATION` values

Query

```cypher hljs
RETURN duration({days: 2, hours: 7}) + duration({months: 1, hours: 18}) AS theDuration
```

Result 

theDuration

`P1M2DT25H`

Rows: 1

Example 25. Multiply a `DURATION` by a number

Query

```cypher hljs
RETURN duration({hours: 5, minutes: 21}) * 14 AS theDuration
```

Result 

theDuration

`PT74H54M`

Rows: 1

Example 26. Divide a `DURATION` by a number

Query

```cypher hljs
RETURN duration({hours: 3, minutes: 16}) / 2 AS theDuration
```

Result 

theDuration

`PT1H38M`

Rows: 1

Example 27. Examine whether two instants are less than one day apart

Query

```cypher hljs
WITH
  datetime('2015-07-21T21:40:32.142+0100') AS date1,
  datetime('2015-07-21T17:12:56.333+0100') AS date2
RETURN
CASE
  WHEN date1  date2
  ELSE date2 + duration("P1D") > date1
END AS lessThanOneDayApart
```

Result 

lessThanOneDayApart

`true`

Rows: 1

Example 28. Return the abbreviated name of the current month

Query

```cypher hljs
RETURN ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date().month-1] AS month
```

Result 

month

`"Jun"`

Rows: 1

## [](#cypher-temporal-index)Temporal indexing

All temporal types can be indexed, and thereby support exact lookups for equality predicates. Indexes for temporal instant types additionally support range lookups.

* * *

[1](#_footnoteref_1). This is in accordance with the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar); i.e. years AD/CE start at year 1, and the year before that (year 1 BC/BCE) is 0, while year 2 BCE is -1 etc.

[2](#_footnoteref_2). The [first week of any year](https://en.wikipedia.org/wiki/ISO_week_date#First_week) is the week that contains the first Thursday of the year, and thus always contains January 4.

[3](#_footnoteref_3). For dates from December 29, this could be the next year, and for dates until January 3 this could be the previous year, depending on how week 1 begins.

[4](#_footnoteref_4). Cypher does not support leap seconds; UTC-SLS (UTC with Smoothed Leap Seconds) is used to manage the difference in time between UTC and TAI (International Atomic Time).

[5](#_footnoteref_5). The expression datetime().epochMillis returns the equivalent value of the timestamp() function.

[6](#_footnoteref_6). For the nanosecond part of the epoch offset, the regular nanosecond component (instant.nanosecond) can be used.

[Boolean, numeric, and string literals](../boolean-numeric-string/) [Spatial values](../spatial/)

[![](/docs/assets/img/nodes-25.png)

## Nov 6 2025

The Call for Papers is now open and we want to hear about your graph-related projects. Submit your talks by June 15

Submit your talk

](https://neo4j.com/nodes-2025/)