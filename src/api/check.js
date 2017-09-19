import * as http from '@/utils/http'


export function query(query) {
  return http.get('/check/list',query)

}

export function get(id) {
  return http.post('/check/get/'+id)
}
 