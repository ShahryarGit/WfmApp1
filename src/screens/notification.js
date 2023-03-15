import React, { useState,useEffect } from 'react';
import { Button, View, Text } from 'react-native';
// import PushNotification from 'react-native-push-notification';
// import PushNotification, {Importance} from 'react-native-push-notification';
// import BackgroundTask from 'react-native-background-task'
// BackgroundTask.define(() => {

  
//   PushNotification.localNotification({
//     title: 'Wfm Mobile App',
//     message: 'Welcome Team',
//     channelId: "1",
//   });
//   setNotification({
//     title: 'My notification',
//     message: 'This is the body of the notification',
//     channelId: "1",
//   });
//   BackgroundTask.finish();
//   console.log('BackgroundTask:');
// });
const App = () => {
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
  //       setNotification({
  //         title: 'My notification',
  //         message: 'This is the body of the notification',
  //         channelId: "1",
  //       });
  //       console.log('NOTIFICATION:');
        
  //     }else{
  //       PushNotification.localNotification({
  //         title: 'Wfm Mobile App',
  //         message: 'Welcome Team No NOTIFICATION',
  //         channelId: "1",
  //       });
  //       setNotification({
  //         title: 'My notification',
  //         message: 'This is the body of the notification',
  //         channelId: "1",
  //       });
  //       console.log('No NOTIFICATION:');
  //     }
  //   }, 60000);

  //   // return null;
    
  // }, []);
  // PushNotification.createChannel(
  //   {
  //     channelId: "1", // (required)
  //     channelName: "My channel", // (required)
  //     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //     playSound: false, // (optional) default: true

  //     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  //     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //   },
  //   // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  // );

  // const [notification, setNotification] = useState({});

  // const handleButtonPress = () => {
  //   PushNotification.localNotification({
  //     title: 'Wfm Mobile App',
  //     message: 'Welcome Team',
  //     channelId: "1",
  //   });
  //   setNotification({
  //     title: 'My notification',
  //     message: 'This is the body of the notification',
  //     channelId: "1",
  //   });
  // };

  return (
    <View>
      <Button title="Generate Notification" onPress={handleButtonPress} />
      {/* {notification.message && (
        <Text>Notification generated: {notification.title} - {notification.message}</Text>
      )} */}
    </View>
  );
};

export default App;
