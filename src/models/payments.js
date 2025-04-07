const { Schema, default: mongoose } = require("mongoose");

const PaymentSchema = new Schema ({
    id: Number,
    pid: String,
    rvid: String,
    rid: String,
    date:  String,
    type: Number,
    amount: Number,
    pas: String, // Payment Amount Status = Partial = P, Full = F
    pm: String, // Payment Month
    create_at: { type: Date, default: Date.now },
    method: String,
    status: String, 
    isOnTime: String, // P=Pending, L=Late, OT=On=Time
    payment: {
        number: String,
        method: String,
    }


})


const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)

export default Payment