import express, { Request, response, Response } from "express";
import { EmployeeModel } from "../db/Employee";
import { readFileSync } from "fs";
import { join } from "path";

const credential= {
    email:"admin@gmail.com",
    password:"admin123"
}




interface employee {
  getAllEmployee(request: Request, response: Response): Promise<Response>;
  getEmployee(request: Request, response: Response): Promise<Response>;
  createEmployee(request: Request, response: Response): Promise<Response>;
  updateEmployee(request: Request, response: Response): Promise<Response>;
  deleteEmployee(request: Request, response: Response): Promise<Response>;
}

class EmployeeController implements employee {
  async getAllEmployee(
    request: express.Request,
    response: express.Response
  ): Promise<Response> {
    try {
      const employees = await EmployeeModel.find();
      return response.status(200).json({ data: employees });
    } catch (error) {
      return response.sendStatus(400);
    }
  }
  async getEmployee(
    request: express.Request,
    response: express.Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const employee = await EmployeeModel.findById(id);
      return response.status(200).json({ data: employee });
    } catch (error) {
      return response.sendStatus(400);
    }
  }
  async createEmployee(
    request: express.Request,
    response: express.Response
  ): Promise<Response> {
    try {
      const { name, email, mobile, dob, doj } = request.body;
      const employee = new EmployeeModel({
        name,
        email,
        mobile,
        dob,
        doj,
      });
      await employee.save();

      return response.status(200).json({ message: "employe created" });
    } catch (error) {
      return response.sendStatus(400);
    }
  }
  async updateEmployee(
    request: express.Request,
    response: express.Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, email, mobile, dob, doj } = request.body;

      const employee = await EmployeeModel.findById(id);
      if (employee) {
        employee.name = name;
        employee.email = email;
        employee.mobile = mobile;
        employee.dob = dob;
        employee.doj = doj;

        await employee.save();
        return response
          .status(200)
          .json({ message: "emp updated", data: employee });
      }

      return response.status(200).json({ message: "employe created" });
    } catch (error) {
      return response.sendStatus(400);
    }
  }

  async deleteEmployee(
    request: express.Request,
    response: express.Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      await EmployeeModel.findByIdAndDelete({ _id: id });
      return response.status(200).json({ message: "employee deleted" });
    } catch (error) {
      return response.sendStatus(400);
    }
  }

  async renderAdminHome(req: Request, res: Response) {
    try {
      const filePath = join(__dirname, "../../public/login.html");
      const file = readFileSync(filePath, "utf8");
      res.setHeader("Content-Type", "text/html");
      return res.send(file);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
  async login (req:Request,res:Response){
    const{email,password}=req.body;
    //console.log(req.body);
    
    if (email === credential.email && password === credential.password) {
      return res.status(200).json({ message: "Login successful", redirectUrl: "/admin" });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
}
async renderAdminDashboard(req: Request, res: Response) {
    try {
      const filePath = join(__dirname, "../../public/admin.html");
      const file = readFileSync(filePath, "utf8");
      res.setHeader("Content-Type", "text/html");
      return res.send(file);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  async logout (req:Request,res:Response){
         res.redirect('/')
}

}



export default new EmployeeController();
