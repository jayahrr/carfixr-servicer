import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Modal,
  Alert,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
} from 'react-native'
import { Text, View, Button, Header, Content, H2, Form, Textarea, Label, Item } from 'native-base'

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
  picker: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 25,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 25,
  },
  txtArea: { marginTop: 10 },
  inputItem: { alignItems: 'stretch', marginLeft: 0 },
})

class AppointmentModal extends Component {
  static propTypes = {
    clientName: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateReq: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.now = new Date()
    this.plusMonths = new Date()
    this.plusMonths.setMonth(this.now.getMonth() + 3)
    this.state = {
      modalVisible: props.visible,
      chosenDate: null,
      defaultDate: this.now,
      minimumDate: this.now,
      maximumDate: this.plusMonths,
      message: "Let's meet at this date and time, where you specified.",
    }
  }

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate })
  }

  setAppointment = () => {
    console.log('msg: ', this.state.message)
    this.props.updateReq({ planned_start: this.state.chosenDate.toISOString(), state: 'Scheduled' })
    this.props.closeModal()
  }

  showDatePicker = () => {
    if (Platform.OS === 'android') {
      return this.openAndroidDatePicker()
    }
    return (
      <DatePickerIOS
        date={this.state.chosenDate ? this.state.chosenDate : this.state.defaultDate}
        onDateChange={this.setDate}
        minimumDate={this.state.minimumDate}
        maximumDate={this.state.maximumDate}
        mode="datetime"
        locale="en"
        timeZoneOffsetInMinutes={undefined}
        minuteInterval={5}
      />
    )
  }

  openAndroidDatePicker = async () => {
    try {
      const newDate = await DatePickerAndroid.open({
        date: this.state.chosenDate ? this.state.chosenDate : this.state.defaultDate,
        minDate: this.state.minimumDate,
        maxDate: this.state.maximumDate,
        mode: 'default',
      })
      const {
        action, year, month, day,
      } = newDate
      if (action === 'dateSetAction') {
        this.setState({ chosenDate: new Date(year, month, day) })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible || this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <Content padder>
            <Header transparent />

            <View>
              <H2 style={styles.title}>
                Set an appointment with {this.props.clientName} to complete this request.
              </H2>
              <View style={styles.picker}>{this.showDatePicker()}</View>
              <Form>
                <Item stackedLabel style={styles.inputItem}>
                  <Label>Message {this.props.clientName}</Label>
                  <Textarea
                    allowFontScaling
                    autoCapitalize="sentences"
                    autoCorrect
                    editable={!!this.state.chosenDate}
                    rowSpan={3}
                    bordered
                    placeholder={this.state.message}
                    defaultValue={this.state.message}
                    style={styles.txtArea}
                    onChangeText={(message) => {
                      this.setState({ message })
                    }}
                  />
                </Item>
              </Form>
            </View>
            <View style={styles.actions}>
              <Button
                success={this.state.chosenDate !== null}
                disabled={this.state.chosenDate === null}
                onPress={this.setAppointment}
              >
                <Text>Save</Text>
              </Button>
              <Button light onPress={this.props.closeModal}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </Content>
        </Modal>
      </View>
    )
  }
}

export default AppointmentModal
