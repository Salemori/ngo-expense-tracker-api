const express = require("express");
const orphanageController = require("../controllers/orphanageController.js");
// const checkUserLoginStatus = require("../middlewares/authValidation.js")

const orphanageRouter = express.Router();

orphanageRouter.get("/", orphanageController.getOrphanages);
orphanageRouter.get("/:id", orphanageController.getOrphanageById);
orphanageRouter.get("/name/:name", orphanageController.getOrphanageByName);
orphanageRouter.get("/created/by-user", orphanageController.getOphanageByUser);
orphanageRouter.post("/", orphanageController.createOrphanage);
orphanageRouter.patch("/:id", orphanageController.updateOrphanage);
orphanageRouter.delete("/:id", orphanageController.deleteOrphanage);
orphanageRouter.delete("/permanent-delete/:id", orphanageController.permanentDeleteOrphanage);

module.exports = orphanageRouter;