import express from 'express';
import { confirmDetails } from '../controller/confirm-details.js';
import { getPriceInfo } from '../controller/price-info.js';

const router = express.Router();

router.post("/confirm-details", confirmDetails)

router.get("/price-info", getPriceInfo);

router.get("/",(req, res)=>{
    res.send("Hi");
})

export default router;