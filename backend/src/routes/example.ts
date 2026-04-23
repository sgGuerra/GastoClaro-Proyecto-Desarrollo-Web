import { Router } from 'express';
import { getExample, postExample } from '../controllers/exampleController';

export const exampleRouter = Router();

/**
 * GET  /api/example   → lista recursos de ejemplo
 * POST /api/example   → crea un recurso de ejemplo
 *
 * Renombra este archivo y las rutas según tus entidades
 * (gastos, categorias, usuarios, etc.)
 */
exampleRouter.get('/example', getExample);
exampleRouter.post('/example', postExample);
