import React, { useState, useEffect } from 'react';
import {
  View, TextInput, TouchableOpacity,
  Text, Image, StyleSheet, Modal,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
  LogBox
} from 'react-native';
import Axios, { AxiosRequestConfig } from 'axios';
import ErrorModal from '../components/errorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import { loginRequest, loginSuccess, loginFailure } from '../redux/actions/loginActions';
import TimeZone from 'react-native-timezone';
import store from '../redux/index';
import { setAsyncStorageValue, getAsyncStorageValue } from '../utils/customFunction'
// import BackgroundTask from 'react-native-background-task'
// import BackgroundTimer from 'react-native-background-timer';
import PushNotification, { Importance } from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundService from 'react-native-background-actions';
import moment from "moment";
import tz from 'moment-timezone';
import { authToken, backGroundOpacity, tConv24to12hoursFormat, convertShmDtToUserTz, addUserTimeZone } from '../utils/customFunction'


// BackgroundTask.define(() => {
//   console.log('BackgroundTask:');
//   setInterval(() => {

//   }, 5000);  
// });



const LoginPage = ({ login, isLoading, isLoggedIn, error, user, navigation }) => {
  const [username, setUsername] = useState('nandos.202025');
  const [password, setPassword] = useState('iqacf6fezp&yxthHuekz');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [tokenExpiryValue, setTokenExpiryValue] = useState(false);
  const [timeZone, setTimeZone] = useState('');



  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  let intervalArrayAgentShift = [];
  let intervalArrayTokenExpiry = [];
  
  const veryIntensiveTask = (user) => {
    console.log("veryIntensiveTask")
   
    fetchAgentShiftData(user);
    intervalArrayAgentShift.push(setInterval(function () {
      let nowThisInterval = new Date();
      console.log("nowThisInterval", nowThisInterval,intervalArray)
      fetchAgentShiftData(user);
    }, 1000 * 60 * 1));
    // console.log("tokenExpiry",user.tokenExpiry * 1000)
    intervalArrayTokenExpiry.push(setInterval(function () {
      console.log("check tokenExpiry",user.tokenExpiry * 1000,intervalArrayTokenExpiry)
      fetchPasswordData()
  }, 180000)); // tokenExpiry in seconds
  };

  const myTask = () => {
    console.log('Task is being executed');
  };
  const options = {
    taskName: 'Wfm',
    taskTitle: 'Wfm',
    taskDesc: 'Background service running',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    parameters: {},
    delay: 0,
    allowExecutionInForeground: false,
    forceAlarmManager: false,
    notification: {
      id: 0,
      title: '',
      message: '',
      vibration: false,
      visibility: 'private',
      priority: 0,
      sticky: false,
      showWhen: false,
      importance: 'default',
      playSound: false,
    },
  };
  // const options = {
  //   taskName: 'Example',
  //   taskTitle: 'ss',
  //   taskDesc: 'ExampleTask description',
  //   taskIcon: {
  //     name: 'ic_launcher',
  //     type: 'mipmap',
  //   },
  //   color: '#ff00ff',
  //   linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  //   parameters: {
  //     delay: 1000,
  //   },
  // };


  // await BackgroundService.start(veryIntensiveTask, options);

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

  // const EventEmitter = Platform.select({
  //   ios: () => NativeAppEventEmitter,
  //   android: () => DeviceEventEmitter,
  // })();
  // start a global timer
  // listen for event
  // EventEmitter.addListener('backgroundTimer', () => {
  //   // this will be executed once after 5 seconds
  //   setInterval(() => {
  //         console.log('EventEmitter:');
  //       }, 5000);  //  l
  // });
  // BackgroundTimer.start(5000); // delay in milliseconds only for Android
  const notificationsList = [
    { message: 'Notification 1', date: new Date(Date.now() + 6 * 1000), channelId: "1" },
    { message: 'Notification 2', date: new Date(Date.now() + 12 * 1000), channelId: "1" },
    { message: 'Notification 3', date: new Date(Date.now() + 18 * 1000), channelId: "1" },
  ];

  const startBackgroundService = async (user) => {
    console.log('fetchSession1:');
    await BackgroundService.stop();
    PushNotification.cancelAllLocalNotifications();
    await BackgroundService.start(veryIntensiveTask(user), options);
    // await BackgroundService.stop();
    // await BackgroundService.start(veryIntensiveTask, options);
    // await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
  }

  useEffect(() => {

    // componentDidMount() {
    // }
    //  l
    // BackgroundTask.schedule()
    // const fetchSession1 = async () => {
    //   console.log('fetchSession1:');
    //   await BackgroundService.start(veryIntensiveTask, options);
    //   // await BackgroundService.stop();
    //   // await BackgroundService.start(veryIntensiveTask, options);
    //   // await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
    // }
    // fetchSession1()
    //     BackgroundTimer.runBackgroundTimer(() => {
    //       console.log('BackgroundTimer:');
    //       //code that will be called every 3 seconds 
    //     },
    //       5000);

    // Start a timer that runs continuous after X milliseconds
    // const intervalId = BackgroundTimer.setInterval(() => {
    // 	// this will be executed every 200 ms
    // 	// even when app is the the background
    //   const nowThisInterval = new Date();
    //   console.log("nowThisInterval",nowThisInterval)
    //   // PushNotification.localNotification({
    //   //       title: 'Wfm Mobile App',
    //   //       message: 'Welcome Team',
    //   //       channelId: "1",
    //   //     });
    // }, 5000);

    // BackgroundTask.schedule()
    // notifications.forEach(notification => {
    //   PushNotification.localNotificationSchedule(notification);
    // });

    // PushNotification.localNotificationSchedule(
    //   {
    //   //... You can use all the options from localNotifications
    //   // title: 'Wfm Mobile App',
    //   message: "Notification 1", // (required)
    //   date: new Date(Date.now() + 6 * 1000), // in 60 secs
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //   channelId: "1",

    //   /* Android Only Properties */
    //   // repea,
    //   // tTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    // }
    // );

    // PushNotification.localNotificationSchedule({
    //   message: 'Notification 2', // (required)
    //   date: new Date(Date.now() + 12 * 1000), // in 5 minutes
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //   channelId: "1",
    // });


    // PushNotification.localNotificationSchedule({
    //   message: 'Notification 3', // (required)
    //   date: new Date(Date.now() + 18 * 1000), // in 5 minutes
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //   channelId: "1",
    // });

    const fetchSession = async () => {
      await AsyncStorage.getItem('session').then(data => data)
        .then(value => {
          console.log('session', value);
          if (value) {
            console.log('LoginPage Session Exist')
            navigation.navigate('MainScreen')
          } else {
            console.log('LoginPage Session Not Exist')
          }
        })
        .catch(err => console.log('error:', err))
    }
    fetchSession();  //pro
    LogBox.ignoreAllLogs();
  }, []);
  const authOptions = (token) => {
    // console.log('value3', token)
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  const saveDataAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgentShiftData = async (user) => {
    try {
      const now = new Date();
      let curentDate = moment(now).format(moment.HTML5_FMT.DATE);
      const curentTimezoneDate = addUserTimeZone(curentDate, user.timeZone);
      // console.log('curentTimezoneDate', curentTimezoneDate)
      const optionsToken = authOptions(user.token);
      let data = await Axios.post(
        `http://172.16.16.7:9000/wfm/tenants/` + user.tenant + `/agent_shift/getAllAgentShiftsByFilters`,
        {
          // "agentId": '202025',
          "agentId": user.agentID,
          "startDate": curentTimezoneDate,
          "endDate": curentTimezoneDate
          // "startDate": "2023-02-10T00:00:00+05:00",
          // "endDate": "2023-02-20T00:00:00+05:00"
        },
        optionsToken
      )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log("getAllAgentShiftsByFilters error::", error.response.data);
          return [];
        });
      console.log('data', data)
      // console.log('agentShifts', data.length)
      if (data && data.length > 0) {
        let agentShifts = [];
        let notificationArray = [];
        for (var i = 0; i < data.length; i++) {
          let act = data[i].activities;
          let activityData = act ? act.activities : [];
          // console.log('activityData', activityData)

          for (var j = 0; j < activityData.length; j++) {
            // console.log("activity array : ", activityData);
            // let startDate = new Date(shiftDate + " " + activityData[j].startTime);
            // let endDate = new Date(shiftDate + " " + activityData[j].endTime);
            let date1 = new Date().getTime() + (1000 * 60 * 4);
            let date2 = new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime();

            console.log(date1, date2, activityData[j].startDateTime)

            // let d1 = new Date(activityData[j].startDateTime);
            // let d2 = d1.toLocaleString();
            // let d3 = d1.toISOString();
            // const datetime = moment.tz(activityData[j].startDateTime.replace('Z', ''), 'UTC').tz(user.timeZone);
            // const date5 = datetime.toDate();
            // // let d1=new Date(activityData[j].startDateTime).getTime() - (1000 * 60 * 5);
            // let d22 = convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm');
            // let d3=new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime() - (1000 * 60 * 5);
            // let d4 = new Date(new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime())
            // let d5 = moment.tz(activityData[j].startDateTime,'UTC').tz(user.timeZone);
            // let d6=new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm'));
            // let d7=moment.utc(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm'));
            // let d8=moment.utc(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).subtract(5, 'minutes');
            // console.log(d7.subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
            // console.log(d1,d2,d3,d4,d5,d6,d7,d8,d8.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
            // console.log(d1, d2, d3, datetime, date2);
            // console.log(moment(d22).toDate());

            //  console.log(
            //   // new Date(new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime() - (1000 * 60 * 5)),
            //   // moment.tz(new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime() - (1000 * 60 * 5),'UTC').tz(user.timeZone),
            // //  new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')),
            // //  convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm'),
            // //  moment(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')),
            //  moment.tz(date3,'UTC').tz(user.timeZone),
            //  moment.tz(date4,'UTC').tz(user.timeZone),
            //  moment.tz(date5,'UTC').tz(user.timeZone),
            //  moment.tz(activityData[j].startDateTime,'UTC').tz(user.timeZone),
            //  new Date(date4),
            // //  moment.tz(new Date(convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm')).getTime() - (1000 * 60 * 5),user.timeZone),
            //  )

            if (date1 < date2) {
              let startDateTime = convertShmDtToUserTz(activityData[j].startDateTime, user.timeZone, 'YYYY-MM-DD HH:mm');
              // Create a new Date object from the timestamp string
              const date4 = new Date(date2 + (300 * 60000) - (5 * 60000));
              const date9 = moment.utc(startDateTime).toDate();
              const date10 = new Date(moment.utc(startDateTime));
              console.log('ssss', moment.utc(startDateTime), date9, date10)
              // Convert the Date object to the desired output format
              // const formattedDate = date4.toISOString();
              agentShifts.push({
                title: activityData[j].activityName,
                // start: activityData[j].startDateTime,//startDate,
                // end: activityData[j].endDateTime,//endDate,
                start: startDateTime,//startDate,
                end: convertShmDtToUserTz(activityData[j].endDateTime, user.timeZone, 'YYYY-MM-DD HH:mm'),//endDate,
                id: activityData[j].id,
                color: activityData[j].activityColor + backGroundOpacity,
                borderColor: activityData[j].activityColor
              })
              // let scheduleDate=moment.utc(startDateTime).subtract(5, 'minutes')
              //  console.log('scheduleDate',scheduleDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
              notificationArray.push({
                title: activityData[j].activityName + ' Activity Reminder',
                message: activityData[j].activityName + ' Start at ' + tConv24to12hoursFormat(startDateTime.split(' ')[1]),
                // date: date9,
                date: new Date(date2 - (300 * 1000)),
                // date: new Date(date2 + 295 * 60000),
                // date: new Date(moment.utc(startDateTime).subtract(5, 'minutes')),
                channelId: "1"
              })
            }
          }
        }
        console.log('agentShifts', agentShifts)
        console.log('notificationArray', notificationArray)
        notificationArray.forEach(notification => {
          PushNotification.localNotificationSchedule(notification);
        });
        // notificationsList.forEach(notification => {
        //   console.log(notification)
        //     PushNotification.localNotificationSchedule(notification);
        //   });
        console.log('finalize')
        // saveDataAsyncStorage('agentScheduleData', JSON.stringify(agentShifts))
      }
      else {

        console.log('No agent shifts found')
        setAsyncStorageValue('agentScheduleData', '')
      }

    }
    catch (e) {
      console.log('agent_shift error:', e)
    }

  }


  // Perform login logic here, for example, by sending a request to a server to verify the credentials
  const fetchUserNameData = async () => {
    try {
      await Axios.post(
        `http://172.16.16.7:9000/security/users/login`,
        {
          "username": username
        }
      )
        .then((response) => {
          if (response.status == 200) {
            setPasswordVisible(true)
          }

          console.log('response', response.status)
        })
        .catch((error) => {
          console.log("error::");
          console.log(error.response.data.message);
          setErrorMessage(error.response.data.message);
          setModalVisible(true);
          // console.log(error.response.data);
          // console.log(error);
          return [];
        });
    }
    catch (e) {
      console.log('error:', e)
    }
  }

  const fetchPasswordData = async () => {
    const timeZone = await TimeZone.getTimeZone().then(zone => zone);
    try {
      await Axios.post(
        `http://172.16.16.7:9000/security/users/userLogin/getUserToken`,
        {
          "username": username,
          "password": password
        }
      )
        .then((response) => {
          if (response.status == 200) {
            console.log('Su')
          }

          setAsyncStorageValue('session', 'exist')
          const user = tokenToUser(response.data.token.access_token, timeZone,response.data.token.expires_in);
          console.log('userData', user)
       
// Clear all the intervals
intervalArrayAgentShift.forEach(interval => clearInterval(interval));
intervalArrayTokenExpiry.forEach(interval => clearInterval(interval));
intervalArrayAgentShift = [];
intervalArrayTokenExpiry = [];
          login(user)
          startBackgroundService(user);
          // login(response.data.token.access_token, timeZone)
          // console.log('agentID', user.agentID)
          // setInterval(() => {
          //   fetchAgentShiftData(user);  //pro
          // }, 1000 * 60 * 60);
          navigation.navigate('MainScreen')

          // const user = tokenToUser(response.data.access_token);
          // dispatch(loginSuccess(user));
          // saveData('token',response.data.token.access_token)
          // props.login({ username, password });
        })
        .catch((error) => {
          console.log("getUserToken error::", error.response.data.message);
          setErrorMessage('Password is not correct');
          setModalVisible(true);
          return [];
        });
    }
    catch (e) {
      console.log('getUserToken error:', e)
    }
  }


  const handleLogin = () => {
    if (!passwordVisible) {
      fetchUserNameData();
    } else {
      fetchPasswordData()
    }
    // navigation.navigate('MainScreen')
  };




  const handleClose = () => {
    setModalVisible(false);
  };

  const handleBack = () => {
    setPasswordVisible(false)
  };

  return (
    <View style={styles.container}>
      <Image source={require('../utils/images/afiniti.png')} style={styles.logo} />
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => setUsernameVerified(false)}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      {/* <View style={styles.usernameContainer}> */}
      {passwordVisible ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name='arrow-left' color='grey' size={26} />
        </TouchableOpacity>) : null
      }
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        autoFocus={true}
        value={username}
        editable={passwordVisible ? false : true}
      />
      {/* </View> */}
      {passwordVisible ? (
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoFocus={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      ) : null
      }

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <ErrorModal
        errorMessage={errorMessage}
        visible={modalVisible}
        onClose={handleClose}
      />
    </View>
  );
};


function tokenToUser(token, timeZone,tokenExpiry) {
  var tokenData = jwt_decode(token);
  return {
    token: token,
    username: tokenData.preferred_username,
    firstName: tokenData.given_name,
    lastName: tokenData.family_name,
    email: tokenData.email,
    tenant: tokenData.tenant,
    tenants: tokenData.tenants,
    roles: tokenData.realm_access.roles,
    userID: tokenData.sub,
    agentID: tokenData.agent_Id,
    timeZone: timeZone,
    tokenExpiry: tokenExpiry,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
  },
  logo: {
    width: '80%',
    height: 100,
    marginBottom: 72,
  },
  backButton: {
    // marginRight: 10,
    marginBottom: 10,
    // height:'30px',
    // backgroundColor: 'gray',
    // // padding: 10,
    // borderRadius: 5,
    color: 'red',
    // position: 'absolute',
    // top: -40,
    right: 130,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
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
  // backButton: {
  //   backgroundColor: 'gray',
  //   padding: 10,
  //   borderRadius: 5,
  //   position: 'absolute',
  //   top: 20,
  //   right: 20,
  // },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    // borderRadius: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
});


const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  isLoggedIn: state.login.isLoggedIn,
  error: state.login.error,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    // login: (token, timeZone) => {
    console.log('mapDispatchToProps')
    // const user = tokenToUser(token, timeZone);
    // console.log(user)

    dispatch(loginRequest());
    dispatch(loginSuccess(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);