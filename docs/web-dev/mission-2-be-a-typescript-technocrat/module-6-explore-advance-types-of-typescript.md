# Module 6: Explore Advance Types of Typescript

---

## 6-1 Type Assertion

Type assertion in TypeScript is a way to tell the compiler "trust me, I know what I'm doing" about the type of a value. You can use angle-bracket (`<Type>`) or `as` syntax.

### Example - Type Assertion using `as`

```ts
let someValue: unknown = "Hello World!";
let strLength: number = (someValue as string).length;
console.log(strLength); // 12
```

### Example - Type Assertion using angle-bracket

```ts
let anotherValue: any = 123.456;
let intValue: number = <number>anotherValue;
console.log(intValue); // 123.456
```

> **Note:** Type assertion doesn't actually change the type at runtime, it just tells the TypeScript compiler to assume a certain type.

## 6-2 Type Interface

An interface in TypeScript is like a blueprint for objects. It tells you what properties and methods an object should have, so TypeScript can check if your object matches the blueprint.

```ts
interface IUser {
    name: string;
    age: number;
}
interface IUserWithRole extends IUser {
    role: "admin" | "user";
}

const user1: IUserWithRole = { name: "Robin", age: 30, role: "admin" };

interface IFriends {
    [index: number]: string;
}

const friends: IFriends = ["A", "B", "C"];
```

> **Note:** Interface only work on `Object` type in js `array`, `object`, `function`

## 6-3 Generics in TypeScript

Generics allow you to write reusable and flexible code that works with any type.

```ts
type GenericArray<T> = Array<T>;

const userList: GenericArray<{ name: string; age: number }> = [
    { name: "Rakib Rahman", age: 42 },
];
const runList: GenericArray<number> = [12, 43, 66, 22];
```

## 6-4 Generics with interface

```ts
interface Developer<T, X = null> {
    name: string;
    salary: number;
    device: {
        brand: string;
        model: string;
    };
    smartWatch: T;
    bike?: X;
}

interface NonBrandWatch {
    heartRate: string;
    stopwatch: boolean;
}
interface BrandWatch {
    heartRate: string;
    callSupport: boolean;
    calculator: boolean;
    NC: boolean;
}

const dev1: Developer<NonBrandWatch, { brand: "HERO"; cc: "200cc" }> = {
    name: "Mr. Dev1",
    salary: 200,
    device: {
        brand: "Asus",
        model: "S510",
    },
    smartWatch: {
        heartRate: "80bpm",
        stopwatch: true,
    },
    bike: {},
};

const dev2: Developer<BrandWatch> = {
    name: "Mr. Dev2",
    salary: 100,
    device: {
        brand: "hp",
        model: "X34",
    },
    smartWatch: {
        heartRate: "75bpm",
        callSupport: true,
        calculator: true,
        NC: false,
    },
    bike = null,
};
```

## 6-5 Generics with function

```ts
// Generic Function
const createArrayWithGeneric = <T>(value: T): T[] => {
    return [value];
};

const numberArray = createArrayWithGeneric(123); // number[]
const stringArray = createArrayWithGeneric("hello"); // string[]
const booleanArray = createArrayWithGeneric<boolean>(true); // boolean[]

// Generic Tuple
const createArrayTupleWithGeneric = <X, Y>(param1: X, param2: Y) => {
    [param1, param2];
};
const tuple1 = createArrayTupleWithGeneric("Laptop", false);
```

## 6-6 Constraint in typescript

// Constraints make sure generics only accept certain types. Set rules for generics using `extends`

```ts
const addStudent = <T extends { id: number; name: string }>(studentInfo: T) => {
    return { Course: "Programming", ...studentInfo };
};

const s1 = { id: 123, name: "Dev1", useLinux: true };
const result = addStudent(s1);
```

## 6-7 keyof constraint with generics

```ts
type popularVehicle = {
    car: sting;
    bike: string;
    cng: string;
};

type myFav = keyof popularVehicle;
const myVehicle: myFav = "car";

type userType = {
    id: number;
    name: string;
    address: {
        home: string;
        roadNo: number;
    };
};
const user1: userType = {
    id: 123,
    name: "Hasan",
    address: {
        home: "Dhaka",
        roadNo: 1,
    },
};

const getPropertyFromObj = (obj: userType, key: keyof userType) => {
    return obj[key];
};
// generic
const getPropertyFromObj = <T>(obj: T, key: keyof T) => {
    return obj[key];
};
const result = getPropertyFromObj(user1, "name");
```

## 6-8 Explore Enum

// Enum lets you create a list of named values in TypeScript.

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

const move = (dir: Direction) => {
    console.log(`Moving ${Direction[dir]}`);
};

move(Direction.Up); // Output: Moving Up
```

> **Note:** To use enum in node. we have to use `--experimental-transform-types` flag

:::warning
In TypeScript `enum` are not recommended because they generate runtime code, break with bundlers, behave inconsistently, and are easily replaced by safer `union` types or `as const` objects.
:::

## 6-9 Use as const instead of enum

```ts
// You can use "as const" with objects to get enum-like behavior in TypeScript

const Directions = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
} as const;

type Direction = (typeof Directions)[keyof typeof Directions];

const move = (dir: Direction) => {
    console.log(`Moving ${dir}`);
};

move(Directions.Up); // Output: Moving Up
```

## 6-10 Explore conditional type

```ts
type A = null;
type B = undefined;
type C = A extends null ? true : false;

type vehicle = {
    bike: string;
    car: string;
    ship: string;
};
type checkVehicle<T> = T extends keyof vehicle ? true : false;
type hasBike = checkVehicle<"cycle">;
```

## 6-11 Explore mapped types

```ts
type Person = {
    name: string;
    age: number;
    email: string;
};

// Make all properties of Person optional
type PartialPerson = {
    [Key in keyof Person]?: Person[Key];
};

// Make all properties of Person readonly
type ReadonlyPerson = {
    readonly [Key in keyof Person]: Person[Key];
};

// Example usage
const partial: PartialPerson = { name: "Jibon" }; // age and email are optional

const readonlyPerson: ReadonlyPerson = {
    name: "Jahid",
    age: 30,
    email: "jahid@example.com",
};

type GenericReadonlyPerson<T> = {
    readonly [Key in keyof T]: T[Key];
};
const p1: GenericReadonlyPerson<{ name: string; age: number }> = {
    name: "Hasan",
    age: 20,
};
```

## 6-12 Explore Utility types

```ts
type PersonType = {
    id: number;
    name: string;
    age?: number;
};

// Partial<T> make optional
type PartialVehicle = Partial<PersonType>;

const partialVehicle: PartialVehicle = { id: 123 };

// Required<T>
type RequiredPerson = Required<Person>;

const person1: RequiredPerson = {
    id: 123
    name: "Hasib",
    age: 25,
};

// Readonly<T>
type ReadonlyVehicle = Readonly<{
    bike: string;
    car: string;
    ship: string;
}>;

const readonlyVehicle: ReadonlyVehicle = {
    bike: "Hero",
    car: "BMW",
    ship: "Titanic",
};
// readonlyVehicle.bike = "Yamaha"; // Error: Cannot assign to 'bike' because it is a read-only property

// Record<K, T>
type CountryCode = "BD" | "US" | "UK";
type CountryCallingCodes = Record<CountryCode, string>;

const callingCodes: CountryCallingCodes = {
    BD: "+880",
    US: "+1",
    UK: "+44",
};

// Pick<T, K>
type FullPerson = {
    name: string;
    age: number;
    email: string;
};

type PersonNameAndEmail = Pick<FullPerson, "name" | "email">;

const nameAndEmail: PersonNameAndEmail = {
    name: "Rafi",
    email: "rafi@example.com",
};

// Omit<T, K>
type PersonWithoutEmail = Omit<FullPerson, "email">;

const personWithoutEmail: PersonWithoutEmail = {
    name: "Sumaiya",
    age: 22,
};

// Exclude<T, U>
type Letters = "A" | "B" | "C";
type ExcludedLetters = Exclude<Letters, "A">; // "B" | "C"

// Extract<T, U>
type Numbers = 1 | 2 | 3;
type ExtractedNumbers = Extract<Numbers, 2 | 3 | 4>; // 2 | 3

// NonNullable<T>
type NullableType = string | null | undefined;
type NonNullableType = NonNullable<NullableType>; // string

// ReturnType<T>
function getUser() {
    return { name: "Karim", age: 28 };
}
type UserType = ReturnType<typeof getUser>;

// Parameters<T>
function sum(a: number, b: number): number {
    return a + b;
}
type SumParameters = Parameters<typeof sum>; // [number, number]
```
