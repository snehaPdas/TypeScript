import mongoose from "mongoose"

const EmployeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        
    },
    doj:{
        type:String,
        
    },
},
{
   
timestamps:true,

})

export const EmployeeModel=mongoose.model("Employee",EmployeeSchema)