import {User} from "../../db/schemas/user.schema.js";
import {APIResponse} from "../../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {toObjectId} from "../../utils/db.utils.js";

import {v4 as uuid} from 'uuid'


export const createUser = async (req, res, next) => {
    const data = req.body;
    const password = bcrypt.hashSync(data.password, 10);
    try {
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: password,
        });
        return res
            .status(200)
            .send(APIResponse("Created Successfully!", 200, null));
    } catch (e) {
        if (e?.code) {
            if (e?.code === 11000) {
                return res
                    .status(409)
                    .send(APIResponse(null, 409, `${data.email} already exists`));
            }
        }
        return next(e)
    }
};

//GET USERS
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({data: users});
    } catch (e) {
        return next(e)
    }
};

// GET USER PROFILE
export const getUserProfile = async (req, res, next) => {
    let token;
    console.log('Trying to get user daa')
    try {
        const auth = req.headers['authorization'] || req.headers['Authorization'];
        token = auth.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: toObjectId(req.currentUser)})
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            addresses: user.addresses,
            paymentMethods: user.paymentMethods
        };
        return res.status(200).send(APIResponse(userData, 200, null))
    } catch (e) {
        return next(e)
    }
}


// CREATE USER ADDRESSES
export const add_user_billing_addresses = async (req, res, next) => {
    const currentUser = req.currentUser
    const data = req.body;
        const addressToAdd = {...data, id: uuid()}
    try {
         await User.updateOne({_id: toObjectId(currentUser)}, {
            $push: {
                addresses: addressToAdd
            }
        });
        return res.status(200).send(APIResponse('Updated Successfully', 200, null))
    } catch (e) {
        return next(e)
    }
}


// ADD PAYMENT USER PAYMENT INFORMATION
export const addUserPayment_paymentMethods = async (req, res, next) => {
    const currentUser = req.currentUser
    const data = req.body;
    const paymentToAdd = {...data, id: uuid()}
    try {
     await User.updateOne({_id: toObjectId(currentUser)}, {
            $push: {
                paymentMethods: paymentToAdd
            }
        });
        return res.status(200).send(APIResponse('Updated Successfully', 200, null))
    } catch (e) {
        return next(e)
    }
}


// UPDATE EXISTING ADDRESS
export const update_user_single_billing_address = async (req, res, next) =>{
    const currentUser = req.currentUser;
    const data = req.body;
    const {addressId}= req.params;

    try {
       const user = await User.findOne({_id: currentUser})
       const addressToUpdate =  user.addresses.id(toObjectId(addressId))
       console.log(addressToUpdate)
       res.send(user.addresses)
        
    } catch (error) {
        console.log(error)
        res.json({message: 'An error occurred'})
    }

}
