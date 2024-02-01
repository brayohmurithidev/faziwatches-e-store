import { User } from "../../db/schemas/user.schema.js";

//GET USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (e) {
    console.log(e);
  }
};

export { getAllUsers };
