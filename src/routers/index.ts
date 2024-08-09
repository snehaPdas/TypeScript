import express from 'express'
import EmployeeController from '../controllers/EmployeeController';
const router=express.Router();
router.post("/login",EmployeeController.login)
router.post("/logout",EmployeeController.logout)
router.get('/',EmployeeController.renderAdminHome)
router.get("/admin",EmployeeController.renderAdminDashboard)
router.get('/employee',EmployeeController.getAllEmployee)
router.get('/employee/:id',EmployeeController.getEmployee)
router.post('/employee',EmployeeController.createEmployee)
router.put('/employee/:id',EmployeeController.updateEmployee)
router.delete('/employee/:id',EmployeeController.deleteEmployee)

export default router;


