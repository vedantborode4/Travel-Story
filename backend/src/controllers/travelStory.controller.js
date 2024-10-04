import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { TravelStory } from "../models/travelstory.model.js"

const addTravelStory = asyncHandler( async (req, res) => {
    const {title, story, visitedLocation, imageURL, visitedDate} = req.body
    
    const { userId } = req.user

    if(!title || !story || !visitedLocation || !imageURL || !visitedDate) {
        throw new ApiError(
            400,
            "All fields are requied"
        )
    }

    const parsedVisitedDate =  new Date(parseInt(visitedDate))

    try {
        const travelStory = new TravelStory ({
            title,
            story,
            visitedLocation,
            userId,
            imageURL,
            visitedDate: parsedVisitedDate
        })

        await travelStory.save();

        res
        .status(200)
        .json (new ApiResponse(200, travelStory, "Added succesfully"))
    }
    catch (error) {
        throw new ApiError(400, "something went wrong while adding story")
    }



})

const getAllTravelStories = asyncHandler( async (req, res) => {

    const {userId} = req.user

    try {
        const travelStory = await TravelStory.find({ userId : userId}).sort({
            isFavourite: -1,
        })

        res
        .status(200)
        .json(
            new ApiResponse(200, {stories : travelStory})
        )
    } catch (error) {
        throw new ApiError(500, error)
    }
})

export {
    addTravelStory,
    getAllTravelStories
}