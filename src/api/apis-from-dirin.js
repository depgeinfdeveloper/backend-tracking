import axios from "axios";


const ApiServicesExternFromDirin = axios.create({
    baseURL: "http://chaska.policia.gob.pe:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: () => true,
})


export {
    ApiServicesExternFromDirin
}