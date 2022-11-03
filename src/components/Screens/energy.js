import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableHighlight, Dimensions, ToastAndroid,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Button } from 'react-native-paper';
import BuyEnergy from './buyEnergy';


export default function Web({ navigation }) {
 
  useEffect(() => {
    loadCredit()
    const interval = setInterval(() =>  loadCredit(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  const [tariff, setTariff] = useState('0');
  const [amount, setAmount] = useState('0');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('0');
  const [creditCode, setCreditCode] = useState('');
  const [is_used, setUsed] = useState('');


function loadCredit(){
  AsyncStorage.getItem('creditAmount')
  .then((value) => {
  const data = JSON.parse(value);
  setAmount(data)
  });

  AsyncStorage.getItem('creditUnit')
  .then((value) => {
  const data = JSON.parse(value);
  setUnit(data)
  });

  AsyncStorage.getItem('creditCode')
  .then((value) => {
  const data = JSON.parse(value);
  setCreditCode(data)
  });

  AsyncStorage.getItem('creditMeterNumber')
  .then((value) => {
  const data = JSON.parse(value);
  setNumber(data)
  });

  AsyncStorage.getItem('creditName')
  .then((value) => {
  const data = JSON.parse(value);
  setName(data)
  });

  AsyncStorage.getItem('creditTariff')
  .then((value) => {
  const data = JSON.parse(value);
  setTariff(data)
  });

  AsyncStorage.getItem('is_used')
  .then((value) => {
  const data = JSON.parse(value);
  setUsed(data)
  });
}

var loadMeter = 'none';


if (is_used == 'true'){
loadMeter = 'none';
AsyncStorage.setItem('creditCode', JSON.stringify('Has been Used!'));
}
else if (is_used == 'false'){
  loadMeter = 'flex'; 
  AsyncStorage.setItem('creditCode', JSON.stringify(creditCode));
}


function RechargeMeter(){
  ToastAndroid.show("Recharging Meter....", ToastAndroid.SHORT);  
  axios.post('http://192.168.4.1/recharge/meter', {
    amount: amount,
    unit: unit,
    creditCode : creditCode,
    meterNumber : number,
    name : name,
    tariff:tariff
  },
  {})
  .then(function (response) {
  console.log(response.status);
  ToastAndroid.show("Recharge Succssful!", ToastAndroid.SHORT);
  AsyncStorage.setItem('is_used', JSON.stringify("true"));
  })
  .catch(function (error) {
    console.log(error);
    //ToastAndroid.show(error.s, ToastAndroid.SHORT);
  });

}

  return (
    <SafeAreaView style={styles.body}>
    <StatusBar 
      translucent
      backgroundColor="#fff"
      barStyle="light-content" 
    />
<ScrollView>

{/* ......................................Respond to Timmer...................................... */}
<View style={{width:'90%',height:500,borderColor:'#03a696',borderWidth:2, borderRadius:10, alignSelf:'center', margin:10, marginTop:40}}>
<Text style={{color:'#46464a', marginTop:10, fontSize:14,marginLeft:20,fontWeight:'bold,',fontSize:20}}>
<MaterialCommunityIcons name="cash" style={{fontSize:20,color:'#03a696'}}/>
  Energy Credit</Text>

<View style={{ 
   width:'95%',
   height: 350,
  marginTop:10,
  backgroundColor:'#03a696',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  marginTop:20,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Recharge code</Text>

 <Text style={{color:'#46464a', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold', letterSpacing:10}}>{creditCode}</Text>

 <Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Energy Tariff</Text>

<Text style={{color:'#fff', marginTop:0, fontSize:18, fontWeight:'bold', marginLeft:20, letterSpacing:3}}> ₦{tariff}/1kw</Text>

<Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Energy Amount</Text>

<Text style={{color:'#fff', marginTop:0, fontSize:18, fontWeight:'bold', marginLeft:20, letterSpacing:2}}>₦{amount}</Text>

<Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Energy Unit</Text>
<Text style={{color:'#fff', marginTop:0, fontSize:18, fontWeight:'bold', marginLeft:20, letterSpacing:3}}>{unit}KWh</Text>

<Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Meter Number</Text>
<Text style={{color:'#fff', marginTop:0, fontSize:18, fontWeight:'bold', marginLeft:20, letterSpacing:5}}>{number}</Text>

<Text style={{color:'#fff', marginTop:10, fontSize:12,marginLeft:20,}}>Puchased By</Text>
<Text style={{color:'#fff', marginTop:0, fontSize:18, fontWeight:'bold', marginLeft:20, letterSpacing:2}}>{name}</Text>

</View>

<Button mode="contained" icon='file-send-outline' act onPress={RechargeMeter} color='#03a696' 
style={{height:40,margin:10,marginTop:20,marginBottom:10, width:'80%',alignSelf:'center', display:loadMeter}}>
    Load to Meter
  </Button>

</View>

<Button mode="contained" icon='transmission-tower' onPress={()=>navigation.navigate('BuyEnergy')} color='#03a696' 
style={{height:40,margin:10,marginTop:20,marginBottom:30, width:'80%',alignSelf:'center',}}>
    Buy Energy
  </Button>

  </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  body: {
    marginTop:10,
    height:Dimensions.get("window").height,
    backgroundColor:'#fff'
    },

});
