import { Response, NextFunction, Request } from "express";
import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from "../config/authConfig";

export const AuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided'})
    }

    const [, token] = authHeader.split(' ')

    try {
        const decodedToken = await jwt.verify(token, AUTH_SECRET)

        if (typeof decodedToken !== 'string') {
            req.userId = decodedToken.id
        }

        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token'})
    }
}