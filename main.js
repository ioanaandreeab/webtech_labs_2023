class Person {
    constructor(name) {
        this.name = name;
    }

    // getter
    get name() {
        return this._name;
    }

    // setter
    set name(newName) {
        this._name = newName;
    }

    greet() {
        console.log("Hello, " + this.name + "!");
    }
}

const examplePers = new Person("Mary");
examplePers.greet(); // Hello, Mary!
// setter use
examplePers.name = "John";
// getter use
console.log(examplePers.name);