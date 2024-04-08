import express from 'express';
import * as rc from '../controllers/role.controller';
import { isAdmin } from '../middlewares/permissions';

const roleRouter = express.Router();

roleRouter.post('', isAdmin, rc.createRole);
roleRouter.get('/all', rc.getAllRoles);
roleRouter.get('/:id', rc.getRole);
roleRouter.delete('/:id', isAdmin, rc.deleteRole);


const wishRouter = express.Router();

wishRouter.get('/:id', isAdmin, rc.getRole);
wishRouter.get('/all', rc.getAllRoles);
wishRouter.post('/submit', rc.submitWish);
wishRouter.get('/:id/users', rc.getWishUsers);

export {roleRouter, wishRouter};
