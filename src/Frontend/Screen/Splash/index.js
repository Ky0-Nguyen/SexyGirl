
import React, { Component } from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { width, height, COLORS } from 'common/GlobalStyles'
import { actionsType } from 'common/ReduxConstants'
import { RouteKey, accessToken } from 'common/GlobalConstants'
import GDrive from 'react-native-google-drive-api-wrapper'

class SplashScreenRN extends Component {
  componentDidMount () {
    GDrive.setAccessToken(accessToken)
    console.log(GDrive)
    SplashScreen.hide()
    setTimeout(() =>
      this.props.gotoHome()
    , 1000
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}> { 'VXR' }  </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({

})
const mapactionsTypeToProps = (dispatch) => ({
  gotoHome: () => dispatch({ type: actionsType.PUSH, routeName: RouteKey.HomeScreen })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(SplashScreenRN)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width(100),
    height: height(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_COLOR
  },
  txt: {
    alignSelf: 'center'
  }
})
