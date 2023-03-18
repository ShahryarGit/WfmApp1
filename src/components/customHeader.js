import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import CustomHeader from './customHeader.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import { logoutSuccess } from '../redux/actions/loginActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundService from 'react-native-background-actions';
import store from '../redux/index';
import Axios, { AxiosRequestConfig } from 'axios';




const MyScreen = ({ login, allowBackButton, title, navigation }) => {

  const [userToken, setUserToken] = useState(store.getState().login.user ? store.getState().login.user.token : '');


  const setAsyncStorageValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const stopBackgroundService = async () => {
    await BackgroundService.stop();
  }

  const authOptions = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchLogout = async () => {
    try {
      // console.log('fetchLogout',userToken)
      const optionsToken = authOptions(userToken);
      // console.log(optionsToken)
      await Axios.post(
        `http://172.16.16.7:9000/security/users/logoutCurrentSession`,
        {},
        optionsToken
      )
        .then((response) => {
          console.log('response', response.status)
        })
        .catch((error) => {
          console.log("logoutCurrentSession error::", error);
          console.log("logoutCurrentSession error::", error.response.data.message);
          return [];
        });
    }
    catch (e) {
      console.log('error:', e)
    }
  }

  const handleLogout = () => {
    for (i = 0; i < 100; i++) {
      clearInterval(i);
    }
    fetchLogout();
    login()
    setAsyncStorageValue('session', '')
    stopBackgroundService();
    navigation.navigate('LoginPage')
  };

  return (
    <View style={styles.headerContainer}>

      {allowBackButton ??
        (<TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left"
            size={25} color="#da291c" />
        </TouchableOpacity>)
      }

      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity >
        <Icon name="sign-out" size={25} color="#da291c" onPress={handleLogout} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({

  headerContainer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  isLoggedIn: state.login.isLoggedIn,
  error: state.login.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => {
    console.log('logoutSuccess')
    dispatch(logoutSuccess());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyScreen);
