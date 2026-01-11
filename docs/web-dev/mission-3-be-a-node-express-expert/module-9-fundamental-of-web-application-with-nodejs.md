# Module 9: Fundamental of web application with nodejs

---

## How Web Works?

Client(web browser) থেকে ইন্টারনেট দিয়ে Server এ রিকেস্ট যাবে এবং server একটা response দিবে। এটা Request - Response Model, In software engineering its called Client-Server Architecture
এখানে Client থেকে Server এ রিকোয়েস্ট URL() এর মাধ্যমে যায়
`https://hello-world.com`

### Url Parts

![URL Parts](/img/url-parts.png)

# 9-3 How the web evolved

Event Driven Architecture is a design where things happen in response to events. For example, when a web server gets a request, it triggers an event to handle that request. This helps Node.js manage many connections at the same time easily.

## IIFE

IIFE (Immediately Invoked Function Expression) হচ্ছে এমন একটি JavaScript ফাংশন যেটি লিখেই সাথে সাথে এক্সিকিউট (চালানো) করা হয়। সাধারণত ফাংশন ডিফাইন করার পর আলাদাভাবে কল করতে হয়, কিন্তু IIFE-তে ফাংশনটি ডিফাইন করার সময়ই সঙ্গে সঙ্গে কার্যকর হয়।

### কেন IIFE ব্যবহার করা হয়?

-   ফাংশনের ভিতরের ভ্যারিয়েবল ও ডেটা বাইরের কোড থেকে আলাদা (scope safe) রাখা যায়।
-   কোড সংঘর্ষ (variable conflict) এড়ানো যায়।
-   সঙ্গে সঙ্গে কোনও কোড execute করাতে সুবিধা।

### উদাহরণ

```js
var username = "Alice";

(function () {
    var username = "Bob";
    console.log("IIFE username:", username); // Output: Bob
})();

console.log("Global username:", username); // Output: Alice
```

উপরের কোডে, ফাংশনটি ডিফাইন করার সাথে সাথে execute হয়েছে এবং এর ভিতরের ভ্যারিয়েবল বাইরে পাওয়া যাবে না।

সংক্ষেপে, IIFE হলো সঙ্গে সঙ্গে execute হওয়া ফাংশন, যেটি কোডকে সারাংশন ও নিরাপদ রাখে।

## CommonJS vs ESM Explained

### CommonJS

CommonJS হলো Node.js এ ব্যবহৃত module system, যেখানে `require()` ও `module.exports` ব্যবহার করে কোড organize ও reuse করা হয়।

#### উদাহরণ (CommonJS):

**math.js:**

```js
function add(a, b) {
    return a + b;
}

module.exports = { add };
```

**app.js:**

```js
const math = require("./math");
console.log(math.add(2, 3)); // Output: 5
```

### ESM (ECMAScript Modules)

ESM হচ্ছে JavaScript-এর official module system, যেখানে `import` ও `export` keyword ব্যবহৃত হয়। এটি ব্রাউজার এবং Node.js (modern version) – দুটিতেই সাপোর্টেড।

#### উদাহরণ (ESM):

**math.mjs:**

```js
export function add(a, b) {
    return a + b;
}
```

**app.mjs:**

```js
import { add } from "./math.mjs";
console.log(add(2, 3)); // Output: 5
```

### Key Differences

-   CommonJS: ব্যবহার হয় `require()` ও `module.exports`
-   ESM: ব্যবহার হয় `import` ও `export`
-   CommonJS ডিফল্ট Node.js এ, আর ESM নতুন version-এ এবং ব্রাউজারে চলে।
-   ESM asynchronous ও static-ly analysable; CommonJS synchronous

#### `mjs` কী?

`mjs` হলো "module JavaScript" ফাইল এক্সটেনশন, যা ESM (ECMAScript Modules) ফরম্যাটে লেখা JavaScript ফাইল বোঝানোর জন্য ব্যবহৃত হয়। Node.js-এ `.mjs` এক্সটেনশনের ফাইলগুলো স্বয়ংক্রিয়ভাবে module system হিসেবে পরিচালিত হয়, যেখানে `import` ও `export` কিওয়ার্ড ব্যবহার করা যায়।

##### কখন `mjs` ব্যবহার করবেন?

-   যদি আপনার Node.js প্রোজেক্টে ESM ব্যবহার করেন, অর্থাৎ `import` / `export` লিখেন—তাহলে ফাইলের এক্সটেনশন `.mjs` দিলে Node.js এটা মডিউল হিসেবে চিনবে।
-   `.js` ফাইলেও ESM চালানো যায় (যদি `package.json`-এ টাইপ `"module"` সেট করেন), তবে `.mjs` হল সহজ ও সরাসরি উপায়।

##### উদাহরণ:

**math.mjs:**

```js
export function add(a, b) {
    return a + b;
}
```

**app.mjs:**

```js
import { add } from "./math.mjs";
console.log(add(2, 3)); // Output: 5
```

##### সংক্ষেপে:

`.mjs` = ESM module system-এর জন্য dedicated file extension।

#### CommonJS থাকার পরেও কেন ESM দরকার হলো?

CommonJS বহু আগে Node.js-এর module system হিসেবে জনপ্রিয় ছিল। কিন্তু JavaScript language এবং ব্রাউজার—দুটোতেই একইরকম module system দরকার ছিল। সে কারণেই ESM (ECMAScript Modules) এসেছে। নিচে কিছু গুরুত্বপূর্ণ কারণ দেওয়া হল:

-   **Standardization:** ESM হচ্ছে অফিসিয়াল JavaScript মডিউল সিস্টেম, যা ব্রাউজার এবং Node.js দুটোতেই চলে। CommonJS শুধু Node.js–এ চলে, ESM ওয়েবে Native-ভাবেই চলে।
-   **Static Analysis সম্ভব:** ESM এর `import`/`export` স্ট্যাটিক (compile-time–এ নির্ধারিত), তাই Code-splitting, Tree-shaking, Optimizations আরও সহজ।
-   **Asynchronous & Dynamic Loading:** ESM মডিউলগুলো lazy বা ডায়নামিকভাবে লোড করা যায় (যেমন: `import()`), CommonJS পুরোটা শুরুতেই লোড হয়।
-   **Future Compatibility:** JavaScript language level-এ ও নতুন ফিচার যেমন টপ-লেভেল `await`—এসব ESM-এর জন্যেই তৈরি।
-   **Cross-platform:** ESM এক্সেক্টলি একইভাবে Node ও ব্রাউজারে চলে, কোন আলাদা build টুল ছাড়াই।
-   **Modern Tooling Support:** আধুনিক Build Tools ও Bundlers (Webpack, Rollup, ইত্যাদি) ESM লাইব্রেরি ও অ্যাপের জন্য আরও эффективভাবে কাজ করতে পারে।

সংক্ষেপে, ESM বেশিরভাগ ক্ষেত্রে ভবিষ্যতে Standard, Fast, এবং Interoperable পরিবেশ দেয়—যা CommonJS সবসময় দিতে পারে না।
