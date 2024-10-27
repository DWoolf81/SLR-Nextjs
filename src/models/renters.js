import mongoose, { Schema } from "mongoose";

const renterSchema = new Schema(
    {
        rid : {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
          },
        name: {
            type: String,
            required: true,
        },
        location: {
            address: String,
            city: String,
            state: String
        },
        dl: String,
        dob: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
        },
        renting: {
            rv: String,
            rate: Number,
            tenants: Number,
            location: String,
            nextdate: Date,
            moveout: Date,
        },
        addon: [{
            aid: String,
            stockNum: String,
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