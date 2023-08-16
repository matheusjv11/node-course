import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { UserType } from "../types/UserType";

export class AuthController {
    public static async store (req: Request<{}, {}, UserType>, res: Response) {  
        const { email, senha} = req.body

        const userFound = await UserModel.findOne({ email })

        if (!userFound || !await userFound.comparePassHash(senha)) {
            return res.sendStatus(400).json({ error: "Invalid email or password."})
        }

        return res.json({
            token: UserModel.generateToken(userFound)
        })
    }
}