import express from "express";
import provider from "../controllers/provider.js";

const router = express.Router();

router.post('/registerProvider', provider.registerProvider);
router.get('/listProvider', provider.listProvider);
router.put('/updateProvider', provider.updateProvider);
router.delete('/deleteProvider/:_id', provider.deleteProvider);

export default router;