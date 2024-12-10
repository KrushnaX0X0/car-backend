import mongoose from "mongoose";

const connectdb = async () => {
    const connc = await mongoose.connect(process.env.MONGO_URI)
    if (connc) {
        console.log("connet to db");
    } else {
        console.log("connecting error");
    }
}

export default connectdb