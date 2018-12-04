import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, WebView, TouchableOpacity, Linking } from 'react-native'
import CoreHeader from 'frontend/Container/CoreHeader'
import { connect } from 'react-redux'
import { width, height } from 'common/GlobalStyles'
import { CachedImage } from 'react-native-img-cache'
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'
import { actionsType } from 'common/ReduxConstants'
import Ionicons from 'react-native-vector-icons/Ionicons'
const icHeard = <Ionicons name={'ios-heart'} color={'#111111'} size={height(5)}/>
const icHeardTo = <Ionicons name={'ios-heart-empty'} color={'#111111'} size={height(5)}/>

class Detail extends PureComponent {
  state = {
    isShowModal: false
  }
  /** -------------------------------------
  * @method - renderModal
  * @param - param
  * @author - Nguyen Tuan / 2018-12-01 20:34:45
  * @description render children for modal
  * --------------------------------------- */
  get renderModal () {
    const item = this.props.navigation.getParam('item', {})
    const func = this.props.navigation.getParam('func', {})
    return (
      <View style={styles.contModal}>
        <View style={styles.contModalTop}>
          <TouchableOpacity style={styles.btnModalSaved} onPress={func}>
            {
              item.saved
                ? icHeard
                : icHeardTo
            }
          </TouchableOpacity>
          <CachedImage
            component={Image}
            source={{
              uri: item.company_logo
            }}
            indicator={ProgressBar}
            style={styles.imgModalItem}
            resizeMode={'stretch'}/>
        </View>
        <View style={styles.contModalBottom}>
          <Text style={styles.txtModalTitle}>{'Company Name'}</Text>
          <Text style={styles.txtModalContent}>{item.company && item.company}</Text>

          <Text style={styles.txtModalTitle}>{'Company URL'}</Text>
          <Text style={styles.txtModalContent}>{item.company_url || '--'}</Text>

          <Text style={styles.txtModalTitle}>{'Create date'}</Text>
          <Text style={styles.txtModalContent}>{item.created_at && item.created_at}</Text>

          <Text style={styles.txtModalTitle}>{'Location'}</Text>
          <Text style={styles.txtModalContent}>{item.location && item.location}</Text>

          <Text style={styles.txtModalTitle}>{'Type'}</Text>
          <Text style={styles.txtModalContent}>{item.type && item.type}</Text>
          {
            item.url &&
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.txtURL}>{'Go to job dev >>'}</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.btnModalClose} onPress={() => this.setState({ isShowModal: false })}>
            <Text style={styles.txtButtonModalClose}>{'Close Modal'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render () {
    const item = this.props.navigation.getParam('item', {})
    const func = this.props.navigation.getParam('func', {})
    return (
      <CoreHeader
        title={'Detail'}
        modalView={this.renderModal}
        isShowModal={this.state.isShowModal}
        leftAction ={() => this.props.pop()}>
        <View style={styles.container}>
          <Text style={styles.txtTitle}>{item.title && item.title}</Text>
          <View style={styles.contContent}>
            <WebView
              originWhitelist={['*']}
              source={{ html: item.description }}
              style={styles.contentItem}
            />
          </View>
          <View style={styles.contBototm}>
            <View style={styles.contBottomLeft}>
              <TouchableOpacity onPress={() => Linking.openURL(item.company_url)}>
                <Text style={styles.txtURL}>{ item.company_url && 'View our company page >>' }</Text>
              </TouchableOpacity>

              <Text style={styles.txtItemTitle}>{'Company Name'}</Text>
              <Text style={styles.txtItemContent}>{item.company && item.company}</Text>
              <Text style={styles.txtItemTitle}>{'Create date'}</Text>
              <Text style={styles.txtItemContent}>{item.created_at && item.created_at}</Text>
            </View>
            <View style={styles.contBottomRight}>
              <TouchableOpacity onPress={func}>
                {
                  item.saved
                    ? icHeard
                    : icHeardTo
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isShowModal: true })}>
                <CachedImage
                  component={Image}
                  source={{
                    uri: item.company_logo
                  }}
                  indicator={ProgressBar}
                  style={styles.imgItem} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </CoreHeader>

    )
  }
}
const mapStateToProps = (state) => ({
  dataState: state.dataState
})
const mapactionsTypeToProps = (dispatch) => ({
  pop: () => dispatch({ type: actionsType.POP }),
  updateData: (data) => dispatch({ type: actionsType.UPDATE_DATA_SUCCESS, payload: data })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(Detail)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(3),
    paddingVertical: height(2)
  },
  txtTitle: {
    color: 'blue',
    fontSize: width(6)
  },
  contContent: {
    marginTop: 20,
    width: width(94),
    height: height(40)
  },
  contentItem: {
    width: width(94),
    height: height(30)
  },
  imgItem: {
    height: height(12),
    width: width(35),
    alignSelf: 'flex-end',
    marginTop: height(2)
  },
  contBototm: {
    flexDirection: 'row',
    width: width(94),
    justifyContent: 'space-between'
  },
  txtURL: {
    color: 'blue',
    fontSize: width(3.5),
    textDecorationLine: 'underline'
  },
  contBottomLeft: {
    flex: 1,
    paddingVertical: height(2),
    justifyContent: 'center'
  },
  contBottomRight: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  contModal: {
    width: width(90)
  },
  contModalTop: {
  },
  contModalBottom: {
    paddingHorizontal: width(2)
  },
  btnModalSaved: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'flex-end',
    paddingRight: width(2)
  },
  imgModalItem: {
    width: width(90),
    height: height(30)
  },
  txtModalTitle: {
    color: '#111',
    fontSize: width(4)
  },
  txtModalContent: {
    color: '#C3C3C3',
    fontSize: width(3.5),
    marginBottom: height(1.5)
  },
  txtButtonModalClose: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: width(5)
  },
  btnModalClose: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    marginTop: height(2),
    paddingVertical: height(2)
  },
  txtItemTitle: {
    color: '#C3C3C3',
    fontSize: width(3.5),
    marginTop: height(1)
  },
  txtItemContent: {
    color: '#111',
    fontSize: width(3.5),
    fontWeight: 'bold'
  }
})
