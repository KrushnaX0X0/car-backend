import express from "express"
import cors from "cors"
import env from "dotenv"
env.config()

const app = express();
const PORT = process.env.PORT || 3000


/////
import connectdb from "./config/connect.js";
import Car from "./model/Car.js";

app.use(cors())
app.use(express.json())


/// routes

app.post('/addcar',async (req,res) => {
     const {carName,carId,price,useTime,ownerName,carPictureUrl} =req.body
     const newCar = new Car({
        carId,carName,carPictureUrl,price,ownerName,useTime
     })
     newCar.save()
     if(newCar){
         res.json({
            message:'cardata added successfully..',
            success:true,
            data:newCar
         })
     }else{
        res.json({
        message:'some thingwent wrong',
        success:false,
        data:newCar
     })

     }

})



app.get('/health',(req,res)=>{
    res.send("server is running good")
})

app.use("*",(req,res)=>{
     res.json({
        message:`${req.path} not found..`,
     })
})


app.listen(PORT,()=>{
     console.log(`app listen on ${PORT}`);
     connectdb()
})
