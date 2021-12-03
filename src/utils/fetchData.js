import axios from 'axios'

axios.defaults.withCredentials = true

export const getData = async (url)=> {
    return await axios.get(process.env.REACT_APP_API_URL+url)
}

export const patchData = async (url, data)=> {
    return await axios.patch(process.env.REACT_APP_API_URL+ url, data)
}