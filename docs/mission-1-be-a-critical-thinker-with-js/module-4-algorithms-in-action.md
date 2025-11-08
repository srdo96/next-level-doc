# Module 4 Algorithms in Action

---

## 4-1 Basic cache implementation with Map

![Cache](../../static/img/cache.png)

```js title="Cache Simulation"
const dataCache = new Map();

const expensiveTask = (id) => {
    console.log("Ran the expensive task for:", id);
    return {
        id: id,
        data: `Some data for id: ${id}`,
        timestamp: new Date().getTime(),
    };
};

const getData = (id) => {
    if (dataCache.has(id)) {
        console.log("Cache HIT for id:", id);
        return dataCache.get(id);
    }
    console.log("Cache MISS for id:", id);
    const data = expensiveTask(id);
    dataCache.set(id, data);
    return data;
    console.log(dataCache);
    console.log(getData(123));
    console.log(getData(123));
    console.log(dataCache);
};
```

## 4-2,3,4,5

:::warning
Try to avoid nested loops to prevent `O(n^2)` time complexity.
:::

[Click Here To See Problems and Solution](https://github.com/Apollo-Level2-Web-Dev/critical-thinking/tree/main/module-04/solutions)
