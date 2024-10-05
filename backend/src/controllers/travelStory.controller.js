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

const imageUpload = asyncHandler( async (req, res) => {
    try {
        if(!req.file) {
            throw new ApiError(
                401, "Upload the image"
            )
        }

        const imageURL = `http://localhost:8000/public/temp/{req.file.filename}`

        res
        .status(201)
        .json(
            new ApiResponse(201, imageURL, "image")
        )
            
    } catch (error) {
        throw new ApiError (
            500
        )
    }
})

const editTravelStory = asyncHandler ( async (req, res) => {
    const { id } = req.params
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
        const travelStory = await TravelStory.findOne({_id: id, userId: userId})

        if (!travelStory) {
            throw new ApiError(404, "Travel Story not found")
        }

        travelStory.title = title
        travelStory.story = story 
        travelStory.visitedLocation = visitedLocation
        travelStory.imageURL = imageURL || placeholderImgURL
        travelStory.visitedDate = parsedVisitedDate

        await travelStory.save()

        return res
        .status(200)
        .json(
            new ApiResponse(200, travelStory, "Update successful")
        )
        
    } catch (error) {
        throw new ApiError(500, error)
    }
})

const deleteTravelStory = asyncHandler ( async (req, res) => {
    
    const { id } = req.params
    const { userId } = req.body

    try {
        const travelStory = await TravelStory.findOne({_id: id, userId: userId})

        if (!travelStory) {
            throw new ApiError(404, "Travel Story not found")
        }

        await travelStory.deleteOne({_id: id, userId: userId})

        return res
            .status(200)
            .json(
                new ApiResponse(200, "travel story deleted succesfully")
            )
    } catch (error) {
        throw new ApiError(500, "failed to delete travel story")
    }
})

const updateIsFavourite = asyncHandler ( async (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    const { isFavourite } = req.body

    try {
        const travelStory = await TravelStory.findOne({_id: id, userId: userId})

        if (!travelStory) {
            throw new ApiError(404, "Travel Story not found")
        }

        travelStory.isFavourite = isFavourite

        await travelStory.save()

        return res
        .status(200)
        .json(
            new ApiResponse(200, {story: travelStory}, "Update succesfully")
        )
    } catch (error) {
        throw new ApiError(500, error)
    }
})

const searchTravelStory = asyncHandler( async (req, res) => {

    const { query } = req.query
    const { userId } = req.user

    if (!query) {
        throw new ApiError(404, "query is required")
    }

    try {
        const searchResults = await TravelStory.find({
            userId: userId,
            $or: [
                { title: { $regex: query, $options: "i" }},
                { story: { $regex: query, $options: "i" }},
                { visitedLocation: { $regex: query, $options: "i" }},
            ],
        }).sort({ isFavourite: -1 });

        return res
        .status(200)
        .json(
            new ApiResponse(200, {stories: searchResults})
        )
    } catch (error) {
        throw new ApiError(500, error)
    }
})

const filterTravelStory = asyncHandler ( async (req, res) => {
    const { startDate, endDate } = req.query
    const { userId } = req.user;

    try{
        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

        const filtererStories = await TravelStory.find({
            userId: userId,
            visitedDate: { $gte: start, $lte: end}
        }).sort({ isFavourite: -1 })

        res
        .status(200)
        .json({ stories: filterTravelStory})
    } catch (error) {
        throw new ApiError(500, error)
    }
})

export {
    addTravelStory,
    getAllTravelStories,
    imageUpload,
    editTravelStory,
    deleteTravelStory,
    updateIsFavourite,
    searchTravelStory,
    filterTravelStory
}