import connectToDatabase from "@/lib/mongoose"
import Renter from "@/models/renters"


export async function GET() {

    await connectToDatabase()

    const renter = await Renter.find({email: "darrellwoolfolk@outlooks.com"})
    
   
    return Response.json(renter)


  }