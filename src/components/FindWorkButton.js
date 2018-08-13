import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Card, CardItem, Text } from 'native-base'

const FindWorkButton = ({ title, btnTitle, navigation }) => (
  <Card>
    <CardItem header>
      <Text>{title}</Text>
    </CardItem>
    <CardItem footer>
      <Button iconRight primary onPress={() => navigation.navigate({ routeName: 'Home' })}>
        <Text>{btnTitle}</Text>
        <Icon name="ios-search" />
      </Button>
    </CardItem>
  </Card>
)

FindWorkButton.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  btnTitle: PropTypes.string,
}

FindWorkButton.defaultProps = {
  title: 'Did not find any work scheduled for you.',
  btnTitle: 'Find work in my area',
}

export default FindWorkButton
