import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import routesReducer from './routersReducer'

export default combineReducers({
  dataState: dataReducer,
  navigate: routesReducer
})
