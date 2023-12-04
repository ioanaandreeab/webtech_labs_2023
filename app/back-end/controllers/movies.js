import { Op } from "sequelize";
import { movies } from "../helpers/movies.js";
import  {Movie} from "../models/movies.js";

const getMovies = async (req, res) => {
	const titleQuery = req.query.title;
    const where = titleQuery ? {
		title: {
			[Op.like]: `%${titleQuery}%`
		}
	} : {};
    const movies = await Movie.findAll({where: where});
    res.status(200).send({records: movies});
}

const getById = async(req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			res.status(200).send({movie: movie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	//  campurile existente in interiorul parametrilui primit trebuie sa aiba acelasi nume precum campurile din tabela
	//  altfel, Sequelize le va ignora si va incerca sa introduca doar acele field-uri pentru care poate sa asigure identitatea
	const movie = req.body;
	await Movie.create(movie);

	res.status(201).send({message: "Movie was created"});
};

const update = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			const updatedMovie = await movie.update(req.body);
			res.status(200).send({movie: updatedMovie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			await movie.destroy();
			res.status(200).send({message: "deleted movie"});
		} else {
			res.status(404).send({message:"movie not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

const initMovies = async (req, res) => {
	try {
		const mockMovies = [...movies];
		for (let i = 0; i < mockMovies.length; i++) {
			await Movie.create(mockMovies[i]);
		}
		res.status(200).send({message: "movies table initialized with mock information"});
	} catch (err) {
		res.status(500).send({message: "server error", err:err});
	}
}

export {
    getMovies,
    getById,
    create,
    update,
    remove,
	initMovies
}