import express from "express";
import book from "../controllers/book.js";

const router = express.Router();

router.post('/registerBook', book.registerBook);
router.get('/listBook', book.listBook);

export default router;
