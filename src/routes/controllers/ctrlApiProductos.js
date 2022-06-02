import ContenedorArchivo from "../../api/ContenedorArchivo.js"

export const contenedorProductos = new ContenedorArchivo('productos')

export default {
    obtenerProductos: async (req, res) => {
        const productos = await contenedorProductos.getAll()
        productos.length ?
            res.send(productos)
        :
            res.status(404).send({error: 'No se encontraron productos en base de datos'})
    },

    obtenerProductoPorId: async (req, res) => {
        try {
            res.send(await contenedorProductos.getById(req.params.id))            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    },

    guardarProducto: async (req, res) => {
        try {
            res.status(201).send(await contenedorProductos.save(req.body))            
        } catch (error) {
            res.status(error.tipo).end()
        }
    },

    actualizarProducto: async (req, res) => {
        try {
            res.send(await contenedorProductos.update(req.params.id, req.body))            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    },

    olvidarProducto: async (req, res) => {
        try {
            res.status(204).send(await contenedorProductos.deleteById(req.params.id))            
        } catch (error) {
            res.status(error.tipo).send({error: error.message})
        }
    }
}