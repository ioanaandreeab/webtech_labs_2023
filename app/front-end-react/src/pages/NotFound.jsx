import React from "react";
import {useSelector} from 'react-redux';

const NotFound = () => {
    const movies = useSelector((state) => state.movies);
    return (
        <div>
            <h1>Page not found.</h1>
            <div>{`But there are ${movies.length} movies in the app`}</div>
        </div>
    )
};

export {NotFound};