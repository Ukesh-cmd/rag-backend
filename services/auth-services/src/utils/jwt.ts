import jwt from "jsonwebtoken";

const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export interface JwtPayload {
  id: number;
  role_id: number;
}

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
};

export const signRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  ) as JwtPayload;
};
