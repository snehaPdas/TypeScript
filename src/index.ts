import express from 'express';
import mongoose from "mongoose";
import router from './routers';
const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const MONGO_URL=  "mongodb://127.0.0.1:27017/"
mongoose.connect(MONGO_URL,{
  dbName:"EMPLOYEEDETAILS"
}).then(()=>{
  console.log("database connected")
}).catch((error)=>console.log(error))

app.use(express.static('public'));
app.use('/',router);

app.listen(4000,()=>{
  console.log("server running on http://localhost:4000")
})
