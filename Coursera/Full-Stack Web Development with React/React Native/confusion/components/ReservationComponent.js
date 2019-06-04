import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = this.defaultState();
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    defaultState() {
        return({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        })
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState(this.defaultState());
    }

    render() {

        let todayDate = new Date().toISOString().split('T')[0];

        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })}
                    >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        placeholder='Select Date and Time'
                        minDate={todayDate}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => this.setState({ date: date })}
                    />
                </View>
                <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                        />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.resetForm()}}
                    onRequestClose={() => {this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? {this.state.smoking? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button
                            onPress={() => {this.resetForm()}}
                            color='#512DA8'
                            title='Close'
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    // Note formLabel and formItem will be inside formRow 
    // so the flexDirection will be row, and formLabel will be 2x size formItem
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color:  'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});

export default Reservation;
