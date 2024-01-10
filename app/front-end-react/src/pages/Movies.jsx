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