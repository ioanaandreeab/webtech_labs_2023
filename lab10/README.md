# Seminar 10 - Utilizarea CSS pentru implementarea interfețelor grafice

### Conținut

1. Desenarea elementelor în pagină

2. Poziționarea elementelor

    2.1 Modalități de poziționare de bază

    2.2 Flexbox

    2.3 Grid

3. Adaptarea interfețelor la dimensiunile dispozitivelor (responsiveness)

4. Aplicarea stilurilor externe

5. Lucru individual

6. Extra practice

## 1. Desenarea elementelor în pagină

- În momentul în care se realizează translatarea unui fișier HTML în pagina web, engine-ul asociază fiecărui element specificat un dreptunghi (_box_), conform unui concept numit **box model**

    - CSS determină mărimea, poziționarea și proprietățile fiecărui _box_

- Box model este alcătuit din **4 componente**:

    - **conținutul** (_content_) - conținutul propriu-zis al elementului (ex: text, imagine etc)
    - **marginea internă** (_padding_) - spațiul dintre conținut și bordura elementului
    - **bordura**(_border_) - o linie care delimitează padding-ul
    - **marginea externă** (_margin_) - spațiul între bordura elementului și alte elemente din jurul său
        - utilă pentru a controla spațiile dintre elementele dintr-o pagină

- Pentru a putea observa modul în care un element este desenat de către browser, poți deschide prin _click dreapta_ pe orice pagină web opțiunea _Inspect / Inspect element_

- La selectarea oricărui element din pagină, vei putea observa ceva similar în partea dreaptă a inspectorului:

![box model](https://www.simplilearn.com/ice9/free_resources_article_thumb/CSS-Box-Model.png)

- Așadar, box model este _esențial_ pentru a controla și manipula elementele individuale,layout-ul și aspectul paginilor web în mod eficient

## 2. Poziționarea elementelor

- Pentru a facilita interacțiunea utilizatorului cu interfețele grafice, elementele componente trebuie să fie aranjate într-un fel în care conținutul să fie _ușor de accesat și înțeles_

- Acest lucru este realizat în primul rând prin _poziționarea elementelor_ în cadrul unui layout care să aibă sens pentru pagina respectivă

### 2.1 Modalități de poziționare de bază

- Proprietatea de bază expusă de CSS pentru controlarea poziției unui element în pagină este **position**, ce permite _scoaterea elementelor din flow-ul predefinit de afișare_, pentru a putea defini diferite layouturi

💡 Poți consulta [aici](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning) întreaga documentație pentru proprietatea position

![positioning](https://internetingishard.netlify.app/css-positioning-schemes-790d5b.3d581d20.png)

- Cele mai comune valori pe care le poate lua proprietatea sunt:

    - **static** - _poziționarea implicită a elementelor_, acestea fiind plasate în _fluxul normal al documentului_
    ```css
    .element {
        position: static;
    }
    ```
    
    - **relative** - elementul e poziționat _relativ_ față de poziția sa normală
        - alte elemente din fluxul normal se comportă ca și cum elementul nu a fost mutat
    ```css
    .element {
        position: relative;
        top: 10px;
        left: 20px;
    }
    ```

    - **absolute** - elementul e _eliminat din fluxul normal_ și poziționat _relativ_ la cel mai apropiat element _părinte_ care are o poziție relativă sau implicită
        - dacă nu există un astfel de element părinte, poziționarea se face relativ la _document_
    ```css
    .element {
        position: absolute;
        top: 30px;
        left: 50px;
    }
    ```

    - **fixed** - elementul este eliminat din fluxul normal și _poziționat relativ la fereastra browser-ului_
        - elementul va rămâne la aceeași poziție chiar dacă utilizatorul va scrolla pagina
    ```css
    .element {
        position: fixed;
        top: 0;
        right: 0;
    }
    ```

### 2.2 Flexbox

- **Flexbox** (abreviere pentru Flexible Box) este un model de layout în CSS care facilitează _aranjarea și alinierea_ elementelor într-un un container

- Ideea principală în layout-ul definit utilizând flexbox este de a da containerului **abilitatea de a altera dimensiunile** (și, după caz, ordinea) **elementelor copil** pentru a ocupa spațiul disponibil în mod optim

- În acest sens, un container flex va **expanda** elementele componente pentru a ocupa spațiul disponibil, ori le va **micșora** pentru a preveni depășirea acestuia(_overflow_)

💡 Poți parcurge [aici](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) un **ghid comprehensiv cu proprietățile asociate Flexbox**

- Pentru a utiliza Flexbox, setează proprietatea _display_ a containerului cu valoarea **flex** sau **inline-flex**
```css
.container {
    display: flex;
    /* sau display: inline-flex; pentru a crea un container flex inline */
}
```

- Flexbox expune proprietăți pentru definirea comportamentelor specifice părintelui ori copiilor săi prin care pot fi stabilite

    - **aranjarea** elemetelor
        - aranjarea elementelor pe axa principală și secundară folosind proprietățile _flex-direction_, _justify-content_ și _align-items_

    - **alinierea** elementelor
        - alinierea elementelor în interiorul containerului pe axa principală și secundară (ex. _align-self_)

    - **ordinea** elementelor

- O reprezentare grafică a proprietăților principale _flexbox_ este:

![Flexbox](https://i.redd.it/rofzm44oka091.png)

### 2.3 Grid

- **CSS Grid Layout** (ori _Grid_ sau _CSS Grid_) este un model de layout în CSS care permite dezvoltatorilor să creeze **layout-uri bidimensionale** (alcătuite din _rânduri și coloane_) complexe și flexibile

💡 Poți parcurge [aici](https://css-tricks.com/snippets/css/complete-guide-grid/) un **ghid comprehensiv cu proprietățile asociate CSS Grid**

- Similar cu Flexbox, Pentru a utiliza Grid Layout, setează proprietatea _display_ a containerului cu valoarea **grid**

```css
.container {
    display: grid;
}
```

- Cea mai importantă proprietate a CSS Grid este cea care permite definirea layoutului din punct de vedere al rândurilor și coloanelor ce îl vor compune
```css
.container {
    display: grid;
    grid-template-columns: 100px 200px 100px; /* Trei coloane cu dimensiuni fixe */
    grid-template-rows: 50px 100px; /* Două rânduri cu dimensiuni fixe */
}

```

![CSS grid](https://www.freecodecamp.org/news/content/images/2022/05/CSS-GRID-3.png)

- Precum în cazul Flexbox, există anumite _proprietăți_ ce pot fi definite pentru containerul _părinte_, și altele pentru _copiii_ din cadrul acestuia

## 3. Adaptarea interfețelor la dimensiunile dispozitivelor (responsiveness)

- **Responsiveness-ul** se referă la capacitatea unei pagini web de a se _adapta la diferite dimensiuni de ecrane și dispozitive_, astfel încât să ofere o experiență de utilizare optimă pe orice dispozitiv, de la desktop-uri și laptopuri la tablete și telefoane mobile, ori chiar smart watch-uri

![responsiveness](https://mir-s3-cdn-cf.behance.net/project_modules/hd/35d0ca41474775.57a7e879592f8.gif)

- Pentru a realiza acest lucru, CSS pune _nativ_ la dispoziție opțiunea de **media query** prin intermediul căreia pot fi definite stiluri specifice pentru o anumită rezoluție

```css
/* Stiluri generale pentru ecrane mari */
.element {
  width: 100%;
}

/* Stiluri specifice pentru ecrane mai mici (de exemplu, tablete și telefoane) */
@media screen and (max-width: 600px) {
  .element {
    width: 50%;
  }
}
```

- De asemenea, **flex** și **grid**, despre care am discutat în secțiunile anterioare, sunt utile pentru ajustarea alinierii elementelor în funcție de dimensiunea ecranului

- Alte elemente ajutătoare în acest scop pot fi:
    - utilizarea **unităților relative** (_%, vh, em_)
    - utilizarea unor **dimensiuni maxime ori minime** (_max-width, min-width_)

## 4. Aplicarea stilurilor externe

- Pe lângă stilizarea definită în fișierele locale cu ajutorul utilizării explicite a proprietăților CSS există și posibilitatea **importării unor biblioteci de stil**

- În cazul utilizării acestor biblioteci, adesea, dezvoltatorul folosește clasele exportate de biblioteca respectiv, ce definesc anumite reguli de stil

- Cele mai populare biblioteci de stilizare sunt
    - [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
    
    - [Material UI (MUI)](https://www.muicss.com/)

    - [Tailwind CSS](https://tailwindcss.com/)

- Aceste biblioteci sunt utile deoarece _reduc din complexitatea definirii stilurilor de bază_ pentru o aplicație și asigură o _coerență și uniformitate_ între elementele folosite în diferite zone ale website-ului/aplicației web

## 5. Lucru individual

- Vom încerca să conferim aplicației noastre pentru gestionarea colecțiilor de filme un aspect cât mai plăcut pentru a fi atractivă și ușor de folosit pentru utilizatori

- Consultă [acest design figma](https://www.figma.com/proto/21qlpOtyB9pGFLxq8V48vO/Movies-app?type=design&node-id=4-38&t=Dq2zH1sbRLLhDDP6-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A38) (ne vom referi la el utilizând termenul _mockup_) pentru pagina de filme, care conține 
    - lista de filme

    - formularul de adăugare a unui film nou

- Pornind de la **[forma actuală a aplicației](../app/front-end/)**, încearcă să adaugi stilizarea necesară pentru elemente, layout-ul paginii și poziționarea elementelor în pagină pentru a obține un rezultat cât mai apropiat de cel din mockup :)

    - **Notă**: Urmărește cu atenție și interacțiunile elementelor din meniu cu pagina și replică tranzițiile la diferitele secțiuni din pagină

## 6. Extra practice

- [Flexbox Froggy](https://flexboxfroggy.com/)

- [CSS Grid Garden](https://cssgridgarden.com/)