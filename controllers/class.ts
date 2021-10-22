import { Request, Response } from 'express'
import * as aula from '../services/class'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const aulas = await aula.list()
        return res.json(aulas)
    } catch (err: any) {
        return error(res, err)
    }
}

const get = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({ message: 'Informe o campo id!' })    

        const aulaFound = await aula.get(id)
        res.json(aulaFound)
    } catch (err: any) {
        return error(res, err)
    }

}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date

        const aulaCreated = await aula.create({ title, description, date })
        return res.json(aulaCreated)
    } catch (err: any) {
        return error(res, err)
    }

  
}

const update = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const aulaUpdated = await aula.update({ id, title, description, date })
        return res.json(aulaUpdated)
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

        await aula.remove(id)
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