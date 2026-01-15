# Module 16: Database Normalization - PostgreSQL Installation

## Database Normalization

Normalization is a process used to organize data efficiently in a database. It avoid anomalies and reduce redundancy in the database.

### What is an Anomaly?

Anomalies in databases are inconsistencies or errors that can occur when data is stored in a non-normalized or poorly structured manner. These issues arise when all data is kept in a single table or when redundancy exists.

There are three main types of anomalies:

---

### 1. **Insertion Anomaly**

**Problem:** Occurs when certain attributes cannot be inserted into the database without the presence of other attributes.

**Example Table:**

| StudentID | StudentName | Course | Instructor |
| --------- | ----------- | ------ | ---------- |
| 1         | Alice       | DBMS   | Mr. Sami   |
| 2         | Bob         | OOP    | Mrs. Laila |

Suppose a new course "Networking" is to be offered, but there are no students enrolled yet. You can't insert (null, null, Networking, Mr. Riaz) because StudentID and StudentName are required.

---

### 2. **Update Anomaly**

**Problem:** Occurs when redundant data exists, so updating one instance of data requires updating all other instances.

**Example Table:**

| StudentID | StudentName | Course | Instructor |
| --------- | ----------- | ------ | ---------- |
| 1         | Alice       | DBMS   | Mr. Sami   |
| 2         | Bob         | DBMS   | Mr. Sami   |

If Mr. Sami changes his name to Mr. Khalid, every row for DBMS taught by Mr. Sami must be updated. Missing any row leads to inconsistency.

---

### 3. **Deletion Anomaly**

**Problem:** Occurs when deletion of an entry inadvertently removes additional, valuable information.

**Example Table:**

| StudentID | StudentName | Course     | Instructor |
| --------- | ----------- | ---------- | ---------- |
| 3         | John        | Networking | Mr. Riaz   |

If the only student enrolled in "Networking" (John) leaves and you delete his row, information about the "Networking" course and its instructor is lost from the table.

---

### First Normal Form (1NF) Rules

1. The table must have a primary key that uniquely identifies each row.
2. Every attribute in the table must contain only atomic (indivisible) values—no repeating groups or arrays.

### Second Normal Form (2NF) Rules

1. The table is already in 1NF.
2. Every non-key attribute in the table must be fully functionally dependent on the primary key.

**Example:**

Suppose we have the following table (not in 2NF):

| StudentID | Course | Instructor | Grade |
| --------- | ------ | ---------- | ----- |
| 1         | DBMS   | Mr. Sami   | A     |
| 1         | OOP    | Mrs. Laila | B     |
| 2         | DBMS   | Mr. Sami   | B     |

Here, the primary key is the combination of (StudentID, Course). However, the attribute "Instructor" depends only on the "Course", not on the full primary key.

**To convert to 2NF:**

-   Separate the instructor information into its own table.

**StudentCourse Table:**

| StudentID | Course | Grade |
| --------- | ------ | ----- |
| 1         | DBMS   | A     |
| 1         | OOP    | B     |
| 2         | DBMS   | B     |

**CourseInstructor Table:**

| Course | Instructor |
| ------ | ---------- |
| DBMS   | Mr. Sami   |
| OOP    | Mrs. Laila |

Now, all non-key attributes are fully dependent on the entire primary key.

### Third Normal Form (3NF) Rules

1. The table must already meet all the requirements of 2NF.
2. There should be **no transitive dependencies**; that is, every non-key attribute must depend **directly** on the primary key, not through another non-key attribute.

#### What is a transitive dependency?

if A -> B -> C, A -> C is a transitive dependency.

A transitive dependency occurs when a non-key attribute depends on another non-key attribute, rather than directly on the primary key.

**Example:**

Suppose we have this table:

| StudentID | Course | Instructor | InstructorEmail |
| --------- | ------ | ---------- | --------------- |
| 1         | DBMS   | Mr. Sami   | sami@gmail.com  |
| 2         | OOP    | Mrs. Laila | laila@gmail.com |
| 3         | DBMS   | Mr. Sami   | sami@gmail.com  |

Here, the primary key is the combination of (StudentID, Course).

-   "InstructorEmail" is dependent on "Instructor", not directly on (StudentID, Course). This is a transitive dependency.

**To bring the table to 3NF:**

-   Move instructor details (name and email) to a separate table.

**StudentCourse Table:**

| StudentID | Course |
| --------- | ------ |
| 1         | DBMS   |
| 2         | OOP    |
| 3         | DBMS   |

**Instructor Table:**

| Course | Instructor | InstructorEmail |
| ------ | ---------- | --------------- |
| DBMS   | Mr. Sami   | sami@gmail.com  |
| OOP    | Mrs. Laila | laila@gmail.com |

## PostgreSQL Installation For Linux Arch

```bash title="PostgreSQL Install"
sudo pacman -S postgresql
```

2. Initialize the database cluster

```bash
sudo -iu postgres
initdb --locale=en_US.UTF-8 -D /var/lib/postgres/data
exit
```

3. Start and enable the database server

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

4. Access PostgreSQL CLI

```bash
sudo -iu postgres
psql
\q # Exit psql
```

5. Create a new database & user

```bash
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

6. Connect as your user

```bash
psql -U myuser -d mydb
```

7. Authentication config (if get authentication error)

```bash
sudo nvim /var/lib/postgres/data/pg_hba.conf
# Change this
local  all  all peer
# To this
local  all  all md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```
