import axios from 'axios'
import sha256 from 'sha256'
import restaurantSchema from '../metadata_schemas/restaurant.json'
import Orm from 'bigchaindb-orm'
import { useContext } from 'react'
import { UserContext } from '../../lib/userContext'

function bigchainORMClient(modelName, schema) {
    const bdbOrm = new Orm("http://24.150.93.243:9984/api/v1/")
    bdbOrm.define(modelName, schema)
    const newKeypair = new bdbOrm.driver.Ed25519Keypair()
    return { bdbOrm, newKeypair };
}

export const retrieve = (id) => {
    const { bdbOrm } = bigchainORMClient("restaurants", restaurantSchema);
    return bdbOrm.models.restaurants
        .retrieve(id)

}

export const retrieveAllRestaurants = () => {
    const { bdbOrm } = bigchainORMClient("restaurants", restaurantSchema)
    return bdbOrm.models.restaurants
        .retrieve("restaurants")
}

export const updateRestaurant = async (id, newData) => {
    console.log("rest id", id)
    const updatedRestaurant = await retrieve(id)
        .then(async restaurantAsset => {
            console.log("data", restaurantAsset)
            return await restaurantAsset[0].append({
                toPublicKey: restaurantAsset[0].data.key_pair.publicKey,
                keypair: restaurantAsset[0].data.key_pair,
                data: { ...newData }
            })
        })
}

export const create = async (restaurant) => {

    const { bdbOrm, newKeypair } = bigchainORMClient("restaurants", restaurantSchema);
    const { name, address, hours, foods, rating, reviews, image } = restaurant


    return await bdbOrm.models.restaurants
        .create({
            keypair: newKeypair,
            data: {
                name,
                address,
                hours,
                foods,
                rating,
                reviews,
                image,
                key_pair: newKeypair
            }
        })
        .then((newRestaurant) => { console.log("New Restuarant", newRestaurant); return newRestaurant })
}
