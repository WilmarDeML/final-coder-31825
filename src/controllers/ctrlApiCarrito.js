import ContenedorArchivo from "../containers/ContenedorArchivo.js"
import { contenedorProductos } from "./ctrlApiProductos.js"

const contenedorCarritos = new ContenedorArchivo('carritos')

export default {
    crearCarrito: async (req, res) => {
        res.status(201).send(await contenedorCarritos.save({ productos: [] }))
    },

    agregarProductoAlCarrito: async (req, res) => {
        const producto = await contenedorProductos.getById(req.body.id)
        const carrito = await contenedorCarritos.getById(req.params.idCarrito)
        if (!carrito || !producto) {
            return res.send({ error: "Carrito o Producto no encontrado" })
        }
        carrito.productos.push(producto)
        await contenedorCarritos.update(carrito.id, carrito)
        res.status(201).send(producto)
    },

    listarProductosDeUnCarritoPorId: async (req, res) => {
        const carrito = await contenedorCarritos.getById(req.params.id)
        res.send(carrito?.productos)
    },

    retirarProductoDeUnCarritoPorId: async (req, res) => {
        const carrito = await contenedorCarritos.getById(req.params.idCarrito)
        carrito.productos = carrito.productos.filter(producto => producto.id !== req.params.idProd)
        await contenedorCarritos.update(carrito.id, carrito)
        res.status(204).end()
    },

    vaciarCarrito: async (req, res) => {
        const carrito = await contenedorCarritos.getById(req.params.id)
        carrito.productos = []
        await contenedorCarritos.update(carrito.id, carrito)
        res.status(204).end()
    }
}