# Module 15: Database Fundamentals - Relational Data Modeling

---

## 15-1: Anatomy of a Database

### Entity

-   A thing or object that have independent existence.
-   Can have physical existence or conceptual existence only.
-   Represents people, things, events, locations or concepts within the Target System.
-   In ER Diagram, represented with a Rectangle.

```mermaid
graph TD
    A[Entity]
```

Example: Student, Course, Enrollment, etc.

### Weak Entity

-   Do not have independent existence.
-   Always connected and dependent on other (Strong) entities.
-   May not have a key attribute.
-   Represented using a double rectangle.

**Example:** Enrollment, etc.
![Weak Entity](/img/weak_entity.png)

### Attributes

-   Properties that describe an entity.
-   These information or properties are required to operate the Target System.
-   Represented with an Oval in ER Diagram.

![Attributes](/img/attributes.png)

### Attributes - Simple and Composite

-   Composite: Can be divided into smaller parts. Example: Address, Name
-   Simple: Cannot be divided: age, email, age

![Simple and Composite Attributes](/img/attribute-simple-composite.png)

### Attributes - Single-Valued and Multi-Valued

-   Single-Valued: Can have only one value. Age
-   Multi-Valued: Can have a set of values: Educational Certificate
    Use double oval for multi-valued attributes.

![Single-Valued and Multi-Valued Attributes](/img/attribute-single-multi-valued.png)

### Attributes -Complex

Complex = Composite + Multi-Valued

Shipping Address(City, State, Country, Addr Line 1)

![Complex Attributes](/img/attribute-complex.png)

### Attributes - Derived and stored

-   Stored: Independent information. Need to stored. e.g Date of Birth
-   Derived: Can/should be calculated from other attributes. e.g Age, Full-Name

![Derived and Stored Attributes](/img/attribute-derived-stored.png)

### Attributes - Key Attributes

Attribute that identifies Entity uniquely - NID, Roll Number

-   Primary Key: The key attribute that is used to refer an Entity uniquely. e.g. NID, Student ID
-   Candidate Key: Key attributes other than Primary Key.
-   Composite Key: Primary key that was build with multiple attributes. e.g. ISBN+Member-ID

### Attributes - Null Values

When an attribute value -

-   Don't exists
-   Existence Unknown
-   Exists but missing
