// // require('dotenv').config()
// import dotenv from "dotenv"
// import connectDB from "./db/index.js" 

// dotenv.config({
//     path: './env'
// })
// // console.log(process.env)

// connectDB()

import dotenv from "dotenv"
import connetDB from "./db/index.js";
dotenv.config({
    path: "./env"
})
connetDB()