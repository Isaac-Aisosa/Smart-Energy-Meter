import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ScrollView, ToastAndroid,Pressable ,Linking,} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, RadioButton } from 'react-native-paper';
import { Button } from 'react-native-paper';
import axios from 'axios';

const Settings = () => {
  useEffect(() => {
    Get_Meter_Status();
    const interval = setInterval(() =>  GetWiffiCredentials(), 10000)
    const interval2 = setInterval(() =>  Get_Meter_Status(), 10000)
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    }
  }, [])


  const [ssid, setssid] = useState('0');
  const [password, setpassword] = useState('0');

  const [meter_number, setMeterNumber] = useState('');

  const [Getssid, setGetssid] = useState('.....');
  const [Getpassword, setGetpassword] = useState('.....');

 function SetCredentials(){
  ToastAndroid.show("Saving Wiffi Credential", ToastAndroid.SHORT);
  axios.post('http://192.168.4.1/set/wiffi/credentials', {
    ssid: ssid,
    password: password
  },
  {})
  .then(function (response) {
  console.log(response.status);
  ToastAndroid.show("Wiffi Credentials Seved!", ToastAndroid.SHORT);
  GetWiffiCredentials();
  })
  .catch(function (error) {
    console.log(error);
    //ToastAndroid.show(error, ToastAndroid.SHORT);
  });

  }

  async function GetWiffiCredentials() {
    try{
          await axios.get('http://192.168.4.1/get/wiffi/credentials', 
         {  
  
         }).then(function (response) {
         console.log(response.status);
         setGetssid(response.data.ssid);
         setGetpassword(response.data.password);
         })
        .catch(function (error) {
        console.log(error);
        ToastAndroid.show("failed to get Wiffi Credentials", ToastAndroid.SHORT);
        });
       }
   catch(error) {
      console.log(error)
      }
    }

    async function Get_Meter_Status() {
      try{
            await axios.get('http://192.168.4.1/meter/status', 
           {  
    
           }).then(function (response) {
           console.log(response.status);
           setMeterNumber(response.data.meter_number);
           })
          .catch(function (error) {
          console.log(error);
          ToastAndroid.show("failed to get Meter Status", ToastAndroid.SHORT);
          });
         }
     catch(error) {
        console.log(error)
        }
      }

    function RestartMeter(){
      ToastAndroid.show("Restarting Meter....", ToastAndroid.SHORT);
      axios.post('http://192.168.4.1/restart/meter', {

      },
      {})
      .then(function (response) {
      console.log(response.status);
      ToastAndroid.show("Meter Restart", ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error, ToastAndroid.SHORT);
      });
    
      }


  return (

    <SafeAreaView>
    <ScrollView>

    <View style={{ marginTop:50}} >
    <Text style={styles.text}>
      About App
      </Text>
    </View>

    <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'center', color:'#000'}}>Client App for Smart Energy Meter</Text>
    <Text style={{fontSize:14, fontWeight:'normal', alignSelf:'center',color:'#636362', marginTop:5}}>Project by:</Text>
      <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center',color:'#636362'}}>Eng. Abolaji Osagie</Text>


 <View style={{width:'90%',height:440,borderColor:'#03a696',borderWidth:2, borderRadius:10, alignSelf:'center', margin:10}}>
<Text style={{color:'#46464a', marginTop:10, fontSize:14,marginLeft:20,fontWeight:'bold'}}>Wiffi Credentials</Text>
<Text style={{color:'#46464a', marginTop:0, fontSize:14,marginLeft:20,}}>Set SSID:{Getssid}  </Text>
<Text style={{color:'#46464a', marginTop:0, fontSize:14,marginLeft:20,}}>Set Password:{Getpassword}  </Text>

<View style={{ width:'90%',
  height: 300,
  marginTop:20,
  backgroundColor:'#46464a',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Set Wiffi</Text>
 <View>
            <TextInput
             mode="outlined"
             label="SSID"
             placeholder='0'
             activeOutlineColor='#03a696'
             name='ssid'
             keyboardType='default'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:200, alignSelf:'center'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setssid(val)}
             
             />

           <TextInput
             mode="outlined"
             label="PASSWORD"
             placeholder='0'
             activeOutlineColor='#03a696'
             name='password'
             keyboardType= 'default'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:200,alignSelf:'center'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setpassword(val)}
             
             />

<Button mode="contained" onPress={SetCredentials} color='#03a696' style={{height:40,margin:10,marginTop:20, width:150, alignSelf:'center'}}>
    Save
  </Button>
 </View>
</View>
<Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center',color:'#03a696', marginTop:0}}>{meter_number}</Text>
</View>

  <Button mode="contained" onPress={RestartMeter} color='#03a696' style={{height:40,margin:10,marginBottom:20, width:220, alignSelf:'center'}}>
    Restart Meter
  </Button>


  <Text style={{fontSize:14, fontWeight:'normal', alignSelf:'center',color:'#636362', marginTop:20}}>Developed by:</Text>
<Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center'}}>AVG Technologies</Text>
<Text style={{fontSize:14, fontWeight:'normal', alignSelf:'center', color:'#ff720d', letterSpacing:7, marginBottom:10}}>Africa Valued Giants</Text>


  <Text
onPress={() => Linking.openURL('tel:+2349039614057')}
 style={{fontSize:25, color:'#fff',backgroundColor:'#ff720d',
  fontWeight:'bold',marginTop:5, borderTopLeftRadius: 10,borderBottomLeftRadius: 10,
  marginLeft:100, }}> Call </Text>
<Text style={{fontSize:20, color:'#000', fontWeight:'bold',marginTop:10, marginLeft:15, }}>+2349039614057,+2348100309507</Text>
<Text
onPress={() => Linking.openURL('https://avgtechnology.github.io/AVGTech/')}
 style={{fontSize:14, color:'orange', fontWeight:'bold',marginTop:10, marginLeft:15,marginBottom:20 }}>Website: https://avgtechnology.github.io/AVGTech/</Text>


    </ScrollView>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    width: 250,
    borderWidth: 2,
    padding: 10,
    alignSelf:'center',
    fontSize:20
  },

  div: {
    width: 330,
    margin: 10,
    height: 500,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomColor: 'skyblue',
    borderBottomWidth: 20,
    borderRadius:20,
    elevation: 3,
    
  },

  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 8,
    alignSelf:'center',
    
  },

  intext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 10,
    alignSelf:'center',
    
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3a006e',
    width:200,
    marginBottom:10,
    marginTop:10,
  },

  icon: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 0,
       
  },

  intx: {
    flexDirection:'row',
    fontSize: 5,
    fontWeight: 'normal',
       
  },
  textcontainer:{
    width:'80%',
    alignContent:'center',
    alignSelf:'center',
  },
});

export default Settings;