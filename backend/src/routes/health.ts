import { Router } from 'express';

export const healthRouter = Router();

/**
 * GET /api/health
 * Verifica que el servidor esté activo.
 */
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
