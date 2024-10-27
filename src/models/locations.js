import mongoose, {Schema} from "mongoose";



const locationSchema = new Schema({
    loc_id: String,
    name: String,
    image: String,
    type: String,
    location: {
        street: String,
        city: String,
        state: String,
        zip: String,
        map: String
    },
    web: String
})


const Location = mongoose.models.Location || mongoose.model("Location", locationSchema)

export default Location