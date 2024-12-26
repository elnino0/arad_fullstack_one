import axios from 'axios'
import config from '../config/config';

const apiClient = axios.create({
    baseURL: config.backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

console.log(config.backendUrl)

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
        const res = (await apiClient.post('/auth/login', data)).data
        const token = res.token
        console.log(res)
        localStorage.setItem('admin', res.isAdmin)
        localStorage.setItem('token', token)
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    isAdmin() {
        return localStorage.getItem('admin')
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
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

    getProfile() {
        return apiClient.get('/auth/profile')
    }

    getRoles(){
        return apiClient.get('/api/roles')
    }

    getUsersSubs() {
        return apiClient.get('/api/usersubs')
    }

}

export default new ApiClient()