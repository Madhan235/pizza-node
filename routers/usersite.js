import express from 'express';
import { getOptions } from '../logics/users';
const router = express.Router();

router.get("/options",async(req,res)=>{
    try {
        const pizzaData = await getOptions();
        res.status(200).json({pizzaData: pizzaData});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

export const optionsRouter = router