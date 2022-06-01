import ContenedorArchivo from "../containers/ContenedorArchivo.js"

export const contenedorProductos = new ContenedorArchivo('productos')

export default {
    obtenerProductos: async (req, res) => {
        res.send(await contenedorProductos.getAll())
    },

    obtenerProductoPorId: async (req, res) => {
        res.send(await contenedorProductos.getById(req.params.id))
    },

    guardarProducto: async (req, res) => {
        res.status(201).send(await contenedorProductos.save(req.body))
    },

    actualizarProducto: async (req, res) => {
        res.send(await contenedorProductos.update(req.params.id, req.body))
    },

    olvidarProducto: async (req, res) => {
        res.status(204).send(await contenedorProductos.deleteById(req.params.id))
    }
}