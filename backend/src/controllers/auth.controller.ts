import { Request, Response, NextFunction } from 'express'
import {PermType, User} from '../schemas/user.schema'
import * as user_service from '../services/user.service'
import * as auth_service from '../services/auth.service'
import * as newstudentservice from '../services/newstudent.service'
import * as bcrypt from 'bcryptjs'
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { sign, verify } from 'jsonwebtoken'
import { jwtSecret, service_url } from '../utils/secret'
import { decodeToken } from '../utils/token'
import { getToken, getUserData } from '../utils/api_etu'
import { validateCASTicket } from '../services/auth.service'
import {Blacklist, GetAllBlacklistedStudent} from "../services/blacklist.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    
    const { first_name, last_name, email, branch, birthday, password, contact, discord_id , uuid} = req.body

    first_name ?? Error(res, { msg: "No first name" })
    last_name ?? Error(res, { msg: "No last name" })
    uuid ?? Error (res, {msg: "No UUID"})

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        
        await user_service.registerUser(first_name, last_name, email.toLowerCase(), birthday, branch, contact, discord_id, hashedPassword)
        
        const newUser = await user_service.getUserByEmail(email);

        if(newUser){

        //Used for check a specific UUID for avoid to used the same UUID twice
            await  newstudentservice.setUUID(uuid, true, email);
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
        const user: User = await user_service.getUserByEmail(email.toLowerCase())
        if (!user) {
            return Error(res, { msg: "User doesn't exists" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return Error(res, { msg: "Password erroned" })
        }
        const id = user.id
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        user_service.incrementConnection(id as number);
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
        let user = await user_service.getUserByEmail(email)

        if (!user) {
            await user_service.createUser(firstName, lastName, email, birthday ,branch,"", discord_tag, "default", PermType.Student)
            user = await user_service.getUserByEmail(email)
        }

        const id = user?.id
        if (!id) return Error(res, {})
            
        await user_service.updateUserStudent(id, firstName, lastName, email, branch, birthday);
            
        const token = sign({ id, email }, jwtSecret, { expiresIn: '1h' })
        user_service.incrementConnection(id);
        Ok(res, { data: { token } })
    } catch (error) {
        Error(res, { error })
    }
}

export const getRole = async (req: Request, res: Response) => {
    try {
        const decodedToken = decodeToken(req)
        const user = await user_service.getUserByEmail(decodedToken.email)

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" })
        }
        Ok(res, { data: user.permission })
    } catch (error) {
        Error(res, { error })
    }
}

export const isTokenValid = async (req: Request, res: Response) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Unauthorized(res, { msg: 'Unauthorized: Missing or malformed token', data: { isValid: false } });
        }


        const token = authHeader.split(' ')[1];

        // Decode the token and validate it
        const decodedToken = decodeToken(req);
        if (!decodedToken) {
            return Unauthorized(res, { msg: 'Unauthorized: Token has expired or is invalid', data: { isValid: false } });
        }

        // Check for email presence in the decoded token
        if (!decodedToken.email) {
            return Unauthorized(res, { msg: 'Unauthorized: Invalid token content', data: { isValid: false } });
        }
        //get emails blacklist
        const blacklisted = await GetAllBlacklistedStudent()
        if(blacklisted.map(elem => elem.email).includes(decodedToken.email)) {
            return Unauthorized(res, { msg: 'Unauthorized: Invalid account ', data: { isValid: false } });
        }

        // If everything is fine, return a positive response
        return Ok(res, { data: { isValid: true } });
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Token validation failed'});
    }
}

export const handlecasticket = async (req: Request, res: Response) => {
    try {
        const ticket = req.query.ticket as string;

        if (ticket) {
            const CASuser = await validateCASTicket(ticket);

            if (CASuser && CASuser.email && CASuser.givenName && CASuser.sn) {
                // Assurez-vous que user.email est un string
                let user = await user_service.getUserByEmail(CASuser.email.toLowerCase());
                if(!user){
                    await user_service.createUser(CASuser.givenName, CASuser.sn, CASuser.email, null , null, "", null, "default", PermType.Student)
                    user = await user_service.getUserByEmail(CASuser.email.toLowerCase())
                }

                const id = user?.id
                const branch = user?.branch ?? null;
                const birthday = user?.birthday ?? null;
                const email = CASuser.email
                if (!id) return Error(res, {})
                    
                await user_service.updateUserStudent(id, CASuser.givenName, CASuser.sn, CASuser.email, branch, birthday);
                
                const token =  sign({ id, email }, jwtSecret, { expiresIn: '1h' })
                user_service.incrementConnection(id)

                Ok(res, { data: { token } })
            
            
            } else {
                return Error(res, { msg: 'Unauthorized: Invalid user email' });
            }
        } else {
            return Error(res, { msg: 'Unauthorized: No ticket provided' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
}

export const resetPasswordAdmin = async (req: Request, res: Response) => {

    const {user_id} = req.body
    const user = await user_service.getUser(user_id);

    if (!user) {
        return Error(res, { msg: 'User not found' });
    }

    // Générer un token JWT
    const token = sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Créer le lien de réinitialisation
    const resetLink = `${service_url}reset-password?token=${token}`;
    try{
        // Envoyer l'e-mail
        await auth_service.sendPasswordResetEmail(user.email, resetLink);
        return Ok(res, {msg:'Email for apssword reste sent !'})
    }catch(error){
        return Error(res, { msg: 'Error when reseting password' });
    }

}

export const requestPasswordUser = async (req: Request, res: Response) => {

    const {user_email} = req.body
    const user = await user_service.getUserByEmail(user_email);

    if (!user) {
        return Error(res, { msg: 'User not found' });
    }

    // Générer un token JWT
    const token = sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Créer le lien de réinitialisation
    const resetLink = `${service_url}reset-password?token=${token}`;
    try{
        // Envoyer l'e-mail
        await auth_service.sendPasswordResetEmail(user.email, resetLink);
        return Ok(res, {msg:'Email for password reste sent !'})
    }catch(error){
        return Error(res, { msg: 'Error when reseting password' });
    }

}

export const resetPasswordUser = async (req: Request, res: Response) => {
        const {token, password} = req.body; 
      
        try {
            // Vérifiez et décodez le token
            const decoded: any = verify(token, jwtSecret);

    
            // Trouvez l'utilisateur par ID
            const user = await user_service.getUser(decoded.userId);
            if (!user) {
                return Error(res, {msg :'Utilisateur non trouvé'});
            }
    
            // Hash du nouveau mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Mettez à jour le mot de passe de l'utilisateur
            await user_service.updateUserPassword(user.id, hashedPassword);
            
            return Ok(res, {msg: 'Mot de passe réinitialisé avec succès'});
        } catch (error) {
            return Error(res, { msg: 'Token invalid or expire' });
        }
  }