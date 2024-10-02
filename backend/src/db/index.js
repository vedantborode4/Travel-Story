// import mongoose from "mongoose"
// import { DB_NAME } from "../constants.js"


// const connectDB = async() => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//         // console.log(`MongoDB connected !! DB host: ${connectionInstance.connection.host}`  )
//     } catch (error) {
//         console.log("Mongodb connection error", error);
//         process.exit(1)
//     }
// }

// export default connectDB

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connetDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection ERROR", error);
        process.exit(1)
    }
}
export default connetDB