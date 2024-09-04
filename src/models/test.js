import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
    {
        
        name: String,
        age: Number,

    }
)

const Test = mongoose.models.Test || mongoose.model("Test", testSchema)

export default Test