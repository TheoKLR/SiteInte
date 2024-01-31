import { Request, Response } from 'express';
import { db } from '../db/db';
import { Faction, factionSchema } from '../db/schema/faction.schema';
import { Code, HttpResponse } from '../responses/response';

export const getAllFactions = (req: Request, res: Response) => {
  db.select().from(factionSchema)
    .then((allFactions) => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'factions retrived', allFactions)) })
    .catch((err) => { 
      console.error(err);
      res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not get factions')) 
    });
};

export const addFaction = (req: Request, res: Response) => {
    const { name } = req.params;
  
    if (!name) {
      return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, 'Name is required'));
    }
    const newFaction: Faction = { name: name, points: 0 };
  
    db.insert(factionSchema).values(newFaction)
      .then(() => { res.status(Code.OK).send(new HttpResponse(Code.OK, 'faction added')) })
      .catch((err) => { 
        console.error(err);
        res.status(Code.ISE).json(new HttpResponse(Code.ISE, 'could not insert faction')) 
      });
};