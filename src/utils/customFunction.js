
import moment from "moment";
import 'moment-timezone';
import tz from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const backGroundOpacity='2e';

export const authToken =(token)=>{
    return {
      headers: {
        Authorization: `Bearer ${token}`,
       },    
    };
  };

  export const setAsyncStorageValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  export const getAsyncStorageValue = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key)
      if (data !== null) {
        console.log(data);
        return data;
      }
      // return await AsyncStorage.getItem(key).then((response) => {return response});
    } catch (error) {
      console.log(error);
    }
  };

  export const tConv24to12hoursFormat =(time24)=>{
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    let hour = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = hour + ts.substr(2, 3) + ampm;
    return ts;
  };
  
  // export const convertShmDtToUserTz = (date,userTimeZone ,shmTimeZone  ,format='YYYY-MM-DD')=>{
  //   if(typeof date == 'string' || date instanceof String){
  //     return moment.tz(date.replace('Z',''),shmTimeZone).tz(userTimeZone).format(format);  
  //   }
  //   return moment.tz(date,shmTimeZone).tz(userTimeZone).format(format);
  // }

  export const convertShmDtToUserTz = (date,userTimeZone,format='YYYY-MM-DD')=>{
    if(typeof date == 'string' || date instanceof String){
      return moment.tz(date.replace('Z',''),'UTC').tz(userTimeZone).format(format);  
    }
    return moment.tz(date,'UTC').tz(userTimeZone).format(format);
  }

  export const addUserTimeZone = (date ,userTimeZone,format='')=>{
    const dateOriginal = moment.parseZone(date).format('YYYY-MM-DD HH:mm:ss');
    return format ?  moment.tz(dateOriginal,userTimeZone).format(format) : moment.tz(dateOriginal,userTimeZone).format(); 
    // return format ?  moment.tz(date,userTimeZone).format() : moment.tz(date,userTimeZone).format(format);  
  }
  export const getFirstandLastDate = (date) => {
    const timeStamp = new Date(date).getTime();
    const yesterdayTimeStamp = timeStamp - 24 * 60 * 60 * 1000;
    var curr = new Date(yesterdayTimeStamp); // get current date

    // +1 if becuase we considering week monday to tuesday
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    return [new Date(firstday.setHours(0, 0, 0, 0)), new Date(lastday.setHours(0, 0, 0, 0))];
}
