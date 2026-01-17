import { Request, Response } from 'express';
import * as authService from '../services/authServices';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, roleId } = req.body;
    const user = await authService.register(email, password, roleId);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
