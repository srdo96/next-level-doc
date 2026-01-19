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

