import sha256 from 'sha256';

import {
  createNewObject,
  findObjectsByMetadata,
  getObjectById,
  updateObject,
} from '../lib/web3-helper';

export default class User {
    constructor(role, firstName, lastName, birthday, email, addressIds, phone, encoded, images) {
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.email = email;
        this.addressIds = addressIds;
        this.phone = phone;
        this.encoded = encoded;
        this.images = images;
    }
}

export const getUser = async (id) => {
    return (await getObjectById("users", id)
        .catch(err => console.log(err))).data;
}

export const getUsers = async () => {
    return (await getObjectById("users", "")
        .catch(err => console.log(err))).data;
}

export const updateUser = async (id, newData) => {
    //make sure a non admin cant upgrade their role
    return (await updateObject("users", id, newData)
        .catch(err => console.log(err))).data;
}

export const createUser = async (user) => {
    return (await createNewObject("users", user)
        .catch(err => console.log(err))).data;
}

export const login = async (email, password) => {
    let encoded = sha256.x2(email + password);
    const user = findObjectsByMetadata("users", encoded)
    if (user.data.id === undefined) throw new Error("failed login attempt")
    return user.data;
}