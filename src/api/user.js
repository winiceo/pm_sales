import * as http from '@/utils/http'

export function login(data) {

    return http.post('/user/login', data)

}

export function register(data) {

    return http.post('/user/register', data)

}

export function logout() {
    return http.post('/user/logout')
}

export function getUserInfo() {

    return http.post('/user/info')

}

