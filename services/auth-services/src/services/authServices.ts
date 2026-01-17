import { query } from '../db/client';
import { CREATE_USER, GET_USER_BY_EMAIL } from '../db/queries';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const register = async (email: string, password: string, roleId: number) => {
  const passwordHash = await hashPassword(password);
  const result = await query(CREATE_USER, [email, passwordHash, roleId]);
  const user = result.rows[0];
  return { ...user, token: generateToken({ id: user.id, role_id: user.role_id }) };
};

export const login = async (email: string, password: string) => {
  const result = await query(GET_USER_BY_EMAIL, [email]);
  const user = result.rows[0];
  if (!user) throw new Error('User not found');
  const valid = await comparePassword(password, user.password_hash);
  if (!valid) throw new Error('Invalid password');
  return { ...user, token: generateToken({ id: user.id, role_id: user.role_id }) };
};
