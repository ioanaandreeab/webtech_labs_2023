# Seminar 5 - Programare asincronă în JavaScript

### Conținut

1. Programare sincronă vs programare asincronă

    1.1 Programare sincronă în JavaScript

    1.2 Programare asincronă în JavaScript

2. Callback

    2.1 Callback hell

## 1. Programare sincronă vs programare asincronă

- Programarea sincronă și programarea asincronă sunt două paradigme diferite de gestionare a fluxului de execuție

### 1.1 Programare sincronă în JavaScript

- În cadrul programării sincrone, operațiunile sunt executate _una după alta, pe rând, în ordine_
- Acest tip de arhitectură este considerată _blocantă_, deoarece există **un singur thread**; în timp ce o operațiune este executată, instrucțiunile celorlalte operațiuni sunt blocate
- JavaScript este un limbaj _single-threaded_, _sincron_ în mod implicit
- În acest sens, putem privi următorul exemplu:

```js
    function firstTask() {
    console.log("Task 1");
    }

    function secondTask() {
    console.log("Task 2");
    }

    function thirdTask() {
    console.log("Task 3");  
    }

    firstTask();
    secondTask();
    thirdTask();
```

- Funcțiile definite vor fi executate în ordinea în care au fost apelate, iar drept urmare consola va afișa:
```
    Task 1
    Task 2
    Task 3
```
- Interpretorul execută instrucțiunile în ordinea în care ele apar scrise, secvențial, linie cu linie, așteptând ca instrucțiunea curentă să își termine execuția pentru a o apela pe următoarea
![](https://www.freecodecamp.org/news/content/images/size/w2400/2023/01/image-244.png)
- Comportamentul din imagine este gestionat de o structură de date internă ce poartă denumirea de _call stack_
- În momentul în care engine-ul JavaScript invocă o funcție, o adaugă la începutul stivei; acest procedeu e repetat pentru fiecare funcție din cadrul programului. Apoi pe rând, funcțiile sunt extrase odată ce execuția lor a fost finalizată
![sync programming](https://miro.medium.com/v2/resize:fit:1400/1*rJ2sh-q1deQGGGVG5gYyIQ.png)

- Totuși, programarea sincronă este problematică în ceea ce privește operațiile consumatoare de timp și resurse
- Pentru a ilustra acest aspect, să privim următorul exemplu:
```js
function performHeavyOperation() {
    let x = 0;
    for (let i = 0; i < 1000000000; i++) {
        x += i;
    }
}

performHeavyOperation();

console.log('Heavy operation completed');
```
- La execuția codului se poate observa că mesajul _"Heavy operation completed"_ este afișat la consolă după câteva momente (timp în care funcția _performHeavyOperation_ a rulat)
- Acest lucru devine și mai important în contextul în care astfel de operațiuni pot fi întâlnite și în cazul unei aplicații web cu interfață; în acest scenariu, cât timp procesarea intensivă ar avea loc, utilizatorul nu ar putea interacționa în niciun fel cu restul aplicației
- Din acest motiv, JavaScript are suport și pentru _programarea asincronă_


### 1.2 Programare asincronă în JavaScript

- Programarea asincronă este o paradigmă în cadrul căreia codul este posibilă execuția codului **independent** de firul principal de execuție, fiind astfel _non-blocking_
- Programarea asincronă permite asfel **execuția mai multor task-uri în același timp**, ele nedepinzând de finalizarea acțiunii precedente
![async programming](https://www.freecodecamp.org/news/content/images/2023/01/image-336.png)

- Majoritatea operațiunilor asincrone în JavaScript se împart în:
    - **evenimente sau funcții Browser API/Web API**
        - evenimente declanșate de elemente DOM (onclick, mouseover)
        - funcții precum _setTimeout_
    - **promise** (despre care vom discuta pe larg în secțiunile următoare)

- Următorul exemplu ilustrează modul în care se comportă instrucțiunile asincrone în JavaScript:
```js
    console.log("Start of script");

    setTimeout(function() {
    console.log("First timeout completed");
    }, 2000);

    console.log("End of script");
```
- Acest fragment de cod va afișa la consolă
```
    Start of script
    End of script
    First timeout completed
```
- Metoda _setTimeout_ execută funcția după un anumit timp (simulând astfel o operațiune ce consumă resurse și timp) în mod _asincron_, ceea ce înseamnă că programul va continua execuția următoarei linii de cod fără a aștepta ca durata specificată să se încheie, neblocând execuția celorlalte instrucțiuni

- Pentru a sumariza vizual diferențele dintre programarea sincronă și cea asincronă putem observa:
![sync vs async](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Y8o7ak12D24-kdMnDVKFYg.png)

🤔 Comportamentul asincron în JavaScript este posibil grație existenței _event loop_, care se folosește de structura _call stack_ menționată anterior. Un clip despre [aici](https://www.youtube.com/watch?v=8aGhZQkoFbQ) și un articol despre [aici.](https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd)

- Pentru a putea discuta despre ce reprezintă un promise, va trebui mai întâi să reluăm un concept întâlnit în [seminarul 3](https://github.com/ioanaandreeab/webtech_labs_2023/tree/main/lab3#17-metode-specifice), și anume _callbacks_.


## 2. Callback

💡 Un **callback** este o funcție trimisă unei alte funcții pentru a fi executată la un moment dat în interiorul acelei funcții

- Am întâlnit deja acest concept în contextul metodelor specifice pentru array-uri
    - în următorul exemplu, metoda _filter_ primește drept argument un callback
    ```js
        const students = [{name: 'John', age: 19}, {name: 'Maria', age: 17}, {name: 'Joe', age: 23}];

        const filteredStudents = students.filter((student) => student.age > 18);

        console.log(filteredStudents); // prints info about John and Joe
    ```

- în contextul programării asincrone, callback-urile pot fi folosite astfel:
```js
    function fetchData(callback) {
        setTimeout(() => {
            const data = {name: "John", age: 30};
            callback(data);
        }, 3000);
    }

    fetchData(function(data) {
        console.log(data);
    });

    console.log("Data is being fetched...");
```

- Rezultatul afișat va fi
```
    Data is being fetched...
    {name: "John", age: 30}
```

## 2.1 Callback hell

- Problema utilizării callback-urilor vine în situațiile în care execuția unor operațiuni asincrone depinde de rezultatul unei operațiuni asincrone anterioare

```js
    function doStep1(init, callback) {
        const result = init + 1;
        callback(result);
    }

    function doStep2(init, callback) {
        const result = init + 2;
        callback(result);
    }

    function doStep3(init, callback) {
        const result = init + 3;
        callback(result);
    }

    function doOperation() {
        doStep1(0, (result1) => {
            doStep2(result1, (result2) => {
                doStep3(result2, (result3) => {
                    console.log(`result: ${result3}`);
                });
            });
        });
    }

    doOperation();
```
- Observăm în acest exemplu că este foarte greu de urmărit modul în care funcțiile callback se apelează una pe alta și felul în care informația este transmisă între funcții

- O astfel de situație poartă denumirea de _callback hell_ și este motivul pentru care au fost introduse promise-urile

## 3. Promise