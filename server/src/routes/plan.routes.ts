import { Router } from "express";
import {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/plan.controller";

const router = Router();

router.get("/", getPlans);
router.post("/", createPlan);
router.get("/:id", getPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
