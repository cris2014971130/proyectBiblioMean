import express from "express";
import provider from "../controllers/provider.js";

const router = express.Router();

router.post('/registerProvider', provider.registerProvider);
router.get('/listProvider', provider.listProvider);

export default router;