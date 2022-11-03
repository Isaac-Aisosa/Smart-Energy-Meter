import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableHighlight, Dimensions, ToastAndroid,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Button,TextInput } from 'react-native-paper';

import pay from '../../../assets/enPay.png'

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, onValue,set } from "firebase/database";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAThgvytadvWISNOMDL7yPtjf9QTGe-WUs",
  authDomain: "smart-energy-meter-1207a.firebaseapp.com",
  databaseURL: "https://smart-energy-meter-1207a-default-rtdb.firebaseio.com",
  projectId: "smart-energy-meter-1207a",
  storageBucket: "smart-energy-meter-1207a.appspot.com",
  messagingSenderId: "1084813156816",
  appId: "1:1084813156816:web:7426d090a21729085299d5",
  measurementId: "G-1W4S736QR1"
  

};
initializeApp(firebaseConfig);

export default function BuyEnergy({ navigation }) {


  useEffect(() => {
    GetTariff()
    const interval = setInterval(() =>   GetTariff(), 249187)
    return () => {
      clearInterval(interval);
    }
  }, [])

  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
 
  const [tariff, setTariff] = useState('0');
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  function GetTariff(){
    const db = getDatabase();
    const tarrifRate = ref(db, 'tariff');
    onValue(tarrifRate , (snapshot) => {
      const data = snapshot.val();
      // console.log('tarrifRate :' );
      // console.log(data.rate);
      setTariff(data.rate)
    });
  
  }

//formular
// amount divided by tariff
  var unit = amount/tariff;
  var creditCode = 0;
  
function makePayment(){

  if (amount < tariff){
    ToastAndroid.show("Puchased Amount is below minimum!", ToastAndroid.SHORT);
  }
  else if(amount == '' || number.length < 8 || name == ''){
    ToastAndroid.show("Form is Incomplete!..pls complete the form", ToastAndroid.SHORT);

  }

  else{
    ToastAndroid.show("Making Payments....pls wait", ToastAndroid.SHORT);
//generate unqiue code credit code.....................................................
    creditCode =  randomString(12, '0123456789');
    console.log(creditCode)
    const db = getDatabase();
      set(ref(db, 'BuyEnergy/'+creditCode), {
        amount: amount,
        unit: unit,
        creditCode : creditCode,
        meterNumber : number,
        name : name,
        tariff:tariff
      })
      AsyncStorage.setItem('creditAmount', JSON.stringify(amount));
      AsyncStorage.setItem('creditUnit', JSON.stringify(unit));
      AsyncStorage.setItem('creditCode', JSON.stringify(creditCode));
      AsyncStorage.setItem('creditMeterNumber', JSON.stringify(number));
      AsyncStorage.setItem('creditName', JSON.stringify(name));
      AsyncStorage.setItem('creditTariff', JSON.stringify(tariff));
      AsyncStorage.setItem('is_used', JSON.stringify("false"));
      navigation.navigate('PaymentSuccess')
  }
}
  return (
    <SafeAreaView style={styles.body}>
    <StatusBar 
      translucent
      backgroundColor="#fff"
      barStyle="light-content" 
    />
<ScrollView>
<View style={styles.meterStatus}>
    <Text style={{fontSize:14, color:'#fff', alignSelf:'center', marginTop:5,}}>
      Tariff
    </Text>

    <Text style={{fontSize:20, color:'#fff', alignSelf:'center', marginTop:5,fontWeight:'bold'}}>
    ₦{tariff}/1kwh
    </Text>

  </View>
 <Text style={{color:'#000', marginTop:0, fontSize:20,marginLeft:20, fontWeight:'bold'}}>Amount(NGN)</Text>
<TextInput
             mode="outlined"
             label="NGN"
             placeholder='Amount in NGN'
             activeOutlineColor='#03a696'
             name='Amount'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:'90%', borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setAmount(val)}
             
             />

<Text style={{color:'#000', marginTop:20, fontSize:20,marginLeft:20, fontWeight:'bold'}}>Estimated Unit(KWh)</Text>
<View style={{width:'90%',height:50,borderColor:'#03a696',borderWidth:1, borderRadius:5, alignSelf:'center', margin:10}}>
<Text style={{color:'#000', marginTop:15, fontSize:14,marginLeft:20, fontWeight:'normal'}}>{unit}</Text>
</View>

<Text style={{color:'#000', marginTop:0, fontSize:20,marginLeft:20, fontWeight:'bold'}}>Meter Number</Text>
<TextInput
             mode="outlined"
             label="MeterNumber"
             placeholder='8 digit number'
             activeOutlineColor='#03a696'
             name='MeterNumber'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:'90%', borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setNumber(val)}
             
             />

<Text style={{color:'#000', marginTop:0, fontSize:20,marginLeft:20, fontWeight:'bold'}}>Your Name</Text>
<TextInput
             mode="outlined"
             label="Name"
             placeholder='Your name'
             activeOutlineColor='#03a696'
             name='name'
             keyboardType='default'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:'90%', borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setName(val)}
             
             />           

<Button mode="contained" icon='transmission-tower' onPress={makePayment} color='#03a696' 
style={{height:50,margin:10,marginTop:30,marginBottom:10, width:'80%',alignSelf:'center',}}>
    Make Payment
  </Button>

  <Image style={{width:155,height:200,alignSelf:'center', marginBottom:100,}}source={pay}   />
  </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  body: {
    marginTop:0,
    height:Dimensions.get("window").height,
    backgroundColor:'#fff'
    },

    
meterStatus: {
    width:'50%',
    height:70,
    marginTop:0,
    backgroundColor:'#46464a',
    alignSelf:'flex-end',
    borderTopLeftRadius:20,
    position:'relative',
    borderBottomLeftRadius:20
  },

});
