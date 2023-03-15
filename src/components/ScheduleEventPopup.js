import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleEventPopup = ({ isVisible, event, onClose }) => {
    // console.log('ScheduleEventPopup',event)
    // console.log('ScheduleEventPopup',event.title)
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={[styles.header,{backgroundColor:event?event.color:'#2185d0'}]}>
            <Text style={styles.title}>{event?event.title:''}</Text>
            {/* <Text style={styles.title}>Queue</Text> */}
            <TouchableOpacity onPress={onClose}>
              <Icon name="times" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.description}>
              <Text style={styles.textFontWeight}>Start:</Text>  {event?event.start:''}
            </Text>
            <Text style={styles.description}>
              <Text style={styles.textFontWeight}>End:&nbsp;&nbsp;</Text>  {event?event.end:''}
            </Text>
            {/* <Text style={styles.description}>{event.description}</Text> */}
            {/* <Text style={styles.date}>end: 2023-02-27 20:30</Text> */}
            {/* <Text style={styles.date}>{event.date}</Text> */}
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    // backgroundColor: '#2185d0',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  textFontWeight: {
    fontWeight:'700'
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});

export default ScheduleEventPopup;
