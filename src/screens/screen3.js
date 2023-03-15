import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
const FilterSection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState('Agent 1');
  const [selectedValue2, setSelectedValue2] = useState('wfg 1');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [items1, setItems1] = useState([
    { label: "Agent 1", value: "Agent 1" },
    { label: "Agent 2", value: "Agent 2" },
    { label: "Agent 3", value: "Agent 3" },
    { label: "Agent 4", value: "Agent 4" },
    { label: "Agent 5", value: "Agent 5" },
  ]);
  const [items2, setItems2] = useState([
    { label: "wfg 1", value: "wfg 1" },
    { label: "wfg 2", value: "wfg 2" },
    { label: "wfg 3", value: "wfg 3" },
  ]);

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

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
  //     } catch (error) {
  //         enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
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
  //             const { data } = await workforceGroupApi.findWFGbyTenant(userTenant);
  //             setWorkGroup(data);
  //             // inserting -1 in workGroupSelected means res is taken from api but there are no wfgs present
  //             data && data.length ? setWorkGroupSelected(data[0].id) : setWorkGroupSelected(-1);
  //             data && data.length && fetchAgents(data[0].id);
  //         }
  //     } catch (error) {
  //         enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
  //     }
  // };

  // const fetchAgents = async (wfgId) => {
  //     try {
  //         if (wfgId) {
  //             const { data } = await employeeApi.getAgentsByMuId(wfgId, userTenant);
  //             const dataObj = data.map((k) => ({ id: k.login_id, name: k.name }));
  //             setAgents(dataObj);
  //             dataObj && dataObj.length ? setAgentSelected(dataObj[0].id) : setAgentSelected(-1);
  //             dataObj && dataObj.length ? fetchAgentShifts(dataObj[0].id) : setAgentShiftsJson([]);
  //         } else {
  //             setAgents([])
  //             setAgentSelected(-1)
  //             setAgentShiftsJson([])
  //         }
  //     } catch (error) {
  //         enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
  //     }
  // }

  const handleAction = () => {
    navigation.navigate('schedule')
  };
  return (

    // Date ranges start here
    <View style={styles.containerFilterSection}>
      
      <View style={styles.containerDateTimePicker}>
        <View style={styles.datePickerStartDate}>
          <Text style={styles.text}>Start Date:</Text>
          <Text style={styles.dateText} onPress={() => setShowDatePicker1(true)}>
            {startDate.toDateString()}
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
            {endDate.toDateString()}
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
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Select  Workforce Group:</Text>
        <DropDownPicker
          open={open2}
          value={selectedValue2}
          items={items2}
          setOpen={setOpen2}
          onChangeValue={(value) => {
            console.log(value);
            setSelectedValue2(value)
          }}
          style={{ zIndex: 10, borderColor: '#333' }}
        // setValue={setSelectedValue2}
        // setItems={setItems2}
        />
      </View>

{/* Agent Start Here */}
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Select Agent:</Text>
        <DropDownPicker
          open={open1}
          value={selectedValue1}
          items={items1}
          setOpen={setOpen1}
          setValue={setSelectedValue1}
          setItems={setItems1}
          containerStyle={styles.dropdownContainer}
        // style={{zIndex: 10}}
        />
      </View>
    
{/* Search Button start here */}
      <View style={styles.containerButtonSearch}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => drawer.current.closeDrawer()}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  
  containerFilterSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  containerDateTimePicker: {
    flexDirection: 'row',
    marginBottom: 15
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
});

export default FilterSection;
