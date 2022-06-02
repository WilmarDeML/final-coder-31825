import express from "express"
import ctrlApiProductos from "../controllers/ctrlApiProductos.js"
import esAdmin from "../controllers/ctrlEsAdmin.js"

const routerProductos = express.Router()

routerProductos.get("/", ctrlApiProductos.obtenerProductos)

routerProductos.get("/:id", ctrlApiProductos.obtenerProductoPorId)

routerProductos.post("/", esAdmin, ctrlApiProductos.guardarProducto)

routerProductos.put("/:id", esAdmin, ctrlApiProductos.actualizarProducto)

routerProductos.delete("/:id", esAdmin, ctrlApiProductos.olvidarProducto)

export default routerProductos