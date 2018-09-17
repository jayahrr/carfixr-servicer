import { Dimensions, StyleSheet } from 'react-native'

const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WIDTH = Dimensions.get('window').width

const colors = {
  default: '#FFFFFF',
  spot1: '#27408B',
  spot2: '#616FC1',
  spot3: '#EDEEFF',
  spot4: '#FFBB5D',
  text: {
    default: '#000',
    primary: '#DDD',
    link: '#616FC1',
    white: '#FFF',
    muted: '#546E7A', // BLUE GRAY
  },
  shadows: '#000',
}

const borders = {
  colors: {
    allSides: '#A6A6A6',
    top: '#949494',
  },
  radius: DEVICE_HEIGHT / 128,
}

const screens = {
  alignItems: 'stretch',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: colors.spot3,
}

const cards = {
  container: {
    alignSelf: 'center',
    backgroundColor: colors.default,
    borderRadius: borders.radius,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: borders.colors.allSides,
    borderTopColor: borders.colors.top,
    elevation: 1,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: colors.shadows,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: DEVICE_WIDTH * 0.95,
  },
  section: {
    // borderBottomWidth: 1,
    // borderColor: borders.colors.allSides,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    position: 'relative',
  },
  title: {
    container: {
      alignItems: 'stretch',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: borders.colors.allSides,
      marginBottom: 5,
      marginHorizontal: 10,
      paddingBottom: 5,
    },
    text: {
      alignSelf: 'center',
      color: colors.text.default,
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
}

const fields = {
  input: {
    container: {
      paddingVertical: 5,
    },
    labelStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      marginHorizontal: 10,
    },
    inputStyle: {
      color: colors.text.default,
      borderColor: borders.colors.allSides,
      borderTopColor: borders.colors.top,
      borderRadius: borders.radius,
      borderWidth: StyleSheet.hairlineWidth,
      minHeight: 40,
      marginVertical: 4,
      marginHorizontal: 10,
      paddingHorizontal: 10,
    },
  },
}

const buttons = {
  containerStyle: {
    flex: 1,
    height: DEVICE_HEIGHT / 16,
    alignSelf: 'stretch',
    backgroundColor: colors.spot1,
    borderRadius: borders.radius,
    borderWidth: 1,
    borderColor: colors.spot1,
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    alignSelf: 'center',
    color: colors.default,
    fontSize: 16,
    fontWeight: '600',
    height: DEVICE_HEIGHT / 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
}

const fonts = {
  primary: 'helvetica',
}

export { borders, buttons, cards, colors, fields, fonts, screens, DEVICE_HEIGHT, DEVICE_WIDTH }
