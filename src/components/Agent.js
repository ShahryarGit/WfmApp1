import React, { useState, useEffect } from 'react';
import {authToken} from '../utils/customFunction'
import Axios, { AxiosRequestConfig } from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity
} from 'react-native';


const Agent = ({navigation}) => {
  const [data, setData] = useState([]);

  const authOptions =(token)=>{
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },    
    };
  };
 const optionsToken = authOptions('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwcGlHc2pxak9PenRKUk9hSDFLMlEzSXlUZHU2QUZsMjVwY21GSFRGQzlvIn0.eyJleHAiOjE2NzU4NzY0MzQsImlhdCI6MTY3NTI3MTYzNCwianRpIjoiYWVjMThmNjUtZjQ4OC00M2VkLWFiYjMtZmU2NzY5YzNmNTAxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hazo4NDQzL2F1dGgvcmVhbG1zL21lZ2EiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOWRiZTMzZDEtZmQ1Yy00OWJhLThjMGItOGJjYWNjNjBkZDBhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVnYS11aSIsInNlc3Npb25fc3RhdGUiOiIxZmQ1YjEyZS1iNjk1LTQ5ZDEtYWM3ZC1jZmI3NzhkMzIyZjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWVnYSIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjFmZDViMTJlLWI2OTUtNDlkMS1hYzdkLWNmYjc3OGQzMjJmMiIsInRlbmFudHMiOlsibmFuZG9zIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IndmbSBhZG1pbiIsInByZWZlcnJlZF91c2VybmFtZSI6IndmbS5hZG1pbiIsImdpdmVuX25hbWUiOiJ3Zm0iLCJmYW1pbHlfbmFtZSI6ImFkbWluIiwidGVuYW50IjoibmFuZG9zIiwiZW1haWwiOiJzYW5hLndhaGFiQHRlc3QuY29tIn0.FDKpB_FIGsvEnNrabgyctvpaH9oXGkEwdJu2Zb9eEeJgDwBqXW8JD-D1TcTxKXwz1BGln654FDigGh9ZNQUjGzrkK1Tq6TtVCSLqv7lg5vt0exOSTaZ1MSFBXIWQWRh2ZyzfhvSnXi-YD0IMcRRPXKIeH4stuAWBRmOzgQMiXAQLVss4eVjO83KHwXVs76ZcOlbUUFP1kgIJzYwNFntJ9T47u3WMWrVFazQil3IwEe9Rxamz0QQY4grA5wYBO1wHeqaFW-vWHUDfkv201d-zcQije5smthIJcZPbZ2t2NvZay2fFgUW3V0AcnMZqzLYuZokDuC95pwBRBLxAO2nyHQ');
 

  useEffect(() => {
   
    console.log(authToken)
    console.log('test agent')
    const fetchData = async () => {
        let data = await Axios.get(`http://172.16.16.7:9000/mega/tenants/test/auxwork-reason-code`, authToken)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log("error::", error);
          return [];
        });
        
        console.log('data',data)
      setData(data);
    };

   //  fetchData();
  }, []);

  return (
    <View style={{flex:1,backgroundColor:'red'}}>
   
    <View style={{flex:1,backgroundColor:'yellow'}}>
    {/* <Button 
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button">
  </Button> */}
  <TouchableOpacity>
            <Text style = {{
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
   }}>
               Button
            </Text>
         </TouchableOpacity>
    </View>
   
    <View style={{flex:2,backgroundColor:'green'}}>
    {/* <Button 
  title="Learn More 2"
  color="#841584"
  accessibilityLabel="Learn more about this purple button">
  </Button> */}
  <TouchableOpacity>
            <Text style = {{
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
   }}>
               Button
            </Text>
         </TouchableOpacity>
    </View>
   
    <View style={{flex:3,backgroundColor:'orange',flexDirection:'row',justifyContent:'space-between'}}>
    {/* <Button 
  title="Learn More 3"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
  style={{width:'50%',height:'100px'}}>
  </Button>
  <Button 
  title="Learn More 4"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
  style={{width:'50%'}}>
  </Button> */}
  <TouchableOpacity style = {{
      borderWidth: 1,
      // padding: 25,
      borderColor: 'black',
      backgroundColor: 'red',
      width:'50%'
   }}
   onPress={()=>navigation.navigate('Schedule1')}>
            <Text style = {{
      borderWidth: 1,
      // padding: 25,
      borderColor: 'black',
      backgroundColor: 'red',
      width:100
   }}>
               Schedule screen
            </Text>
         </TouchableOpacity>
         
         <TouchableOpacity style = {{
      borderWidth: 1,
      // padding: 25,
      borderColor: 'black',
      backgroundColor: 'purple',
      width:'50%'
   }}>
            <Text style = {{
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'purple'
   }}>
               Button
            </Text>
         </TouchableOpacity>
    </View>
   
    </View>
    // <Text>shahryar</Text>
  );
};

export default Agent;
