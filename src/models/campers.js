import mongoose, { Schema } from "mongoose";

const camperSchema = new Schema(
    {
        rvid : String,
        name: String,
        year: Number,
        length: Number,
        type: String,
        sleeps: Number,
        location: {
            loc_id: String,
            city: String,
            state: String,
            site: String,
            map: String,

        },
        pictures: [String],
        desc: String,
        amenities:[String],
        addons:[String],
        available: Number,
        brand:[String],
        rate: {
            day: Number,
            week: Number,
            month: Number
        }
    }
)

const Camper = mongoose.models.Camper || mongoose.model("Camper", camperSchema)

export default Camper