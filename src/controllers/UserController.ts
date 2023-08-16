import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { UserType } from "../types/UserType";

export class UserController {
    public static async store(req: Request<{}, {}, UserType>, res: Response) {
        const { email } = req.body

        if (await UserModel.findOne({ email })) {
            return res.sendStatus(400).json({error: 'Current email has already been registered.'})
        }

        const usuarioCadastrado = await UserModel.create(req.body) 
        return res.sendStatus(201).json(usuarioCadastrado)  
    }
}