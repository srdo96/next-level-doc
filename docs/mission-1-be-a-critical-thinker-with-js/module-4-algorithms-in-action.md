import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

## 4-6 Binary Search Algorithm

```js showLineNumbers title="PSEUDO Code Of binary Search"
 Algorithm BinarySearch(arr, target)

     low ← 0
     high ← length(arr) - 1

     while low ≤ high do
         mid ← floor (low + high) / 2

         if arr[mid] = target then
             return mid            // target found
         else if arr[mid] < target then
             low ← mid + 1         // search in right half
         else
             high ← mid - 1        // search in left half
         end if
     end while

     return -1                     // target not found

End Algorithm
```

## 4-7 Let us talk about O(log n)

**Logarithm:** How many times do I have to multiply a number by itself to reach another number?

`log₂ 8 = 3 → because 2 × 2 × 2 = 8`

**In Algo:** How many steps it will take me to reach 1 where the data set = n

## 4-8 Selection sort visualization

**In Place:** Algorithm transforms or processes the input data directly within its original memory location without needing to create a separate data.

```js title="PSEUDO Code of Selection Sort" showLineNumbers
Algorithm SelectionSort(arr)
    n ← length(arr)

    for i ← 0 to n - 2 do
        minIndex ← i

        // Find the smallest element in the unsorted part
        for j ← i + 1 to n - 1 do
            if arr[j] < arr[minIndex] then
                minIndex ← j
            end if
        end for

        // Swap the found minimum element with the first element
        if minIndex ≠ i then
            swap(arr[i], arr[minIndex])
        end if
    end for

    return arr
End Algorithm

```

Time Complexity: O(n^2)

# 4-10 Insertion sort implementation

```js title="PSEUDO Code of Insertion Sort" showLineNumbers
Algorithm InsertionSort(arr)
    n ← length(arr)

    for i ← 1 to n - 1 do
        key ← arr[i]
        j ← i - 1

        // Move elements greater than key one position ahead
        while j ≥ 0 and arr[j] > key do
            arr[j + 1] ← arr[j]
            j ← j - 1
        end while

        arr[j + 1] ← key
    end for

    return arr
End Algorithm


```

Time Complexity: O(n^2)

# 4-11 Closing remarks
