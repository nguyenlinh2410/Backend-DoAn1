import express from "express";
import {
  getAllPerson,
  getCreatePerson,
  DeletePerson,
  getUpdatePerson,
  getFileUpdatePerson,
} from "../controllers/PersonControllers.js";

const router = express.Router();

router.get("/api/getAllPerson", getAllPerson);

router.get("/api/getFileCreatePerson", (req, res) => {
  res.render("Createperson");
});
router.post("/api/getCreatePerson", getCreatePerson);

router.delete("/api/deletePerson/:id", DeletePerson);

router.get("/api/getFileUpdatePerson/:id", getFileUpdatePerson);
router.put("/api/getUpdatePerson/:id", getUpdatePerson);

export default router;
