# Module 5 Explore The Basic Types Of Typescript

---

## 5-1,2 Install NodeJs using NVM

To install NodeJs using NVM, you first need to uninstall your current NodeJs version. Since NVM is a tool for managing NodeJs versions, follow the steps below:

-   if you are using Windows Go to **Settings** → **Apps** → **Installed apps** search for **Node.js** and uninstall it.
-   Delete **npm cache** & **config folders**

    > 💡 Cleanup leftover npm folders <br/>
    > After uninstalling Node.js, delete these folders if they exist:

    ```text
    %AppData%\npm                 # Global npm packages (user-specific)
    %AppData%\npm-cache           # npm package cache
    %LocalAppData%\npm-cache      # Additional cache (Windows-specific)
    C:\npm                        # Your custom global prefix (if used)
    ```

### Now You Are Ready To Install Node.js

1. Go to [https://www.nvmnode.com/guide/download.html](https://www.nvmnode.com/guide/download.html)
2. Download and install **NVM for Windows** (use the `nvm-setup.exe` installer — it’s recommended for most users).

    > 💡 **After installation, open a new Command Prompt (CMD) or PowerShell**  
    > _(You must open a new terminal for nvm to be recognized.)_

3) Verify that NVM is installed

    ```bash
    nvm --version
    ```

    ✅ You should see a version number like `1.1.12` or `1.2.2`.

    :::warning
    If you get `'nvm' is not recognized`..., restart your computer or double-check that the installer added NVM to your system PATH.
    :::

4) Install a Node.js version

    ```bash
    nvm install <version>
    ```

    > 📌 This downloads Node.js and npm together into your NVM-managed directory (e.g., `C:\Users\<you>\AppData\Roaming\nvm`).

5) Use the installed version

    ```bash
    nvm use <version>
    ```

6) Confirm Node.js and npm are working

    ```js
    node - v;
    npm - v;

    // You should see something like:
    // v24.11.0
    // 11.6.1
    ```

    > 🎉 Congratulations! You now have a clean, NVM-managed Node.js environment — ready for TypeScript, DSA practice, and more

## 5-4 Explore Primitive Types

**Primitive Data Type:**

-   **JavaScript & TypeScript** share: `string`, `number`, `boolean`, `undefined`, `null`
-   **TypeScript only:** `never`, `unknown`, `void`, `any`

**`any` type in TypeScript**

The `any` type is a special TypeScript type that disables type checking for a variable. When you use `any`, you are telling the compiler: "I don't care what type this is just trust me Bro!"

```ts showLineNumbers
let someValue: any = "Hello";
someValue = 42;
someValue = { message: "Now it's an object" };
```

:::info
By using Typescript we can detect Bug in Development phase rather at Runtime
:::

## 5-5 Explore Non Primitive Types

**Non Primitive Data Type:**

-   Js and Ts: `array`, `object`
-   TS Only: `tuple`

**Tuple Example in TypeScript**

A tuple is a special array type with fixed length and known types for each element.

```ts showLineNumbers
// A tuple with a string and a number
let user: [string, number];

user = ["Hasan", 30];
```

You can also specify more complex types and lengths:

```ts showLineNumbers
let point: [number, number, number] = [1, 4, 9];
let personInfo: [string, number?, boolean?]; // Optional tuple elements

personInfo = ["Jamal"];
personInfo = ["Jakir", 28, true];
```

## 5-6 Object , Literal & Optional Type

**Optional Type in TypeScript**

You can make properties, parameters, or tuple elements optional by adding a `?`. This means the value is not required and can be `undefined`.

**Example: Optional property in an object**

```ts showLineNumbers
const user: {
    firstName: string;
    middleName?: string; // ? use fro optional type
    lastName: string;
} = {
    firstName: "Naruto",
    lastName: "Uzumaki",
};
```

**Literal Type:**  
A type that allows only a specific value (like a constant). Example: `let color: "red";` means `color` can only be `"red"`.

## 5-7 Function in typescript

```ts showLineNumbers
function add(num1: number, num2: number): number {
    return num1 + num2;
}
```

Methods in Object

```ts
const poorUser = {
    name: "user1",
    balance: 0,
    addBalance(value: number): number {
        return this.balance + value;
    },
};
```

```ts
[1, 4, 6].map((e: number): number => e * e);
```

## 5-8 Rest & Spread Operator

### Spread & Rest Operator in TypeScript

**Spread** (`...`): Expands elements (array/object) in a new container.

```ts
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4]; // [1,2,3,4]
```

**Rest** (`...`): Collects multiple values into an array/tuple/params.

```ts
function sum(...nums: number[]) {
    return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);
```

## 5-9 Destructuring in typescript

### Array Destructuring

```ts
const numbers = [10, 20, 30, 40];
const [, second, ...rest] = numbers; // skip first value using ,
```

### Object Destructuring

```ts
const user = {
    name: {
        firstName: "Hasan",
        lastName: "Khan",
    },
    age: 22,
};
const {
    name: { firstName },
    age,
} = user;
```

## 5-10 Type Alias in typescript

Using Type alias we can reuse type

### Type Alias

```ts
type User = {
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
};

const user1: User = {
    id: 1,
    name: "Anis",
    email: "anis@mail.com",
    status: "active",
};
```

Function Type Alias

```ts
type AddFunc = (num1: number, num2: number) => number;
const add: AddFunc = (num1, num2) => num1 + num2;
```

## 5-11 Union & intersection types

### Union Types (`|`)

```ts
type Status = "active" | "inactive" | "pending";

let currentStatus: Status = "active";
currentStatus = "pending";
```

Union types allow a variable to be one of several types:

```ts
type StringOrNumber = string | number;

let data: StringOrNumber;
data = 101;
data = "hello";
```

### Intersection Types (`&`)

Intersection types combine multiple types into one. The new type will have all properties from all types.

```ts
type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: number;
    department: string;
};

// Intersection with '&'
type EmployeeInfo = Person & Employee;

const emp: EmployeeInfo = {
    name: "Shamim",
    age: 28,
    employeeId: 1001,
    department: "IT",
};
```

## 5-12 ternary, nullish coalescing & optional chaining

### Ternary Operator (`?`)

Ternary is a shortcut if-else in one line: condition ? valueIfTrue : valueIfFalse

```ts
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"
```

### Nullish Coalescing Operator (`??`)

returns the left operand if it is not `null` or `undefined`; otherwise, it returns the right operand. Syntax: `const value = x ?? y;`

```ts
let input: string | undefined = undefined;
const name = input ?? "Guest";
console.log(name); // "Guest"
```

### Optional Chaining (`?.`)

Can safely access deeply nested properties without worrying about errors if a reference is `null` or `undefined`.  
**Syntax:** `obj?.prop?.key` returns `undefined` instead of throwing if `obj` or `prop` is missing.

```ts
type User = {
    profile?: {
        email?: string;
    };
};

const user: User = {};
console.log(user.profile?.email); // undefined
```

## 5-13 nullable, unknown & never type

### 1. Nullable Type (`null`, `undefined`)

TypeScript allows types that can be `null` or `undefined` using union types.

```ts
let comment: string | null = null; // can be string or null
let data: number | undefined = undefined; // can be number or undefined

function getName(name?: string): string | undefined {
    return name;
}
```

### 2. `unknown` Type

`unknown` is a type-safe counterpart of `any`. You can't use a value of type `unknown` without narrowing it.

```ts
let something: unknown;

something = 123;
something = "hello";

if (typeof something === "string") {
    // Now TypeScript knows it's a string!
    console.log(something.toUpperCase());
}
```

### 3. `never` Type

`never` indicates a value that never occurs. Usually used for functions that never return (throws or infinite loops).

```ts
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```
