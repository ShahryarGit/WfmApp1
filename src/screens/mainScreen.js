import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification, { Importance } from 'react-native-push-notification';
// import BackgroundTask from 'react-native-background-task'
import store from '../redux/index';
import { authToken, backGroundOpacity, tConv24to12hoursFormat, convertShmDtToUserTz, addUserTimeZone, setAsyncStorageValue, getAsyncStorageValue } from '../utils/customFunction'
import Axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import CustomHeader from '../components/customHeader';

// BackgroundTask.define(() => {
//   PushNotification.localNotification({
//     title: 'Wfm Mobile App',
//     message: 'Welcome Team',
//     channelId: "1",
//   });
//   // setNotification({
//   //   title: 'My notification',
//   //   message: 'This is the body of the notification',
//   //   channelId: "1",
//   // });
//   BackgroundTask.finish();
//   console.log('BackgroundTask:');
// });





const MainScreen = ({ user, navigation }) => {


  // useEffect(() => {
  //   // PushNotification.configure({
  //   //   onNotification: function(notification) {
  //   //     console.log('NOTIFICATION:', notification);
  //   //   },
  //   // });

  //   setInterval(() => {
  //     const date = new Date();
  //     if (date.getMinutes() % 5 === 0) {
  //       BackgroundTask.schedule();
  //       PushNotification.localNotification({
  //         title: 'Wfm Mobile App',
  //         message: 'Welcome Team',
  //         channelId: "1",
  //       });
  //       // setNotification({
  //       //   title: 'My notification',
  //       //   message: 'This is the body of the notification',
  //       //   channelId: "1",
  //       // });
  //       console.log('NOTIFICATION:');

  //     }else{
  //       PushNotification.localNotification({
  //         title: 'Wfm Mobile App',
  //         message: 'Welcome Team No NOTIFICATION',
  //         channelId: "1",
  //       });
  //       // setNotification({
  //       //   title: 'My notification',
  //       //   message: 'This is the body of the notification',
  //       //   channelId: "1",
  //       // });
  //       console.log('No NOTIFICATION:');
  //     }
  //   }, 1000 * 60 * 60);  //  last number is for interval in minutes==> 1 for 1 minute and 60 for 1 hour  

  //   // return null;

  // }, []);

  PushNotification.createChannel(
    {
      channelId: "1", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true

      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const [timeZone, setTimeZone] = useState(store.getState().login.user ? store.getState().login.user.timeZone : '');
  const [userToken, setUserToken] = useState(store.getState().login.user ? store.getState().login.user.token : '');
  const [agentLoginId, setAgentLoginId] = useState(store.getState().login.user ? store.getState().login.user.agentID : '202025');
  const [userTenant, setUserTenant] = useState(store.getState().login.user ? store.getState().login.user.tenants : '');
  // const authOptions = (token) => {
  //   console.log('value3', token)
  //   return {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  // };
  // const optionsToken = authOptions(userToken);
  // let agentData = [
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-10 19:00", "id": 7844, "start": "2023-02-10 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-13 15:55", "id": 7845, "start": "2023-02-10 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-11 00:00", "id": 7846, "start": "2023-02-13 16:05", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-11 19:00", "id": 7829, "start": "2023-02-11 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-11 20:00", "id": 7830, "start": "2023-02-11 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-12 00:00", "id": 7831, "start": "2023-02-11 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-12 19:00", "id": 7841, "start": "2023-02-12 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-12 20:00", "id": 7842, "start": "2023-02-12 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-13 00:00", "id": 7843, "start": "2023-02-12 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-13 19:00", "id": 7826, "start": "2023-02-13 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-13 20:00", "id": 7827, "start": "2023-02-13 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-14 00:00", "id": 7828, "start": "2023-02-13 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-14 19:00", "id": 7832, "start": "2023-02-14 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-14 20:00", "id": 7833, "start": "2023-02-14 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-15 00:00", "id": 7834, "start": "2023-02-14 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-15 19:00", "id": 7838, "start": "2023-02-15 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-15 20:00", "id": 7839, "start": "2023-02-15 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-16 00:00", "id": 7840, "start": "2023-02-15 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-16 19:00", "id": 7835, "start": "2023-02-16 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-16 20:00", "id": 7836, "start": "2023-02-16 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-17 00:00", "id": 7837, "start": "2023-02-16 20:00", "title": "On Queue" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-17 19:00", "id": 7847, "start": "2023-02-17 15:00", "title": "On Queue" },
  //   { "borderColor": "#417505", "color": "#4175052e", "end": "2023-02-17 20:00", "id": 7848, "start": "2023-02-17 19:00", "title": "Break" },
  //   { "borderColor": "#50e3c2", "color": "#50e3c22e", "end": "2023-02-18 00:00", "id": 7849, "start": "2023-02-17 20:00", "title": "On Queue" }]

  const saveDataAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataAsyncStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // const fetchSession = async () => {
  //   //   const session = await AsyncStorage.getItem('session').then(data => data)
  //   //     .then(value => {

  //   //       console.log('session', value);
  //   //       if (value) {
  //   //         console.log('useEffect exist please navigate mainScreen')
  //   //         // navigation.navigate('schedule')
  //   //       } else {
  //   //         console.log('useEffect nOt exist mainScreen')
  //   //       }
  //   //     })
  //   //     .catch(err => console.log('error:', err))
  //   // }
  //   // fetchSession();  //pro

  //   // const session = getAsyncStorageValue('session');
  //   // console.log('session', session);
  //   // if (session) {
  //   //   console.log('useEffect exist please navigate mainScreen')
  //   //   // navigation.navigate('schedule')
  //   // } else {
  //   //   console.log('useEffect nOt exist mainScreen')
  //   // }

  //   const now = new Date();
  //   let curentDate = moment(now).format(moment.HTML5_FMT.DATE);
  //   const curentTimezoneDate = addUserTimeZone(curentDate, timeZone);
  //   console.log('curentTimezoneDate', curentTimezoneDate)
  //   const fetchData = async () => {
  //     try {
  //       let data = await Axios.post(
  //         `http://172.16.16.7:9000/wfm/tenants/` + userTenant + `/agent_shift/getAllAgentShiftsByFilters`,
  //         {
  //           "agentId": '202025',
  //           "startDate": curentTimezoneDate,
  //           "endDate": curentTimezoneDate
  //           // "agentId": agentLoginId,
  //           // "startDate": "2023-02-10T00:00:00+05:00",
  //           // "endDate": "2023-02-20T00:00:00+05:00"
  //         },
  //         optionsToken
  //       )
  //         .then((response) => {
  //           return response.data;
  //         })
  //         .catch((error) => {
  //           console.log("getAllAgentShiftsByFilters error::",error.response.data);
  //           return [];
  //         });
  //       // console.log('data', data)
  //       console.log('agentShifts', data.length)

  //       let agentShifts = [];
  //       let notificationArray = [];
  //       for (var i = 0; i < data.length; i++) {
  //         //let dateString = data[i].date;
  //         // const asdate = dateString ? new Date(dateString) : new Date();
  //         // let shiftDate = asdate.toISOString().split('T')[0];
  //         let act = data[i].activities;
  //         let activityData = act ? act.activities : [];
  //         for (var j = 0; j < activityData.length; j++) {
  //           // console.log("activity array : ", activityData);
  //           // let startDate = new Date(shiftDate + " " + activityData[j].startTime);
  //           // let endDate = new Date(shiftDate + " " + activityData[j].endTime);
  //           agentShifts.push({
  //             title: activityData[j].activityName,
  //             // start: activityData[j].startDateTime,//startDate,
  //             // end: activityData[j].endDateTime,//endDate,
  //             start: convertShmDtToUserTz(activityData[j].startDateTime, timeZone, 'YYYY-MM-DD HH:mm'),//startDate,
  //             end: convertShmDtToUserTz(activityData[j].endDateTime, timeZone, 'YYYY-MM-DD HH:mm'),//endDate,
  //             id: activityData[j].id,
  //             color: activityData[j].activityColor + backGroundOpacity,
  //             // backgroundColor: activityData[j].activityColor + backGroundOpacity,
  //             // textColor: blackFontColor,
  //             borderColor: activityData[j].activityColor
  //           })
  //           notificationArray.push({
  //             message: activityData[j].activityName,
  //             date:new Date(new Date(convertShmDtToUserTz(activityData[j].startDateTime, timeZone, 'YYYY-MM-DD HH:mm')).getTime()-(1000 * 60 * 5)),
  //             channelId: "1"
  //           })
  //         }
  //       }
  //       console.log('agentShifts', agentShifts)
  //       console.log('notificationArray', notificationArray)
  //       notificationArray.forEach(notification => {
  //         PushNotification.localNotificationSchedule(notification);
  //       });
  //       saveDataAsyncStorage('agentScheduleData', JSON.stringify(agentShifts))

  //     }
  //     catch (e) {
  //       console.log('error:', e)
  //     }

  //   }

  //   fetchData();  //pro
  //   setInterval(() => {
  //     fetchData();  //pro
  //   }, 1000 * 60 * 60);  //  last number is for interval in minutes==> 1 for 1 minute and 60 for 1 hour  


  //   // SearchAgentScheduleData();
  //   // setInterval(() => {
  //   //   const nowThisInterval = new Date();
  //   //   console.log("Searching For Activity at", nowThisInterval)
  //   //   SearchAgentScheduleData()
  //   // }, 300000);

  // }, []);

  const SearchAgentScheduleData = () => {


    const now = new Date();
    if (now.getMinutes() % 1 === 0) {

      const fetchAgentScheduleData = async () => {
        await getDataAsyncStorage("agentScheduleData").then(data => data)
          .then(value => {
            let agentData = []
            agentData = JSON.parse(value);
            if (agentData) {
              console.log(agentData)
              const fiveMinutesInMs = 5 * 60 * 1000;
              const matchedObjects = agentData.filter(obj => {
                const dateTime = new Date(obj.start);
                //  return Math.abs(dateTime.getTime() - now.getTime()) <= fiveMinutesInMs;
                const diff = dateTime.getTime() - now.getTime();
                console.log('diff', diff, fiveMinutesInMs)
                // return diff <= fiveMinutesInMs;
                return diff >= 0 && diff <= fiveMinutesInMs;
              });
              console.log('matchedObjects', matchedObjects)
              if (matchedObjects && matchedObjects.length > 0) {
                console.log('Activity Exist:');
                PushNotification.localNotification({
                  title: matchedObjects[0].title + ' Activity Reminder',
                  // message: 'Activity Start at ' + matchedObjects[0].start,
                  message: matchedObjects[0].title + ' Start at ' + tConv24to12hoursFormat(matchedObjects[0].start.split(' ')[1]),
                  channelId: "1",
                });
              }
              else {
                console.log('Activity Not Exist:');
              }

            } else {
              console.log('No Schedule Found from storage');
            }



          })
          .catch(err => console.log('error:', err))
      }
      fetchAgentScheduleData();  //pro

    } else {
      console.log('not in minute:');

    }

  }





  const handleAction = () => {
    navigation.navigate('schedule')
  };


  return (
    <View style={styles.container}>
      <CustomHeader allowBackButton={false} title={''} navigation={navigation} />
      <Image
        source={require('../utils/images/afiniti.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Afiniti </Text>
      <Text style={styles.description}>
        Your one-stop solution for all Workforce Management needs.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAction}
      >
        <Text style={styles.buttonText}>Agent Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
  },

  headerContainer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    height: 40,
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#da291c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MainScreen;
