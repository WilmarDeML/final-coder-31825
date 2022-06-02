export default (req, res, next) => {
    req.query.admin > 0 ? next() : res.status(401).send({
        error: -1,
        descripcion: `Ruta ${req.baseUrl}, Método ${req.method} no autorizado`
    })
}