import express from "express"

const routerProductos = express.Router()

routerProductos.get("/", (req, res) => {
    res.send({funcion: 'Listará todos los productos disponibles'})
})

routerProductos.get("/:id", (req, res) => {
    res.send({funcion: 'Listará un producto por su id'})
})

routerProductos.post("/", (req, res) => {
    res.send({funcion: 'Incorporará productos al listado', ojo: 'Sólo admin'})
})

routerProductos.put("/:id", (req, res) => {
    res.send({funcion: 'Actualizará un producto por su id', ojo: 'Sólo admin'})
})

routerProductos.delete("/:id", (req, res) => {
    res.send({funcion: 'Borrará un producto por su id', ojo: 'Sólo admin'})
})

export default routerProductos