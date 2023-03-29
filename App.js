import React,{useEffect} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Agent from './src/components/Agent';
// import Schedule from './src/screens/schedule4';
import Schedule1 from './src/screens/schedule1';
import Schedule2 from './src/screens/schedule2';
import Schedule from './src/screens/schedule';
import Schedule5 from './src/screens/schedule5';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/screens/login';
import DrawerWithRadioButtons from './src/screens/login1';
import MainScreen from './src/screens/mainScreen';
import MainScreen2 from './src/screens/screen2';
import MainScreen3 from './src/screens/screen3';
import Notification from './src/screens/notification';
// import Notification2 from './src/screens/notification2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import store from './src/redux/index';
// import store from '../WfmApp/src/redux/index';

const Stack = createStackNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false,
    orientation: 'portrait',
  };
export default function App() {



    return (
        <Provider store={store}>
        <NavigationContainer>

                {/* <Tab.Navigator>
                    <Tab.Screen name="Login" component={LoginPage} />
                    <Tab.Screen name="Login1" component={DrawerWithRadioButtons} />
                    <Tab.Screen name="MainScreen" component={MainScreen} />
                    <Tab.Screen name="Schedule" component={Schedule} />
                    <Tab.Screen name="MainScreen3" component={MainScreen3} />
                    <Tab.Screen name="Notification" component={Notification} />
                </Tab.Navigator> */}
              {/*<Tab.Screen name="Agent" component={Agent} />
                    <Tab.Screen name="MainScreen2" component={MainScreen2} />
                    <Tab.Screen name="Notification2" component={Notification2} />
                    <Tab.Screen name="Schedule1" component={Schedule1} />
                    <Tab.Screen name="Schedule2" component={Schedule2} />
                    <Tab.Screen name="Schedule" component={Schedule} />
                    <Tab.Screen name="Schedule5" component={Schedule5} />
                    <Tab.Screen name="Schedule4" component={Schedule4} /> */}
               


            <Stack.Navigator options={screenOptions}>
                <Stack.Screen name="LoginPage" component={LoginPage} options={screenOptions}  />
                <Stack.Screen name="MainScreen" component={MainScreen} options={screenOptions}/>
                <Stack.Screen name="schedule" component={Schedule} options={screenOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
        // <View><Text>Shahryar</Text></View>
    );
}