# Seminar 4 - Closures, OOP și excepții

### Conținut
1. [Closures](#1-closures)

2. [OOP](#2-oop)

    2.1 [Ce este o clasă în JavaScript?](#21-ce-este-o-clas%C4%83-%C3%AEn-javascript)

    1.2 [Constructor](#22-constructor)

    1.3 [Metode](#23-metode)

    1.4 [Proprietăți statice](#24-propriet%C4%83%C8%9Bi-statice) 

    1.5 [Constructor functions & prototipuri](#25-constructor-functions-%C8%99i-prototipuri)

3. [Excepții]()

## 1. Closures

**Ce este un closure?**

= concept fundamental care se referă la capacitatea unei funcții de a **păstra acces la variabilele din cadrul contextului** în care a fost creată, chiar și **după ce acea funcție a fost încheiată** sau a ieșit din contextul său imediat. În esență, un closure este o funcție internă (o funcție definită în interiorul altei funcții) care păstrează legătura cu variabilele din funcția părinte.

- conform MDN, este încapsularea unei funcții cu referințele contextului său (lexical environment)
- în JavaScript, closure-urile sunt create de fiecare dată când o funcție este creată

```js
    function init() {
        let name = "Mozilla"; 
        function displayName() {
            // inner function, that forms the closure
            console.log(name); // use variable declared in the parent function
        }
        displayName();
    }
    init();
```

- o utilizare comună pentru closure este simularea mecanismului de caching (pe care o regăsiți și în exemplele din acest seminar)

🤔 Puteți viziona [acest clip](https://www.youtube.com/watch?v=vKJpN5FAeF4) (are doar 100 de secunde) pentru mai multe explicații pentru closures.

## 2. OOP

### 2.1 Ce este o clasă în JavaScript?

O clasă în JavaScript (precum în orice alt limbaj de programare), este **un șablon pentru construirea obiectelor**. Acestea încapsulează proprietăți și comportamente specifice entităților descrise.

Clasele (și programarea orientată obiect în sine) au o implementare specială în JavaScript, ele folosind moștenirea prototipală.

🤔 Nu vom discuta în detaliu despre moștenirea prototipală și prototype chain, însă puteți citi mai multe despre - [aici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

În esență, o clasă în JavaScript este **un tip special de funcție**. Deoarece JavaScript nu este un limbaj _strict_ OOP, ci multiparadigmă, clasele din JavaScript sunt considerate a fi _syntactic sugar_. Ce înseamnă asta? Clasele sunt o reprezentare menită pentru a asigura familiaritate programatorilor care sunt obișnuiți cu limbaje orientate obiect, precum Java.
- clasele au fost introduse în EcmaScript2015 (ne-am mai întâlnit cu ES6 când am discutat despre arrow functions, care au fost introduse cu aceeași ocazie)

Clasele pot fi definite astfel (class declaration vs class expression):

```js
    // class declaration
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // class expression - clasa este anonimă dar atribuită unei variabile
    const Animal = class {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // class expression - clasa are propriul său nume
    const MyAnimalClass = class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }
```

### 2.2 Constructor

Constructorul este o metodă specială pentru crearea și inițializarea unui obiect
- poate exista o singură metodă cu numele _constructor_ într-o clasă (o excepție de tip _SyntaxError_ e aruncată dacă există mai multe astfel de metode)
- constructorul poate folosi cuvântul cheie _super_ pentru a apela constructorul unei clase părinte
- în următorul exemplu, pentru a marca moștenirea unei clase părinte se folosește termenul **extends**
```js
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    class Student extends Person {
        constructor(name, age, major) {
            super(name, age);
            this.major = major;
        }
    }
```

### 2.3 Metode

= funcții definite pe prototipul unei clase, accesibile pentru toate instanțele acesteia

```js
    class Person {
        constructor(name) {
            this.name = name;
        }

        // getter
        get name() {
            return this.name;
        }

        // setter
        set name(newName) {
            this.name = newName;
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
```

- obsrevăm în exemplul dat și existența unor metode speciale - _get_ și _set_ - pentru manipulearea proprietăților clasei

### 2.4 Proprietăți statice

- proprietățile statice (metode și atribute) sunt definite pe clasă în sine, în loc de în cadrul fiecărei instanțe
```js
    class MathUtils {
        // atribut static
        static PI = 3.14159265359;

        // metodă statică
        static calculateCircleArea(radius) {
            return MathUtils.PI * radius ** 2;
        }

        console.log(`Valoarea lui PI este: ${MathUtils.PI}`);

        const radius = 5;
        const area = MathUtils.calculateCircleArea(radius);
        console.log(`Aria unui cerc cu diametrul ${radius} este: ${area}`);
    }
```

### 2.5 Constructor functions și prototipuri

Înainte de introducerea claselor, _funcțiile constructor_ (constructor functions) erau folosite pentru a replica comportamentul OOP în JavaScript. Să privim un exemplu pentru o entitate de tip plantă 🌿:

```js
    // constructor function
    function Plant(species, region) {
        this.species = species;
        this.region = region;
    }

    // adăugarea metodelor folosind prototipul
    Plant.prototype.getDescription = function() {
        console.log(`This plant belongs to the species ${this.species} 
        and can be found in the region of ${this.region}`);
    }
    const cactus = new Plant("Cactaceae", "Americas");
```

După cum se poate observa, metoda este adăugată direct pe prototipul funcției Plant (care prin natura sa se comportă ca un constructor).

Dacă afișăm la consolă obiectul cactus vom putea observa tot ceea ce am definit:
![](https://github.com/ioanaandreeab/webtech_labs_2023/blob/main/lab4/assets/function.png?raw=true)

Putem rescrie folosind clase exemplul de mai sus:
```js
    class Plant {
        constructor(species, region) {
            this.species = species;
            this.region = region;
        }
        
        getDescription() {
            console.log(`This plant belongs to the species ${this.species} 
            and can be found in the region of ${this.region}`);
        }
    }
    const cactus = new Plant("Cactaceae", "Americas");
```

În acest caz, putem observa un output similar:
![](https://github.com/ioanaandreeab/webtech_labs_2023/blob/main/lab4/assets/class.png?raw=true)

În cel de-al doilea exemplu, în spatele codului scris se întâmplă aceleași 2 operațiuni:
- o funcție numită _Plant_ este creată, drept rezultat al declarării clasei
    - definirea funcției este dată de constructorul clasei
- metodele clasei, precum _getDescription_ sunt stocate în _Plant.prototype_

Dacă parcurgem lanțul prototipal vom observa că fiecare clasă din JavaScript derivă din clasa _Object_

🤔 Moștenirea în JavaScript poate fi un concept mai dificil de înțeles în primă instanță - [aici](https://levelup.gitconnected.com/prototypal-inheritance-the-big-secret-behind-classes-in-javascript-e7368e76e92a) e un articol foarte bun pentru comparația dintre moștenirea folosind clase și cea prototipală

## 3. Excepții

Uneori, este necesar să introducem anumite restricții în codul pe care îl scriem. Pentru a valida, spre exemplu, tipul datelor trimise putem folosi:
```js
    const greet = (name) => {
        if (typeof name === "string") {
            console.log(`Hello, ${name}`);
        } else {
            throw new Error("The name should be a string");
        }
    }

    try {
        greet();
        } catch (error) {
            console.log(error);
        } finally {
            // instrucțiuni apelate indiferent de rezultatul funcției
    }
```