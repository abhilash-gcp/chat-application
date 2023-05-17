import { Request } from 'express';
import { middleware } from '@config/middleware/middleware';
import { StatusError } from '@config/statusError/statusError';
import { envs } from '@config/env';

/**
 * This function is used for validating X-API-KEY header
 * @param req
 * @param res
 * @param next
 */
export const validateApiKey = middleware((req: Request) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    console.log("test");
    
    throw StatusError.forbidden('');
  }
  if (envs.apiKey !== apiKey) {
    
    console.log("test1",envs.apiKey);
    throw StatusError.forbidden('');
  }
});
