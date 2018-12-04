import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, WebView, TouchableOpacity } from 'react-native'

import { actionsType } from 'common/ReduxConstants'
import { RouteKey } from 'common/GlobalConstants'
import { width, height } from 'common/GlobalStyles'

import CoreHeader from 'frontend/Container/CoreHeader'

import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { CachedImage } from 'react-native-img-cache'
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'

const icHeard = <Ionicons name={'ios-heart'} color={'#111111'} size={height(5)}/>
const icHeardTo = <Ionicons name={'ios-heart-empty'} color={'#111111'} size={height(5)}/>
const icHeardHalf = <Ionicons name={'ios-heart-half'} color={'#111111'} size={height(5)}/>

const SearchAll = 0
const SearchSaved = 1
const SearchNotSave = 2

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      iSearch: 0, // 0: all, 1: saved , 2:  dont saved
      dataSearch: [],

      itemSelected: {}
    }
  }

  async componentDidMount () {
    this.props.fetchData()
  }

  _onSaved = (items) => {
    this.props.dataState.data.map(item => {
      if (item.id === items.id) {
        item.company = items.company
        item.company_logo = items.company_logo
        item.company_url = items.company_url
        item.created_at = items.created_at
        item.description = items.description
        item.how_to_apply = items.how_to_apply
        item.id = items.id
        item.location = items.location
        item.title = items.title
        item.type = items.type
        item.url = items.url
        item.saved = !items.saved
      }
    })
    this.props.updateData(this.props.dataState.data)
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.gotoDetail(item, () => this._onSaved(item))}>
        <View style={styles.contItem}>
          <View style={styles.contTop}>
            <View style={styles.contItemHeader}>
              <Text style={styles.txtTitleItem}>{item.title && item.title}</Text>
            </View>
            <View style={styles.contItemHeard}>
              <TouchableOpacity onPress={() => { this._onSaved(item) }}>
                {
                  item.saved
                    ? icHeard
                    : icHeardTo
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contBottom}>
            <View style={styles.contLeft}>
              <View style={styles.contItemSubHeader}>
                <Text style={styles.txtWork}>{item.company && item.company}</Text>
                <Text style={styles.txtLocation}>{item.location && item.location}</Text>
              </View>
              <View style={styles.contItemContent}>
                <WebView
                  originWhitelist={['*']}
                  source={{ html: item.description }}
                  style={styles.contentItem}
                  scrollEnabled={false}
                />
              </View>
            </View>
            <View style={styles.contRight}>
              <CachedImage
                component={Image}
                source={{
                  uri: item.company_logo
                }}
                indicator={ProgressBar}
                style={styles.imgItem} resizeMode={'stretch'}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _onSearch = () => {
    let iSearch = this.state.iSearch === SearchAll
      ? SearchSaved
      : this.state.iSearch === SearchSaved
        ? SearchNotSave
        : SearchAll
    this.setState({
      iSearch
    })
    switch (iSearch) {
    case SearchAll:
      this.setState({ dataSearch: this.props.dataState.data })
      break
    case SearchSaved:
      this.setState({ dataSearch: this.props.dataState.data.filter(item => !!item.saved) })
      break
    case SearchNotSave:
      this.setState({ dataSearch: this.props.dataState.data.filter(item => !item.saved) })
      break
    default:
      this.setState({ dataSearch: this.props.dataState.data })
      break
    }
  }

  get _renderRightView () {
    const { iSearch } = this.state
    return (
      <TouchableOpacity style={styles.btnSort} onPress={this._onSearch}>
        {
          iSearch === 0
            ? icHeardHalf
            : iSearch === 1
              ? icHeard
              : icHeardTo
        }
      </TouchableOpacity>
    )
  }

  render () {
    const { dataState } = this.props
    const { dataSearch } = this.state
    console.log(dataSearch)
    return (
      <CoreHeader title={'Home Screen'} isProcess={dataState.isLoading} rightView={this._renderRightView}>
        <View style={styles.container}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={(dataSearch && dataSearch.length !== 0) ? dataSearch : dataState.data}
            extraData={this.props}
            renderItem={this._renderItem}
          />
        </View>
      </CoreHeader>
    )
  }
}
const mapStateToProps = (state) => ({
  dataState: state.dataState
})
const mapactionsTypeToProps = (dispatch) => ({
  fetchData: () => dispatch({ type: actionsType.FETCH_DATA, payload: { data: [], isLoading: true } }),
  updateData: (data) => dispatch({ type: actionsType.UPDATE_DATA_SUCCESS, payload: data }),
  gotoDetail: (item, func) => dispatch({ type: actionsType.PUSH, routeName: RouteKey.DetailScreen, params: { item, func } })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(Home)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height(2)
  },
  contItem: {
    width: width(90),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderRadius: 8,
    marginTop: height(2),
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2

  },
  btnSort: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  contTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contLeft: {
    width: width(66),
    paddingHorizontal: width(2),
    paddingVertical: height(1)
  },
  contRight: {
    width: width(18),
    paddingRight: width(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  contItemHeader: {
    width: width(66),
    paddingHorizontal: width(2)
  },
  contItemHeard: {
    width: width(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  contItemSubHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  contItemContent: {

  },
  contentItem: {
    width: width(66),
    height: height(10),
    marginTop: 20
  },
  txtTitleItem: {
    color: 'blue',
    fontSize: width(6)
  },
  txtWork: {
    color: '#C3C3C3',
    fontSize: width(4),
    width: width(41)
  },
  txtLocation: {
    color: '#C3C3C3',
    fontSize: width(4),
    width: width(25),
    textAlign: 'right'
  },
  imgItem: {
    height: height(7),
    width: width(18)
  }
})
