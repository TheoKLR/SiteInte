import express from 'express';
import * as rc from '../controllers/role.controller';
import { isAdmin, isTokenValid } from '../middlewares/permissions';

export const roleRouter = express.Router();

roleRouter.post('', isAdmin, rc.createRole);
roleRouter.get('/all', isTokenValid, rc.getAllRoles);
roleRouter.get('/:id', rc.getRole);
roleRouter.delete('/:id', isAdmin, rc.deleteRole);
roleRouter.post('/submit', rc.submitWish);

export const wishRouter = express.Router();

wishRouter.get('/:id', isAdmin, rc.getRole);
wishRouter.get('/all', isTokenValid, rc.getAllRoles);
wishRouter.get('/:id/users', isTokenValid, rc.getWishUsers);

