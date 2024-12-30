import mongoose, { Schema } from "mongoose";

const rentalSchema = new Schema(
    {
        rvid : String,
        name: String,
        year: Number, // All - Use details instead
        length: Number, // Camper & Containers - Use details instead
        type: String, //House, RV, Camper, Container
        sleeps: Number, // Camper use details instead
        details: {
            year: Number, // All
            make: String, // Camper Only
            model: String, // Camper Only
            length: String, // Camper and Container
            sqtft: Number, // Home and Condo
            containers: Number, // Container Only
            stories: Number, // Home, Containers & Condo
            beds: Number, // All 
            baths: Number, // All
            sleeps: Number
        },
        location: {
            loc_id: String,
            address: String,
            city: String,
            state: String,
            zip: Number,
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
        },
        promo_rate : {
            day: Number,
            week: Number,
            month: Number
        }
    }
)

const Rental = mongoose.models.Rental || mongoose.model("Rental", rentalSchema)

export default Rental