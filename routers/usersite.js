import express from 'express';
const router = express.Router();

router.get("/options",async(req,res)=>{
    try {
        const data = await fetch(`./data.js`)
        res.send(data)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

export const optionsRouter = router