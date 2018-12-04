export const actionsType = {

  FETCH_DATA: 'FETCH_DATA',
  FETCH_DATA_FAIL: 'FETCH_DATA_FAIL',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  UPDATE_DATA_SUCCESS: 'UPDATE_DATA_SUCCESS',
  CANCEL_FETCHING_DATA: 'CANCEL_FETCHING_DATA',

  FETCH_DATA_FROM_API: 'FETCH_DATA_FROM_API',
  FETCH_DATA_FAIL_FROM_API: 'FETCH_DATA_FAIL_FROM_API',
  FETCH_DATA_SUCCESS_FROM_API: 'FETCH_DATA_SUCCESS_FROM_API',
  UPDATE_DATA_SUCCESS_FROM_API: 'UPDATE_DATA_SUCCESS_FROM_API',
  CANCEL_FETCHING_DATA_FROM_API: 'CANCEL_FETCHING_DATA_FROM_API',
  // NAVIGATION
  PUSH: 'push',
  POP: 'pop'
}
export const initState = {
  dataInit: []
}
/**
   * TIME_OUT: 30s
   */
export const TIME_OUT = 30000
/**
   * tlError
   */
export const ttError = 'Lỗi'
/**
   * ttInfor
   */
export const ttInfor = 'Thông báo'
/**
   * strMessageTimeout
   */
export const strMessageTimeout = 'Không thể kết nối server!'
/**
   * statusCode
   */
export const statusCode = {
  CODE_200: 200, // ok
  CODE_201: 201, // ok
  CODE_404: 404, // Not found
  CODE_500: 500 // Server error
}
