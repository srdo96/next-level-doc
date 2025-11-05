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

### Closer

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

### Class

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

## 3-3 Stack Implementation using Array

### Stack

**Stack** is a data stricture that follow Last In First Out **(LIFO)** principle.

It store data one top of another. it has three methods

- **push**: To add new element to a stack
- **pop**: To remove the last element of a stack
- **peek**: To see the last element of a stack with out remove it

```js title="Stack Implementation" showLineNumbers {6-23}
class Stack {
  constructor() {
    this.items = [];
  }
  // O(1)
  push(data) {
    this.items.push(data);
  }
  // O(1)
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }
  // O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    index = this.items.length - 1;
    return this.items[index];
  }
  // O(1)
  isEmpty() {
    return this.items.length === 0;
  }
  // O(n + n + n) -> O(3n) -> O(n)
  print() {
    console.log(this.items.slice().reverse().join(" -> "));
  }
}
const stack = new Stack(); // create new stack
stack.push(10); // add 10
stack.push(20); // add 20
stack.pop(); // last element 20 remove
stack.peek(); // 10
```

## 3-4 Queue Implementation using Array

### Queue

**Queue** is a data structure that follow First In First Out **(FIFO)** principle. It has two methods:

- **enqueue**: Insert a element in a queue.
- **dequeue**: Remove the first element of a queue
- **front/peek**: View the front (or first) element of a queue.

```js title=Queue Array Implementation
class Queue {
  constructor() {
    this.items = [];
  }
  //O(1)
  enqueue(element) {
    this.items.push(element);
  }
  O(n)
  dequeue() {
    if (isEmpty()){
      return undefined
    }
    return this.items.shift();
  }
  // O(1)
  front() {
    if(isEmpty()){
      return undefined
    }
    return this.items[0];
  }
  // O(1)
  isEmpty(){
    return this.items.length === 0
  }
}
const queue = new Queue()
```
