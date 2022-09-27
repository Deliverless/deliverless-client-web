

export default class Address {
    constructor(type, local, region, country, postal, street, unit, lat, lon) {
        this.type = type;
        this.local = local;
        this.region = region;
        this.country = country;
        this.postal = postal;
        this.street = street;
        this.unit = unit;
        this.lat = lat;
        this.lon = lon;
    }
}