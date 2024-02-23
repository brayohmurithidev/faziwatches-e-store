import {User} from "../../db/schemas/user.schema.js";
import {APIResponse} from "../../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {toObjectId} from "../../utils/db.utils.js";


export const createUser = async (req, res) => {
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
        res.status(500).send(APIResponse(null, 500, e.code));
    }
};

//GET USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({data: users});
    } catch (e) {
        console.log(e);
    }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
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
        console.log(e)
        return res.status(500).send(APIResponse(null, 500, 'The error happens here'));
    }
}


// UPDATE USER ADDRESSES
export const update_addresses = async (req, res) => {
    const currentUser = req.currentUser
    const data = req.body;
    try {
        const update = await User.updateOne({_id: toObjectId(currentUser)}, {
            $push: {
                addresses: data
            }
        });
        console.log(update)
        return res.status(200).send(APIResponse('Updated Successfully', 200, null))
    } catch (e) {
        console.log(e)
        return res.status(500).send(APIResponse(null, 500, e));
    }
}
