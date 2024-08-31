import { Request, Response, NextFunction } from 'express';
import * as service from '../services/event.service';
import { Error, Created, Ok } from '../utils/responses';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    name ?? Error(res, { msg: "No name" });

    try {
        await service.createEvent(name);
        Created(res, {})
    } catch (error) {
        Error(res, { error });
    }
}

export const startEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    id ?? Error(res, { msg: "No ID" });

    try {
        await service.startEvent(id);
        Ok(res, {});
    } catch (error) {
        Error(res, { error });
    }
}

export const finishEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    id ?? Error(res, { msg: "No ID" });

    try {
        await service.finishEvent(id);
        Ok(res, {});
    } catch (error) {
        Error(res, { error });
    }
}

export const activeEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.activeEvents();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const inactiveEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.inactiveEvents();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}