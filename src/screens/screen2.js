import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#4BB543', '#3F9E3F']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Money</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#3F51B5', '#3E3F9E']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Money</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#F44336', '#D32F2F']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Request Money</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    height: '30%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainDashboardScreen;
