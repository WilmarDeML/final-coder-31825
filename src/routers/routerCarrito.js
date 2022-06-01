import express from "express"
import ctrlApiCarrito from "../controllers/ctrlApiCarrito.js"

const routerCarrito = express.Router()

routerCarrito.post('/', ctrlApiCarrito.crearCarrito)

routerCarrito.post('/:idCarrito/productos', ctrlApiCarrito.agregarProductoAlCarrito)

routerCarrito.get('/:id/productos', ctrlApiCarrito.listarProductosDeUnCarritoPorId)

routerCarrito.delete('/:idCarrito/productos/:idProd', ctrlApiCarrito.retirarProductoDeUnCarritoPorId)

routerCarrito.delete('/:id', ctrlApiCarrito.vaciarCarrito)

export default routerCarrito


