import { Request, Response, NextFunction } from 'express'
import { PermType } from '../schemas/user.schema'
import * as service from '../services/user.service'
import * as newstudentservice from '../services/newstudent.service'
import * as bcrypt from 'bcrypt'
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { sign } from 'jsonwebtoken'
import { jwtSecret } from '../utils/secret'
import { decodeToken } from '../utils/token'
import { getToken, getUserData } from '../utils/api_etu'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    
    const { first_name, last_name, email, birthday, password, contact, discord_id /*, uuid*/ } = req.body

    first_name ?? Error(res, { msg: "No first name" })
    last_name ?? Error(res, { msg: "No last name" })
    //uuid ?? Error (res, {msg: "No UUID"})

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await service.createUser(first_name, last_name, email, birthday, "NewStudent", contact, discord_id, hashedPassword, PermType.NewStudent)
        
        const newUser = await service.getUserByEmail(email);

        if(newUser){

        //Used for check a specific UUID for avoid to used the same UUID twice, not used in 2024, uncomment to use it
        //await  newstudentservice.setUUID(uuid, true, newUser.id);
        Created(res, {msg : "User created ! Welcome !"})

        }else{
        Error(res, {msg : "User not created"});
        }
    } catch (error) {
        Error(res, { error, msg: "Erreur lors de l\'enregistrement de l\'utilisateur"})
    }
}

export const newStudentLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await service.getNewStudentByEmail(email)
        if (!user) {
            return Error(res, { msg: "user doesn't exists" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return Error(res, { msg: "password erroned" })
        }
        const id = user.id
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        service.incrementConnection(id);
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

        const { email, firstName, lastName, branch, birthday, discord_tag } = user_data
        let user = await service.getUserByEmail(email)

        if (!user) {
            await service.createUser(firstName, lastName, email, birthday ,branch,"", discord_tag, "default", PermType.Student)
            user = await service.getUserByEmail(email)
        }

        const id = user?.id
        if (!id) return Error(res, {})
            
        await service.updateUserStudent(id, firstName, lastName, email, branch, birthday);
            
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        service.incrementConnection(id);
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

export const isTokenValid = async (req: Request, res: Response)=> {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return Error(res, { msg: 'Unauthorized: Invalid token' });
        }
        const decodedToken = decodeToken(req);
        if (!decodedToken) {
            return Unauthorized(res, { msg: 'Unauthorized: Token has expired' });
        }else{
            return Ok(res, {data: {isValid: true}});
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
    
}
