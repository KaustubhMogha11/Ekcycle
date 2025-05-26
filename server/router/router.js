import express from 'express';
import { generateInvoice } from '../controller/generate-inovice.js';

const router = express.Router();

router.post("/generate-invoice", generateInvoice)

router.get("/",(req, res)=>{
    res.send("Hi");
})

export default router;