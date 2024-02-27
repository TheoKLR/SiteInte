import { Request, Response } from 'express';
import * as service from '../services/desire.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';
import { decodeToken } from '../utils/token';


export const getAllDesires = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllDesires();
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
}

export const getDesire = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getDesire(idNumber);
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const createDesire = async (req: Request, res: Response) => {
  const { name, desc } = req.body;

  name ?? errorResponse(res, { msg: "No name" });
  desc ?? errorResponse(res, { msg: "No description" });

  try {
    await service.createDesire(name, desc);
    createResponse(res, {})
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const deleteDesire = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    await service.deleteDesire(idNumber);
    okResponse(res, { msg: "Desire deleted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const submitDesires = async (req: Request, res: Response) => {
  const { desireIds } = req.body;

  const token = decodeToken(req)

  if (token === null) {
    return errorResponse(res, { msg: 'No email' });
  }

  try {
    await service.submitDesires(token.id, desireIds);
    okResponse(res, { msg: "Desires submitted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const getUserDesires = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getUserDesires(idNumber);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, { error });
  }
};