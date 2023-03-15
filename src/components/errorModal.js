import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const ErrorModal = ({ errorMessage, visible, onClose }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{errorMessage}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => onClose()}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        fontSize: 16,
        // color: 'black',
        marginBottom: 15
    },
    closeButton: {
        backgroundColor: '#da291c',
        padding: 7,
        borderRadius: 8,
        alignSelf: 'center'
    },
    closeButtonText: {
        fontSize: 16,
        color: 'white'
    }
});

export default ErrorModal;
