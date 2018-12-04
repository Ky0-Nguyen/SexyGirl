// import liraries
import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { height, width, COLORS } from 'common/GlobalStyles'

// create a component
class MyClass extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isShowState: null,
      layoutHeight: 0
    }
  }
  _hideModal = () => {
    this.setState({ isShowState: false })
  }
  _showModal =() => {
    this.setState({ isShowState: true })
  }
  render () {
    const {
      isShowModal,
      style,
      isError = true,
      message = ' ', onPress
    } = this.props
    const { layoutHeight } = this.state
    let styleComponent = [styles.contComponent, { top: layoutHeight < height(20) ? height(30) : (height(100) - layoutHeight) / 2 }]
    let styleTxtTitle = [styles.txtTitle, { color: isError ? 'red' : 'green' }]
    return (
      (isShowModal || this.state.isShowState)
        ? <View {...this.props} style={styles.contModal}>
          <TouchableWithoutFeedback onPress={this._hideModal}>
            <View style={styles.contBackground}>
            </View>
          </TouchableWithoutFeedback>
          <Animatable.View onLayout={e => this.setState({ layoutHeight: e.nativeEvent.layout.height })} duration={500} animation="zoomIn" style={[ styleComponent, style ]}>
            {
              this.props.children ||
                <View style={styles.container}>
                  <View style={styles.contHeader}>
                    <Text style={styleTxtTitle}>{isError ? 'Error' : 'Success'}</Text>
                  </View>
                  <View style={styles.contContent}>
                    <Text style={styles.txtMessage}>{message}</Text>
                  </View>
                  <View style={styles.contFooter}>
                    <TouchableOpacity onPress={onPress}>
                      <View style={styles.btn}>
                        <Text style={styles.txtButton}>{'Go Back'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
            }
          </Animatable.View>
        </View>
        : null
    )
  }
}

export default MyClass

// define your styles
const styles = StyleSheet.create({
  contModal: {
    height: height(100),
    width: width(100),
    position: 'absolute',
    zIndex: 999
  },
  contBackground: {
    height: height(100),
    width: width(100),
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'black',
    opacity: 0.4
  },
  contComponent: {
    width: width(80),
    backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    position: 'absolute',
    zIndex: 1001,
    alignSelf: 'center'
  },
  container: {
    flex: 1
  },
  contHeader: {
    height: height(7.5),
    width: width(80),
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contContent: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width(5),
    paddingVertical: height(2)
  },
  contFooter: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Text
  txtTitle: {
    fontSize: width(4),
    fontWeight: 'bold'
  },
  txtMessage: {
    color: '#C3C3C3',
    textAlign: 'center'
  },
  txtButton: {
    fontWeight: 'bold',
    color: COLORS.BUTTON
  },
  btn: {
    flex: 1,
    width: width(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: height(2)
  }
})

// make this component available to the app
