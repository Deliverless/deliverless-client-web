import axios from 'axios'
import sha256 from 'sha256'
import userSchema from '../metadata_schemas/User.json'
import Orm from 'bigchaindb-orm'

export default class User {
    constructor() {

    }
}

function bigchainORMClient(modelName, schema) {
    const bdbOrm = new Orm("http://24.150.93.243:9984/api/v1/")
    bdbOrm.define(modelName, schema)
    const newKeypair = new bdbOrm.driver.Ed25519Keypair()
    return { bdbOrm, newKeypair };
}

export const retrieve = (id) => {
    const { bdbOrm } = bigchainORMClient("users", userSchema);
    return bdbOrm.models.users
        .retrieve(id)

}

export const login = (email, password) => {
    let encoded = sha256.x2(email + password);
    console.log("logging in with", encoded)
    return axios.get(`http://24.150.93.243:9984/api/v1/metadata/?search=${encoded}`).then(async (meta) => {
        console.log(meta.data[0].metadata.asset_id)
        if (meta.data[0].metadata.asset_id === undefined) throw new Error("failed login attempt")
        const user = await retrieve(meta.data[0].metadata.asset_id);
        console.log("USER OBJECT", user)
        return user;

    });
}

export const loginFromEncoded = (encoded) => {
    console.log("logging in with", encoded)
    return axios.get(`http://24.150.93.243:9984/api/v1/metadata/?search=${encoded}`).then(async (meta) => {
        console.log(meta.data[0].metadata.asset_id)
        if (meta.data[0].metadata.asset_id === undefined) throw new Error("failed login attempt")
        const user = await retrieve(meta.data[0].metadata.asset_id);
        console.log("USER OBJECT", user)
        return user;

    });
}

export const updateEncoded = async (email, password, newEncoded) => {
    const asset = await login(email, password)
    console.log("OLD ENCODED", asset[0].data.encoded)
    console.log("to be encoded", newEncoded)

    await asset[0].append({
        toPublicKey: asset[0].data.key_pair.publicKey,
        keypair: asset[0].data.key_pair,
        data: {
            encoded: newEncoded,
            asset_id: asset[0].data.asset_id
        }
    }).then((updatedAsset) => {
        console.log("NEW ENCODED", updatedAsset.data.encoded)
        console.log("UPDATED USER", updatedAsset)
    });
}

export const updateUser = async (encoded, newData) => {
    const asset = await loginFromEncoded(encoded)
    console.log("OLD ENCODED", asset[0].data.encoded)
    console.log("to be encoded", newData)

    return await asset[0].append({
        toPublicKey: asset[0].data.key_pair.publicKey,
        keypair: asset[0].data.key_pair,
        data: { ...newData }
    }).then((updatedAsset) => {
        console.log("NEW ENCODED", updatedAsset.data.encoded)
        console.log("UPDATED USER", updatedAsset)
        return updatedAsset
    });
}

export const create = async (user) => {

    const { bdbOrm, newKeypair } = bigchainORMClient("users", userSchema);
    const { firstName, lastName, email, address, password, phone, role = "customer", isAdmin = false } = user
    return await bdbOrm.models.users
        .create({
            keypair: newKeypair,
            data: {
                firstName,
                lastName,
                email,
                address,
                phone,
                role,
                isAdmin
            }
        })
        .then(asset => {

            return asset.append({
                toPublicKey: newKeypair.publicKey,
                keypair: newKeypair,
                data: {
                    asset_id: asset.id,
                    encoded: sha256.x2(email + password),
                    key_pair: newKeypair
                }
            })
        })
        .then((newUser) => { console.log("NEW USER", newUser); return newUser })
}
