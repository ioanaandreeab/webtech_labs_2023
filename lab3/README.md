# Seminar 3 - Array practice

### Conținut
1. [Arrays++](#1-arrays)
2. [Exerciții arrays](#2-exerci%C8%9Bii-arrays)

## 1. Arrays++

Un **array** este o structură de date care poate stoca **mai multe valori** la un moment dat.

Acesta poate fi reprezentat astfel:

```js
  const arr = [1, 2, 3, 4];
```

Fiecare element poate fi accesat utilizând **index-ul**, care începe de la valoarea **0**. (de ex. arr[0] este 1)

Vom discuta în cadrul acestui seminar despre **metodele specifice array-urilor**, care permit manipularea informațiilor stocate. Multe dintre aceste metode au o funcție **callback** drept argument. 

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

## 2. Exerciții arrays

Pentru a reface acasă exercițiile discutate la seminar puteți urma acești pași:
- verificați fișierul _demo.js_ (găsiți acolo un exemplu pentru fiecare subiect)
- rezolvați exercițiul propus din fișierul _practice.js_
- comparați soluția voastră cu cea propusă în fișierul _solved-practice.js_