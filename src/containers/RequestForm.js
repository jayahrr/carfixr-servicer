import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Text, Body } from 'native-base'
import AssignRequestButton from '../components/AssignRequestButton'

export const RequestForm = ({
  request, userID, action, isMyWork,
}) => {
  const {
    number, state, _id, description,
  } = request
  const shortDescription = request.short_description

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>{shortDescription}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{number}</Text>
              <Text>{state}</Text>
              <Text>{description}</Text>
              {/* <Text>{`For ${this.request.requester.name}`}</Text> */}
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <AssignRequestButton
              requestID={_id}
              userID={userID}
              action={action}
              goBack={isMyWork}
            />
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

RequestForm.propTypes = {
  request: PropTypes.objectOf(PropTypes.any).isRequired,
  userID: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  isMyWork: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, props) => {
  // retrieve user's ID from navigation param
  const userID = props.navigation.getParam('userID', '')
  // retrieve item from a state collection
  let reqExists
  let request = props.navigation.getParam('request', {})
  const requestID = request._id
  // attempt to find in the myWork collection first
  if (state.requests.myWork.length) {
    reqExists = state.requests.myWork.find(req => req.content._id === requestID)
    reqExists = reqExists ? reqExists.content : undefined
  }
  // if still not found, attempt to find in the items collection
  if (!reqExists) {
    if (state.requests.items.length) {
      reqExists = state.requests.items.find(req => req._id === requestID)
    }
  }
  // if item was found, create a new object to return
  if (reqExists) {
    request = { ...reqExists }
  }
  // set whether to goBack or not and the action to perform
  const isMyWork = request.servicer_id === userID
  const action = isMyWork ? 'drop' : 'pickup'

  return {
    request,
    isMyWork,
    action,
    userID,
  }
}

export default connect(mapStateToProps)(RequestForm)
