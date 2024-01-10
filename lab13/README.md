# Seminar 13 - Utilizarea bibliotecilor de componente (Material UI)

### Conținut

1. [Material UI](#1-material-ui)

2. [Actualizarea aplicațiiei folosind Material UI](#2-actualizarea-aplica%C8%9Biiei-folosind-material-ui)

3. [Bonus - utilizarea tabelelor](#3-bonus---utilizarea-tabelelor)

4. [PrimeReact](#4-primereact)

5. [Lucru individual](#5-lucru-individual)

## 1. Material UI

- Adesea, pentru a facilita dezvoltarea aplicațiilor web, programatorii pot folosi, pentru interfețele utilizator, o bibliotecă externă pentru componente

- O astfel de abordare asigură coerență în ceea ce privește aspectul vizual al aplicației, întrucât componentele care sunt importate din bibliotecă vin alături de reguli de stil definite

- Una dintre alegerile populare pentru React (și nu numai) este **Material UI**

- **Material UI** este o bibliotecă de componente pentru React, construită urmând principiile _"Material Design"_, dezvoltate de Google

- Câteva caracteristici cheie ale Material UI includ:

    - **Componente predefinite**: 
        - Material-UI oferă o gamă largă de componente _gata de a fi utilizate_, precum butoane, bare de navigare, căsuțe de dialog, ferestre modale, câmpuri de text

    - **Stilizare conform principiilor Material Design**

    - **Tematică personalizabilă**
        - Material-UI permite _personalizarea aspectului componentelor_ prin intermediul temelor
        - Dezvoltatorii pot adapta culorile, fonturile și alte aspecte pentru a se potrivi cu identitatea vizuală a propriilor proiecte

    - **Suport pentru responsiveness**

    - **Documentație bogată și comunitate activă**

## 2. Actualizarea aplicațiiei folosind Material UI

- Conform [documentației](https://mui.com/material-ui/getting-started/installation/), putem instala Material UI precum un orice alt pachet, utilizând _npm_

- Vom rula următoarea comandă în directorul _front-end-react_

```sh
npm install --save @mui/material @emotion/react @emotion/styled
```

- În continuare, vom modifica componenta _MovieCard_ pentru a utiliza componente exportate de Material UI, în loc de componentele pe care le-am definit seminarele trecute

- Astfel, stilul pe care l-am definit în fișierul MovieCard.css va deveni redundant, deoarece componentele sunt importate cu stilurile predefinite, pe care le vom ajusta în funcție de modul în care dorim să arate acestea

- Componenta MovieCard devine:
```js
import React, {useState} from 'react';
import {Card, CardContent, Button, Box, Grid, Typography, TextField} from '@mui/material';

// componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
// o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
// si o functie onEdit ce va fi apelata atunci cand se doreste editarea unui film
// componenta are, deci, doua moduri -> read si edit
const MovieCard = ({movie, onDelete, onEdit}) => {
    const [isEditMode, setIsEditMode] = useState(false);
        // adaugam in state toate campurile care vor fi completate
        // valorile initiale sunt cele ale filmului primit
        const [title, setTitle] = useState(movie.title);
        const [year, setYear] = useState(movie.year);
        const [director, setDirector] = useState(movie.director);
        const [genre, setGenre] = useState(movie.genre);
        const [synopsis, setSynopsis] = useState(movie.synopsis);
        const [duration, setDuration] = useState(movie.duration);
        const [poster, setPoster] = useState(movie.poster);

        const updateMovie = (event) => {
            // impiedicam trimiterea default a formularului -> refresh paginii
            event.preventDefault();
            // pasam functiei de salvare obiectul movie construit prin completarea formularului
            onEdit({title, year, director, genre, synopsis, duration, poster, id: movie.id});
            setIsEditMode(false);
        }
    
        // definim callbacks pentru evenimentele de onChange pentru toate inputurile
        const onChangeTitle = (event) => {
            setTitle(event.target.value);
        }
    
        const onChangeYear = (event) => {
            setYear(event.target.value);
        }
    
        const onChangeGenre = (event) => {
            setGenre(event.target.value);
        }
    
        const onChangeSynopsis = (event) => {
            setSynopsis(event.target.value);
        }
    
        const onChangeDirector = (event) => {
            setDirector(event.target.value);
        }
    
        const onChangeDuration = (event) => {
            setDuration(event.target.value);
        }
    
        const onChangePoster = (event) => {
            setPoster(event.target.value);
        }

    return (
        <Card variant='outlined' sx={{marginTop: 2}}>
            {/* randare conditionala, in functie de modul cardului ce afiseaza filmul - read/edit */}
            {isEditMode ? 
                <CardContent>
                    <Grid container columnSpacing={1} direction="column">
                        <TextField label="Title" value={title} onChange={onChangeTitle} type="text" id="title" name="title" required/><br/>
                        <TextField label="Year" value={year} onChange={onChangeYear} type="number" id="year" name="year" required/><br/>
                        <TextField label="Director" value={director} onChange={onChangeDirector} type="text" id="director" name="director" required/><br/>
                        <TextField label="Genre" value={genre} onChange={onChangeGenre} type="text" id="genre" name="genre" required/><br/>
                        <TextField multiline label="Synopsis" value={synopsis} onChange={onChangeSynopsis} id="synopsis" name="synopsis" required></TextField><br/>
                        <TextField label="Duration (minutes)" value={duration} onChange={onChangeDuration} type="number" id="duration" name="duration" required/><br/>
                        <TextField label="Poster URL" value={poster} onChange={onChangePoster} type="url" id="poster" name="poster" required/><br/>
                    </Grid>

                    <Button variant="contained" color="warning" onClick={updateMovie} sx={{marginRight: 1}}>Save</Button>
                    <Button variant="contained" color="error" onClick={() => setIsEditMode(false)}>Abort changes</Button>
                </CardContent>
            :
            <CardContent>
                {/* utilizarea componentei grid pentru a realiza aranjarea si spatierea elementelor */}
                <Grid>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={2}>
                            <img alt="movie-img" height={200} src={movie.poster}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container columns={12}>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        {/* sintaxa de JSX */}
                                        {`${movie.title} (${movie.year})`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} textAlign="right">
                                    {/* apeleaza la click functia de delete primita prin props si trimite filmul drept parametru */}
                                    <Button variant="contained" color="error" onClick={() => onDelete(movie)} sx={{marginRight: 1}}>X</Button>
                                    <Button variant="contained" color="warning" onClick={() => setIsEditMode(true)}>Edit</Button>
                                </Grid>
                            </Grid>
                            <Box mt={2} mb={2}>
                                {/* sx - proprietate pentru stil custom */}
                                <Typography sx={{ fontStyle: 'italic' }}>
                                    {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                                </Typography> 
                            </Box>
                            {/* culoare selectata din tema default https://mui.com/material-ui/customization/palette/ */}
                            <Box backgroundColor="warning.main" p={2} sx={{borderRadius: 5}} color="white">
                                {movie.synopsis}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            }
        </Card>
    )
};

export {MovieCard};
```

## 3. Bonus - utilizarea tabelelor

- Pe lângă componente de bază, Material UI oferă multe componente smart, care, pe lângă un aspect specific, prezintă și o serie de funcționalități deja implementate

- Pentru a observa un exemplu, vom integra componenta [Data Grid](https://mui.com/x/react-data-grid/), ce permite afișarea datelor într-un tabel, însă oferă, în mod implicit, posibilitatea de a pagina, sorta și filtra datele afișate, precum și de a ascunde dinamic coloanele afișate

- Vom avea nevoie de un pachet ce conține implementarea tabelului și de un pachet ce conține icon-urile definite de Material
```
npm install --save @mui/x-data-grid @mui/icons-material
```

- Pentru a simplifica integrarea tabelului, vom defini o nouă componentă, *MovieTable* și un fișier de stil în care vom adăuga două clase

- _src/components/MovieTable.jsx_
```js
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import "./MovieTable.css";

const MovieTable = ({ movies, deleteMovie }) => {
    // configurarea coloanelor
    const columns = [
        { 
            field: "id", 
            headerName: "ID", 
            flex: 0.1, align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        { 
            field: "title", 
            headerName: "Title", 
            flex: 1,
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        { 
            field: "director", 
            headerName: "Director", 
            flex: 1, 
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        {
            field: "year",
            headerName: "Year",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        { 
            field: "genre", 
            headerName: "Genre", 
            flex: 0.5, 
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        {
            field: "duration",
            headerName: "Duration",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Remove",
            align: "center",
            headerClassName: "table-header",
            flex: 0.5,
            // configurarea butoanelor cu actiuni
            getActions: ({ id }) => {
                return ([
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            if (window.confirm("Do you want to delete this movie?")) {
                                deleteMovie({ id: id });
                            };
                        }}
                        color="inherit"
                    />
                ]);
            }
        }
    ];

    return (
        <div className="table-container">
            {/* utilizarea DataGrid */}
            <DataGrid rows={movies} columns={columns} />
        </div>
    );
}

export { MovieTable };
```

- _src/components/MovieTable.css_
```css
.table-container {
    height: 350px;
    margin: 0 auto;
    width: 100%;
    background-color: white;
}

.table-header {
    background-color: whitesmoke;
}
```

- De asemenea, vom defini o altă componentă denumită _MovieList_ în care vom muta afișarea listei cu filme
    - _src/components/MovieList.jsx_
```js
import React from 'react';
import { MovieCard } from './MovieCard';

const MovieList = ({ movies, editMovie, deleteMovie }) => {
    return (
        <div id="moviesContainer">
            {movies.map((movie, index) => (
                <MovieCard movie={movie} key={index} onDelete={deleteMovie} onEdit={editMovie}/>
            ))}
        </div>
    );
}

export { MovieList };
```

- În pagina _Movies_ vom adăuga un mecanism ce ne va permite să afișam, condițional, unul dintre cele două moduri de vizualizare
    - _src/pages/Movies.jsx_
```js
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { MovieCard } from '../components/MovieCard';

import './Movies.css';
import { AddMovieModal } from '../components/AddMovieModal';
import { MovieList } from '../components/MovieList';
import { MovieTable } from '../components/MovieTable';

const SERVER_URL = "http://localhost:8080";

const Movies = () => {
    // declaram o variabila state pentru a stoca filmele - inițial este un array gol
    const [movies, setMovies] = useState([]);
    // declaram o variabila state pentru a stoca titlul filmului cautat de utilizator
    const [queryTitle, setQueryTitle] = useState(null);
    // declaram o variabila state pentru a determina daca afisam sau nu modala
    const [isModalOpen, setIsModalOpen] = useState(false);
    // definirea unui nou state care va reflecta modul de vizualizare selectat, valoarea default fiind cea de lista
    const [viewMode, setViewMode] = useState("list");

    const getMovies = () => {
        const queryParams = new URLSearchParams();
        
        if(queryTitle) {
            queryParams.append("title", queryTitle);
        }

        // apelam metoda expusa de backend pentru a prelua filmele si le setam in state
        axios.get(`${SERVER_URL}/movies?` + queryParams)
        .then(res => res.data)
        .then(data => setMovies(data.records));
    };

    const addMovie = (movie) => {
        axios.post(`${SERVER_URL}/movies`, movie)
            .then(() => getMovies())
            .catch(err => console.log(err));
    }

    const editMovie = (movie) => {
        const movieParams = {...movie};
        delete movieParams.id;
        axios.put(`${SERVER_URL}/movies/${movie.id}`, movieParams)
        .then(() => getMovies())
        .catch(err => console.log(err));
    }

    const deleteMovie = (movie) => {
        axios.delete(`${SERVER_URL}/movies/${movie.id}`)
        .then(() => getMovies())
        .catch(err => console.log(err));
    }

    useEffect(() => {
        // in momentul in care pagina este adaugata in DOM
        // se preiau datele din backend
        getMovies();
    }, []);

    const onChangeQueryTitle = (event) => {
        // preluarea valorii introduse de utilizator pentru filmul cautat
        const searchedMovieTitle = event.target.value;
        // setarea valorii in state
        setQueryTitle(searchedMovieTitle);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const switchView = () => {
        // metoda switchView va actualiza modul de vizualizare printr-un pseudo mecanism de "toggle"
        setViewMode(viewMode === "list" ? "table" : "list");
    }

    return (
        <div>
            <div className="container">
                <h3>All movies</h3>
                <div className="toolbar">
                    <input onChange={onChangeQueryTitle} id="search" className="searchbar custom-text-input" type="text" placeholder="Search for a movie" />
                    <button className="custom-button" onClick={() => getMovies()}>Search</button>
                    <button className="custom-button" onClick={openModal}>Add a movie</button>
                    {/* noul buton ce va permite schimbarea modurilor de vizualizare, apeland metoda switchView primita ca props */}
                    <button className="custom-button" onClick={() => switchView()}>Switch view</button>
                </div>
                {/* in functie de valoarea proprietatii viewMode, una dintre cele doua componenta de vizualizare va fi afisata */}
                {viewMode === "list" && <MovieList movies={movies} deleteMovie={deleteMovie} editMovie={editMovie} />}
                {viewMode === "table" && <MovieTable movies={movies} deleteMovie={deleteMovie} />}
            </div>
            {/* randare conditionala */}
            {isModalOpen && <AddMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
        </div>
    )
};

export {Movies};
```

## 4. PrimeReact
- O altă bibliotecă de componente vizuale foarte utilizată în aplicațiile React este [PrimeReact](https://primereact.org/), ce prezintă atât un aspect diferit față de Material UI, cât și componente cu diferite funcționalități și o filosofie de utilizare diferită

- Urmărește clipurile de mai jos pentru a vedea cum poți utiliza PrimeReact pentru a implementa un tabel similar cu cel definit anterior
    - [Integrarea unui tabel](https://www.youtube.com/watch?v=gpIXwZZxKws)
    - [Paginarea și filtrarea datelor din tabel](https://www.youtube.com/watch?v=YjN0cq2BO6k)
    - [Sortarea datelor din tabel](https://www.youtube.com/watch?v=n-xsJh0Xi1Y)

- În plus, pe lângă bibliotecile "tradiționale" de componente, ce adesea oferă programatorilor o variantă îmbunătățită a elementelor native din browser, există biblioteci ce simplifică implementarea unor scenarii particulare, cum ar fi desenarea unei hărți sau a unui grafic 

🤔 Urmărește clipul de mai jos pentru a vedea cum poți utiliza Google Charts într-o aplicație React
    - [Utilizare Google Charts](https://www.youtube.com/watch?v=ss2Xui0NT-U)

## 5. Lucru individual

- Pentru a te familiariza mai bine cu utilizarea bibliotecii Material UI încearcă să înlocuiești și restul componentelor din aplicație cu componente exportate de Material UI

- Poți găsi lista de componente [aici](https://mui.com/material-ui/all-components/) :)

- De asemenea, ca pregătire pentru examen, încearcă să rezolvi exemplul din directorul _exam-prep_
