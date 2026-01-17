import { query } from '../db/client';
import { GET_ALL_ROLES, GET_ROLE_BY_ID, GET_PERMISSIONS_BY_ROLE, GET_USER_BY_ID, UPDATE_USER_ROLE, CREATE_ROLE, DELETE_ROLE, CREATE_PERMISSION, DELETE_PERMISSION, UPDATE_ROLE, UPDATE_PERMISSION } from '../db/queries';

// !!!!!!!!!!!roles
export const getAllRoles = async () => {
  const result = await query(GET_ALL_ROLES);
  return result.rows;
};

export const getRoleById = async (roleId: number) => {
  const result = await query(GET_ROLE_BY_ID, [roleId]);
  return result.rows[0];
};

export const createRole = async (name: string) => {
  const result = await query(CREATE_ROLE, [name]);
  return result.rows[0];
}

export const deleteRole = async (roleId: number) => {
  const result = await query(DELETE_ROLE, [roleId]);
  return result.rows[0];
}

export const updateRole = async (roleId: number, name: string) => {
  const result = await query(UPDATE_ROLE, [name, roleId]);
  return result.rows[0];
}
// !!!!!!!!!!!!!permissions
export const getPermissionsByRole = async (roleId: number) => {
  const result = await query(GET_PERMISSIONS_BY_ROLE, [roleId]);
  return result.rows;
};

export const createPermission = async (name: string) => {
  const result = await query(CREATE_PERMISSION, [name]);
  return result.rows[0];
}

export const deletePermission = async (name: string) => {
  const result = await query(DELETE_PERMISSION, [name]);
  return result.rows[0];
}

export const updatePermission = async (name: string, allowed: boolean) => {
  const result = await query(UPDATE_PERMISSION, [allowed, name]);
  return result.rows[0];
}

// !!!!!Users
export const getUserById = async (userId: number) => {
  const result = await query(GET_USER_BY_ID, [userId]);
  return result.rows[0];
};

export const updateUserRole = async (userId: number, roleId: number) => {
  const result = await query(UPDATE_USER_ROLE, [roleId, userId]);
  return result.rows[0];
};


