import { IUser } from "../types/IUser"
import * as db from '../libs/mysql'

const list = async () => {
    const result = await db.execute('select * from users')
    return result.rowns
}

const get = async (id: string) => {
    if (!id) {
      throw new Error("Informe o campo id!")
    }
    
    const user = await db.execute('select * from users where id=?', [id])
  
    if (!user) {
        throw new Error("Nenhum user encontrado para o id informado!")
    }
  
    return user.rowns
}

const create = async (user: IUser) => {
    if (!user.login) {
        throw new Error("Informe o campo login!")
    }
  
    if (!user.password) {
        throw new Error("Informe o campo password!")
    }

    await db.execute('insert into users (login, password) values (?, ?)', [user.login, user.password])

    return true
  
}

const update = async (user: IUser) => {
    if (!user.id) {
        throw new Error("Informe o campo id!")
    }
  
    const userFound = await db.execute('select * from users where id=?', [user.id])
  
    if (!userFound) {
      throw new Error("Nenhum user encontrado para o id informado!")
    }
  
    if (!user.login) {
        throw new Error("Informe o campo login!")
    }
  
    if (!user.password) {
        throw new Error("Informe o campo password!")
    }

    await db.execute('update users set login=?, password=?. where id=?', [user.login, user.password, user.id])
  
    return true
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }
  
    const user = await db.execute('select * from users where id=?', [id])
    if (!user) {
        throw new Error("Nenhum user encontrado para o id informado!")
    }
  
    await db.execute('delete from users where id=?', [id])
  
    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
