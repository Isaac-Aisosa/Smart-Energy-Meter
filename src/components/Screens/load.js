import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,Pressable, Dimensions, ToastAndroid,Linking, Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Switch, TextInput, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import bg from '../../../assets/bg.jpg'
//import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import bulb_on from '../../../assets/on.png'
import bulb_off from '../../../assets/off.png'

export default function Load({ navigation }) {
  useEffect(() => {
    Get_Load_A_Status();
    Get_Load_B_Status();
    Get_Automated_State();
    Get_Meter_Status();

    const intervalA = setInterval(() => Get_Load_A_Status(), 10000)
    const intervalB = setInterval(() => Get_Load_B_Status(), 10000)
    const intervalC = setInterval(() => Get_Meter_Status(), 10000)
    
    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
      clearInterval(intervalC);
    }


  }, [])

  const [load_A_Status, setLoad_A_Status] = useState('0');
  const [load_B_Status, setLoad_B_Status] = useState('0');

  const [meter_status, setMeter_Status] = useState('0');
  const [max_load, setMax_Load] = useState('0');

  const [loadABillRate, setLoadABillRate] = useState('0');
  const [loadBBillRate, setLoadBBillRate] = useState('0');

  const [loadABillRateSetVal, setLoadABillRateSetVal] = useState('0');
  const [loadBBillRateSetVal, setLoadBBillRateSetVal] = useState('0');
  
  const [loadAEnergyCuttoff, setLoadAEnergyCuttoff] = useState('0');
  const [loadBEnergyCuttoff, setLoadBEnergyCuttoff] = useState('0');

  const [loadAEnergyCuttoffSetVal, setLoadAEnergyCuttoffSetVal] = useState('0');
  const [loadBEnergyCuttoffSetVal, setLoadBEnergyCuttoffSetVal] = useState('0');

  const [loadATimmer, setLoadATimmer] = useState('0');
  const [loadBTimmer, setLoadBTimmer] = useState('0');

  const [loadATimmerSetVal, setLoadATimmerSetVal] = useState('0');
  const [loadBTimmerSetVal, setLoadBTimmerSetVal] = useState('0');


  var LoadAstate = 'OFF';
  var LoadBstate = 'OFF';

  var Meterstate = 'OFF';

  var A_led_state = bulb_off;
  var B_led_state = bulb_off;

  async function Get_Load_A_Status() {
    try{
          await axios.get('http://192.168.4.1/load/A/status', 
         {  
  
         }).then(function (response) {
         console.log(response.status);
         setLoad_A_Status(response.data.status);
         })
        .catch(function (error) {
        console.log(error);
        ToastAndroid.show("failed to get Load A Status", ToastAndroid.SHORT);
        });
       }
   catch(error) {
      console.log(error)
      }
    }

    async function Get_Load_B_Status() {
      try{
            await axios.get('http://192.168.4.1/load/B/status', 
           {  
    
           }).then(function (response) {
           console.log(response.status);
           setLoad_B_Status(response.data.status);
           })
          .catch(function (error) {
          console.log(error);
          ToastAndroid.show("failed to get Load B Status", ToastAndroid.SHORT);
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
             setMeter_Status(response.data.meter_status);
             setMax_Load(response.data.max_load);
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

      async function Get_Automated_State() {
        try{
              await axios.get('http://192.168.4.1/load/automated/state', 
             {  
      
             }).then(function (response) {
             console.log(response.status);
             setLoadABillRateSetVal(response.data.load_A_tarif_control);
             setLoadBBillRateSetVal(response.data.load_B_tarif_control);
             setLoadAEnergyCuttoffSetVal(response.data.load_A_energy_cuttoff);
             setLoadBEnergyCuttoffSetVal(response.data.load_B_energy_cuttoff);
             setLoadATimmerSetVal(response.data.load_A_timmer_control);
             setLoadBTimmerSetVal(response.data.load_B_timmer_control);
             })
            .catch(function (error) {
            console.log(error);
            ToastAndroid.show("failed to get Automated State", ToastAndroid.SHORT);
            });
           }
       catch(error) {
          console.log(error)
          }
        }

   //load A state......................
   if (load_A_Status == 1){

    LoadAstate = "ON";
    A_led_state = bulb_on;
   }
   else{
    LoadAstate = "OFF"
    A_led_state = bulb_off;
   }

   //load B state......................
   if (load_B_Status == 1){

    LoadBstate = "ON"
    B_led_state = bulb_on;

   }
   else{
    LoadBstate = "OFF"
    B_led_state = bulb_off;
   }

      //Meter Status......................
      if (meter_status == 1){

        Meterstate = "ON"
  
       }
       else{
        Meterstate = "OFF"
       }

  function ChangeLoadAState(){ 
       if (load_A_Status == 1){
        ToastAndroid.show("Turning load A OFF", ToastAndroid.SHORT);
        axios.post('http://192.168.4.1/load/A/control', {
          state: 0
        },
        {})
        .then(function (response) {
        console.log(response.status);
        ToastAndroid.show("Load A has been turn OFF", ToastAndroid.SHORT);
        Get_Load_A_Status();
        })
        .catch(function (error) {
          console.log(error);
          //ToastAndroid.show(error, ToastAndroid.SHORT);
        });
        
      }
      else{
        ToastAndroid.show("Turning load A ON", ToastAndroid.SHORT);
        axios.post('http://192.168.4.1/load/A/control', {
          state: 1
        },
        {})
        .then(function (response) {
        console.log(response.status);
        ToastAndroid.show("Load A has been turn ON", ToastAndroid.SHORT);
        Get_Load_A_Status();
        })
        .catch(function (error) {
          console.log(error);
          //ToastAndroid.show(error, ToastAndroid.SHORT);
        });
        
     }

  }

  function ChangeLoadBState(){ 
    if (load_B_Status == 1){
      ToastAndroid.show("Turning load B OFF", ToastAndroid.SHORT);
      axios.post('http://192.168.4.1/load/B/control', {
        state: 0
      },
      {})
      .then(function (response) {
      console.log(response.status);
      ToastAndroid.show("Load B has been turn OFF", ToastAndroid.SHORT);
      Get_Load_B_Status();
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error, ToastAndroid.SHORT);
      });
      
    }
    else{
      ToastAndroid.show("Turning load B ON", ToastAndroid.SHORT);
      axios.post('http://192.168.4.1/load/B/control', {
        state: 1
      },
      {})
      .then(function (response) {
      console.log(response.status);
      ToastAndroid.show("Load B has been turn ON", ToastAndroid.SHORT);
      Get_Load_B_Status();
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error.s, ToastAndroid.SHORT);
      });
     
   }
  }


  function SetLoadABillRate(){
    ToastAndroid.show("Setting load A bill limit " + loadABillRate, ToastAndroid.SHORT);
    axios.post('http://192.168.4.1/load/A/set/bill/rate', {
      rate:loadABillRate
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load A bill limit has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });

   
  }

  function SetLoadBBillRate(){
    ToastAndroid.show("Setting load B bill limit " + loadBBillRate, ToastAndroid.SHORT);

    axios.post('http://192.168.4.1/load/B/set/bill/rate', {
      rate:loadBBillRate
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load B bill limit has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });

    
  }

  function SetLoadAEnergyCuttoff(){
    ToastAndroid.show("Setting load A energy cuttoff " + loadAEnergyCuttoff + " kwh", ToastAndroid.SHORT);

    axios.post('http://192.168.4.1/load/A/set/energy/cutoff', {
      kwh:loadAEnergyCuttoff
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load A energy cuttoff has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });

  }

  function SetLoadBEnergyCuttoff(){
    ToastAndroid.show("Setting load B energy cuttoff " + loadBEnergyCuttoff + " kwh", ToastAndroid.SHORT);
    
    axios.post('http://192.168.4.1/load/B/set/energy/cutoff', {
      kwh:loadBEnergyCuttoff
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load B energy cuttoff has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });
  }

  function SetLoadATimmer(){
    ToastAndroid.show("Setting load A Timmer " + loadATimmer + " minute", ToastAndroid.SHORT);
    
    axios.post('http://192.168.4.1/load/A/set/timmer/control', {
      timmer:loadATimmer
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load A Timmer has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });
  }

  function SetLoadBTimmer(){
    ToastAndroid.show("Setting load B Timmer " + loadBTimmer + " minute", ToastAndroid.SHORT);
    
    axios.post('http://192.168.4.1/load/B/set/timmer/control', {
      timmer:loadBTimmer
    },
    {})
    .then(function (response) {
    console.log(response.status);
    ToastAndroid.show("Load B Timmer has been set", ToastAndroid.SHORT);
    })
    .catch(function (error) {
      console.log(error);
      //ToastAndroid.show(error.s, ToastAndroid.SHORT);
    });
  }



  return (

    <ScrollView style={styles.body}>
    <StatusBar translucent backgroundColor="transparent" style='dark'/> 

    <Text style={{color:'#46464a', marginTop:10, fontSize:20,marginLeft:20,fontWeight:'bold'}}>Manual Load Control</Text>

    <View style={{ width:'90%',
  height: 90,
  marginTop:20,
  backgroundColor:'#46464a',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:18,marginLeft:20,}}> Meter Status: <Text style={{color:'#03a696',fontWeight:'bold'}}>{Meterstate}</Text></Text>
 <Text style={{color:'#fff', marginTop:5, fontSize:18,marginLeft:20,}}> Max. Load: <Text style={{color:'#fff',fontWeight:'bold'}}>{max_load} Watt </Text></Text>
</View>
  
<View style={{flexDirection:'row',alignSelf:'center', height:300}}>

<View style={{ width:'40%',
  height: 250,
  marginTop:10,
  backgroundColor:'#46464a',
  alignSelf:'flex-end',
  borderRadius:10,
  position:'relative',
  margin:10,
  borderBottomRightRadius:0}}>


    <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (A)</Text>

    <Text style={{color:'#fff', marginTop:5, marginLeft:20, fontSize:20, fontWeight:'bold'}}>Status:{LoadAstate}</Text>

   <Pressable onPress={ChangeLoadAState}>
   <Image style={{width:70,height:80,alignSelf:'center', marginTop:30,}}source={A_led_state}  />
   </Pressable>
    

    <Text style={{color:'#fff', marginTop:20, marginLeft:20, fontSize:12}}>Tap to change State</Text>

</View>

<View style={{ width:'40%',
   height: 250,
  marginTop:10,
  backgroundColor:'#03a696',
  alignSelf:'flex-end',
  borderRadius:10,
  margin:10,
  position:'relative',
  borderBottomLeftRadius:0,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (B)</Text>
<Text style={{color:'#fff', marginTop:5, marginLeft:20, fontSize:20,fontWeight:'bold'}}>Status:{LoadBstate}</Text>
<Pressable onPress={ChangeLoadBState}>
<Image style={{width:70,height:80,alignSelf:'center', marginTop:30,}}source={B_led_state}  />
</Pressable>
<Text style={{color:'#fff', marginTop:20, marginLeft:20, fontSize:12}}>Tap to change State</Text>

</View>

</View>



<Text style={{color:'#46464a', marginTop:20, fontSize:20,marginLeft:20,fontWeight:'bold'}}>Automated Load Control</Text>

{/* ........................Respond to Billing Rate................................ */}

<View style={{width:'90%',height:440,borderColor:'#03a696',borderWidth:2, borderRadius:10, alignSelf:'center', margin:10}}>
<Text style={{color:'#46464a', marginTop:10, fontSize:14,marginLeft:20,fontWeight:'bold'}}>Respond to Billing Rate</Text>
<Text style={{color:'#46464a', marginTop:0, fontSize:12,marginLeft:20,}}>When billing rate is above x rate off load A or load B </Text>


<View style={{ width:'90%',
  height: 150,
  marginTop:20,
  backgroundColor:'#46464a',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (A)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load A when bill rate is at ?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadABillRateSetVal}₦/kw</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="₦/kw"
             placeholder='0'
             activeOutlineColor='#03a696'
             name='tariff'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadABillRate(val)}
             
             />

<Button mode="contained" onPress={SetLoadABillRate} color='#03a696' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>
</View>

<View style={{ 
   width:'90%',
   height: 150,
  marginTop:10,
  backgroundColor:'#03a696',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (B)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load B when bill rate is at ?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadBBillRateSetVal}₦/kw</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="₦/kw"
             placeholder= '0'
             activeOutlineColor='#46464a'
             name='Amount'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadBBillRate(val)}
             
             />

<Button mode="contained" onPress={SetLoadBBillRate} color='#46464a' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>

</View>
</View>

{/* ......................................Respond to Avaliable Energy........................................ */}
<View style={{width:'90%',height:440,borderColor:'#46464a',borderWidth:2, borderRadius:10, alignSelf:'center', margin:10}}>
<Text style={{color:'#46464a', marginTop:10, fontSize:14,marginLeft:20,fontWeight:'bold'}}>Respond to Avaliable Energy</Text>
<Text style={{color:'#46464a', marginTop:0, fontSize:12,marginLeft:20,}}>When avalible energy is below X kwh off load A or Load B</Text>



<View style={{ width:'90%',
  height: 150,
  marginTop:20,
  backgroundColor:'#46464a',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (A)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load A when Avaliable Energy is at ?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadAEnergyCuttoffSetVal}kwh</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="KWh"
             placeholder= '0'
             activeOutlineColor='#03a696'
             name='Cuttoff'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadAEnergyCuttoff(val)}
             
             />

<Button mode="contained" onPress={SetLoadAEnergyCuttoff} color='#03a696' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>
</View>

<View style={{ 
   width:'90%',
   height: 150,
  marginTop:10,
  backgroundColor:'#03a696',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (B)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load B when Avaliable Energy is at ?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadBEnergyCuttoffSetVal}kwh</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="KWh"
             placeholder='0'
             activeOutlineColor='#46464a'
             name='Cuttoff'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadBEnergyCuttoff(val)}
             
             />

<Button mode="contained" onPress={SetLoadBEnergyCuttoff} color='#46464a' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>

</View>

</View>



{/* ......................................Respond to Timmer...................................... */}
<View style={{width:'90%',height:400,borderColor:'#03a696',borderWidth:2, borderRadius:10, alignSelf:'center', margin:10, marginBottom:40}}>
<Text style={{color:'#46464a', marginTop:10, fontSize:14,marginLeft:20,fontWeight:'bold'}}>Respond to Timmer</Text>
<Text style={{color:'#46464a', marginTop:0, fontSize:12,marginLeft:20,}}>When Set Time at which Load A or B schould be ON</Text>


<View style={{ width:'90%',
  height: 150,
  marginTop:20,
  backgroundColor:'#46464a',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (A)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load A after?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadATimmerSetVal}min</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="Minute"
             placeholder='0'
             activeOutlineColor='#03a696'
             name='time'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadATimmer(val)}
             
             />

<Button mode="contained" onPress={SetLoadATimmer} color='#03a696' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>
</View>

<View style={{ 
   width:'90%',
   height: 150,
  marginTop:10,
  backgroundColor:'#03a696',
  borderRadius:10,
  alignSelf:'center',
  position:'relative',
  margin:10,
  }}>
 <Text style={{color:'#fff', marginTop:10, fontSize:20, alignSelf:'center', fontWeight:'bold'}}>Load (B)</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Switch off Load B after?</Text>
 <Text style={{color:'#fff', marginTop:0, fontSize:12,marginLeft:20,}}> Set at: {loadBTimmerSetVal}min</Text>
 <View style={{flexDirection:'row' }}>
            <TextInput
             mode="outlined"
             label="Minute"
             placeholder='0'
             activeOutlineColor='#46464a'
             name='time'
             keyboardType='numeric'
             style={{backgroundColor:'#fff', fontSize:14, margin:10,marginLeft:20, height:50, width:120, borderColor:'red'}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setLoadBTimmer(val)}
             
             />

<Button mode="contained" onPress={SetLoadBTimmer} color='#46464a' style={{height:40,margin:10,marginTop:20}}>
    Set
  </Button>
 </View>

</View>
</View>

</ScrollView>

);
}

const styles = StyleSheet.create({

body: {
marginTop:30,
height:'auto',
backgroundColor:'#fff'
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
