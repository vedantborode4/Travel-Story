import mongoose, {Schema} from "mongoose";

const travelStorySchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        },
        visitedLocation: {
            type: [String],
            default: []
        },
        isFavourite: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        visitedDate: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const TravelStory = mongoose.model("TravelStory",  travelStorySchema)