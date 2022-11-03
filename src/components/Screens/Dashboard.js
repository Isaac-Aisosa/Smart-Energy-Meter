import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableHighlight, Dimensions, ToastAndroid,Linking, ImageBackground,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import bg from '../../../assets/bg.jpg'
//import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function NewsFeed({ navigation }) {
  useEffect(() => {
    GetData();
    const interval = setInterval(() => GetData(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  const [voltage, setVoltage] = useState('0');
  const [current, setCurrent] = useState('0');
  const [power, setPower] = useState('0');
  const [energy, setEnergy] = useState('0');
  const [freq, setFreq] = useState('0');
  const [avalibleEnergy, setAvaliableEnergy] = useState('0');
  const [billRate, setBillRate] = useState('0');

  async function GetData() {
    try{
          await axios.get('http://192.168.4.1/RT/data/', 
         {  
  
         }).then(function (response) {
         console.log(response.status);
         setVoltage(response.data.voltage);
         setCurrent(response.data.current);
         setPower(response.data.power);
         setEnergy(response.data.energy);
         setFreq(response.data.freq);
         setAvaliableEnergy(response.data.EnergyUnit);
         setBillRate(response.data.BillRate);
         })
        .catch(function (error) {
        console.log(error);
        ToastAndroid.show("failed to get update", ToastAndroid.SHORT);
        });
       }
   catch(error) {
      console.log(error)
      }
    }




  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style='dark'/> 
    <View style={styles.header}>

    <LinearGradient colors={['#03a696', '#03a696', '#03a696']} style={styles.EnergyStatus}>

    <Text style={{fontSize:12, color:'#fff', alignSelf:'flex-start', marginLeft:20,marginTop:10}}>
        Energy Consumtion
      </Text>

      <Text style={{fontSize:50, color:'#fff', alignSelf:'center', marginTop:0, fontWeight:'bold'}}>
        {energy}<Text style={{fontSize:20, color:'#fff', fontWeight:'bold'}}>KWh</Text>
      </Text>
    

     </LinearGradient>

<LinearGradient colors={['#46464a', '#46464a', '#46464a']} style={styles.EnergyStatus2}>

  <View style={styles.meterStatus}>
    <Text style={{fontSize:14, color:'#de7104', alignSelf:'center', marginTop:5,}}>
     Tariff
    </Text>

    <Text style={{fontSize:20, color:'#522a02', alignSelf:'center', marginTop:5,fontWeight:'bold'}}>
    ₦{billRate}/1kwh
    </Text>

  </View>

<Text style={{fontSize:12, color:'#fff', alignSelf:'flex-start', marginLeft:20,marginTop:40}}>
    Energy Unit
  </Text>

  <Text style={{fontSize:50, color:'#fff', alignSelf:'center', marginTop:40, fontWeight:'bold'}}>
    {avalibleEnergy}<Text style={{fontSize:20, color:'#fff', fontWeight:'bold'}}>Wh</Text>
  </Text>
  <Text style={{fontSize:20, color:'#fff', alignSelf:'center', marginTop:0, fontWeight:'bold'}}>
     ₦{avalibleEnergy/1000 * billRate}
  </Text>

 </LinearGradient>
<View style={{flexDirection:'row',alignSelf:'center'}}>

<View style={{ width:'40%',
  height:80,
  marginTop:20,
  backgroundColor:'#46464a',
  alignSelf:'flex-end',
  borderRadius:10,
  position:'relative',
  margin:10,
  borderBottomRightRadius:0}}>

    <Text style={{color:'#fff', marginTop:5, marginLeft:20, fontSize:14}}>power</Text>

    <Text style={{color:'#fff', marginTop:5, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>{power}Watt</Text>

</View>

<View style={{ width:'40%',
  height:80,
  marginTop:20,
  backgroundColor:'#03a696',
  alignSelf:'flex-end',
  borderRadius:10,
  margin:10,
  position:'relative',
  borderBottomLeftRadius:0,
  }}>
  <Text style={{color:'#fff',marginTop:5, marginLeft:20, fontSize:14}}>voltage</Text>
  <Text style={{color:'#fff', marginTop:5, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>{voltage}Volt</Text>
</View>

</View>

<View style={{flexDirection:'row',alignSelf:'center'}}>

<View style={{ width:'40%',
  height:80,
  marginTop:20,
  backgroundColor:'#03a696',
  alignSelf:'flex-end',
  borderRadius:10,
  position:'relative',
  margin:10,
  borderTopRightRadius:0,
  borderBottomLeftRadius:10}}>

    <Text style={{color:'#fff',marginTop:5, marginLeft:20, fontSize:14}}>current</Text>
    <Text style={{color:'#fff', marginTop:5, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>{current}Amps</Text>

</View>

<View style={{ width:'40%',
  height:80,
  marginTop:20,
  backgroundColor:'#46464a',
  alignSelf:'flex-end',
  borderRadius:10,
  margin:10,
  position:'relative',
  borderTopLeftRadius:0,
  borderBottomLeftRadius:10}}>
  <Text style={{color:'#fff',marginTop:5, marginLeft:20, fontSize:14}}>Frequency</Text>
  <Text style={{color:'#fff', marginTop:5, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>{freq}Hz</Text>
</View>

</View>
 </View>

</View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff'
  },
header: {
marginTop:30,
height:'100%'
},


meterStatus: {
  width:'40%',
  height:70,
  marginTop:20,
  backgroundColor:'#fff',
  alignSelf:'flex-end',
  borderTopLeftRadius:10,
  position:'absolute',
  borderBottomLeftRadius:10
},

EnergyStatus: {
  width:'95%',
  height:150,
  marginTop:20,
  backgroundColor:'#03a696',
  alignSelf:'center',
  borderRadius:10,
},

EnergyStatus2: {
  width:'95%',
  height:250,
  marginTop:20,
  backgroundColor:'#00d9c3',
  alignSelf:'center',
  borderRadius:10,
},




});
