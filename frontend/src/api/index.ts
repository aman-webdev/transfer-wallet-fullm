import axios from "axios"

export default axios({
    baseURL: `http://localhost:3000`,
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})