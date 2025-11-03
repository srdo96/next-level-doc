# Module 2: JavaScript Data Transformation and Aggregation

---

## 2-1 Objects limitations and Map Introduction

### Limitations of JavaScript Objects

- **Key types are always strings or symbols**: Even if you use numbers, boolean or objects as keys, they are automatically converted to strings.

  ```js
  const obj = {};
  obj[5] = "five";
  console.log(obj["5"]); // 'five'
  ```

- **Objects as Keys**: If you use an object as a key in another object, JavaScript converts the object key to the string `"[object Object]"`, which can lead to unexpected overwriting.

```js title="Common Variable"
const course1 = { name: "MERN" };
const course2 = { name: "Go" };
```

```js title="Using Object"
const obj = {};
obj[course1] = { id: "level 1" }; // This gets saved under "[object Object]"
obj[course2] = { id: "level 2" }; // This also gets saved under "[object Object]", overwriting the previous value

console.log(obj); // Output: { '[object Object]': {id: "level 2"} }
```

Both entries overwrite each other because the key becomes the same string, losing the association between each `course` and their `obj`.

To overcome this limitation we can use JavaScript Built-in data stricture `Map`

:::info
`Map` এ যেকোন ডাটা টাইপকে অবজেক্টের কি হিসাবে রাখা যায়। `Map` object's এর এই `‍‍key` data কে string এ convert করে না।
:::

```js title="Using Map"
const pHero = new Map();

pHero.set(course1, { id: "level 1" }); // Map allows course1 object as key
pHero.set(course2, { id: "level 2" }); // Map allows course2 object as key

console.log(pHero.get(course1)); // Output: { id: "level 1" }
console.log(pHero);
// Output: Map(2) { { name: "MERN" } => { id: "level 1" }, { name: "Go" } => { id: "level 2" } }
```

### Common Map Methods

#### 1. `set(key, value)`

Adds or updates an element with a specified key and value.

```js
pHero.set(course1, { id: "level 1" });
pHero.set(course2, { id: "level 2" });
```

#### 2. `get(key)`

Retrieves the value for a given key.

```js
console.log(pHero.get(course1));
// Output: { id: "level 1" }
```

#### 3. `has(key)`

Checks if a key exists in the Map. Return `Boolean` value

```js
console.log(pHero.has(course1)); // true
console.log(pHero.has(course5)); // false
```

#### 4. `size`

Returns the number of elements in the Map.

```js
console.log(pHero.size); // 2
```

#### 5. `delete(key)`

Removes an element by key.

```js
pHero.delete(course1);
console.log(pHero); // Map(1) { id: "level 2" }
```

#### 6. `clear()`

Removes all elements from the Map.

```js
pHero.clear();
console.log(pHero.size); // 0
```

#### 7. Iterating over a Map

we can use `forEach`, `for...of`

```js title="Using forEach Method"
pHero.forEach((value, key) => {
  console.log(key, value);
});

// Renaming key name of obj using forEach
pHero.forEach((value, key) => (key.name = "S3 " + key.name));
// {name: "S3 MERN"}, {name: "S3 Go"}
```

```js title="Using for...of loop"
for (const [key, value] of pHero) {
  console.log(key, value);
}

for (let key of pHero.keys()) {
  key.name = "S3 " + key.name;
}
// {name: "S3 MERN"}, {name: "S3 Go"}
```

#### 8. `keys()` and `values()`

They gives an iterator. By using this we can apply spread operation

```js
console.log([...pHero.keys()]); // [{ name: "MERN" }, { name: "Go" }]
console.log([...pHero.values()]); // [{ id: "level 1" }, { id: "level 2" }]
```

#### 9. `entries()`

It return a new iterator obj that contains an array of `[key, value]` pairs for each element

```js
const courses = [
  ["MERN", "l1"],
  ["Go", "l2"],
];
const pHeroMap = new Map(courses); // Map { MERN → "l1", Go → "l2" }
```

You can also use the spread operator to convert the Map entries into an array:

```js
const allEntries = [...pHero.entries()];
console.log(allEntries);
// Output: [ [ { name: "MERN" }, { id: "level 1" } ], [ { name: "Go" }, { id: "level 2" } ] ]
```

## 2-3 Sorting And Flattening Array Explained

### Sorting Arrays in JavaScript with `sort()`

#### Basic usage:

when call `array.sort()`, it converts elements to strings and sorts them

```js
const fruits = ["banana", "apple", "cherry"];
console.log(fruits.sort()); // ["apple", "banana", "cherry"]

const scores = [40, 100, 1, 5, 25, 10];
console.log(scores.sort()); // [ 1, 10, 100, 25, 40, 5 ]
```

#### Sorting numbers:

- If the compare function returns a negative number, a comes before b.
- If it returns a positive number, a comes after b.
- If it returns zero, their order stays the same.

```js title="ascending"
const numbers = [12, 5, 21, 2];
numbers.sort((a, b) => a - b);
console.log(numbers); // [2, 5, 12, 21]
```

```js title="descending"
const numbers = [12, 5, 21, 2];
numbers.sort((a, b) => b - a);
console.log(numbers); // [21, 12, 5, 2]
```

#### Case sensitive String

```js
const fruits = ["Banana", "apple", "Cherry", "date"];
fruits.sort((a, b) => a.localeCompare(b));
console.log(fruits);
// Output: [ 'apple', 'banana', 'Cherry', "date" ]
```

### Using the `flat()` Method to Flatten Arrays

The `flat()` method in JavaScript creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

#### Basic Syntax

```js
const arr = [1, 2, [3, 4]];
const flatArr = arr.flat();
console.log(flatArr); // [1, 2, 3, 4]
```

#### Flattening Nested Arrays to a Certain Depth

It make all nested array into a single array

```js
const arr = [1, 2, [3, 4, [5, 6]]];
console.log(arr.flat(1)); // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6]
```

#### Flattening All Levels (Infinite Depth)

Use `Infinity` to flatten any level of nested arrays:

```js
const deeplyNested = [1, [2, [3, [4]]]];
console.log(deeplyNested.flat(Infinity)); // [1, 2, 3, 4]
```

## 2-4 Array cross matching and Array.from() explained

#### `Some()`

It check whether at least one element in an array satisfies a condition which is given in a callback function. It return `boolean` value

```js
const num = [1, 2, 3, 4, 5];
const hasEvenNumber = num.some((n) => n % 2 === 0);
console.log(hasEvenNumber); // true
```

```js title="role checking"
const currentUserRole = ["user", "manager"];
const accessRoles = ["admin", "manager"];
const canAccess = currentUserRole.some((role) => accessRoles.includes(role));
console.log(canAccess); // false
```

:::note
It stop running it finds first truthy result.
:::

### `Array.from()`

```js title="Python Like Range function"
const range = (start, end, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, i) => start + i * step
  );
```
