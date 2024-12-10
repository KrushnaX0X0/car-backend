import {Schema,model} from 'mongoose'

const carSchma = new Schema({
    carId:{
        type:String,
        required:true,
        unique:true
    },
    carName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    useTime:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    carPictureUrl:{
        type:String,
        required:true
    }
})

const Car = model('Car',carSchma) 
export default Car; 
