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
>
> - **INNER JOIN**: Returns only the rows where there is a match in both tables.
> - **LEFT JOIN** (or LEFT OUTER JOIN): Returns all rows from the left table, and the matched rows from the right table. Rows from the left table with no match in the right table will still be included with NULLs for columns from the right table.
> - **RIGHT JOIN** (or RIGHT OUTER JOIN): Returns all rows from the right table, and the matched rows from the left table. Rows from the right table with no match in the left table will be included with NULLs for columns from the left table.
> - **FULL JOIN** (or FULL OUTER JOIN): Returns all rows when there is a match in either table, including rows with no match in one of the tables. Non-matching columns will have NULL values.

### INNER JOIN

```sql title="INNER JOIN"
select title, userName from posts join users on posts.user_id = users.id;

-- if both tables have the same column name, we can use the table name to prefix the column name.
select posts.id, title, userName from posts join users on posts.user_id = users.id;

-- we can also use aliases for the tables.
select p.id, title, userName from posts p join users u on p.user_id = u.id;

```

> If both tables have a column with the same name that you want to join on, you can use the `USING` keyword to join the tables.

```sql
select title, userName from posts join users using (user_id);
-- posts.user_id = users.user_id and using (user_id) is the same
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

## EXTRACT

> EXTRACT is used to extract a part of the date from a date/time value.

```sql
select extract(year from created_at) from posts;
-- output: 2025, 2026, 2027, 2028, 2029, 2030

select extract(month from created_at) from posts;
-- output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

select extract(day from created_at) from posts;
-- output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

select extract(hour from created_at) from posts;
-- output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23

select extract(minute from created_at) from posts;
-- output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
```

## SUB QUERY

> SUB QUERY is a query within a query.

```sql

-- Find which employee gets the highest salary
select * from employees where salary = (select max(salary) from employees);
-- here the subquery is used to find the highest salary and the main query is used to find the employee who gets the highest salary.

-- Here this is the subquery which is used to find the highest salary. it is also called outer query.
-- select max(salary) from employees;

-- this is the main query which is used to find the employee who gets the highest salary.
-- select * from employees where salary
```

### EXISTS

> EXISTS is used to check if the subquery returns any rows. it returns true if the subquery returns any rows, otherwise it returns false.

```sql
select * from employees where exists (select 1 from employees where salary > 100000);
```

### NOT EXISTS

> NOT EXISTS subquery is used to check if the subquery returns no rows.

```sql
select * from employees where not exists (select 1 from employees where salary > 100000);
```

## CustomFunctions in PostgreSQL

> Custom functions in PostgreSQL are user-defined functions that can be used to perform custom operations on the data.

```sql
create function get_employee_salary(employee_id int)
returns int
language sql
 as
 $$
    select salary from employees where id = employee_id;
$$

-- Function call
select get_employee_salary(1);
```
