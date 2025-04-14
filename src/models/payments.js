import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema ({
    id: Number,
    pid: String,
    rvid: String,
    rid: String,
    date:  String,
    amount: Number,
    pas: String, // Payment Amount Status = Partial = P, Full = F
    pm: String, // Payment Month
    create_at: { type: Date, default: Date.now },
    method: String,
    term: String,
    status: String, 
    isOnTime: String, // P=Pending, L=Late, OT=On=Time
    desc: String // Any additional details about payment. Ex. Payment Zelle with number XXXXXXXXXX

})


const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)

export default Payment