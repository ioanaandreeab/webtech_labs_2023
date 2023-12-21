import axios from "axios";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setMovies } from "../reducers/movies-reducer";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToMovies = () => {
        navigate('/movies');
    }

    useEffect(() => {
        axios.get("http://localhost:8080/movies")
        .then(res => res.data)
        .then(data => dispatch(setMovies(data.records)));
    }, [])

    return (
        <div>
            <h1>Explore movies</h1>
            <button className="custom-button" onClick={navigateToMovies}>Start now</button>
            <button className="custom-button" onClick={() => navigate("/series")}>Series here</button>
        </div>
    )
};

export {Home};