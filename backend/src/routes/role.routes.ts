import express from 'express';
import * as dc from '../controllers/role.controller';
import { isAdmin, isTokenValid } from '../middlewares/permissions';

export const roleRouter = express.Router();

roleRouter.post('', isAdmin, dc.createRole);
roleRouter.get('/all', isTokenValid, dc.getAllRoles);
roleRouter.get('/:id', dc.getRole);
roleRouter.delete('/:id', isAdmin, dc.deleteRole);
roleRouter.post('/submit', dc.submitWish);

export const wishRouter = express.Router();

wishRouter.get('/:id', isAdmin, dc.getRole);
roleRouter.get('/all', isTokenValid, dc.getAllRoles);
roleRouter.get('/:id/users', isTokenValid, dc.getWishUsers);

