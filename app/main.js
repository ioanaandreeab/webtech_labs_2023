import express from 'express';
import {router as moviesRouter} from './routes/movies.js';

const PORT = 8080;

const app = express();
app.use(express.json());

// atașarea rutelor specifice unui film
app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));