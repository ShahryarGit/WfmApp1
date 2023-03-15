import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  DrawerLayoutAndroid, 
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TimelineCalendar, EventItem } from '@howljs/calendar-kit';
import { authToken, backGroundOpacity, convertShmDtToUserTz,getFirstandLastDate } from '../utils/customFunction'
import Axios, { AxiosRequestConfig } from 'axios';
import TimeZone from 'react-native-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../components/customHeader';
import ScheduleEventPopup from '../components/ScheduleEventPopup';
// import { Picker } from 'react-native-picker-select';

const Schedule = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [timeZone, setTimeZone] = useState(store.getState().login.user ? store.getState().login.user.timeZone : '');
  const [userToken, setUserToken] = useState(store.getState().login.user ? store.getState().login.user.token : '');
  const [userTenant, setUserTenant] = useState(store.getState().login.user ? store.getState().login.user.tenant : '');
  const [userRoles, setuserRoles] = useState(store.getState().login.user ? store.getState().login.user.roles : []);
  const [agentLoginId, setAgentLoginId] = useState(store.getState().login.user ? store.getState().login.user.agentID : '');

    console.log(getFirstandLastDate(new Date()))
    const [startDate, setStartDate] = useState(getFirstandLastDate(new Date())[0]);
  // const [startDate, setStartDate] = useState(new Date('2023-02-13'));
  const [endDate, setEndDate] = useState(getFirstandLastDate(new Date())[1]);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [agentSelected, setAgentSelected] = useState(0);
  const [workGroupSelected, setWorkGroupSelected] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [agents, setAgents] = useState([ ]);
  const [WorkGroup, setWorkGroup] = useState([]);
  // const [refetch, setRefetch] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [selectedViewMode, setSelectedViewMode] = useState('workWeek');
  const [scheduleViewModeList, setScheduleViewModeList] = useState([
    { label: "Day", value: "day" },
    { label: "Three Days", value: "threeDays" },
    { label: "Work Week", value: "workWeek" },
    { label: "Week", value: "week" },
  ]);

// const CustomHeader = ({ title, navigation, logout }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Icon name="arrow-left" size={25} color="#da291c" />
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>{title}</Text>
//       <TouchableOpacity >
//         <Icon name="sign-out" size={25} color="#da291c" />
//       </TouchableOpacity>
//     </View>
//   );
// };
const CustomLayoutHeader = ({ title, navigation, logout }) => {
  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={25} color="black" />
    </TouchableOpacity> */}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
        <Icon name="arrow-right" size={25} color="#da291c" />
      </TouchableOpacity>
    </View>
  );
};

  // const getData = async (key) => {
  //   try {
  //     const data = await AsyncStorage.getItem(key);
  //     if (data !== null) {
  //       console.log(data);
  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const authOptions = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
    // const optionsToken = authOptions('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwcGlHc2pxak9PenRKUk9hSDFLMlEzSXlUZHU2QUZsMjVwY21GSFRGQzlvIn0.eyJleHAiOjE2NzYyNzc3NzUsImlhdCI6MTY3NTY3Mjk3NSwianRpIjoiMGZjNjA4OTYtNmZlMy00MzRiLWFhZjItNzc3MWFlYzMyYTRiIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hazo4NDQzL2F1dGgvcmVhbG1zL21lZ2EiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOWRiZTMzZDEtZmQ1Yy00OWJhLThjMGItOGJjYWNjNjBkZDBhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVnYS11aSIsInNlc3Npb25fc3RhdGUiOiI4MTdlN2FlNC04ZWY4LTQ1NjItYjk2Yi1kNzk1ZDM3MDFhOWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWVnYSIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjgxN2U3YWU0LThlZjgtNDU2Mi1iOTZiLWQ3OTVkMzcwMWE5ZSIsInRlbmFudHMiOlsibmFuZG9zIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IndmbSBhZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6IndmbS5hZG1pbiIsImdpdmVuX25hbWUiOiJ3Zm0iLCJmYW1pbHlfbmFtZSI6ImFkbWluIiwidGVuYW50IjoibmFuZG9zIiwiZW1haWwiOiJzYW5hLndhaGFiQHRlc3QuY29tIn0.EkjTtyxEPnv4uVSHzyTgLG-1rwHa3vKNKopPiT3nLaeaTz7y0dOEbFFWOr82RUiEosddkYmyeMd3xTiemg4fj8hFWXwnknqg92DQStVccUPtIngMeF--SVS7sEBzlMBnGOcSX1bUtO3xlHeToBfezL3DDGQkD6Jn9RqoOG-0p_JbSWbOki1FY46Si38uzwGwZa1GKF7QuPJpBRsLB8fUT4XCE_XX13uN-dG-9qUjUR-YGSA24r__M8Tf54dZnU17gvIBOEmWiQqbx4bX325P_Ud8h6JV3IlcJU7qxFTcbfz2vRu6rhRSqBGvVhMpRNR7azs2pssNi9jJ9oNTghQnbA');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getData("token").then(data => data)
  //       .then(value => {
  //         console.log("yourKey Value:  " + value)
  //         setUserToken(value)
  //       })
  //       .catch(err => console.log(err))
  //   }
  //   fetchData();
  // }, []);

  const handleSearch = () => {
    drawer.current.closeDrawer();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  const fetchData = async () => {
    try {
      // const timeZone = await TimeZone.getTimeZone().then(zone => zone);
      // setTimeZone(timeZone)
    const optionsToken = authOptions(userToken);
    // console.log(agentLoginId,userTenant,startDate,endDate,optionsToken)

      let data = await Axios.post(
        `http://172.16.16.7:9000/wfm/tenants/` + userTenant + `/agent_shift/getAllAgentShiftsByFilters`,
        {
          "agentId": agentLoginId,
          "startDate": startDate,
          "endDate": endDate
        },
        optionsToken
      )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log("error::");
          console.log(error.response.data);
          console.log(error);
          return [];
        });
      // console.log('data', data)
      console.log('agentShifts', data.length)

      let agentShifts = [];
      for (var i = 0; i < data.length; i++) {
        //let dateString = data[i].date;
        // const asdate = dateString ? new Date(dateString) : new Date();
        // let shiftDate = asdate.toISOString().split('T')[0];
        let act = data[i].activities;
        let activityData = act ? act.activities : [];
        for (var j = 0; j < activityData.length; j++) {
          // console.log("activity array : ", activityData);
          // let startDate = new Date(shiftDate + " " + activityData[j].startTime);
          // let endDate = new Date(shiftDate + " " + activityData[j].endTime);
          agentShifts.push({
            title: activityData[j].activityName,
            // start: activityData[j].startDateTime,//startDate,
            // end: activityData[j].endDateTime,//endDate,
            start: convertShmDtToUserTz(activityData[j].startDateTime, timeZone, 'YYYY-MM-DD HH:mm'),//startDate,
            end: convertShmDtToUserTz(activityData[j].endDateTime, timeZone, 'YYYY-MM-DD HH:mm'),//endDate,
            id: activityData[j].id,
            color: activityData[j].activityColor + backGroundOpacity,
            // backgroundColor: activityData[j].activityColor + backGroundOpacity,
            // textColor: blackFontColor,
            borderColor: activityData[j].activityColor
          })
        }
      }
      console.log('agentShifts', agentShifts)
      setEvents(agentShifts);

    }
    catch (e) {
      console.log('error:', e)
    }
  }


  // const [startDate, setStartDate] = useState(getMonthRange(current_date()).from || "");
  // const [endDate, setEndDate,] = useState(getMonthRange(current_date()).to || "");
  // const [WorkGroup, setWorkGroup] = useState<[]>([]);
  // const [agents, setAgents] = useState<[]>([]);
  // const [agentSelected, setAgentSelected] = useState(0);
  // const [workGroupSelected, setWorkGroupSelected] = useState(0);
  // const [refetch, setRefetch] = useState(false);
  // const [loading, setLoading] = useState(false);

  //    useEffect(() => {
  //     try {
  //         setLoading(true)
  //         fetchWfgs();
  //     } catch (error) 
  //     {
  //       console.log('error:',error );
  //     } finally {
  //         setLoading(false)
  //     }
  // }, []);

  // useEffect(() => {
  //     refetch && fetchAgentShifts(agentSelected);
  // }, [refetch])

  // const fetchWfgs = async () => {
  //     try {
  //         if (userRoles.includes('tenant_employee')) {
  //             setAgentSelected(agentLoginId)
  //             setRefetch(true)
  //         } else {
  //           let data = await Axios.get(`http://172.16.16.7:9000/wfm/tenants/nandos/workforceGroup`, optionsToken)
  //           .then((response) => {
  //             return response.data;
  //           })
  //           .catch((error) => {
  //             console.log("error::", error);
  //             return [];
  //           });
  //             // const { data } = await workforceGroupApi.findWFGbyTenant(userTenant);
  //             const dataObj = data.map((k) => ({ value: k.id, label: k.name }));
  //             console.log('dataObj',dataObj)
  //             setWorkGroup(dataObj);
  //             // inserting -1 in workGroupSelected means res is taken from api but there are no wfgs present
  //             dataObj && dataObj.length ? setWorkGroupSelected(dataObj[0].value) : setWorkGroupSelected(-1);
  //             dataObj && dataObj.length && fetchAgents(data[0].id);
  //         }
  //     } catch (error) {
  //       console.log('error:',error );
  //     }
  // // };

  // const fetchAgents = async (wfgId) => {
  //     try {
  //         if (wfgId) {
  //           let data = await Axios.get(`http://172.16.16.7:9000/wfm/tenants/nandos/employee/getAgentsByMuId/`+wfgId, optionsToken)
  //           .then((response) => {
  //             return response.data;
  //           })
  //           .catch((error) => {
  //             console.log("error::", error);
  //             return [];
  //           });
  //             // const { data } = await employeeApi.getAgentsByMuId(wfgId, userTenant);
  //             const dataObj = data.map((k) => ({ value: k.login_id, label: k.name }));
  //             setAgents(dataObj);
  //             dataObj && dataObj.length ? setAgentSelected(dataObj[0].value) : setAgentSelected(-1);
  //             // dataObj && dataObj.length ? fetchAgentShifts(dataObj[0].id) : setAgentShiftsJson([]);
  //         } else {
  //             setAgents([])
  //             setAgentSelected(-1)
  //             setAgentShiftsJson([])
  //         }
  //     } catch (error) {
  //         enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
  //     }
  // }

  const _onDragCreateEnd = (event) => {
    const randomId = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id: randomId,
      title: randomId,
      start: event.start,
      end: event.end,
      color: '#A3C7D6',
    };
    setEvents((prev) => [...prev, newEvent]);
  };
  const exampleEvents = [
    {
      id: '1',
      title: 'Event 1',
      start: '2023-01-31 02:00',
      // start: '2023-01-31T02:00:05.313Z',
      end: '2023-01-31T04:00:05.313Z',
      color: '#A3C7D6',
    },
    {
      id: '2',
      title: 'Event 2',
      start: '2023-01-31T05:00:05.313Z',
      end: '2023-01-31T09:00:05.313Z',
      color: '#B1AFFF',
    },
    {
      id: '2',
      title: 'Event 2',
      start: '2023-02-01T03:00:05.313Z',
      end: '2023-02-01T09:00:05.313Z',
      color: '#f5e6cf',
    },
  ];
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };
  
  const handleAction = () => {
    navigation.navigate('schedule')
  };
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventPress = (event) => {
    console.log('event',event[0])
    setSelectedEvent(event);
    setIsVisible(true);
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setIsVisible(false);
  };
  const navigationView = () => (
    <View style={[styles.container]}>
      <CustomLayoutHeader title={'Search'} navigation={navigation} logout={''} />
      {/* <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
      <View style={styles.containerFilterSection}>
  
  
         {/* Date ranges start here */}
        <View style={styles.containerDateTimePicker}>
          <View style={styles.datePickerStartDate}>
            <Text style={styles.text}>Start Date:</Text>
            <Text style={styles.dateText} onPress={() => setShowDatePicker1(true)}>
              {/* {startDate.toDateString()} */}
              {startDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })}
            </Text>
            {showDatePicker1 && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker1(false);
                  setStartDate(selectedDate || startDate);
                }}
              />
            )}
          </View>
          <View style={styles.datePickerEndDate}>
            <Text style={styles.text}>End Date:</Text>
            <Text style={styles.dateText} onPress={() => setShowDatePicker2(true)}>
              {endDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })}
            </Text>
            {showDatePicker2 && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker2(false);
                  setEndDate(selectedDate || endDate);
                }}
              />
            )}
          </View>
        </View>
  
  {/* Workfoce group Start here */}
        {/* <View style={styles.pickerContainer}>
          <Text style={styles.text}>Select  Workforce Group:</Text>
                <DropDownPicker
                  open={open2}
                  value={workGroupSelected}
                  items={WorkGroup}
                  setOpen={setOpen2}
                  // setValue={(value)=>{  setWorkGroupSelected,
                  //   console.log(value)
                  //   console.log('Workforce 1')}
                  // }
                  setItems={setWorkGroup}
                  onSelectItem={(item) => {
                    setWorkGroupSelected(item.value)
                    fetchAgents(item.value)
                    console.log('Workforce',item.value);
                  }}
                  style={{ zIndex: 10, borderColor: '#333' }}
                />
        </View> */}
  
  {/* Agent Start Here */}
        {/* <View style={styles.pickerContainer}>
          <Text style={styles.text}>Select Agent:</Text>
          <DropDownPicker
            open={open1}
            value={agentSelected}
            items={agents}
            setOpen={setOpen1}
            setItems={setAgents}
            // setValue={setAgentSelected}
            onSelectItem={(item) => {
              setAgentSelected(item.value)
              console.log('Agent',item.value);
            }}
            containerStyle={styles.dropdownContainer}
          style={{zIndex: 10}}
          />
        </View>
       */}
  {/* Search Button start here */}
              <View style={styles.containerButtonSearch}>
                  <TouchableOpacity
                    style={styles.buttonSearch}
                    onPress={handleSearch}
                  >
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
                {/* <View style={styles.subContainerButtonSearch}>
                  <TouchableOpacity
                    style={styles.buttonSearch}
                    onPress={handleAction}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View> */}
              </View>

              <View style={{marginTop:30,
        borderTopColor:'grey',
        borderTopWidth:1,
        paddingTop:20}}>
          <Text style={styles.text}>Select  Schedule View Mode:</Text>
          <DropDownPicker
              open={open3}
              value={selectedViewMode}
              items={scheduleViewModeList}
              setOpen={setOpen3}
              setItems={setScheduleViewModeList}
              onSelectItem={(item) => {
                setSelectedViewMode(item.value)
              }}
              style={{ zIndex: -10000 }}
            />
        </View>
  
      </View>
    </View>
  );
  // const renderPopup = () => {
  //   return (
  //     <Modal visible={isVisible} animationType="slide">
  //       <View style={styles.popup}>
  //         <Icon
  //           name="times-circle"
  //           size={30}
  //           color="#900"
  //           onPress={() => setIsVisible(false)}
  //         />
  //         <Text>Shahryar</Text>
  //         {/* <Text>{selectedEvent.title}</Text> */}
  //         {/* <Text>{selectedEvent.description}</Text> */}
  //         {/* Add more event details here */}
  //       </View>
  //     </Modal>
  //   );
  // };
 
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <ScrollView style={{backgroundColor:'white'}}>
      <CustomHeader allowBackButton={true} title={'Schedule'} navigation={navigation} />
        <View style={styles.containerButton}>
          <View style={{width: '60%',
    // height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,}}>
            <Text style={{fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 5,
    fontSize:24
    }}>
      </Text>
           
          </View>
          <View style={{}}>
          {/* <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          /> */}
           <TouchableOpacity onPress={() => drawer.current.openDrawer()} style={{
            //  width: '80%',
            //  height: 40,
            //  padding: 8,
            //  borderRadius: 8,
            //  marginTop: 16,
            //  backgroundColor: '#da291c'
           }}>
            
        <Icon name="filter" size={25} color="#da291c" style={{marginTop:20}} />
      {/* <Text style={{}}>Filter schedule</Text> */}

      </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container1}>
          <TimelineCalendar
            // viewMode="day"
            // viewMode="threeDays"
            viewMode={selectedViewMode}
            events={events}
            allowDragToCreate={true}
            // onDragCreateEnd={_onDragCreateEnd}
            // Optional
            dragCreateInterval={120}
            dragStep={20}
            // events={exampleEvents}
            theme={{
              dragCreateItemBackgroundColor: 'rgba(0, 18, 83, 0.2)',
              dragHourColor: '#001253',
              dragHourBorderColor: '#001253',
              dragHourBackgroundColor: '#FFF',

              todayName: { color: 'green' },
              todayNumber: { color: 'white' },
              todayNumberContainer: { backgroundColor: '#da291c' },
            }}
            onPressEvent={handleEventPress} 
          />
           {/* {renderPopup()} */}
           <ScheduleEventPopup isVisible={isVisible} event={selectedEvent} onClose={handleClose} />
  
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
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
    top: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerButton: {
    marginTop:70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:10,
    marginLeft: 20,
    marginRight: 30,
  },
  container1: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    // position:'relative',
    // left:10,
    // right:10,
    // marginLeft:10,
// marginRight:10
// margin: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // // backgroundColor: '#F5FCFF',
    // backgroundColor: 'white',
  },
  logo: {
    width: '80%',
    height: 100,
    marginBottom: 32,
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
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },


  // filter section styles 
  containerFilterSection: {
    // flex:1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    top:-170,
  },
  containerDateTimePicker: {
    flexDirection: 'row',
    marginBottom: 15,
    zIndex: 1000
  },
  datePickerStartDate: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 5,
  },
  datePickerEndDate: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  text: {
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 5
  },
  dateText: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    // borderColor: '#cccccc',
    borderRadius: 5,
    width: '100%',
    marginTop: 10
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 20,
    width: 100,
    // fontFamily: 'your-custom-font',
    backgroundColor: '#FFC107',
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 2,
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
  containerButtonSearch: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // marginTop:20
  },
  // subContainerButtonSearch:{
  //   // width: '30%',
  //   // flex: 1,
  // },
  buttonSearch: {
    flex: 1,
    width: '80%',
    height: 40,
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#da291c',
    alignItems: 'center',
    justifyContent: 'center',
  },

// model

overlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
containerPopUp: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
},
header: {
  backgroundColor: '#2185d0',
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
title: {
  color: '#fff',
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
date: {
  fontSize: 14,
  color: '#777',
},

});
export default Schedule;

