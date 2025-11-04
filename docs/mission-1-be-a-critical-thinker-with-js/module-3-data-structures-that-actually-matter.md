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
