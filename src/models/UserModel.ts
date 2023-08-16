import { model, Schema, Document, Model } from "mongoose";
import { UserType } from "../types/UserType";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AUTH_SECRET, AUTH_TTL } from "../config/authConfig";

interface UserDocument extends UserType, Document {
    comparePassHash: (pass: string) => Promise<boolean>
}

interface UserModelInterface extends Model<UserDocument> {
    generateToken: (token: UserDocument) => string
}

const UserSchema = new Schema<UserDocument>({
    nome: {
        type: String,
        required: true,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        maxlength: 250,
        lowercase: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
}, { timestamps: true});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        return next()
    }

    this.senha = await bcrypt.hash(this.senha, 8)
})

UserSchema.methods = {
    comparePassHash (pass: string) {
        return bcrypt.compare(pass, this.senha)
    }
}

UserSchema.statics = {
    generateToken ({ id }: UserDocument) {
        return jwt.sign({id}, AUTH_SECRET, {
            expiresIn: AUTH_TTL
        })
    } 
}

export const UserModel = model<UserDocument, UserModelInterface>('User', UserSchema)