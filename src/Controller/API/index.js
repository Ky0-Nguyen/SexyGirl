import { Alert } from 'react-native'
import { BaseURL } from 'common/GlobalConstants'
import { get } from 'controller/API/baseAPI'

export default class ServerApi {
  /** -------------------------------------
  * @method - getData
  * @param -
  * @author - Nguyen Tuan / 2018-11-28 16:23:09
  * @description description
  * --------------------------------------- */
  static getData = async () => {
    const url = BaseURL
    const body = null
    const header = {}

    return get(url, body, header)
  }

  /** -------------------------------------
 * @method - showAlert
 * @param - title: string, message: string
 * @author - Nguyen Tuan / 2018-11-28 23:38:25
 * @description description
 * --------------------------------------- */
  static showAlert = async (title = '', message = '') => {
    setTimeout(() => Alert.alert(title, message), 0)
  }
}
