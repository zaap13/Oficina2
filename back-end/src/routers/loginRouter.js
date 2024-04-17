import express from "express";
import { postLogin } from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/", postLogin);

export default loginRouter;
