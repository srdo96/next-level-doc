import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Module 3: Data Structures that Actually Matter

---

## 3-1 Stateless vs Stateful

**Stateful** When the code hold the previous information in the multiple iteration
**Stateless** if can't hold then it is stateless

In general `Function` is stateless and `Object` is stateful

**Lexical Environment:** lexical environment is local environment and the reference of outer environment

<Tabs>
  <TabItem value="stateless" label="Stateless" default>
```js showLineNumbers
function counter(amount){
    let count = 0;
    return count + amount;
}

counter(2) // 2
counter(3) // 3

````
  </TabItem>
  <TabItem value="stateful" label="Stateful">
  ```js showLineNumbers
  const counter = {
    count: 0,
    add(amount){
        this.count = this.count + amount;
    },
    print(){
        console.log(this.count)
    }
  }

counter.add(2);
counter.add(3);
counter.print() // 5
````

  </TabItem>
</Tabs>

## 3-2 Basic Class constructor and methods refresher

### Pure Function:

It will always return the same output for the same input.

## Closer

**Closure:**  
A closure in JavaScript is when a function remembers the variables from its outer scope even after that scope has finished executing.  
Closures let you access and use those variables later.

```js
const createCounter = () => {
  let count = 0;

  return (amount) => {
    count = count + amount;
    return count;
  };
};

const counter = createCounter();
console.log(counter(3)); // 3
console.log(counter(5)); // 8
```

In this example, the inner function still has access to the `count` variable even after `createCounter` has finished running.

## Class

Class is just like a template. From class we can create object as many as we want.

```js
class Counter {
  constructor(count) {
    this.count = count;
  }

  add(amount) {
    this.count = this.count + amount;
  }

  print() {
    console.log(this.count);
  }
}
const counter1 = new Counter(0);
counter1.add(2); // 2
counter1.add(3); // 5
```
