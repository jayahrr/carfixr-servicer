import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Body, Card, CardItem, Text, View } from 'native-base'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  titleIcon: {
    fontSize: 56,
    color: Theme.colors.spot4,
    width: 'auto',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  m_r: {
    marginRight: 15,
  },
  itemIcon: {
    fontSize: 32,
    color: Theme.colors.spot4,
    width: 'auto',
  },
})

const ProfileCard = ({ user }) => (
  <Card>
    <CardItem header bordered style={styles.column}>
      <Icon ios="ios-contact-outline" android="md-contact" style={styles.titleIcon} />
      <Text>{user.name}</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <View style={styles.row}>
          <Icon ios="ios-at-outline" android="md-at" style={[styles.m_r, styles.itemIcon]} />
          <Text>{user.email}</Text>
        </View>
      </Body>
    </CardItem>
    <CardItem bordered>
      <Body>
        <View style={styles.row}>
          <Icon ios="ios-call-outline" android="md-call" style={[styles.m_r, styles.itemIcon]} />
          <Text>{user.phone}</Text>
        </View>
      </Body>
    </CardItem>
    <CardItem bordered>
      <Body>
        <View style={styles.row}>
          <Icon
            ios="ios-locate-outline"
            android="md-locate"
            style={[styles.m_r, styles.itemIcon]}
          />
          <Text>{user.primary_address}</Text>
        </View>
      </Body>
    </CardItem>
  </Card>
)

ProfileCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default ProfileCard
