import axios from "axios";
import {IP_SERVER_FACE_RECOGNITION, PORT_SERVER_FACE_RECOGNITION} from '#utils';

const ApiFaceRecognition = axios.create({
  baseURL: `http://${IP_SERVER_FACE_RECOGNITION}:${PORT_SERVER_FACE_RECOGNITION}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { ApiFaceRecognition };
