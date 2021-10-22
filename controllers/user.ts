import { Request, Response } from 'express'
import * as user from '../services/user'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const users = await user.list()
        return res.json(users)
    } catch (err: any) {
        return error(res, err)
    }
}

const get = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({ message: 'Informe o campo id!' })    

        const userFound = await user.get(id)
        res.json(userFound)
    } catch (err: any) {
        return error(res, err)
    }

}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const login = req.body.login
        const password = req.body.password

        const userCreated = await user.create({ login, password })
        return res.json(userCreated)
    } catch (err: any) {
        return error(res, err)
    }

  
}

const update = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const login = req.body.login
        const password = req.body.password

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const userUpdated = await user.update({ id, login, password})
        return res.json(userUpdated)
    } catch (err: any) {
        return error(res, err)
    }

}

const remove = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        await user.remove(id)
        res.json({ success: true })

    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    get, 
    create,
    update, 
    remove
}