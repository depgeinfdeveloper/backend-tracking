import axios from "axios";


const ApiServiceWeb = axios.create({
    baseURL: "https://dirin.policia.gob.pe/Buh0_Servici0s",
    headers: {
        'Content-Type': 'application/json',
    },
})

const ApiMaspol = axios.create({

})

export {
    ApiServiceWeb
}
