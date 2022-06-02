import ContenedorArchivo from "../../api/ContenedorArchivo.js"
import { contenedorProductos } from "./ctrlApiProductos.js"

const contenedorCarritos = new ContenedorArchivo('carritos')

export default {
    crearCarrito: async (req, res) => {
        try {
            res.status(201).send(await contenedorCarritos.save({ productos: [] }))            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    },

    agregarProductoAlCarrito: async (req, res) => {
        try {
            const producto = await contenedorProductos.getById(req.body.id)
            const carrito = await contenedorCarritos.getById(req.params.idCarrito)
            carrito.productos.push(producto)
            await contenedorCarritos.update(carrito.id, carrito)
            res.status(201).send(producto)            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    },

    listarProductosDeUnCarritoPorId: async (req, res) => {
        try {
            const carrito = await contenedorCarritos.getById(req.params.id)
            res.send(carrito?.productos)            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    },

    retirarProductoDeUnCarritoPorId: async (req, res) => {
        try {
            const carrito = await contenedorCarritos.getById(req.params.idCarrito)
            if (!carrito.productos.find(p => p.id === req.params.idProd)) {
                const error = new Error(`Producto con id ${req.params.idProd} no se encuentra dentro del carrito`)
                error.tipo = 404
                throw error
            }
            carrito.productos = carrito.productos.filter(producto => producto.id !== req.params.idProd)
            await contenedorCarritos.update(carrito.id, carrito)
            res.status(204).end()            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})            
        }
    },

    vaciarCarrito: async (req, res) => {
        try {            
            const carrito = await contenedorCarritos.getById(req.params.id)
            if (!carrito.productos.length) {
                const error = new Error(`No se encontraron productos en el carrito`)
                error.tipo = 404
                throw error
            }
            carrito.productos = []
            await contenedorCarritos.update(carrito.id, carrito)
            res.status(204).end()
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    }
}