import express from 'express';
import * as personController from "../controllers/people.js";

export const router = express.Router();

router.get("/", personController.getPeople);
router.get("/:id", personController.getById);

router.post("/", personController.create);
router.put("/:id", personController.update);
router.delete("/:id", personController.remove);

// relationship related routes
router.get("/:id/collections", personController.getCollectionsForPerson);
router.post("/:personId/collections/:collectionId", personController.addCollectionToPerson);