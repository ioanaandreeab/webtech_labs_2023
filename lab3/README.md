# Seminar 3 - Array practice

### Conținut
1. [Arrays](#1-arrays)

    1.1 [Caracteristici generale](#11-caracteristici-generale)

    1.2 [Copierea array-urilor](#12-copierea-array-urilor)

    1.3 [Proprietatea length](#13-proprietatea-length)

    1.4 [Metode specifice](#14-metode-specifice)

2. [Exerciții arrays](#2-exerci%C8%9Bii-arrays)

## 1. Arrays

### 1.1 Caracteristici generale

Un **array** este o structură de date care poate stoca **mai multe valori** la un moment dat.

Acesta poate fi reprezentat astfel:

```js
    const arr = [1, 2, 3, 4];
```

De notat următoarele aspecte:
- lungimea unui array este modificabilă
    - spre deosebire de alte limbaje, nu trebuie menționată lungimea array-ului la inițializare și aceasta se poate modifica
- array-urile pot conține **tipuri mixte de date**, ceea ce înseamnă că un array poate arăta și astfel:
```js
    const arr = [1, 2, 'green', {name: 'stud', id: 1}];
```
- ca tip de dată, **un array este un obiect** (țineți minte, aproape orice în JavaScript este un obiect)

- fiecare element poate fi accesat utilizând **index-ul**, care începe de la valoarea **0**. (de ex. arr[0] este 1)

### 1.2 Copierea array-urilor

În majoritatea cazurilor în care încrecăm să facem o copie a unui array, aceasta este de fapt un **shallow copy**. Acest aspect este strâns legat cu faptul că array-urile sunt _reference types_, care, spre deosebire de primitive, sunt copiate prin referință. Ce înseamnă asta în practică?

Să luăm drept exemplu următorul array:
```js
    const arr = ['red', 'purple', 'pink'];
```
Să presupunem că vrem să facem o copie a acestui array astfel:
```js
    const arrCp = arr;
```
Această modalitate de a copia este eronată, deoarece în acest caz se va copia doar referința la array-ul respectiv, nu și valoarea în sine.

Putem utiliza spread operator (pe care l-am întâlnit și în seminarul trecut) pentru a crea un nou array:
```js
    const arrShallowCp = [...arr];
```

În acest caz, _arrShallowCp_ va pointa către o zonă diferită de memorie, însă copia obținută este tot una shallow. Unde apar problemele?

Să presupunem că am avea următorul array:
```js
    const myArr = [1, 2, 4, {name: 'Ioana', id: 1}];
    const myArrShallowCp = [...myArr];
    
    // modificăm obiectul din array-ul copiat
    myArrShallowCp[3].name = 'Andrei';

    console.log(myArrShallowCp);
    console.log(myArr);
    // cele două log-uri printează același rezultat
    // [1, 2, 4, {name: 'Andrei', id: 1}]
```

De ce am obținut acest rezultat? _Shallow copy_.
Țineți minte că am discutat la seminarul anterior despre tipuri primitive și reference types. Obiectele sunt reference types, ceea ce înseamnă că, în momentul în care am făcut shallow copy pe array-ul nostru, am copiat pentru obiect doar _referința_ acestuia, în memorie actualizând de fapt același obiect.

**Cum putem realiza totuși deep clone?**

Putem realiza deep clone pentru arrays folosind metodele **JSON.stringify()** și **JSON.parse()**
- metoda JSON.stringify() ia un obiect JavaScript (array-urile sunt și ele tot obiecte) și îl transformă într-un string JSON (_JavaScript Object Notation_ - un mod de reprezentare a datelor)
- în acest fel sunt înlăturate orice referințe
- se folosește apoi JSON.parse() pentru a transforma la loc din string JSON în obiect JavaScript
```js
    const myArr = [1, 2, 4, {name: 'Ioana', id: 1}];
    const myArrDeepCp = JSON.parse(JSON.stringify(myArr));
    
    // modificăm obiectul din array-ul copiat
    myArrDeepCp[3].name = 'Andrei';

    console.log(myArrDeepCp);
    console.log(myArr);
    // cele două log-uri printează rezultate diferite
    // [1, 2, 4, {name: 'Andrei', id: 1}]
    // [1, 2, 4, {name: 'Ioana', id: 1}]
```

### 1.3 Proprietatea length

- proprietatea **length** returnează numărul de elemente dintr-un array (lungimea acestuia)
```js
    const fruits = [];
    fruits.push("banana", "apple", "peach");
    console.log(fruits.length); // 3
```

### 1.4 Metode specifice

Vom în continuare despre **metodele specifice array-urilor**, care permit manipularea informațiilor stocate. Multe dintre aceste metode au o funcție **callback** drept argument. 

🤔 Un _callback_ este o funcție transmisă unei alte funcții sau obiect, pentru a fi apelată mai târziu, la un moment sau eveniment specific

Callback-ul este apelat secvențial și cel mult o dată pentru fiecare element al array-ului (în unele cazuri, spre exemplu atunci când se caută un anumit element, căutarea se oprește când elementul este găsit, deci callback-ul nu mai este apelat pentru restul elementelor). Acesta determină, prin valorile calculate intermediar (pentru fiecare element în parte), valoarea returnată pentru întregul array la finalul procesării.

Astfel, pentru majoritatea funcțiilor pe care le vom discuta, semnătura ar putea fi:
```js
    method(callbackFunction)
```

_callbackFunction_ are la rândul său 3 argumente principale:

- **elementul** -> elementul curent care este procesat în array
- **indexul** -> indexul corespunzător elementului curent
- **array-ul** -> array-ul asupra căruia se execută metoda

În general, vom folosi doar primele două argumente disponibile.

Să ne uităm acum la câteva exemple cu cele mai folosite metode specifice arrays (unele dintre ele se regăsesc și în exercițiile atașate)

- **map**
    - returnează un array nou care conține rezultatele invocării unei funcții pe fiecare element
    ```js
        const arr = [1, 2, 3, 4];
        // nu uitați, map creează un array nou!
        const dblArr = arr.map((elem) => elem * 2);

        console.log(dblArr); // [2, 4, 6, 8]
    ```
- **filter**
    - returnează un array nou cu elementele care satisfac o anumită condiție dată
    - funcția pasată drept callback trebuie să returneze **true** pentru ca elementul să fie inclus în noul array
    ```js
        const arr = [1, 2, 3, 4];
        const filteredArr = arr.filter(item => item > 2);

        console.log(filteredArr); // [3, 4]
    ```
- **find**
    - returnează valoarea primului element care satisface o anumită condiție dată
    - returnează **undefined** dacă nu se găsește vreun element care să satisfacă condiția
    ```js
        const arrStudents = [{name:'Andreea', id:1}, {name:'Mihai', id:2}, {name:'Cristina', id:3}];

        const student = arrStudents.find(stud => stud.id === 3);
        console.log(student); // {name:'Cristina', id:3}
        
        const studNotFound = arrStudents.find(stud => stud.id === 4);
        console.log(studNotFound); // undefined
    ```
- **findIndex**
    - returnează **indexul** primului element care satisface o anumită condiție dată
    - returnează **-1** dacă nu se găsește vreun element care să satisfacă condiția
    ```js
        const arrStudents = [{name:'Andreea', id:1}, {name:'Mihai', id:2}, {name:'Cristina', id:3}];

        const studentIdx = arrStudents.findIndex(stud => stud.id === 3);
        console.log(studentIdx); // 2

        const studNotFoundIdx = arrStudents.findIndex(stud => stud.id === 4);
        console.log(studNotFoundIdx); // -1
    ```
- **includes**
    - determină dacă o valoare e prezentă în array, returnând **true** sau **false**, în funcție de caz
    ```js
        const fruits = ["apple", "banana", "orange", "cherry", "kiwi"];

        const hasApple = fruits.includes("apple");
        const hasGrape = fruits.includes("grape");

        console.log(hasApple); // true
        console.log(contineStrugure); // false
    ```
- **reduce**
    - permite reducerea unui array la o valoare unică, aplicând o funcție de reducere asupra fiecărui element al array-ului și acumulând rezultatele într-o valoare finală
    ```js
        const nums = [1, 2, 3, 4, 5];
        const sum = nums.reduce((accumulator, element) => accumulator + element, 0);

        console.log(sum); // 15
    ```

- **sort**
    - sortează elementele unui array
    - sortarea se face pe același array
    - implicit, se realizează sortarea _lexicografic_
        - pentru stringuri, în ordine alfabeitcă
        - pentru numere, în ordine crescătoare
    - se poate trimite drept parametru un callback conform căruia să se realizeze sortarea
    ```js
        const arr = [1, 4, 2, 7, 3];
        arr.sort();

        console.log(arr); // [1, 2, 3, 4, 7]
    ```
    - pentru a obține ordinea descrescătoare putem trimite un callback drept parametru:
    ```js
        const arr = [4, 1, 5, 2, 8];
        arr.sort((a, b) => b - a); // [8, 5, 4, 2, 1]
    ```

- **join**
    - creează și returnează un nou string, concatenând toate elementele array-ului, utilizând virgula ori alt separator trimis ca parametru
    ```js
        const elements = ['Fire', 'Air', 'Water'];

        console.log(elements.join()); // "Fire,Air,Water"
    ```

- **flat**
    - permite "aplanarea" un array multidimensional, transformându-l într-un array unidimensional
    ```js
        const array = [1, 2, [3, 4, [5, 6]]];

        const flatArray = array.flat(); // [1, 2, 3, 4, [5, 6]]
    ```

- **reverse**
    - inversează ordinea elementelor unui array
    - modificările sunt făcute asupra array-ului original, nefiind returnat unul nou
    ```js
        const array = [1, 2, 3, 4, 5];

        array.reverse();

        console.log(array); // [5, 4, 3, 2, 1]
    ```

🤔 Acestea sunt, în mod evident, doar o parte dintre metodele disponibile pentru arrays. Puteți citi mai multe despre restul în [documentația MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
## 2. Exerciții arrays

Pentru a reface acasă exercițiile discutate la seminar puteți urma acești pași:
- verificați fișierul _demo.js_ (găsiți acolo un exemplu pentru fiecare subiect)
- rezolvați exercițiul propus din fișierul _practice.js_
- comparați soluția voastră cu cea propusă în fișierul _solved-practice.js_