import { User } from "../../db/schemas/user.schema.js";
import { APIResponse } from "../../utils/response.js";
import bcrypt from "bcrypt";

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
    res.json({ data: users });
  } catch (e) {
    console.log(e);
  }
};
//GET USER BY ID
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      _id: userId,
    });
    res.json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
