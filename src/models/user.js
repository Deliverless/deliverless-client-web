import { getObjectById, updateObject, createNewObject, findObjectByMetadata } from '../lib/web3-helper';
import sha256 from 'sha256'
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
    return (await getObjectById("user", id)
        .catch(err => console.log(err))).data;
}

export const getUsers = async () => {
    return (await getObjectById("user", "")
        .catch(err => console.log(err))).data;
}

export const updateUser = async (id, newData) => {
    //make sure a non admin cant upgrade their role
    return (await updateObject("user", id, newData)
        .catch(err => console.log(err))).data;
}

export const createUser = async (user) => {
    return (await createNewObject("user", user)
        .catch(err => console.log(err))).data;
}

export const login = async (email, password) => {
    let encoded = sha256.x2(email + password);
    const user = await findObjectByMetadata("user", { encoded })
    console.log("user", user)
    if (user.data?.id === undefined) throw new Error("failed login attempt")
    return user.data;
}