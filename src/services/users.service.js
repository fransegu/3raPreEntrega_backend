import { usersManager } from "../DAL/dao/mongoDB/usersManagerDB.js";
import { hashData } from "../utils.js";

export const findAll = async () => {
    const users = await usersManager.getAll();
    return users;
};

export const findById = async (id) => {
    const user = await usersManager.getById(id);
    return user;
};

export const findByEmail = async (email) => {
    const user = await usersManager.findByEmail(email);
    return user;
};

export const createOne = async (obj) => {
    const hashedPassword = hashData(obj.password);
    const newObj = { ...obj, password: hashedPassword, cart: createdCart._id };
    const createdUser = await usersDao.createOne(newObj);
    return createdUser;
};

export const updateOne = async (id, obj) => {
    const response = await usersManager.updateOne(id, obj);
    return response;
};

export const deleteOne = async (id) => {
    const response = await usersManager.deleteOne(id);
    return response;
};