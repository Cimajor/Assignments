import apiConfig from './config.json'
import axios from 'axios'

export let baseUrl = `${apiConfig.apiUrl}/${apiConfig.apiVersion}`

const axiosClient = axios.create({
    baseURL: baseUrl
})

axiosClient.interceptors.response.use(
    function(response){
        return(response)
    },
    function(error){
        let res = error.response
        console.error("Error is:" + res.status)
        return Promise.reject(error)
    }
)

export function getAllSatellites(){
    return axiosClient.get('/starlink')
}

export function getLaunchpad(id){
    return axiosClient.get(`/launchpads/${id}`)
}

export function getLaunch(id){
    return axiosClient.get(`/launches/${id}`)
}