# Seminar 13 - Utilizarea librăriilor de componente (Material UI)

### Conținut

1. [Material UI](#1-material-ui)

2. [Actualizarea aplicațiiei folosind Material UI](#2-actualizarea-aplica%C8%9Biiei-folosind-material-ui)

3. [Lucru individual](#3-lucru-individual)

## 1. Material UI

- Adesea, pentru a facilita dezvoltarea aplicațiilor web, programatorii pot folosi, pentru interfețele utilizator, o bibliotecă externă pentru componente

- O astfel de abordare asigură cooerență în ceea ce privește aspectul vizual al aplicației, întrucât componentele care sunt importate din librărie vin alături de reguli de stil definite

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

## 3. Lucru individual

- Pentru a te familiariza mai bine cu utilizarea librăriei Material UI încearcă să înlocuiești și restul componentelor din aplicație cu componente exportate de Material UI

- Poți găsi lista de componente [aici](https://mui.com/material-ui/all-components/) :)

- De asemenea, ca pregătire pentru examen, încearcă să rezolvi exemplul din directorul _exam-prep_
