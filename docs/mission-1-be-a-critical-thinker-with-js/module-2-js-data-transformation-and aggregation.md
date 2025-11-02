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

  ```js
  const student1 = { id: 101, name: "Asif" };
  const student2 = { id: 102, name: "Rasel" };

  const grades = {};
  grades[student1] = "A"; // This gets saved under "[object Object]"
  grades[student2] = "B"; // This also gets saved under "[object Object]", overwriting the previous value

  console.log(grades); // Output: { '[object Object]': 'B' }
  ```

  Both entries overwrite each other because the key becomes the same string, losing the association between each student and their grade.

To over this limitation we can use JavaScript Built-in data stricture `Map`

:::info
`Map` এ আমরা যেকোন ডাটা টাইপকে অবজেক্টের কি হিসাবে রাখতে পারি। `Map` এই key data কে string এ convert করবে না।
:::
