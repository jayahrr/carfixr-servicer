import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Card, CardItem, Text, Right, Body, List, ListItem, Left } from 'native-base'
import * as Theme from '../config/theme'

const styles = StyleSheet.create({
  m_r: {
    marginRight: 15,
  },
  itemIcon: {
    fontSize: 32,
    color: Theme.colors.spot4,
    width: 'auto',
  },
  font12: {
    fontSize: 12,
  },
})

const ListServiceLines = ({ userServices, removeLine }) => {
  if (!userServices || !userServices.length) {
    return (
      <CardItem bordered>
        <Body>
          <Text>You're not offering any services yet.</Text>
        </Body>
      </CardItem>
    )
  }

  return (
    <List
      dataArray={userServices}
      renderRow={service => (
        <ListItem onPress={() => removeLine(service._id)}>
          <Left>
            <Text>{service.title}</Text>
          </Left>
          <Right>
            <Icon ios="ios-close-circle-outline" android="md-close-circle" />
          </Right>
          {/* <Text>{item.description}</Text> */}
        </ListItem>
      )}
    />
  )
}

ListServiceLines.propTypes = {
  userServices: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeLine: PropTypes.func.isRequired,
}

const ServiceOfferingsCard = props => (
  <Card>
    <CardItem header bordered>
      <Icon ios="ios-build-outline" android="md-build" style={[styles.m_r, styles.itemIcon]} />
      <Text>Service Offerings</Text>
    </CardItem>
    <ListServiceLines {...props} />
    <CardItem button bordered onPress={() => props.openServicesList()}>
      <Icon ios="ios-add-circle-outline" android="md-add-circle" style={styles.font12} />
      <Text style={styles.font12}> Offer another service</Text>
    </CardItem>
  </Card>
)

ServiceOfferingsCard.propTypes = {
  removeLine: PropTypes.func.isRequired,
  openServicesList: PropTypes.func.isRequired,
}

export default ServiceOfferingsCard
