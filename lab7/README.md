# Seminar 7 - REST & Persistența datelor: sqlite și Sequelize

### Conținut

1. [REST](#1-rest)

	1.1 [Ce este REST?](#11-ce-este-rest)

	1.2 [Caracteristicile REST](#12-caracteristici-rest)

	1.3 [CRUD vs REST](#13-rest-vs-crud)

	1.4 [API vs endpoint](#14-api-vs-endpoint)

	1.5 [Best practices pentru API-uri RESTful](#15-best-practices-pentru-api-uri-restful)

2. [Persistența datelor](#2-persisten%C8%9Ba-datelor)

	2.1 [Bazele de date relaționale](#21-bazele-de-date-rela%C8%9Bionale)

	2.2 [SQLite](#22-sqlite)

	2.3 [ORM](#23-orm)

	2.4 [Sequelize](#24-sequelize)

	2.5 [Server web pentru gestiunea filmelor cu persistența datelor](#25-server-web-pentru-gestiunea-filmelor-cu-persisten%C8%9Ba-datelor)

## 1. REST

### 1.1 Ce este REST?

- **REST** (**RE**presentational **S**tate **T**ransfer) este un stil arhitectural folosit pentru dezvoltarea aplicațiilor web
- Această arhitectură are în centrul său conceptul de _resursă_ (orice tip de dată stocată pe un server)
- Pentru a putea să înțelegem mai bine ce înseamnă REST, să ne imaginăm următoarele:
	- Pornim de la premisa existenței unui client și unui server web pentru gestiunea unor filme
	- Clientul trimite un request de tip GET pentru a obține lista completă de filme, iar serverul interoghează baza sa de date pentru a obține informația cerută
	- În acest caz, o **resursă** se referă la ceva ce aparține _exclusiv serverului_
	- Atunci când serverul răspunde clientului, el trimite o **reprezentare** a resursei respective la un moment dat
	- Astfel, în exemplul nostru, între server și client are loc un **transfer** al stării pe care o are o reprezentare a filmelor stocate în baza de date

### 1.2 Caracteristici REST

![rest-api-diagram](https://images.ctfassets.net/vwq10xzbe6iz/5sBH4Agl614xM7exeLsTo7/9e84dce01735f155911e611c42c9793f/rest-api.png)

- Principalele caracteristici ale arhitecturii REST includ:

	- **Resurse**: În REST, orice lucru sau concept care poate fi identificat printr-un URL poate fi considerat o resursă. Aceste resurse pot reprezenta date, obiecte sau servicii.

	- **Client-Server**: Arhitectura REST evidențiază separarea clară a rolurilor între client și server. Aceasta permite evoluția independentă a fiecărei componente.

	- **Verbe HTTP**: REST utilizează metode HTTP standard (GET, POST, PUT, DELETE, etc.) pentru a efectua operații asupra resurselor

	- **Reprezentare**: Resursele pot avea multiple reprezentări, cum ar fi JSON, XML, HTML
		- cel mai utilizat format este JSON

	- **Stateless (Lipsa stării)**: Fiecare cerere HTTP către un server trebuie să conțină toate informațiile necesare pentru a fi înțeleasă și procesată. Serverul nu trebuie să țină minte starea clientului între cereri.

	- **Cacheable (Cacheabilitate)**: REST promovează capacitatea de a memora răspunsurile de la un server pentru a îmbunătăți performanța și eficiența comunicațiilor între client și server. Cache-ul este o parte importantă a arhitecturii REST.

	- **Layered System (Sistem stratificat)**: Arhitectura REST poate include intermediari între client și server, cum ar fi servere proxy sau cache. Aceasta permite crearea de sisteme stratificate care pot optimiza performanța, securitatea și scalabilitatea.

### 1.3 REST vs CRUD

- În discuția despre arhitectura REST trebuie să punctăm că aceasta nu este echivalentă cu operațiunile CRUD

- Am menționat și în secțiunea anterioară că arhitectura REST _utilizează_ verbe HTTP (care formează operațiunile CRUD), însă aceasta este mult mai complexă de atât

- REST este mai flexibil decât CRUD, permițând mai multe operațiuni asupra resurselor decât cele standard (Create, Read, Update, Delete), însă este de notat și faptul că CRUD poate fi implementat utilizând principiile REST

### 1.4 API vs endpoint

- În general, atunci când vorbim despre REST, o facem în contextul unui REST API, motiv pentru care este important să înțelegem exact ce reprezintă un _API_, concept corelat cu ideea de _endpoint_

- **API** (Application Programming Interface)
	- Este un ansamblu de comenzi, funcții ori protocoale care au rolul unui intermediar pentru comunicarea dintre două comunicări
	- Furnizează o metodă standardizată pentru interacțiunea cu un sistem sau serviciu
	- Poate să includă mai multe endpoint-uri care permit accesul la diferite resurse sau funcționalități

- **Endpoint**:
	- Este un punct specific de acces sau o locație specifică în cadrul unui API. Acesta reprezintă o cale sau un URL la care se poate accesa o anumită resursă sau funcționalitate în cadrul API-ului.
	- Este adesea utilizat pentru a accesa sau a efectua operații asupra resurselor specifice ale unui sistem.

- Ierarhia acestora poate fi observată și în figura următoare:
![api-vs-endpoint](https://assets-global.website-files.com/5ff66329429d880392f6cba2/625e52cd0b6c58527f5819d5_Endpoints%20of%20the%20API%20-%20clearly.jpg)

- În esență, API-ul definește regulile și interfața generală pentru comunicarea cu un sistem informatic, în timp ce endpoint-urile reprezintă locațiile specifice în cadrul API-ului unde pot fi accesate resurse sau efectuate diferite operații


### 1.5 Best practices pentru API-uri RESTful

- Spunem despre orice API care respectă principiile REST că este un _API RESTful_

💡 Există, deopotrivă, și API-uri pe care le numim _RESTlike_, diferența în cazul acestora fiind că pot face anumite compromisuri sau adaptări de la respectarea principiilor REST în funcție de cerințele specifice ale aplicației sau dezvoltatorului.

- În definirea unui API RESTful, există anumite practici ce sunt recomandate a fi urmate pentru dezvoltarea unui API bine structurat:
	- Folosirea formatului JSON pentru a trimite și a primi date
		- Atât clientul, cât și serverul trebuie să specifice în schimbul de mesaje formatul acestora, utilizând în antetele request-urilor sau response-urilor header-ul *Content-type: application/json*
	- Folosirea _substantivelor_ în loc de verbe în endpointuri
		- Spre exemplu, un endpoint pentru obținerea întregii colecții de filme ar trebui să arate astfel:
		```
			http://localhost:8080/movies
		```
	- Utilizarea formelor de plural pentru resursele accesate
		- Creând o nouă rută pentru identificarea unică a unei resurse de tip film după ID-ul său, varianta acceptată trebuie să fie **http://localhost:8080/movies/1**, în loc de http://localhost:8080/movie/1

	- Folosirea codurilor de eroare potrivite pentru scenariul curent

	- Folosirea endpointurilor nested pentru a sublinia legăturile dintre resurse
		- Spre exemplu, dacă am vrea să apelăm un endpoint pentru a afișa toate filmele dintr-o colecție, acesta ar putea arăta astfel:
		```
			http://localhost:8080/collections/1/movies
		```
	
	- Folosirea _filtrării, sortării și paginării_ pentru a eficientiza lucrul cu un volum mare de date

	- Versionarea API-urilor
		- Un api poate trece prin mai multe revizii de-a lungul timpului, fapt ce este recomandat a fi marcat
		```
			http://localhost:8080/api/v1/movies

			http://localhost:8080/api/v2/movies
		```

## 2. Persistența datelor

- Persistența datelor se referă la capacitatea de a **stoca** și **menține** date într-un mod durabil și sigur pentru o perioadă îndelungată.

- Persistența datelor este asigurată de cele mai multe ori în aplicațiile web prin utilizarea **bazelor de date**, _relaționale_ și _non-relaționale_
	- **Bazele de date relaționale**: sisteme de gestiune a bazelor de date care utilizează tabele și relații pentru a stoca date în mod structurat
		- ex: MySQL, PostgreSQL, Microsoft SQL Server
	- **Bazele de date non-relaționale (noSQL)**: soluții de stocare a datelor care nu se bazează pe tabele și relații, ci folosesc alte modele de date, cum ar fi documente, grafuri sau chei-valoare
		- ex: MongoDB, Cassandra, Redis
		- Bazele de date nu fac scopul acestei materii, însă găsiți aici un tutorial pentru utilizarea [MongoDB](https://www.geeksforgeeks.org/mongodb-tutorial/) alături de [mongoose](https://mongoosejs.com/docs/)

### 2.1 Bazele de date relaționale

- În general, sistemele de baze de date relaționale necesită un server pentru a funcționa

- Acest server este responsabil pentru gestionarea și administrarea bazei de date, precum și pentru tratarea cererilor venite de la clienți

- Deoarece existența unui server ar încetini procesul de dezvoltare al aplicației pe care vrem s-o realizăm prin necesitatea unor configurări și resurse extensive, vom alege să folosim _SQLite_

### 2.2 SQLite

- **SQLite** este o librărie care implementează un engine de baze de date SQL încapsulat, nefiind nevoie de existența unui server de baze de date pentru utilizarea sa

- Aceasta nu necesită _nicio configurare_ și poate fi folosită imediat pentru stocarea datelor și integrarea în cadrul unei aplicații

- Pornind de la aplicația din seminarul anterior, vom instala în continuare sqlite folosind comanda

```
	npm install sqlite
```

- În continuare, vom vrea să creăm o bază de date, să stabilim conexiunea cu aceasta și să refactorizăm toate rutele definite în aplicația pentru gestiunea colecțiilor de filme pentru a utiliza persistența datelor

### 2.3 ORM

- Interacțiunea cu bazele de date se poate face, în general, prin două modalități:
	- utilizarea unor query-uri SQL
		- ex: 
		```sql
			SELECT * from movies;
		```
	- utilizarea unui **ORM**

- Un **ORM** (Object Relational Mapping) este un instrument (adesea o bibliotecă software) care facilitează interacțiunea dintre o bază de date relațională și codul sursă al unei aplicații

* Caracteristici principale ORM:

	- **Abstracție a datelor**: ORM ascunde detaliile legate de structura și gestionarea bazei de date, permițând dezvoltatorilor să lucreze cu obiecte și clase în loc de tabele și coloane.

	- **Definirea modelului de date**: Un ORM permite definirea modelelor de date ca clase în limbaje de programare, cu atribute care corespund coloanelor din baza de date.

	- **CRUD (Create, Read, Update, Delete)**: ORM oferă metode și funcții pentru a efectua operații de creare, citire, actualizare și ștergere a datelor din baza de date, fără a scrie manual instrucțiuni SQL.

### 2.4 Sequelize

- Sequelize este o librărie JavaScript promise-based ce servește drept un instrument ORM pentru baze de date precum Postgres, MySQL, MariaDB, SQLite ori Microsoft SQL Server.

- Vom instala Sequelize folosind comanda
```
	npm install sequelize
```

### 2.5 Server web pentru gestiunea filmelor cu persistența datelor