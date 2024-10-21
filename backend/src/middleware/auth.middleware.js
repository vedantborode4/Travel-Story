import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const verifyJWT = asyncHandler ( async (req, res,  next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")

        if (!user) {
            throw new ApiError(401 , "Invalid Access token")
        }

        req.user = user;

        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }
})


const authenticateToken = asyncHandler( async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user;
    next()
  });
})

export {verifyJWT, authenticateToken}