import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem, Text } from 'native-base'

export const NearbyRequestsList = ({ requests }) => {
  if (!requests.length) {
    return <Text>There are no requests near you</Text>
  }
  return (
    // console.log(this.props)
    <List
      dataArray={requests}
      renderRow={item => (
        <ListItem>
          <Text>{item.number}</Text>
        </ListItem>
      )}
    />
  )
}

NearbyRequestsList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NearbyRequestsList
