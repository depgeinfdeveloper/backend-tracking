import axios from "axios";


const ApiServiceWebTokenDifital = axios.create({
    baseURL: "https://sigcp.policia.gob.pe/SigcpAPIs/api/v1/Token/Validar?",
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: () => true,
})


export {
    ApiServiceWebTokenDifital
}
