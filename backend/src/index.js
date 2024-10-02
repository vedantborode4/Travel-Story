// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js" 
import { app } from "./app.js"

dotenv.config({
    path: './env'
})
// console.log(process.env)

connectDB()
.then(
    () => {
        app.on("error",(error) => {
            console.log("Error", error)
            throw error
        })

        app.listen(process.env.PORT || 8000, (error) => {
            try {
                console.log(`Server is running at port ${process.env.PORT}`)
            } catch (error) {
                console.log("Error in running server on port" , process.env.PORT)
            }
        })
    }
)
.catch(
    (err) => {
        console.log("MongoDB connection failed", err);
    }
)