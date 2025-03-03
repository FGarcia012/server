import { Router } from "express";
import { agregarProducto } from "./producto.controller.js";

const router = Router()

router.get('/agregarProducto', agregarProducto)

export default router