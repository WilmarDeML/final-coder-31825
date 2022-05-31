import express from "express"
import routerCarrito from "./routers/routerCarrito.js"
import routerProductos from "./routers/routerProductos.js"

const app = express()

app.use(express.json());

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)

app.use('*', (req, res) => res.status(404).send({
    error: -2, descripcion: `Ruta ${req.baseUrl}, Método ${req.method} no implementada`
}))

export default app