# Module 19: PostgreSQL Essential

## NULL 

> For NULL we have to use IS or IS NOT operator. Otherwise it will always return NULL.

```sql
select * from students where email is null;
select * from students where email is not null;
```
COALESCE Function

> COALESCE function is used to return the first non-null value from the list of arguments. coalesce(null, null, 3, 5) will return 3.

```sql

- If email is null, then return 'N/A'
select id, coalesce(email, 'N/A') as email from students;
-- output: 
-- 1, N/A
-- 2, john.doe@example.com
```

## LIMIT and OFFSET Pagination

> LIMIT is used to limit the number of rows returned by the query. OFFSET is used to skip the number of rows returned by the query.

```sql
select * from students limit 5;

-- Skip first 2 rows and return next 5 rows
select * from students limit 5 offset 2;
```

for pagination we can use the following query:

```sql

select * from students limit 5 offset 5 * 0
select * from students limit 5 offset 5 * 1
select * from students limit 5 offset 5 * 2

select * from students limit 5 offset (page - 1) * limit;

-- Example:
-- page 1: select * from students limit 5 offset 0;
-- page 2: select * from students limit 5 offset 5;
-- page 3: select * from students limit 5 offset 10;

```

## UPDATE

```sql
update students set email = 'john.doe@example.com' where id = 1;
```

## DELETE

```sql
delete from students where id = 1;
```

## GROUP BY

```sql
select country, count(*) from students group by country;
```

## HAVING

> HAVING is used to filter the groups returned by the GROUP BY clause.

```sql
select country, count(*) from students group by country having count(*) > 4;
```

## Foreign Key

```sql
create table courses (
    id integer primary key generated always as identity,
    name varchar(100) not null
);

create table students (
    id integer primary key generated always as identity,
    name varchar(100) not null,
    course_id int not null references courses(id)
);
```

## JOIN

> There are four main types of joins in SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.
> - **INNER JOIN**: Returns only the rows where there is a match in both tables.
> - **LEFT JOIN** (or LEFT OUTER JOIN): Returns all rows from the left table, and the matched rows from the right table. Rows from the left table with no match in the right table will still be included with NULLs for columns from the right table.
> - **RIGHT JOIN** (or RIGHT OUTER JOIN): Returns all rows from the right table, and the matched rows from the left table. Rows from the right table with no match in the left table will be included with NULLs for columns from the left table.
> - **FULL JOIN** (or FULL OUTER JOIN): Returns all rows when there is a match in either table, including rows with no match in one of the tables. Non-matching columns will have NULL values.

 
```sql title="INNER JOIN" 
select title, userName from posts join users on posts.user_id = users.id;

-- if both tables have the same column name, we can use the table name to prefix the column name.
select posts.id, title, userName from posts join users on posts.user_id = users.id;

-- we can also use aliases for the tables.
select p.id, title, userName from posts p join users u on p.user_id = u.id;
```

### LEFT JOIN (LEFT OUTER JOIN)

```sql title="LEFT JOIN (LEFT OUTER JOIN)"
select * from students left join courses on students.course_id = courses.id;
```

### RIGHT JOIN (RIGHT OUTER JOIN)

```sql title="RIGHT JOIN (RIGHT OUTER JOIN)"
select * from students right join courses on students.course_id = courses.id;
```

### FULL JOIN (FULL OUTER JOIN)

```sql title="FULL JOIN (FULL OUTER JOIN)"
select * from students full join courses on students.course_id = courses.id;
```

### CROSS JOIN

```sql title="CROSS JOIN"
select * from students cross join courses;
```

> A CROSS JOIN returns the Cartesian product of two tables, meaning it combines each row from the first table with every row from the second table, resulting in all possible row combinations.

### NATURAL JOIN

```sql title="NATURAL JOIN"
select * from students natural join courses;
```

> A NATURAL JOIN returns the Cartesian product of two tables, meaning it combines each row from the first table with every row from the second table, resulting in all possible row combinations.