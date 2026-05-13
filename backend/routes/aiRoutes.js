import express from "express";
import { askAiAssistant } from "../controllers/aiController.js";

const aiRoutes = express.Router();

aiRoutes.post("/assistant", askAiAssistant);

export default aiRoutes;
