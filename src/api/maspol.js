import axios from "axios";


const ApiServiceWebMaspol = axios.create({
    baseURL: "https://dirin.policia.gob.pe/Buh0_Servici0s/serviciosweb.php",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 8000
})


export {
    ApiServiceWebMaspol
}
