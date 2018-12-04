import { actionsType } from 'common/ReduxConstants'
import { KeyStore } from 'common/GlobalConstants'
import SimpleStore from 'react-native-simple-store'

const dataInitState = {
  data: [],
  isLoading: false,
  isRefresh: false,
  isLoadmore: false
}
export default (state = dataInitState, action) => {
  switch (action.type) {
  case actionsType.FETCH_DATA:
    return action.payload
  case actionsType.FETCH_DATA_SUCCESS:
    SimpleStore.save(KeyStore.FETCH_DATA, { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false })
    return { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false }
  case actionsType.UPDATE_DATA_SUCCESS:
    SimpleStore.save(KeyStore.FETCH_DATA, { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false })
    return { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false }
  case actionsType.CANCEL_FETCHING_DATA:
    SimpleStore.save(KeyStore.FETCH_DATA, { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false })
    return { data: action.payload, isLoading: false, isRefresh: false, isLoadmore: false }
  default:
    return state
  }
}
