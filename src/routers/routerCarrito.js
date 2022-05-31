import express from "express"
import ContenedorArchivo from "../containers/ContenedorArchivo.js"

const contenedorCarritos = new ContenedorArchivo('carritos')
const contenedorProductos = new ContenedorArchivo('productos')

const routerCarrito = express.Router()

routerCarrito.post('/', async (req, res) => {
    res.send(await contenedorCarritos.save({ productos: [] }))
})

routerCarrito.post('/:idCarrito/productos', async (req, res) => {
    const producto = await contenedorProductos.getById(req.body.id)
    const carrito = await contenedorCarritos.getById(req.params.idCarrito)
    if (!carrito || !producto) {
        return res.send({ error: "Carrito o Producto no encontrado" })
    }
    carrito.productos.push(producto)
    await contenedorCarritos.update(carrito.id, carrito)
    res.send(producto)
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const carrito = await contenedorCarritos.getById(req.params.id)
    res.send(carrito?.productos)
})

routerCarrito.delete('/:idCarrito/productos/:idProd', async (req, res) => {
    const carrito = await contenedorCarritos.getById(req.params.idCarrito)
    carrito.productos = carrito.productos.filter(producto => producto.id !== req.params.idProd)
    await contenedorCarritos.update(carrito.id, carrito)
    res.send(carrito.productos)
})

routerCarrito.delete('/:id', (req, res) => {
    res.send({funcion: 'Vaciará un carrito'})
})

export default routerCarrito


