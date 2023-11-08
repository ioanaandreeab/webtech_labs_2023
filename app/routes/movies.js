import express from 'express';
import * as movieController from "../controllers/movies.js";

export const router = express.Router();
// GET routes
router.get("/", movieController.getMovies);
router.get("/random", movieController.getRandomMovie);
router.get("/search", movieController.search);
router.get("/:id", movieController.getById);

// POST routes
router.post("/", movieController.create);
// PUT route
router.put("/", movieController.update);
// DELETE route
router.delete("/:id", movieController.remove);