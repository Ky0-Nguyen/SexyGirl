import { Dimensions, StyleSheet } from 'react-native'

/** -------------------------------------
* @method - handleSize
* @param - num
* @author - Nguyen Tuan / 2018-11-28 16:09:07
* @description hand size for application with percent
* --------------------------------------- */
const handleSize = (num) => {
  if (num <= 0) { return 0 }
  if (num > 100) { return 1 }
  return num / 100
}

// get height , width of screen
const myWidth = Dimensions.get('window').width
const myHeight = Dimensions.get('window').height

// handle constants width, height percent
const width = (num) => myWidth * handleSize(num)
const height = (num) => myHeight * handleSize(num)

const totalSize = (num) => Math.sqrt((myHeight * myHeight) + (myWidth * myWidth)) * handleSize(num)
export { width, height, totalSize }
export const COLORS = {
  BUTTON: '#00A7EE',
  GRADIENT1: '#299DFE',
  GRADIENT2: '#45C3FC',
  background: '#FFD300',
  Gradient1: '#FFD300',
  Gradient2: '#FCE67C',
  background2: '#FDF3C4',
  GradientBg1: '#FDF3C4',
  GradientBg2: '#FFFFFF'
}

const styles = StyleSheet.create({
  backgroundDefault: {
    flex: 1,
    backgroundColor: COLORS.background2
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%'
  }
})

export default styles
