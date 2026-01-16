# Module 17: PostgreSQL Database Management - Data Types

## Categories of SQL Commands

-   Data Definition Language (DDL)
-   Data Manipulation Language (DML)
-   Data Query Language (DQL)
-   Transaction Control Language (TCL)
-   Data Control Language (DCL)

### Data Definition Language (DDL)

DDL is used to define the structure of the database.

-   CREATE
-   ALTER
-   DROP
-   TRUNCATE

### Data Manipulation Language (DML)

DML is used to manipulate the data in the database.

-   INSERT
-   UPDATE
-   DELETE

### Data Control Language (DCL)

DCL is used to control the access to the database.

-   GRANT
-   REVOKE

### Data Query Language (DQL)

DQL is used to query the data from the database.

-   SELECT

### Transaction Control Language (TCL)

TCL is used to control the transactions in the database.

-   COMMIT
-   ROLLBACK

## Data Types

### Boolean Data Type

The `boolean` type in PostgreSQL can take the values `true`, `false`, or `null` (to represent an unknown or missing value).

> Yes, in PostgreSQL we can also use `null` in boolean type.

### Number Data Types

| Data Type                     | Storage      | Range / Precision                  | Use Case                       | Recommendation                              |
| ----------------------------- | ------------ | ---------------------------------- | ------------------------------ | ------------------------------------------- |
| `SMALLINT` (`int2`)           | 2 bytes      | −32,768 to +32,767                 | Small numbers (age, quantity)  | ✅ Use for small, bounded values            |
| `INTEGER` (`int4`)            | 4 bytes      | ~ −2B to +2B                       | Default whole numbers          | ✅ Default choice                           |
| `BIGINT` (`int8`)             | 8 bytes      | ~ −9 quintillion to +9 quintillion | Large IDs, counters            | ✅ Use when overflow is possible            |
| `REAL` (`float4`)             | 4 bytes      | ~6 decimal digits (approximate)    | Sensor data, measurements      | ⚠️ Use only if precision loss is acceptable |
| `DOUBLE PRECISION` (`float8`) | 8 bytes      | ~15 decimal digits (approximate)   | Scientific calculations        | ⚠️ Approximate values only                  |
| `NUMERIC` / `DECIMAL`         | Variable     | User-defined precision (exact)     | Money, finance                 | ✅ Preferred for exact values               |
| `SERIAL`                      | 4 bytes      | 1 to 2,147,483,647                 | Auto-incrementing IDs (legacy) | ❌ Legacy, avoid in new schemas             |
| `IDENTITY`                    | 4 or 8 bytes | Follows INT / BIGINT               | Auto-incrementing IDs (modern) | ✅ Use instead of SERIAL for new schemas    |

> `SERIAL` is a legacy type and should be avoided in new schemas. Use `IDENTITY` instead.

### Character Data Types

| Data Type    | Storage  | Length             | Use Case                                                    | Recommendation                      |
| ------------ | -------- | ------------------ | ----------------------------------------------------------- | ----------------------------------- |
| `CHAR(n)`    | n bytes  | Fixed length n     | When the exact length is known (e.g., country codes `'BD'`) | ⚠️ Use only for fixed-length values |
| `VARCHAR(n)` | Variable | Up to n characters | Flexible length with a max limit (e.g., usernames, emails)  | ✅ Use for bounded-length text      |
| `TEXT`       | Variable | Unlimited          | Long text, descriptions, notes                              | ✅ Preferred for unbounded text     |

### Date / Time Types

| Data Type     | Example                    | Use Case / Notes                                              |
| ------------- | -------------------------- | ------------------------------------------------------------- |
| `DATE`        | `'1980-12-20'`             | Stores calendar date (year, month, day)                       |
| `TIME`        | `'14:30:00'`               | Stores time of day without timezone                           |
| `TIMETZ`      | `'14:30:00+06'`            | Time of day **with timezone**                                 |
| `TIMESTAMP`   | `'2025-08-29 14:30:00'`    | Date + time, **no timezone**                                  |
| `TIMESTAMPTZ` | `'2025-08-29 14:30:00+06'` | Date + time **with timezone**, recommended for most use cases |
| `INTERVAL`    | `'3 days 4 hours'`         | Duration of time (difference between dates/times)             |

### UUID (Universally Unique Identifier)

| Data Type | Example                                  | Use Case / Notes                                                                                         |
| --------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `UUID`    | `'550e8400-e29b-41d4-a716-446655440000'` | Stores globally unique identifiers. Useful for distributed systems, public IDs, and avoiding collisions. |
