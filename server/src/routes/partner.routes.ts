import { Router } from "express";
import {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partner.controller";
import multer from '../config/multer';

const router = Router();

router.get("/", getPartners);
router.post("/", multer.single('image') ,createPartner);
router.get("/:id", getPartner);
router.put("/:id", multer.single('image') ,updatePartner);
router.delete("/:id", deletePartner);

export default router;
