import {APIResponse} from "../../utils/response.js";
import {User} from "../../db/schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.findOne({
            email: data.email,
        });
        if (!user) {
            return res
                .status(404)
                .send(
                    APIResponse(
                        null,
                        404,
                        `User with email address ${data.email} doesn't exist`,
                    ),
                );
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            return res.status(401).send(APIResponse(null, 401, Error("Unauthorize")));
        }
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            addresses: user.addresses,
        };
        const token = jwt.sign(
            {user: {_id: user._id, email: user.email}},
            process.env.SECRET,
            {expiresIn: "10s"},
        );
        const refresh_token = jwt.sign(
            {user: {_id: user._id, email: user.email}},
            process.env.SECRET,
            {expiresIn: "24hr"},
        );
        res.cookie("refresh_token", refresh_token);
        res.cookie("token", token);
        return res.status(200).send({token, user: userData, refresh_token}, 200, null);
    } catch (e) {
        return next(e)
    }
};

// VERIFY TOKEN
export const verifyToken = async (req, res, next) => {
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    console.log('auth', auth)
    try {
        if (!auth) {
            return res
                .status(401)
                .send(APIResponse(null, 401, "Unauthorized: Token missing"));
        }
        const token = auth.split(' ')[1]
        const decodeToken = jwt.verify(token, process.env.SECRET);
        if (!decodeToken) {
            return res
                .status(401)
                .send(APIResponse(null, 401, "Unauthorized: Invalid token"));
        }
        console.log(decodeToken)
        req.currentUser = decodeToken._id
        next();
    } catch (e) {
        if (e?.name === "TokenExpiredError") {
            return res
                .status(401)
                .send(APIResponse(null, 401, "Unauthorized: Token expired"));
        }
        return next(e)
    }
};

// REFRESH TOKEN
export const refreshToken = (req, res, next) => {
    try {
        const refreshToken = req.body.refreshTkn || req.cookies["refresh_token"];
        if (!refreshToken) {
            return res
                .status(401)
                .send(APIResponse(null, 401, "Unauthorized: Token missing"));
        }
        const decodeToken = jwt.verify(refreshToken, process.env.SECRET);
        if (!decodeToken) {
            return res
                .status(401)
                .send(APIResponse(null, 401, "Unauthorized: Invalid token"));
        }
        const token = jwt.sign(decodeToken.user, process.env.SECRET, {
            expiresIn: "1hr",
        });
        res.cookie("token", token);
        return res.status(200).send(APIResponse({user: decodeToken.user, token}));
    } catch (e) {
        return next(e)
    }
};
