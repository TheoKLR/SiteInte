import { Request, Response, NextFunction } from 'express'
import { PermType } from '../schemas/user.schema'
import * as service from '../services/user.service'
import * as bcrypt from 'bcrypt'
import { Error, Created, Ok } from '../utils/responses'
import { sign } from 'jsonwebtoken'
import { jwtSecret } from '../utils/secret'
import { decodeToken } from '../utils/token'
import { getToken, getUserData } from '../utils/api_etu'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, password } = req.body

    first_name ?? Error(res, { msg: "No first name" })
    last_name ?? Error(res, { msg: "No last name" })

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await service.createUser(first_name, last_name, email, hashedPassword, PermType.NewStudent)
        Created(res, {})
    } catch (error) {
        Error(res, { error })
    }
}

export const newStudentLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await service.getNewStudentByEmail(email)
        if (user === null) {
            return Error(res, { msg: "user doesn't exists" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return Error(res, { msg: "password erroned" })
        }
        const id = user.id
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        Ok(res, { data: token })
    } catch (error) {
        Error(res, { error })
    }
}

export const studentLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization_code } = req.params

        if (!authorization_code) return Error(res, { msg : 'no auth code provided' });

        const etu_token = await getToken(authorization_code)
        const user_data = await getUserData(etu_token)

        if (user_data === null) {
            Error(res, {})
            return
        }

        const { email, firstName, lastName } = user_data
        let user = await service.getUserByEmail(email)

        if (user === null) {
            await service.createUser(firstName, lastName, email, "default", PermType.Student)
            user = await service.getUserByEmail(email)
        }

        const id = user?.id
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        Ok(res, { data: { token } })
    } catch (error) {
        Error(res, { error })
    }
}

export const getRole = async (req: Request, res: Response) => {
    try {
        const decodedToken = decodeToken(req)
        const user = await service.getUserByEmail(decodedToken.email)

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" })
        }
        Ok(res, { data: user.permission })
    } catch (error) {
        Error(res, { error })
    }
}