import { Router } from "express";
import { saludo } from "./user.controller.js";

const router = Router()

router.get('/hola',saludo)

export default router