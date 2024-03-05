import { User } from "../../db/schemas/user.schema.js";
import { APIResponse } from "../../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { toObjectId } from "../../utils/db.utils.js";

import { v4 as uuid } from "uuid";

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
    return next(e);
  }
};

//GET USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (e) {
    return next(e);
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res, next) => {
  let token;
  console.log("Trying to get user daa");
  try {
    const auth = req.headers["authorization"] || req.headers["Authorization"];
    token = auth.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: toObjectId(req.currentUser) });
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
    };
    return res.status(200).send(APIResponse(userData, 200, null));
  } catch (e) {
    return next(e);
  }
};

// CREATE USER ADDRESSES
export const add_user_billing_addresses = async (req, res, next) => {
  const currentUser = req.currentUser;
  const data = req.body;
  const addressToAdd = { ...data, id: uuid() };

  try {
    const user = await User.findOne({ _id: toObjectId(currentUser) });

    // Check if the address already exists
    const existingAddressIndex = user.addresses.findIndex(
      (address) =>
        address.street === addressToAdd.street &&
        address.city === addressToAdd.city &&
        address.state === addressToAdd.state &&
        address.country === addressToAdd.country &&
        address.zip === addressToAdd.zip
    );

    if (existingAddressIndex !== -1) {
      return res.status(400).json({ message: "Address already exists" });
    }

    // Check if isPrimary field is being set to true
    if (addressToAdd.isPrimary && user.addresses.length > 0) {
      // Set all other addresses' isPrimary to false
      user.addresses.forEach((address) => {
        address.isPrimary = false;
      });
    }

    // Add the address
    user.addresses.push(addressToAdd);

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .send(APIResponse("Address added successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};

// UPDATE EXISTING ADDRESS
export const update_user_single_billing_address = async (req, res, next) => {
  const currentUser = req.currentUser;
  const data = req.body;
  const { addressId } = req.params;

  try {
    const user = await User.findOne({ _id: currentUser });

    // Find the address to update by its _id within the addresses array
    const addressToUpdate = user.addresses.id(addressId);

    // If the address is not found, return an error
    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if isPrimary field is being updated
    if (data.isPrimary && !addressToUpdate.isPrimary) {
      // Set all other addresses' isPrimary to false
      user.addresses.forEach((address) => {
        address.isPrimary = false;
      });
    }

    // Update only the received fields
    Object.keys(data).forEach((key) => {
      if (addressToUpdate[key] !== undefined) {
        addressToUpdate[key] = data[key];
      }
    });

    // Save the updated user document
    await user.save();

    // Return the updated addresses array
    res.json(user.addresses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// DELETE ADDRESS
export const deleteAddressById = async (req, res, next) => {
  const currentUser = req.currentUser;
  const { addressId } = req.params;

  try {
    const user = await User.findOne({ _id: currentUser });

    // Find the index of the address to delete by its _id within the addresses array
    const addressToDeleteIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    // If the address is not found, return an error
    if (addressToDeleteIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Remove the address from the array
    user.addresses.splice(addressToDeleteIndex, 1);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// ADD PAYMENT USER PAYMENT INFORMATION
export const addUserPayment_paymentMethods = async (req, res, next) => {
  const currentUser = req.currentUser;
  const data = req.body;
  const paymentToAdd = { ...data, id: uuid() };

  try {
    const user = await User.findOne({ _id: toObjectId(currentUser) });

    // Check if isPrimary field is being updated
    if (paymentToAdd.isPrimary && user.paymentMethods.length > 0) {
      // Set all other payment methods' isPrimary to false
      user.paymentMethods.forEach((paymentMethod) => {
        paymentMethod.isPrimary = false;
      });
    }

    // Add the payment method
    user.paymentMethods.push(paymentToAdd);

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .send(APIResponse("Payment method added successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};

// UPDATE PAYMENT METHOD
export const updateUserPayment_paymentMethods = async (req, res, next) => {
  const currentUser = req.currentUser;
  const data = req.body;
  const { paymentMethodId } = req.params;

  try {
    const user = await User.findOne({ _id: currentUser });

    // Find the payment method to update by its _id within the paymentMethods array
    const paymentMethodToUpdate = user.paymentMethods.id(paymentMethodId);

    // If the payment method is not found, return an error
    if (!paymentMethodToUpdate) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Check if isPrimary field is being updated
    if (data.isPrimary && !paymentMethodToUpdate.isPrimary) {
      // Set all other payment methods' isPrimary to false
      user.paymentMethods.forEach((paymentMethod) => {
        paymentMethod.isPrimary = false;
      });
    }

    // Update only the received fields
    Object.keys(data).forEach((key) => {
      if (paymentMethodToUpdate[key] !== undefined) {
        paymentMethodToUpdate[key] = data[key];
      }
    });

    // Save the updated user document
    await user.save();

    // Return the updated payment method
    res.json(paymentMethodToUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// DELETE PAYMENT METHOD
export const deletePaymentById = async (req, res, next) => {
  const currentUser = req.currentUser;
  const { paymentMethodId } = req.params;

  try {
    const user = await User.findOne({ _id: currentUser });

    // Find the index of the payment method to delete by its _id within the paymentMethods array
    const paymentMethodToDeleteIndex = user.paymentMethods.findIndex(
      (paymentMethod) => paymentMethod._id.toString() === paymentMethodId
    );

    // If the payment method is not found, return an error
    if (paymentMethodToDeleteIndex === -1) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Remove the payment method from the array
    user.paymentMethods.splice(paymentMethodToDeleteIndex, 1);

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
