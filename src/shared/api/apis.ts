import axios from "axios";

const api = axios.create({
    baseURL: "https://api.getter.uz"
})

const onResponse = (res: any): any => {
    return res
}

const onResponseError = (err: any): any => {
    const statusCode = err?.response?.status
    if (statusCode === 401) {
        
        axios.post('http://localhost:4000/auth/refresh')
    }
    return Promise.resolve(err)
}

api.interceptors.response.use(onResponse, onResponseError)

export default api;