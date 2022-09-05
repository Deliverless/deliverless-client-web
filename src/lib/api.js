import axios from 'axios'

export default axios.create({
    baseURL: 'http://24.150.93.243:9984/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
