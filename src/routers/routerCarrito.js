import express from "express"

const routerCarrito = express.Router()

routerCarrito.post('/', (req, res) => {
    res.send({funcion: 'Creará un producto y devuelve su id'})
})

routerCarrito.post('/:idCarrito/products', (req, res) => {
    res.send({funcion: 'Incorporará carritos al carrito, enviando id del producto en el body'})
})

routerCarrito.get('/:id/products', (req, res) => {
    res.send({funcion: 'Listará los productos guardados en el carrito'})
})

routerCarrito.delete('/:idCarrito/products/:idProd', (req, res) => {
    res.send({funcion: 'Eliminará un producto por id de carrito y de producto'})
})

routerCarrito.delete('/:id', (req, res) => {
    res.send({funcion: 'Vaciará un carrito'})
})

export default routerCarrito


