import express from "express"
import routerCarrito from "./routers/routerCarrito.js"
import routerProductos from "./routers/routerProductos.js"

const app = express()

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

export default app