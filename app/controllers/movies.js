import random from "random";
import {movies} from "../models/movies.js";

const getMovies = (req, res) => {
    res.send({records: movies});
}

const getRandomMovie = (req, res) => {
    const randomIndex = random.int(0, movies.length - 1);
    res.send({ movie: movies[randomIndex] });
}

const search = (req, res) => {
    // accesarea parametrilor de tip query
    const requestedTitle = req.query.title;
    const identifiedMovie = movies.find(movie => movie.includes(requestedTitle));

    if (identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
}

const getById = (req, res) => {
    // accesarea parametrilor de tip path
    const id = req.params.id;
    // vom considera ca id-ul este indexul elementului în cadrul array-ului movies
    const identifiedMovie = movies[id];

    if(identifiedMovie) {
        res.send({movie: identifiedMovie});
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
}

const create = (req, res) => {
    // accesarea parametrilor de tip body
    const newMovie = req.body.title;

    // dacă filmul nu există deja, îl adăugăm
    if(!movies.includes(newMovie)) {
        movies.push(newMovie);
    }

    res.status(201).send({message: "Movie was created"});
};

const update = (req, res) => {
    const {oldTitle, newTitle} = req.body;
    const index = movies.indexOf(oldTitle);

    if(index === -1) {
        res.status(404).send({message: "Movie not found"});
        return;
    }

    movies.splice(index, 1, newTitle);
    res.status(200).send({message: "Movie updated"});
};

const remove = (req, res) => {
    const movieId = req.params.id;
    
    if(movies[movieId]) {
        movies.splice(movieId, 1);
        res.status(200).send({message: "Movie deleted"});
    } else {
        res.status(500).send({message: "Cannot remove a movie that doesn't exist"});
    }
};

export {
    getMovies,
    getRandomMovie,
    search,
    getById,
    create,
    update,
    remove
}