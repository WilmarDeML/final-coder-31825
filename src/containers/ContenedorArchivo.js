import fs from 'fs/promises'

export default class ContenedorArchivo {
    constructor(nombreArchivo){
        this.ruta = `./src/api/${nombreArchivo}.json`
    }

    save = async objeto => {
        const objetos = await this.getAll()        
        const objetoExiste = objetos.find(obj => obj.id === objeto.id)
        if(objetoExiste){
            const error = new Error(`Objeto con id ${id} ya se encuentra en base de datos`)
            error.tipo = 304
            throw error
        } 
        const objetoConId =  { id: Date.now().toString(), ...objeto }
        objetos.unshift(objetoConId)
        await this.tryWrite(objetos, 'Error al guardar')
        return objetoConId
    }

    getById = async id => {
        const objetos = await this.getAll()
        const objetoBuscado = objetos.find(objeto => objeto.id === id)
        if (!objetoBuscado) {
            const error = new Error(`Objeto con id ${id} no se encuentra en base de datos`)
            error.tipo = 404
            throw error
        }
        return objetoBuscado
    }

    getAll = async () => {
        try {
            const contenido = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        } catch (error) {
            await this.tryWrite([], `Error al crear el archivo: ${error.message}`)
            await this.getAll()
        }
    }

    update = async (id, objeto) => {
        const objetos = await this.getAll()
        const indiceBuscado = objetos.findIndex(p => p.id === id)
        if (indiceBuscado < 0) {
            const error = new Error(`Objeto con id ${id} no se encuentra en base de datos`)
            error.tipo = 404
            throw error
        }
        objetos[indiceBuscado] = { ...objetos[indiceBuscado], ...objeto }
        await this.tryWrite(objetos, 'Error al actualizar por id')
        return objetos[indiceBuscado]
    }

    deleteById = async id => {
        const objetos = await this.getAll()
        const objetoBuscado = objetos.find(objeto => objeto.id === id)
        if (!objetoBuscado) {
            const error = new Error(`Objeto con id ${id} no se encuentra en base de datos`)
            error.tipo = 404
            throw error
        }
        const nuevosObjetos = objetos.filter(objeto => objeto.id !== id)
        await this.tryWrite(nuevosObjetos, 'Error al borrar por id')
    }

    deleteAll = async () => {
        await this.tryWrite([], 'Error al borrar')
    }
    
    getProductoRandom = arregloDeProductos => {
        if(!arregloDeProductos.length){
            const error = new Error(`No se encontraron registros en base de datos`)
            error.status = 404
            throw error
        }
        const posicionAleatoria = Math.floor(Math.random() * arregloDeProductos.length)        
        return arregloDeProductos[posicionAleatoria] 
    }

    tryWrite = async (arreglo, mensajeDeError) => {
        try {
            await fs.writeFile(this.ruta, JSON.stringify(arreglo, null, 2) )
        } catch (error) {
            throw new Error(`${mensajeDeError}: ${error}`)
        }
    }
}