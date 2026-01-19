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

## SQL Commands

> Examples of basic SQL commands for database and table operations in PostgreSQL:

### Create Database

```sql
-- Create a new database named 'school'
create database school;

-- Drop the database named 'school'
drop database school;

-- Create a table named 'students' with common data types
create table students (
  id serial,          -- Auto-incrementing integer (legacy, use IDENTITY if possible)
  name varchar(13),   -- Variable-length string, up to 13 characters
  age int,            -- Integer for storing age
  isActive boolean,   -- Boolean value (true/false)
  dob date            -- Date of birth
);

-- Drop the table named 'students'
drop table students;

-- Drop the table 'students' only if it exists
drop table if exists students;
```

```sql
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18), -- Check Constraints
    status VARCHAR(20) DEFAULT 'active', -- Default Constraints
    enrollment_id INTEGER REFERENCES enrollments(enrollment_id), -- Foreign key to enrollments table
    -- primary key(id),
    -- primary key (user_name, id), # composite key; make primary key by combining multiple key
    -- unique(username, email)  # composite UNIQUE; make unique by combining multiple attributes
)
```

### INSERT 

```sql
insert into
  students (name, email, age, status)
values
  ('John Doe', 'john.doe@example.com', 20, 'active');
```

### ALTER

```sql
-- Rename table 'employ' to 'employee'
ALTER TABLE employ RENAME TO employee;
```

```sql
-- Add a column 'email' to 'employee'
ALTER TABLE employee ADD COLUMN email VARCHAR(50);
```

```sql
-- Drop the 'email' column from 'employee'
ALTER TABLE employee DROP COLUMN email;
```

```sql
-- Rename column 'name' to 'user_name' in 'employee'
ALTER TABLE employee RENAME COLUMN name TO user_name;
```

```sql
-- Change the data type of 'user_name' column to VARCHAR(50) in 'employee'
ALTER TABLE employee ALTER COLUMN user_name TYPE VARCHAR(50);
```

```sql
-- Set NOT NULL constraint on 'age' column in 'employee'
ALTER TABLE employee ALTER COLUMN age SET NOT NULL;
```

```sql
-- Drop NOT NULL constraint from 'age' column in 'employee'
ALTER TABLE employee ALTER COLUMN age DROP NOT NULL;
```

```sql
alter table employee
  add constraint pk_employee_id primary key(id);
```

```sql
alter table employee
add constraint unique_employee_age unique(age);

alter table employee
drop constraint unique_employee_age;
```

### SELECT

```sql title="Aliases and Shorting"
select first_name as "Given Name", age as "বয়স", country from students order by age desc
```
 
```sql 
select distinct country from students
```

```sql
select first_name, age, country from students where country='BD';
```

```sql
-- Filtering rows using WHERE clause
select * from students where age > 20;
```

```sql
-- Filtering rows using WHERE clause with multiple conditions
select * from students where age > 20 and country = 'BD';
```

```sql
select grade, course from students where (grade='A' or grade='B') and (course='Computer Science' or course='Data Science');
```

```sql title="NOT Operator"
select country from students where not country='BD';
```

```sql title="IN Operator"
select country from students where country in ('BD', 'Ireland');
```

```sql title="NOT IN Operator"
select country from students where country not in ('BD', 'Ireland');
```

```sql title="LIKE Operator"
select country from students where country like 'B%';
```

```sql title="ILIKE Operator"
-- ilike is case insensitive like operator
select country from students where country ilike '%b';
```

```sql title="BETWEEN Operator"
select country from students where age between 20 and 30;
```

## Built-in Functions Scalar Functions

```sql
select upper(country) from students;
select lower(country) from students;
select length(country) from students;
select substring(country, 1, 3) from students;
select concat(country, ' is a country') from students;

## Aggregate Functions

```sql
select count(*) from students;
select count(country) from students;
select count(distinct country) from students;
select sum(age) from students;
select avg(age) from students;
select max(age) from students;
select min(age) from students;
```


