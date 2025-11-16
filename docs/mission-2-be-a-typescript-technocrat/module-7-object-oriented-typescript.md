# Module 7: Object Oriented Typescript

---

## 7-1 Class and object

A class in TypeScript is a blueprint for creating objects with specific properties and methods.

```ts showNineNumbers
class Car {
    make: string;
    model: string;
    year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    /*
    // parameter properties
    constructor(
        public make: string,
        public model: string,
        public year: number
    ) {}
*/

    displayInfo(): void {
        console.log(`${this.year} ${this.make} ${this.model}`);
    }
}

// Creating an object from the Car class
const myCar = new Car("Toyota", "Corolla", 2022);
myCar.displayInfo(); // Output: 2022 Toyota Corolla
```

## 7-2 Inheritance, the 1st pilar of OOP

Inheritance allows a class to extend another class and reuse its properties and methods. To inheritance class use `extend` keyword.

> A subclass can override a method of its parent class by redefining it locally within the subclass.

```ts showLineNumbers
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak(): void {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {}
// The Dog class is currently empty because it inherits all properties and methods from the Animal class.
// This is useful when no additional properties or behaviors are needed for Dog beyond what Animal provides.

class Cat extends Animal {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }

    speak(): void {
        console.log(`${this.name} meows. It is a ${this.color} cat.`);
    }
}

const dog = new Dog("Buddy");
dog.speak(); // Output: Buddy barks.
```

## 7-3 Type guard using typeof and in

A type guard ensures the correct type at runtime.

```ts
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log("ID (string):", id.toUpperCase());
    } else {
        console.log("ID (number):", id);
    }
}
printId(42); // Output: ID (number): 42
printId("hello"); // Output: ID (string): HELLO
```

Can also check for a property using `in`:

```ts showLineNumbers
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
    if ("fly" in animal) {
        animal.fly();
    } else {
        animal.swim();
    }
}

const parrot: Bird = { fly: () => console.log("Parrot is flying!") };
const goldfish: Fish = { swim: () => console.log("Goldfish is swimming!") };

move(parrot); // Output: Parrot is flying!
move(goldfish); // Output: Goldfish is swimming!
```

## 7-4 Type guard using instance of

// Checks object's type at runtime with instance of.

```ts
class Car {
    drive() {
        console.log("Driving a car");
    }
}
class Bike {
    ride() {
        console.log("Riding a bike");
    }
}

function useVehicle(vehicle: Car | Bike) {
    if (vehicle instanceof Car) {
        vehicle.drive();
    } else {
        vehicle.ride();
    }
}

useVehicle(new Car()); // Output: Driving a car
useVehicle(new Bike()); // Output: Riding a bike
```

## 7-5 Access Modifiers

`public`, `private`, and `protected` control accessibility of class members:

```ts
class Person {
    public name: string; // accessible everywhere
    private secret: string; // accessible only inside Person
    protected age: number; // accessible in Person and subclasses

    constructor(name: string, secret: string, age: number) {
        this.name = name;
        this.secret = secret;
        this.age = age;
    }

    public getSecret() {
        return this.secret;
    }
}

class Employee extends Person {
    getEmployeeAge() {
        return this.age; // 'age' is protected, so accessible here
    }
}

const alice = new Person("Alice", "loves pizza", 30);
console.log(alice.name); // OK
// console.log(alice.secret);  // Error: private
// console.log(alice.age);     // Error: protected
console.log(alice.getSecret()); // OK
```

## 7-6 Getter and Setter

Getter (`get`) and setter (`set`) methods in TypeScript allow you to control access to properties of a class, enabling encapsulation and validation.

```ts showLinesNumber
class Rectangle {
    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    // Getter for width
    get width(): number {
        return this._width;
    }

    // Setter for width with validation
    set width(value: number) {
        if (value <= 0) {
            throw new Error("Width must be positive");
        }
        this._width = value;
    }

    // Getter for height
    get height(): number {
        return this._height;
    }

    // Setter for height with validation
    set height(value: number) {
        if (value <= 0) {
            throw new Error("Height must be positive");
        }
        this._height = value;
    }

    // Getter for area (read-only, computed)
    get area(): number {
        return this._width * this._height;
    }
}

const rect = new Rectangle(10, 5);
console.log(rect.width); // 10
console.log(rect.height); // 5
console.log(rect.area); // 50

rect.width = 20;
console.log(rect.area); // 100

// rect.height = -3; // Error: Height must be positive
```

In the above example:

-   `width` and `height` are private fields.
-   Getters (`get width` and `get height`) provide read access.
-   Setters (`set width` and `set height`) allow controlled mutation with validation. -`area` is a read-only computed property (getter only).

This pattern helps enforce valid state and encapsulation within your classes.

## 7-7 Static in typescript

```ts showLineNumbers
// Static properties and methods belong to the class itself, rather than to any instance.

class Circle {
    // Static property: value of PI
    static PI: number = 3.14159;

    // Static method to calculate area given a radius
    static area(radius: number): number {
        return Circle.PI * radius * radius;
    }

    // Instance property
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    // Instance method to calculate area
    getArea(): number {
        return Circle.area(this.radius);
    }
}

// Access static property and method without creating an instance
console.log(Circle.PI); // 3.14159
console.log(Circle.area(2)); // 12.56636

const circle1 = new Circle(3);
console.log(circle1.getArea()); // 28.27431
```

In TypeScript (and many other languages), `static` is needed to define properties or methods that belong to the class itself rather than to any particular instance. This is useful when you want to store utility methods, constants, or information that is shared across all instances of the class.

Without `static`, every instance of your class would get its own copy of the property or method, which can be wasteful or incorrect when the data/logic is meant to be shared.

Example: You want all circles to use the same value for PI, and to provide a utility method to calculate area without needing to construct a Circle object first. Static is perfect for this situation.

In summary, use `static` when:

-   The property or method should be shared by all instances.
-   You want class-level utility functions (like `Circle.area(radius)`).
-   You need constants that are part of the class definition rather than instance data.

## 7-8 Polymorphism, the 2nd pillar of OOP

// Polymorphism allows different classes to be treated through a common interface, enabling method overrides.

```ts
// Example of polymorphism using classes and method overriding

class Animal {
    makeSound(): void {
        console.log("Some generic animal sound");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow!");
    }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => animal.makeSound());
// Output:
// Woof!
// Meow!
```

## 7-9 abstraction, the 3rd pillar of OOP

Abstraction hides complex details and exposes only essentials.

```ts title="Abstract with abstract, extends" showLineNumbers
abstract class Shape {
    abstract getArea(): number; // Only signature, no implementation
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }
    getArea(): number {
        return this.width * this.height;
    }
}

const rect = new Rectangle(5, 8);
console.log(rect.getArea()); // 40
```

```ts title="Abstract with interface, implements" showLineNumbers
interface IShape {
    getArea(): number; // Only signature, no implementation;
}

// implementation
class Rectangle implements IShape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }
}

class Circle implements IShape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const wheel = new Circle(4);
console.log(wheel.getArea()); // 50.26548245743669

const shapes: IShape[] = [new Rectangle(5, 8), new Circle(3)];

shapes.forEach((shape) => console.log(shape.getArea()));
// Output:
// 40
// 28.274333882308138
```

## 7-10 Encapsulation, the 4th pillar of OOP

Encapsulation hides internal details of objects, exposing only what’s necessary.

```ts
class BankAccount {
    private balance: number;
    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }
    deposit(amount: number) {
        if (amount > 0) this.balance += amount;
    }
    getBalance() {
        return this.balance;
    }
}

const acc = new BankAccount(1000);
acc.deposit(500);
console.log(acc.getBalance()); // 1500
```

## OOP Four Pillar Summary

| Pillar        | What it Means                                                          | Example (TypeScript)                                     |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| Abstraction   | Show only what’s important, hide the details.                          | Interface shows what methods exist, hides how they work. |
| Encapsulation | Keep data safe inside objects; use methods to access/change it.        | `private` variables; use methods to get/set values.      |
| Inheritance   | Make new classes from old ones; reuse code.                            | `class Dog extends Animal {}`                            |
| Polymorphism  | Same function or method works in different ways for different objects. | `getArea()` for both `Rectangle` and `Circle` classes.   |
