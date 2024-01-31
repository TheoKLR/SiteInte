import { Request, Response } from 'express';
import { db } from '../db/db';
import { Team, teamSchema } from '../db/schema/team.schema';
import { Code, HttpResponse } from '../responses/response';

export const getAllTeams = (req: Request, res: Response) => {
  db.select().from(teamSchema)
    .then((allTeams) => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'teams retrived', allTeams)) })
    .catch((err) => { 
      console.error(err);
      res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not get teams')) 
    });
};

export const addTeam = (req: Request, res: Response) => {
    const { name } = req.params;
  
    if (!name) {
      return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, 'Name is required'));
    }
    const newUser: Team = { name: name };
  
    db.insert(teamSchema).values(newUser)
      .then(() => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'team added')) })
      .catch((err) => { 
        console.error(err);
        res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not insert team')) 
      });
};