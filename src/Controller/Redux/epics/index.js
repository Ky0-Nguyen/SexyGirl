import { combineEpics } from 'redux-observable'
import dataEpic from './dataEpic'

export default combineEpics(
  dataEpic
)
