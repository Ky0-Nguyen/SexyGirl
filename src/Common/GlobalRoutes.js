import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import {
  createStackNavigator
} from 'react-navigation'
import { connect } from 'react-redux'

import SplashScreen from 'frontend/Screen/Splash'
import HomeScreen from 'frontend/Screen/Home'
import DetailScreen from 'frontend/Screen/Detail'

const middlewareNav = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigate
)

const RootNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    HomeScreen: { screen: HomeScreen },
    DetailScreen: { screen: DetailScreen }
  },
  {
    headerMode: 'none'
  }
)

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')
const mapStateToProps = state => ({
  state: state.navigate
})

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState)

export { RootNavigator, AppNavigator, middlewareNav }
