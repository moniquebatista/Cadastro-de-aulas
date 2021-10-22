import { IClass } from "../types/IClass"
import * as db from '../libs/mysql'

const list = async () => {
    const result = await db.execute('select * from classes')
    return result.rowns
}

const get = async (id: string) => {
    if (!id) {
      throw new Error("Informe o campo id!")
    }
    
    const aula = await db.execute('select * from classes where id=?', [id])
  
    if (!aula) {
        throw new Error("Nenhuma aula encontrada para o id informado!")
    }
  
    return aula.rowns
}

const create = async (aula: IClass) => {
    if (!aula.title) {
        throw new Error("Informe o campo title!")
    }
  
    if (!aula.description) {
        throw new Error("Informe o campo description!")
    }

    if (!aula.date) {
        throw new Error("Informe o campo date")
    }

    await db.execute('insert into classes (title, description, date) values (?, ?, ?)', [aula.title, aula.description, aula.date])

    return true
  
}

const update = async (aula: IClass) => {
    if (!aula.id) {
        throw new Error("Informe o campo id!")
    }
  
    const aulaFound = await db.execute('select * from classes where id=?', [aula.id])
  
    if (!aulaFound) {
      throw new Error("Nenhuma aula encontrada para o id informado!")
    }
  
    if (!aula.title) {
        throw new Error("Informe o campo title!")
    }
  
    if (!aula.description) {
        throw new Error("Informe o campo description!")
    }
    
    if (!aula.date) {
        throw new Error("Informe o campo date")
    }

    await db.execute('update classes set title=?, description=?, date=?. where id=?', [aula.title, aula.description, aula.date, aula.id])
  
    return true
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }
  
    const note = await db.execute('select * from classes where id=?', [id])
    if (!note) {
        throw new Error("Nenhuma aula encontrada para o id informado!")
    }
  
    await db.execute('delete from classes where id=?', [id])
  
    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
