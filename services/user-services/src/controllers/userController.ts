import { Request, Response } from 'express';
import * as userService from '../services/userService';

// Get all roles
export const getRolesController = async (req: Request, res: Response) => {
  const roles = await userService.getAllRoles();
  res.json(roles);
};

export const getRoleByIdController = async (req: Request, res: Response) => {
  const roleIdParam = req.params.roleId;

  if (!roleIdParam || Array.isArray(roleIdParam)) {
    return res.status(400).json({ error: 'Invalid roleId parameter' });
  }

  const roleId = parseInt(roleIdParam, 10);

  const role = await userService.getRoleById(roleId);
  res.json(role);
};

export const createRoleController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const role = await userService.createRole(name);
  res.json(role);
}

export const deleteRoleController = async (req: Request, res: Response) => {
  const roleIdParam = req.params.roleId;

  if (!roleIdParam || Array.isArray(roleIdParam)) {
    return res.status(400).json({ error: 'Invalid roleId parameter' });
  }

  const roleId = parseInt(roleIdParam, 10);

  const role = await userService.deleteRole(roleId);
  res.json(role);
}

export const updateRoleController = async (req: Request, res: Response) => {
  const roleIdParam = req.params.roleId;

  if (!roleIdParam || Array.isArray(roleIdParam)) {
    return res.status(400).json({ error: 'Invalid roleId parameter' });
  }

  const roleId = parseInt(roleIdParam, 10);

  const { name } = req.body;
  const role = await userService.updateRole(roleId, name);
  res.json(role);
}

// Get permissions by role
export const getPermissionsController = async (req: Request, res: Response) => {
  const roleIdParam = req.params.roleId;

  if (!roleIdParam || Array.isArray(roleIdParam)) {
    return res.status(400).json({ error: 'Invalid roleId parameter' });
  }

  const roleId = parseInt(roleIdParam, 10);

  const permissions = await userService.getPermissionsByRole(roleId);
  res.json(permissions);
};

export const createPermissionController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const permission = await userService.createPermission(name);
  res.json(permission);
}

export const deletePermissionController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const permission = await userService.deletePermission(name);
  res.json(permission);
}

export const updatePermissionController = async (req: Request, res: Response) => {
  const { name, allowed } = req.body;
  const permission = await userService.updatePermission(name, allowed);
  res.json(permission);
}
// Get user by ID
export const getUserController = async (req: Request, res: Response) => {
  const userIdParam = req.params.userId;

  if (!userIdParam || Array.isArray(userIdParam)) {
    return res.status(400).json({ error: 'Invalid userId parameter' });
  }

  const userId = parseInt(userIdParam, 10);

  const user = await userService.getUserById(userId);
  res.json(user);
};

// Update user role
export const updateUserRoleController = async (req: Request, res: Response) => {
  const userIdParam = req.params.userId;
  

  if (!userIdParam || Array.isArray(userIdParam)) {
    return res.status(400).json({ error: 'Invalid userId parameter' });
  }

  const userId = parseInt(userIdParam, 10);
  const { roleId } = req.body;

  if (!roleId || typeof roleId !== 'number') {
    return res.status(400).json({ error: 'Invalid roleId in request body' });
  }

  const updatedUser = await userService.updateUserRole(userId, roleId);
  res.json(updatedUser);
};


