import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from 'react-native'
import CoreHeader from './CoreHeader'
import gStyles, { width, height } from 'common/GlobalStyles'

import CustomLoading from 'frontend/Component/CustomLoading'
import CustomModal from 'frontend/Component/CustomModal'

class CoreLayoutContainer extends React.Component {
dismissKeyboard = () => Keyboard.dismiss()
get renderContent () {
  const {
    customRightIcon,
    customRightStyle,
    rightView,
    rightAction,
    children,
    style,
    title,
    headerStyle,
    leftAction,
    headerCustomView,
    disabledCustomRightIcon,
    isProcess,
    modalView,
    isShowModal,
    styleModal
  } = this.props
  return (
    <View style={gStyles.backgroundDefault}>
      <CoreHeader
        customRightIcon={customRightIcon}
        customRightStyle={customRightStyle}
        title={title}
        headerStyle={headerStyle}
        rightAction={rightAction}
        rightView={rightView}
        leftAction={leftAction}
        customView={headerCustomView}
        disabledCustomRightIcon={disabledCustomRightIcon}
        _this={this}
      />
      <View style={styles.container}/>
      <View style={[gStyles.backgroundDefault, style]}>
        {children}
      </View>
      <CustomLoading isProcess={isProcess} style={styles.modal}/>
      <CustomModal style={[styles.customModal, styleModal]} isShowModal={isShowModal}>
        {modalView}
      </CustomModal>
    </View>
  )
}

render () {
  const { isTouchDisable = false } = this.props
  return (
    isTouchDisable
      ? <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        {this.renderContent}
      </TouchableWithoutFeedback>
      : this.renderContent
  )
}
}

const heightNavBar = height(11.5)
const styles = StyleSheet.create({
  container: {
    height: heightNavBar + height(1),
    width: width(100),
    justifyContent: 'center',
    backgroundColor: '#FFCD02'
  },
  modal: {
    top: height(40)
  },
  customModal: {
    width: width(90)
  }
})

export default CoreLayoutContainer
