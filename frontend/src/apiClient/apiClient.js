import axios from 'axios'
import config from '../config';

const apiClient = axios.create({
    baseURL: config.backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

class ApiClient {

    constructor() { 
        const token = localStorage.getItem('token')
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    /**
     * Logs in the user with the given credentials and stores the token in localStorage.
     * @param {Object} data - The login data with keys 'email' and 'password'.
     * @returns {Promise} The promise returned by the axios request.
     */
    async login(data) {
        console.log("login-----",data)
        const token = (await apiClient.post('/auth/login', data)).data.token
        localStorage.setItem('token', token)
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    logout() {
        localStorage.removeItem('token')
        apiClient.defaults.headers.common['Authorization'] = undefined
    }

    getMovies() {
        return apiClient.get('/api/movies')
    }

    getMovie(id) {
        return apiClient.get(`/api/movies/${id}`)
    }

    postMovies(data) {
        return apiClient.post('/api/movies', data)
    }

    patchMovie(id, data) {
        return apiClient.patch(`/api/movies/${id}`, data)
    }

    deleteMovie(id) {
        return apiClient.delete(`/api/movies/${id}`)
    }

    addUser(data) {
        return apiClient.post('/api/users', data)
    }

    getUsers() {
        return apiClient.get('/api/users')
    }

    deleteUsers(data) {
        return apiClient.delete('/api/users', data)
    }

    patchUsers(data) {
        return apiClient.patch('/api/users', data)
    }

    getSubs() {
        return apiClient.get('/api/subs')
    }

    addSub(data) {
        return apiClient.post('/api/subs', data)
    }   

    patchSubs(data) {
        return apiClient.patch('/api/subs', data)
    }

    deleteSubs(data) {
        return apiClient.delete('/api/subs', data)
    }   

    changePassword(data) {
        return apiClient.post('/auth/changePassword', data)
    }

    getprofile() {
        return apiClient.get('/auth/profile')
    }

    getRoles(){
        return apiClient.get('/api/roles')
    }

}

export default new ApiClient()