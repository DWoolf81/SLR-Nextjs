import mongoose, { Schema } from "mongoose";

const renterSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
          },
        name: String,
        location: {
            city: String,
            state: String
        },
        renting: {
            rv: String,
            rate: Number,
            tenant: Number,
            location: String,
            moveout: Date,
        },
        addon: [{
            aid: String,
            name: String,
            rate: Number,
            brand: {
                name: String
            }
        }]

    }
)

const Renter = mongoose.models.Renter || mongoose.model("Renter", renterSchema)

export default Renter