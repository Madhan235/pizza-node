import express from "express";
import dotenv from "dotenv";
import {userRouter}  from "./routers/users.js";
import cors from "cors";
import { isAuthenticated } from "./routers/auth.js";
import { adminRouter } from "./routers/admin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users",userRouter)
app.use("/admin",adminRouter)
 

app.listen( process.env.PORT,()=>console.log("localhost running on process.env.Port"))