import express from "express"
import ContenedorArchivo from "../containers/ContenedorArchivo.js"

const contenedorProductos = new ContenedorArchivo('productos')

const routerProductos = express.Router()

const esAdmin = (req, res, next) => {
    req.query.admin > 0 ? next() : res.status(401).send({
        error: -1,
        descripcion: `Ruta ${req.baseUrl}, Método ${req.method} no autorizado`
    })
}

routerProductos.use(express.json())

routerProductos.get("/", async (req, res) => {
    res.send(await contenedorProductos.getAll())
})

routerProductos.get("/:id", async (req, res) => {
    res.send(await contenedorProductos.getById(req.params.id))
})

routerProductos.post("/", esAdmin, async (req, res) => {
    res.send(await contenedorProductos.save(req.body))
})

routerProductos.put("/:id", esAdmin, async (req, res) => {
    res.send(await contenedorProductos.update(req.params.id, req.body))
})

routerProductos.delete("/:id", esAdmin, async (req, res) => {
    res.send(await contenedorProductos.deleteById(req.params.id))
})

export default routerProductos