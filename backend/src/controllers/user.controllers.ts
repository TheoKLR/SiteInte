import { Request, Response } from 'express';
import { db } from '../db/db';
import { Student, studentSchema } from '../db/schema/user.schema';
import { Code, HttpResponse } from '../responses/response';

export const getAllUsers = (req: Request, res: Response) => {
  db.select().from(studentSchema)
    .then((allUsers) => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'users retrived', allUsers)) })
    .catch((err) => { 
      console.error(err);
      res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not get users')) 
    });
};

export const addUser = (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.params;

  if (!first_name) {
    return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, 'Name is required'));
  }
  
  const newUser: Student = { first_name, last_name, email, password };

  db.insert(studentSchema).values(newUser)
    .then(() => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'user added')) })
    .catch((err) => { 
      console.error(err);
      res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not insert user')) 
    });
};