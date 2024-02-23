import * as mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true},
    addresses: [{type: Map, of: String}],
    paymentMethods: [{type: Map, of: String}],
    otherInformation: {
        type: Map,
        of: String,
    },
});

const User = mongoose.model("users", userSchema);

export {User};
