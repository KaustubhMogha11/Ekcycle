import express from 'express';
import { confirmDetails } from '../controller/confirm-details.js';

const router = express.Router();

router.post("/confirm-details", confirmDetails)

router.get("/",(req, res)=>{
    res.send("Hi");
})

export default router;