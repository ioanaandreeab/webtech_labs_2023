Seminar 6 - Server web folosind Express.js

### Conținut
1. [Node.js](#1-nodejs)

2. [Server HTTP](#2-server-http)

    2.1 [Recapitulare noțiuni generale](#21-recapitulare-no%C8%9Biuni-generale)

    2.2 [Exemplu de server HTTP](#22-exemplu-de-server-http)

3. [Module](#3-module)

    3.1 [Module locale](#31-module-locale)

    3.2 [Organizarea proiectelor](#32-organizarea-proiectelor)

    3.2.1 [Organizare după tip](#321-organizare-dup%C4%83-tip)

    3.2.2 [Organizare după feature](#322-organizare-dup%C4%83-feature)

4. [npm](#4-npm) 

    4.1 [Ce este un pachet?](#41-ce-este-un-pachet)

    4.2 [npm](#42-npm)

    4.3 [Fișierul package.json](#43-fi%C8%99ierul-packagejson)

    4.4 [Comenzi uzuale](#44-comenzi-uzuale)

5. [Express.js](#5-expressjs)

6. [Exercițiu](#6-exerci%C8%9Biu)

## 1. Node.js

- Node.js este un **mediu de execuție JavaScript** și o platformă open-source bazată motorul JavaScript _V8_ al browser-ului Google

- Permite executarea codului JavaScript _în afara unui browser web_

- Din acest motiv, permite **dezvoltarea aplicațiilor server-side**

💡 De notat faptul că Node.js  folosește un model de I/O ne-blocant și asincron pentru a gestiona cererile și evenimentele, ceea ce îl face foarte eficient și potrivit pentru aplicații cu mulți utilizatori simultani

## 2. Server HTTP

- Pentru a putea ajunge să scriem primul nostru server web, va trebui să reactualizăm câteva noțiuni prezentate în primele două seminare despre serverele HTTP

### 2.1 Recapitulare noțiuni generale

- Un server HTTP (Hypertext Transfer Protocol) este un tip de server de rețea care primește și gestionează cererile HTTP de la clienți și furnizează răspunsuri HTTP corespunzătoare

- Pentru a putea comunica cu un server HTTP, sunt trimise cereri de la aplicații de tip client
    - Aceste cereri sunt trimise către un URL, ce respectă structura:
        ```sh
        [protocol]://[domeniu]/[cale/către/resursă?parametru1=valoare1&parametru2=valoare2]

        exemplu:
        https://wikipedia.org/wiki/World_Wide_Web
        ```
        - Puteți revizita fiecare detaliu despre structura URL în [seminarul 2](https://github.com/ioanaandreeab/webtech_labs_2023/tree/main/lab2#11-cum-poate-fi-g%C4%83sit%C4%83-o-resurs%C4%83-pe-web)

    - Fiecare cerere are atribuită o metodă specifică:
        - **GET** - listarea unei resurse
        - **POST** - crearea unei resurse
        - **PUT** - actualizarea unei resurse
        - **DELETE** - ștergerea unei resurse

    - În funcție de metoda specificată, serverul procesează cererea și întoarce un răspuns ce conține un _status code_ care descrie starea operațiunii efectuate:
        - **1**XX - răspunsuri informaționale
        - **2**XX - răspunsuri de succes
        - **3**XX - răspunsuri ce privesc mutarea resurselor (redirecționarea)
        - **4**XX - erori de client
        - **5**XX - erori de server

### 2.2 Exemplu de server HTTP

- Un exemplu de un server simplu HTTP care rulează pe portul _8080_ și returnează un mesaj ar putea fi:
```js
    const http = require("http");

    const server = http
        .createServer((req, res) => {
            res.write("hello web!");
            res.end();
        });

    server.listen(8080);
```

- Putem observa din interacțiunea cu acest server că răspunsul este returnat la accesarea adresei absolute _http://localhost:8080/_ în browser

- Dacă vrem să extindem capabilitățile acestui server web putem defini mai multe așa-numite _rute_, care sunt utilizate pentru direcționarea cererilor către anumite funcții de procesare
    - În cazul nostru, ruta pentru cerere este "/"
    - Putem adăuga o rută nouă care va afișa ora curentă
    ```js
        const http = require("http");

        const server = http
            .createServer((req, res) => {
                if (req.url === '/time') {
                    const currentDate = new Date();
                    res.write(currentDate.toLocaleDateString());
                    res.end();
                } else if (req.url === '/') {
                    res.write("hello web!");
                    res.end();
                } else {
                    res.writeHead(404);
                    res.end();
                }
            });
        server.listen(8080);
    ```
    - În acest caz, funcțiile de procesare nu sunt foarte complexe, însă ele pot deveni, ceea ar duce în acest sens la un fișier mai mare și mai greu de urmărit

## 3. Module

### 3.1 Module locale

- Un modul este o modalitate de a organiza codul în bucăți mai _mici_, _izolate_ și _reutilizabile_

- În JavaScript există mai multe modalități (standarde) de a defini module. Două dintre cele mai comune sunt:
    - **CommonJS** - _standard server-side_, folosit în mod default pentru Node.js; folosește instrucțiunile **'module.exports'** și **'require'**
    ```js
        // mymodule.js
        const myFunction = () => {
        // ...
        };

        module.exports = {
            myFunction
        };

        // main.js
        const myModule = require('./mymodule');
        myModule.myFunction();
    ```
    - **ECMAScript(ES6)** - standard folosit în principal pentru medii _client-side_; folosește instrucțiunile **'import'** și **'export'**
    ```js
        // mymodule.js
        const myFunction = () => {
        // ...
        };

        export { myFunction };

        // main.js
        import { myFunction } from './mymodule';
        myFunction();
    ```

### 3.2 Organizarea proiectelor
- Modulele sunt utile pentru a structura și organiza aplicațiile scrise

- În general, aplicațiile pe care le vom scrie pot fi structurate după **tip** sau după **feature**

#### 3.2.1 Organizare după tip

- În acest model de organizare, codul sursă este grupat și organizat în funcție de tipul de componentă sau funcționalitate. De obicei, aceste tipuri includ:

- **director pentru modele (models)**
    - descrierea entităților utilizate în aplicație
- **director pentru controlere (controllers)**
    - logica de gestionare a cererilor HTTP și manipularea datelor din models
- **director pentru rute (routes)**
    - legătura dintre cererile HTTP și controllere
    - rutele stabilesc cum sunt gestionate diferitele cereri la nivel de URL și direcționează către controlerul potrivit
- **director pentru servicii (services)**
    - funcții sau servicii

```
    app/
    ├── controllers/
    │   └── auth.js
    ├── models/
    │   └── auth.js
    ├── validators/
    │   └── auth.js
    ├── index.js
    └── package.json
```

- În acest exemplu putem observa cum, în împărțirea existentă a tipurilor de directoare, există câte un fișier pentru feature-ul de autentificare

#### 3.2.2 Organizare după feature

- În acest model, codul este grupat în funcție de caracteristicile sau funcționalitățile aplicației
```
    app/
    ├── auth/
    │   ├── controller.js
    │   ├── model.js
    │   └── validator.js
    ├── index.js
    └── package.json
```
- În acest exemplu putem observa cum pentru un feature de autentificare, care are atribuit propriul său director independent în structura aplicației, există un controller, un model și un validator specific

## 4. npm 

### 4.1 Ce este un pachet?
- Modulele pe care le-am discutat în secțiunea anterioară pot fi grupate în cadrul unui _pachet_

- Aceste pachete sunt adesea create și distribuite pentru a facilita dezvoltarea software în JavaScript și pentru a face codul reutilizabil și ușor de gestionat

- Până în acest punct am discutat doar de _module locale_, însă, de multe ori, un dezvoltator va descărca _module remote_ pentru a rezolva probleme des întâlnite

### 4.2 npm
- npm (Node Package Manager) este un _manager de pachete pentru Node.js și JavaScript_

- Este unul dintre cele mai mari și populare ecosisteme de pachete open-source și este utilizat pentru a gestiona dependințele, distribui pachete și a automatiza sarcini legate de dezvoltarea JavaScript și Node.js

- Registrul npm conține peste **800 000 de pachete** care sunt folosite de peste **17 milioane de dezvoltatori**

### 4.3 Fișierul package.json

- Fișierul "package.json" este un _fișier de configurare_ pentru JavaScript și Node.js, folosit pentru a defini și gestiona detaliile unei aplicații

- Conține informații precum:
    - numele și descrierea proiectului
    - dependințele și dependințele dezvoltator ale proiectului
        - dependințele dezvoltator sunt necesare doar în etapa de dezvoltare a proiectului
    - versiunea proiectului
    - scripturi 
    - detalii despre autor
    - existența unei licențe asociate proiectului
    - fișierul de intrare al aplicației

- Exemplu de fișier _package.json_
```json
    {
        "name": "exemplu-proiect",
        "version": "1.0.0",
        "description": "Primul meu proiect",
        "main": "index.js",
        "scripts": {
            "start": "node index.js",
        },
        "author": "Ion Popescu",
        "license": "MIT",
        "dependencies": {
            "lodash": "1.0.0"
        },
        "devDependencies": {
            "nodemon": "1.0.0"
        }
    }
```

### 4.4 Comenzi uzuale

- **npm install**
    - folosită pentru a instala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm install lodash
    ```
    - poate primi opțiunea "-g" pentru a face instalarea global pe întreg sistemul
    - poate primi opțiunea "-D" pentru a instala un pachet ce va fi folosit doar în dezvoltare
    - poate primi opțiunea "--save" pentru a salva o dependință în fișierul _package.json_ al proiectului
        - analog, există opțiunea "--save-dev" pentru a salva o dependință de dezvoltator
- **npm uninstall**
    - folosită pentru a dezinstala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm uninstall lodash
    ```
- **npm init**
    - inițializează un proiect și creează un fișier _package.json_ cu configurările care au fost selectate după execuția comenzii
- **npm update**
    - actualizează un pachet și preia din registrul npm ultima versiune disponibilă
- **npm start**
    - lansează în execuție un proiect
- **npm publish**
    - publică un pachet în registrul npm
- **npm audit**
    - analizează pachetele instalate și determină dacă există vulnerabilități cunoscute în versiunile respective

## 5. Express.js

- _Express.js_ este un _framework_ pentru dezvoltarea rapidă și facilă a _aplicațiilor web_
- Este unul dintre cele mai populare și utilizate framework-uri web în ecosistemul Node.js

- Revenind la exemplul referitor la serverul HTTP din prima secțiune a seminarului, putem observa că, dacă ar trebui să adăugăm și mai multe rute, ar rezulta o structură _if_..._else_ foarte complexă și dificil de citit
- În acest scop, putem folosi pachetul _Express_
- Serverul web ar deveni în acest fel:
```js
    const express = require("express");
    const app = express();

    app.get('/time', (req, res) => {
        const currentDate = new Date().toLocaleDateString();
        res.send(currentDate);
    });

    app.get('/', (req, res) => {
        res.send("hello web!");
    });

    app.use((req, res) => {
        res.status(404).send("Not Found");
    });

    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
```
- Codul este mult mai simplu de urmărit și de înțeles, iar procesarea fiecărei rute este făcută individual, în loc ca aceasta să fie gestionată de o structură complexă _if...else_

## 6. Exercițiu

- În cadrul părții practice din acest seminar vom realiza un server web pentru gestiunea unor filme