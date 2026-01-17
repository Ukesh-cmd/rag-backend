import { Request, Response } from "express";
import * as authService from "../services/authServices";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  res.status(200).json(result);
};

export const refreshTokenController = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  const token = await authService.refreshToken(refreshToken);
  res.status(200).json(token);
};

export const logoutController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  await authService.logout(refreshToken);
  res.status(204).send();
};

export const registerController = async (
  req: Request,
  res: Response
) => {
  const { email, password, roleId } = req.body;

  const user = await authService.register(email, password, roleId);
  res.status(201).json(user);
};
