import express from 'express';
import { getCheese, getCrust,getMeat,getSauce, getVeggies } from '../logics/users.js';
const router = express.Router();

router.get("/options",async(req,res)=>{
    try {
        const crustData = await getCrust();
        const sauceData = await getSauce();
        const cheeseData = await getCheese();
        const veggiesData = await getVeggies();
        const meatData = await getMeat();
        res.status(200).json({pizzaData: {

            crustData,
            sauceData,
            cheeseData,
            veggiesData,
            meatData
        }

        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

export const optionsRouter = router