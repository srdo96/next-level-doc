# Module 1: Introduction to Critical Thinking and Data Structures

---

## 1-1: Intro to Module — What Do We Mean by Critical Thinking?

**Critical Thinking** is a skill। এটা আমরা চাইলেই অর্জন করতে পারি।  
Critical Thinking বলতে এখানে মাইন্ডসেটের মাঝে পরিবর্তন আনা। কিভাবে আমরা একটা প্রবলেমকে নিয়ে চিন্তা করছি, কিভাবে এপ্রোচ করছি।

### Components of Critical Thinking

1. **Knowing the tools and ideas available**
2. **Decomposing requirements into smaller parts**
3. **Seeing the big picture**

---

### 1) Knowing the Tools and Ideas

- Understand basic tools, concepts, and data structures that we can implement in daily problem-solving.

---

### 2) Decomposing Requirements

- Break down a given requirement into smaller, manageable pieces.
- Ask effective questions such as:
  - Who wants this software?
  - What is it used for?
  - What difficulties or edge cases could arise with this implementation?

---

### 3) Seeing the Big Picture

- Combine all smaller parts and check if the complete solution works correctly.
- Test thoroughly to ensure everything integrates smoothly.

---

## 1-2: How to Deconstruct Vague Problems and Think in Data Flow

**Frameworks:**

- Top-Down Approach
- Algorithmic Thinking

---

### Top-Down Approach

- Start with the main requirement and break it down into smaller, solvable parts.
- **Definition:** The top-down approach means breaking a big problem into smaller, manageable parts until each part is simple enough to solve directly.
- Also called **stepwise refinement**.
- Start from the top (main goal) and go down into the details.

---

### Algorithmic Thinking

- Solving problems **step by step** logically, like a computer would.
- Focuses on **inputs → processes → outputs**, not on coding syntax.

**Related Concepts:**

- Data Structure
- Algorithm
- Big-O Notation

---

## 1-3: Why Do We Even Need Data Structures?

**JavaScript Built-in Data Structures:**

- `Array`
- `Object`
- `Map` / `Set`

> নির্দিষ্ট কিছু টাস্ক পারফর্ম করার জন্য নির্দিষ্ট কিছু Data Organization Methods ব্যবহার করে টাস্কটিকে আরো ইফিশিয়েন্টভাবে ম্যানেজ করা যায়।

**We will also learn:**

- Linked List
- Stack
- Queue

---

## 1-4: What is an Algorithm?

**Definition:**  
An **algorithm** is a **step-by-step procedure** or set of rules to solve a specific problem or perform a specific task.

**Characteristics of an Algorithm:**

- Takes **input**
- Is **finite** (must end after a certain number of steps)
- Must be **clear, unambiguous, and effective**
- Produces **output**

**Algorithm Evaluation:**

- Use **Big-O notation** to determine which algorithm is **efficient and effective**.

## 1-5: The abstract idea of the Big-O notation

Using Big-O notation we can get

- Time Complexity,
- Space Complexity

using this we denote how much good or bad is a algorithm.

**Time Complexity:**
How much time (steps) the algorithm takes as the input size grows. Here the goal is run faster.

**Space Complexity:**
How much memory (RAM/storage) the algorithm needs as the input grows. Here the goal is use less memory.

### Some Common Big-O Notation

| Complexity     | Description                                                | Example                          |
| -------------- | ---------------------------------------------------------- | -------------------------------- |
| **O(1)**       | Constant timeConstant time — does not depend on input size | Accessing array element          |
| **O(log n)**   | Logarithmic time — grows slowly as input increases         | Binary search                    |
| **O(n)**       | Linear time — grows directly with input size               | Linear search                    |
| **O(n log n)** | Log-linear time — nearly linear but slightly steeper       | Merge Sort, Quick Sort           |
| **O(n²)**      | Quadratic time — nested loops over the same input          | Nested loops                     |
| **O(2ⁿ)**      | Exponential time — doubles with each additional input      | Recursive Fibonacci              |
| **O(n!)**      | Factorial time — grows extremely fast                      | Traveling Salesman (brute force) |

In algorithm, we don't measure real seconds, because real hardware, compilers, and environments differ.

Instead, we assume that each basic operation takes **1 Unit of Time**

![Time Complexity Graph](../../static/img/complexity_chart.png)

> When working with Big-O notation,
> we always focus on the worst-case

## 1-6 Visual Comparison of different time complexity

### Recognizing Patterns in Big-O Notation

#### O(n) — Linear Time Example

```js
for (let i = 0; i < n; i++) {
  // code that runs n times
}
```

**Key Points:**

- `n` = number of elements in the collection
- The number of operations increases proportionally to the size of the input
- Each element is visited once
- Examples: `arr.map()`, `arr.forEach()`, `arr.find()`

---

#### O(n²) — Quadratic Time Example (Nested Loops)

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // code that runs n * n times
  }
}
```

**Key Points:**

- Two nested loops, both looping over `n` elements
- Total operations: `n × n = n²`
- Performance drops quickly as `n` grows
- Example: basic implementations of Bubble Sort, checking all pairs in an array

#### O(1) — Constant Time Example

```js
function getFirstElement(arr) {
  return arr[0];
}
```

**Key Points:**

- Time taken does **not** depend on the size of the input (`n`)
- Only a single (or fixed number of) operation(s), no matter how big the array is
- Examples: accessing a specific element in an array, simple arithmetic, variable assignment

---

#### Multiple Loops (One After Another, Different Sizes)

```js
for (let i = 0; i < n; i++) {
  // code that runs n times
}

for (let j = 0; j < m; j++) {
  // code that runs m times
}
```

**Key Points:**

- The two loops are **not nested**—the first runs `n` times, then the second runs `m` times.
- Total operations: `n + m`
- In Big O notation:
  - If both `n` and `m` can grow independently, the time is **O(n + m)**.
  - If `m` is much smaller than `n`, or if `m` is a constant, we usually drop the smaller or constant terms.
  - Big O describes the upper bound, so we focus on the term that grows the fastest as the input increases.

#### Why does O(n + m) = O(n) when n > m?

- Suppose `n` is always greater than `m` (for example, `n = 1000`, `m = 10`). As you increase the size of `n`, the effect of `m` on the total runtime becomes less significant.
- In Big O notation, **lower-order terms are dropped** because they don't significantly affect growth as the input size increases.
- So, **O(n + m) = O(n)** if `n` dominates `m` (i.e., `n > m`).

---

#### What about n + n?

```js
for (let i = 0; i < n; i++) {
  // code that runs n times
}

for (let j = 0; j < n; j++) {
  // code that runs n times again
}
```

- The total operations here are `n + n = 2n`.
- In Big O notation, we drop constant factors (`2n` becomes just `n`), so this is still **O(n)**.

**Summary:**

- When two loops run one after another (not nested), add their counts.
- Drop constants and lower-order terms for Big O, so O(n + m) ≈ O(n) if n dominates, and O(2n) becomes O(n).

```js
for (let i = 0; i < n; i++) {
  // code that runs n times
}

for (let j = 0; j < m; j++) {
  // code that runs m times
}
```

**Key Points:**

- The two loops are **not nested**—the first runs `n` times, then the second runs `m` times.
- Total operations: `n + m`
- In Big O notation, if `n` and `m` can grow independently, the time is **O(n + m)**.
- If `n` is always much larger than `m`, the loop with size `n` will dominate the runtime.
- Each loop processes its own set of elements.
  **Example of O(1):**

Let's say you have a big array, but you only loop with a fixed condition, such as `i < 10`:

```js
const arr = [
  /* a big array with many elements */
];

for (let i = 0; i < 10; i++) {
  // This loop will run exactly 10 times, regardless of arr.length
  console.log(arr[i]);
}
```

- No matter how big `arr` is, the code inside the loop runs 10 times.
- The runtime does **not** depend on the size of the array.
- This is **O(1)** (constant time), because the number of operations is fixed and doesn't grow as the input gets larger.

Other classic examples of **O(1)**:

```js
// Accessing a specific element:
const first = arr[0];
const last = arr[arr.length - 1];

// Setting a variable:
let x = 42;
```

These operations always take the same time, no matter how big the input is.
