import { Request, Response } from 'express';

/**
 * GET /api/example
 * Reemplaza esta lógica con tus servicios reales.
 */
export const getExample = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: llamar al servicio correspondiente
    res.json({ data: [], message: 'Lista de ejemplo' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};

/**
 * POST /api/example
 */
export const postExample = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    // TODO: validar body y llamar al servicio
    res.status(201).json({ data: body, message: 'Recurso creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear recurso' });
  }
};
