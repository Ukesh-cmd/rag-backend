import { Router } from 'express';
import * as userController from '../controllers/userController';
import { verifyJWT } from '../middleware/authMiddleware';
import { requirePermission } from '../middleware/rbacMiddleware';

const router = Router();

router.use(verifyJWT);

router.get('/roles', requirePermission('role:read'), userController.getRolesController);
router.get('/roles/:roleId/permissions', requirePermission('role:read'), userController.getPermissionsController);
router.post('/roles', requirePermission('role:manage'), userController.createRoleController);
router.delete('/roles/:roleId', requirePermission('role:manage'), userController.deleteRoleController);
router.patch('/roles/:roleId', requirePermission('role:manage'), userController.updateRoleController);

router.post('/permissions', requirePermission('permission:manage'), userController.createPermissionController);
router.delete('/permissions/:permissionName', requirePermission('permission:manage'), userController.deletePermissionController);
router.patch('/permissions', requirePermission('permission:manage'), userController.updatePermissionController);

router.get('/users/:userId', requirePermission('user:read'), userController.getUserController);
router.patch('/users/:userId/role', requirePermission('role:assign'), userController.updateUserRoleController);

export { router as userRoutes };
