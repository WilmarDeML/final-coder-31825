import express from "express"

const routerProductos = express.Router()

const esAdmin = (req, res, next) => {
    req.query.admin > 0 ? next() : res.status(401).send({
        error: -1,
        descripcion: `Ruta ${req.baseUrl}, Método ${req.method} no autorizado`
    })
}

routerProductos.get("/", (req, res) => {
    res.send({funcion: 'Listará todos los productos disponibles'})
})

routerProductos.get("/:id", (req, res) => {
    res.send({funcion: 'Listará un producto por su id'})
})

routerProductos.post("/", esAdmin, (req, res) => {
    res.send({funcion: 'Incorporará productos al listado', ojo: 'Sólo admin'})
})

routerProductos.put("/:id", esAdmin, (req, res) => {
    res.send({funcion: 'Actualizará un producto por su id', ojo: 'Sólo admin'})
})

routerProductos.delete("/:id", esAdmin, (req, res) => {
    res.send({funcion: 'Borrará un producto por su id', ojo: 'Sólo admin'})
})

export default routerProductos