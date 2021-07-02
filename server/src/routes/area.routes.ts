import { Router } from "express";
import {
  getAreas,
  getArea,
  createArea,
  updateArea,
  deleteArea,
} from "../controllers/area.controller";

const router = Router();

router.get("/", getAreas);
router.post("/", createArea);
router.get("/:id", getArea);
router.put("/:id", updateArea);
router.delete("/:id", deleteArea);

export default router;
