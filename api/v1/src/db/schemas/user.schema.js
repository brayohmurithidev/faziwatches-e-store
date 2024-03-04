import * as mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    address: String,
    country: String,
    state: String,
    city: String,
    postalCode: Number,
    phone: String,
    isPrimary: {type: Boolean, default: false}
})

const paymentMethodSchema = new mongoose.Schema({
    type: String,
    details: {
        type: Map,
        of: String
    }, isPrimary: {type: Boolean, default: false}
})




const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true},
    addresses: [addressSchema],
    paymentMethods: [paymentMethodSchema],
    otherInformation: {
        type: Map,
        of: String,
    },
});

const User = mongoose.model("users", userSchema);

export {User};
