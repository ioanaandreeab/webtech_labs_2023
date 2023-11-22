import express from 'express';
import * as collectionController from "../controllers/collections.js";

export const router = express.Router();

router.get("/", collectionController.getCollections);
router.get("/:id", collectionController.getById);

router.post("/", collectionController.create);
router.put("/:id", collectionController.update);
router.delete("/:id", collectionController.remove);

// relationship related routes
router.get("/:id/movies", collectionController.getMoviesForCollection);
router.post("/:collectionId/movies/:movieId", collectionController.addMovieToCollection);