import axios from "axios";


const ApiServicesExternFromDirin = axios.create({
    baseURL: "https://chaska.policia.gob.pe/newgeo/api",
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: () => true,
})


export {
    ApiServicesExternFromDirin
}