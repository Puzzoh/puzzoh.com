import axios from "axios";

export default axios.create({
  baseURL: "https://puzzoh-business-api.herokuapp.com/api",
  withCredentials: true
});
