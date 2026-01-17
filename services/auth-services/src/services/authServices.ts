import bcrypt from "bcrypt";
import { pool } from "../db/client";
import * as Q from "../db/queries";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../utils/jwt";

const SALT_ROUNDS = 12;

export const login = async (email: string, password: string) => {
  const { rows } = await pool.query(Q.GET_USER_BY_EMAIL, [email]);
  const user = rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user.id,
    role_id: user.role_id
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await pool.query(Q.INSERT_REFRESH_TOKEN, [
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ]);

  return { accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  const { rows } = await pool.query(Q.GET_REFRESH_TOKEN, [token]);
  if (!rows.length) {
    throw new Error("Invalid refresh token");
  }

  const payload = verifyRefreshToken(token);
  const newAccessToken = signAccessToken({
    id: payload.id,
    role_id: payload.role_id
  });

  return { accessToken: newAccessToken };
};

export const logout = async (token: string) => {
  await pool.query(Q.DELETE_REFRESH_TOKEN, [token]);
};

export const register = async (
  email: string,
  password: string,
  roleId: number
) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  const { rows } = await pool.query(Q.CREATE_USER, [
    email,
    hash,
    roleId
  ]);

  return rows[0];
};
