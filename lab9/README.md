# Seminar 9 - Front-end - noțiuni de bază

### Conținut

1. Front-end - componente

    1.1 HTML
    
    1.2 CSS

2. JavaScript pentru aplicații Front-end
    2.1 DOM
    2.2 Evenimente DOM

3. Structurarea proiectului

4. Lucru individual - interfață client pentru introducerea și vizualizarea filmelor


## 1. Front-end - componente

- Am discutat în primele seminare despre modelul _client-server_ și posibilitatea de a executa cod JavaScript atât în interiorul browserului, cât și prin intermediul unui environment care permite acest lucru (node.js)
- Ne amintim astfel că orice aplicație web are 2 părți componente - **back-end** & **front-end**
- Până în acest moment am creat propriul nostru server (back-end), însă, așa cum poate ați observat și din ultimele seminare, funcționalitățile expuse de serverul nostru pot fi consumate (_momentan_) doar prin intermediul utilizării clientului _Postman_
- Utilizatorul obișnuit nu va ști să folosească o astfel de unealtă, motiv pentru care are nevoie de o **interfață client**
![front-end & back-end](https://a.storyblok.com/f/42126/dd3f75afe5/frontend-vs-backend-overview.png/m/1200x0/filters:quality(70)/)
- **Front-end-ul** reprezintă partea vizibilă și interactivă a unei aplicații web sau a unui site. Este ceea ce utilizatorii văd și elementul cu care interacționează cu atunci când accesează o platformă online. 
- Acest aspect al dezvoltării web se concentrează pe **proiectarea și implementarea elementelor grafice**, a **interfeței utilizatorului** și a **funcționalităților** cu care utilizatorii interacționează direct.
- Front-end-ul include tot ceea ce se întâmplă în browserul unui utilizator - designul paginilor web, layout-ul, stilurile, animațiile și orice alt element vizual cu care utilizatorii interacționează.
- În general, diferențiem **3 elemente** principale ce compun aplicațiile web client, front-end-ul unui sistem:
    - **o componentă structurală** - **HTML** - definește elementele care sunt afișate în pagină
    - **o componentă de stilizare** - **CSS** - conferă un aspect plăcut elementelor structurale pentru accesibilitate
    - **o componentă dinamică** - **JavaScript** - permite utilizatorului să interacționeze cu elementele afișate
![html, css,js](https://html-css-js.com/images/og.jpg)

### 1.1 HTML

- **HTML** (_HyperText Markup Language_) este un limbaj de marcare utilizat pentru crearea paginilor web ce pot fi afișate într-un browser

🤔 [Aici un clip de 100 de secunde despre HTML](https://www.youtube.com/watch?v=ok-plXXHlWw)

- O pagină foarte simplă HTML poate fi reprezentată astfel:
```HTML
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

💡 Deoarece bazele HTML sunt discutate în cadrul cursului de multimedia, nu vom intra în foarte multe detalii, însă puteți regăsi [aici](https://htmlcheatsheet.com/) un cheatsheet pentru HTML și [aici](https://www.w3schools.com/html/default.asp) un tutorial pentru HTML

### 1.2 CSS

- **CSS** (_Cascading Style Sheets_) este un limbaj de stilizare, un standard pentru formatarea elementelor unui document HTML.

🤔 [Aici un clip de 100 de secunde despre CSS](https://www.youtube.com/watch?v=OEV8gMkCHXQ)

- Vom aprofunda în seminarul următor capacitățile CSS, însă, la o scurtă privire de ansamblu, putem identifica următoarele caracteristici:

    - **Selectori**: CSS utilizează selectori pentru a identifica elementele HTML la care se aplică stilurile. Acestea pot fi _elemente specifice, clase, ID-uri sau alte criterii de selecție_.
    ```css
    /* element */
    body {
        font-family: 'Arial', sans-serif;
    }
    /* clasa */
    .titlu {
        color: #3366cc;
    }
    /* ID */
    #header {
        background-color: #f2f2f2;
    }
    ```
    - **Proprietăți**: CSS prezintă un set extins de proprietăți pentru a controla aspectul elementelor. Printre acestea se numără proprietăți pentru font, culoare, dimensiuni, margini, spațiere etc.
    ```css
    p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
    }

    .container {
        width: 80%;
        margin: 0 auto;
    }
    ```
    - **Specificitatea stilurilor**: CSS utilizează un sistem de _cascading_ pentru a determina cum se aplică mai multe stiluri într-un document. Acesta urmărește o anumită ierarhie și oferă dezvoltatorilor control asupra priorității stilurilor în funcție de specificitatea și ordinea în care sunt definite
    ```css
    h1 {
        color: blue; /* Stil implicit pentru toate elementele h1 */
    }

    .titlu {
        color: red; /* Stil specific pentru clasele cu clasa "titlu" */
    }

    #header h1 {
        color: green; /* Stil specific pentru h1 din interiorul elementului cu ID-ul "header" */
    }
    ```
    - În exemplul dat, se merge din ce în ce mai specific, pornind de la un tip de element, la o clasa și apoi la un ID

💡 Puteți găsi o serie extinsă de proprietăți și selectori în [cheatsheet-ul pentru CSS](https://htmlcheatsheet.com/css/)


## 2. JavaScript pentru aplicații front-end

- Cea de-a treia componentă, **JavaScript**, reprezintă un limbaj de programare folosit, în acest caz, pentru a asigura componenta dinamică a paginilor web
- În acest sens, există două subiecte importante de discutat, respectiv modalitățile prin care JavaScript poate _interacționa cu elementele din pagină_ și felul în care este _notificat de către utilizator_ să realizeze acest lucru

### 2.1 DOM

- Un concept care stă la baza construirii unei pagini web este acela de **DOM** (_Document Object Model_)

![DOM](https://www.w3schools.com/js/pic_htmltree.gif)

- DOM este o reprezentare a obiectelor care compun structura și conținutul unei pagini web
- DOM este o interfață care permite scripturilor să acceseze, să modifice și să actualizeze conținutul, structura și stilul documentului HTML. Acesta reprezintă documentul folosind _noduri_.

- **Principalele caracteristici** ale DOM includ:

    - **Structura arborelui**: DOM organizează documentul HTML într-un arbore ierarhic, în care fiecare element este reprezentat printr-un nod. Nodurile pot fi elemente, atribute, texte sau chiar comentarii.

    - **Acces și manipulare**: Dezvoltatorii web pot utiliza limbaje de programare, cum ar fi JavaScript, pentru a accesa și manipula elementele din DOM. Astfel, pot schimba conținutul paginii, adăuga sau elimina elemente, modifica stilurile și răspunde la evenimente.

    - **Interacțiunea cu utilizatorul**: DOM este esențial pentru a crea interactivitate într-o pagină web. Dezvoltatorii pot răspunde la evenimente și pot actualiza dinamic conținutul paginii fără a necesita o reîncărcare completă a acesteia.

- Este important de reținut că utilitatea DOM-ul stă în faptul că permite JavaScript să acceseze elemente din pagină, pe care le poate ulterior modifica
- Putem observa următorul fragment de cod JavaScript care accesează un element din DOM și modifică conținutul acestuia:
```js
// Accesarea unui element din DOM
const element = document.getElementById("heading");

// Modificarea conținutului elementului
element.innerHTML = "My new heading";
```

- Obiectul _document_ are atașat o serie de metode pentru manipularea elementelor HTML din pagină

💡 Găsiți [aici](https://developer.mozilla.org/en-US/docs/Web/API/Document) o listă cu toate metodele și proprietățile atașate, alături de explicațiile pentru acestea :)

### 2.2 Evenimente DOM

- DOM-ul permite JavaScript să reacționeze la _evenimente HTML_ ce pot apărea
- Aceste evenimente, despre care am mai discutat putin seminarele trecute, pot fi declanșate de interacțiunea utilizatorului cu elementele paginii sau pot fi generate în alte moduri (de exemplu, _încărcarea paginii_)
- Vom utiliza JavaScript pentru a captura și gestiona aceste evenimente, putând răspunde la acțiunile utilizatorilor și modifica dinamic conținutul sau stilul paginii
![event handling](https://1.bp.blogspot.com/-HI-_6gDQlcw/X3lj2sbrMSI/AAAAAAAAB9s/oUtLrzaCB9g9CwZprdpBchs3QGyDacjnwCLcBGAsYHQ/s1280/Events.jpg)

- Printre mai comune evenimente se numără:

    - **Click**
    ```js
    document.getElementById("myButton").addEventListener("click", function() {
        // Codul care se va executa la click pe buton
    });
    ```
    - **Mouseover (trecere cu mouse-ul peste un element)**
    ```js
    document.getElementById("myElement").addEventListener("mouseover", function() {
        // Codul care se va executa la trecerea cu mouse-ul peste element
    });
    ```
    - **Submit (trimitere formular)**
    ```js
    document.getElementById("myForm").addEventListener("submit", function(event) {
        // Codul care se va executa la trimiterea formularului
        event.preventDefault(); // Previne comportamentul implicit al formularului
    });
    ```
    - **Change (schimbare într-un input)**
    ```js
    document.getElementById("myInput").addEventListener("change", function() {
        // Codul care se va executa la schimbarea valorii în input
    });
    ```
    - **Load (încărcare pagină)**
    ```js
    window.addEventListener("load", function() {
        // Codul care se va executa la încărcarea completă a paginii
    });
    ```

## 3. Structurarea proiectului

- În general, vom vrea să păstrăm fiecare parte componentă a aplicației/website-ului construit într-un fișier separat, pentru a **izola** fiecare context
- Astfel, minimal, am putea avea o structură de fișiere precum:
    - **index.html** -> conține elementele structurale
    - **style.css** -> conține stilurile aplicate pe elemente
    - **script.js** -> conține interacțiunile cu elementele definite

## 4. Lucru individual - interfață client pentru introducerea și vizualizarea filmelor

- Vom vrea să începem construirea interfeței pentru aplicația noastră pentru gestiune a colecțiilor de filme

- Vom modifica structura directorului _app_, mutând tot conținutul lui într-un director numit _back-end_ și vom crea un nou director numit _front-end_ pentru interfața aplicației, ce va conține, în primă instanță, cele trei fișiere amintite în secțiunea anterioară, respectiv _index.html_, _style.css_ și _script.js_

- În acest sens, vom vrea să consumăm API-ul creat seminarele trecute și să adăugăm următoarele:

    - O listă de filme
    - Un formular pentru introducerea unui nou film
        - Formularul va avea câmpuri de tip input pentru fiecare proprietate a entității _Movie_

- Câteva precizări:
    - Nu uitați să porniți serverul web definit anterior pentru a putea prelua și adăuga informații despre filme :)
    - Aplicația noastră client va fi deschisă într-un browser deschizând fișierul HTML definit