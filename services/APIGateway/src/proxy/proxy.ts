import { Request, Response } from "express";
import axios from "axios";

export const proxyRequest = async (
  req: Request,
  res: Response,
  target: string
) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${target}${req.originalUrl}`,
      headers: {
        authorization: req.headers.authorization
      },
      data: req.body
    });

    res.status(response.status).json(response.data);
  } catch (err: any) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Gateway error" });
  }
};
