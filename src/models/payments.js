const { Schema, default: mongoose } = require("mongoose");

const PaymentSchema = new Schema ({
    id: Number,
    pid: String,
    rvid: String,
    rid: String,
    date:  String,
    type: Number,
    amount: Number,
    create_at: { type: Date, default: Date.now },
    method: String,
    payment: {
        number: String,
        method: String,
    }


})


const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)

export default Payment