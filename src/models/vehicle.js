

export default class Vehicle {
    constructor(make, model, licensePlate, year, color, numberOfPassengers, image, description) {
        this.make = make;
        this.model = model;
        this.licensePlate = licensePlate;
        this.year = year;
        this.color = color;
        this.numberOfPassengers = numberOfPassengers;
        this.image = image;
        this.description = description;
    }
}

export const getVehicle = async (id) => {
    return (await getObjectById("vehicle", id)
        .catch(err => console.log(err))).data;
}

export const getVehicles = async () => {
    return (await getObjectById("vehicle", "")
        .catch(err => console.log(err))).data;
}

export const updateVehicle = async (id, newData) => {
    return (await updateObject("vehicle", id, newData)
        .catch(err => console.log(err))).data;
}

export const createVehicle = async (item) => {
    return (await createNewObject("vehicle", item)
        .catch(err => console.log(err))).data;
}