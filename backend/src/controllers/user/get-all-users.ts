import { Request, Response } from 'express';
import { controller } from '@config/controller/controller';
import { userService } from '@services/index';
import { StatusError } from '@config/statusError/statusError';
/**
 * This function is used for fetching current user details
 * @param req
 * @param res
 */
export const getAllUsers = controller(
  async (req: Request, res: Response): Promise<void> => {
  const allUserDetails = await userService.getAllUserDetails(req.params.id);
  if (!allUserDetails) {
    throw StatusError.badRequest('noDataFound');
  }
  res.send(allUserDetails);
  },
);