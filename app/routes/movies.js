import express from 'express';
import * as movieController from "../controllers/movies.js";

export const router = express.Router();
// GET routes
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getById);

// POST routes
router.post("/", movieController.create);
// PUT route
router.put("/:id", movieController.update);
// DELETE route
router.delete("/:id", movieController.remove);