import * as http from '@/utils/http'


export function query(query) {
  return http.get('/draw/list',query)

}

export function get(id) {
  return http.get('/draw/get/'+id)
}


export function check(id) {
    return http.post('/draw/check/'+id)
}


 