import axios from 'axios'

/** -------------------------------------
* @method - get
* @param - url: string,body: object,header: object
* @author - Nguyen Tuan / 2018-11-28 16:21:23
* @description description
* --------------------------------------- */
export const get = (url = '', body = null, header = {}) => {
  console.log('urlget', url)
  return axios.get(url, body, header)
    .then(response => { return response })
    .catch(e => { return e })
}
