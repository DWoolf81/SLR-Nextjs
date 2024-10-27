import mongoose, {Schema} from "mongoose";



const addonSchema = new Schema({
    aid: Number,
    name: String,
    instock: Boolean,
    desc: String,
    rate: Number,
    image: String
})


const Addon = mongoose.models.Addon || mongoose.model("Addon", addonSchema)

export default Addon