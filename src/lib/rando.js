'use server'
import Renter from "@/models/renters"
import connectToDatabase from "./mongoose"

export const Users = async () => {
    await connectToDatabase()
   const renter =  await Renter.find({email: "darrellwoolfolk@outlooks.com"})
    return renter
}