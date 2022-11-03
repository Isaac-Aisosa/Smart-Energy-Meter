import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView, Dimensions, Linking,  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function List({ navigation })
 {

  return (
      <View style={styles.container}>
    <ScrollView style={styles.chart}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'center', color:'#3a006e'}}>Design and Construction of a</Text>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'center', marginBottom:10}}>Real Time Energy monitor and logger</Text>
      <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Engr. Stephen Abolaji</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'center',color:'#ff720d'}}>Project Supervisor</Text>
      <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'flex-start', marginTop:20,}}>Group Members:</Text>

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Akpomughri Blessing</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071930248</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Amayanvbo Endurance</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071950624</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Enehiweze Eiloghosa</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071960182</Text>
</View> 


<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Imogirie Oselumese Sylveste</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071960265</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Olatunde Benjamin Eshior</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071950467</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Akpan Emmauel</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071960203</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Akpore Robor</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071940341</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Ezekiel Olaoluwa Steven</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071950815</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Jumbo Godspower Akpesiri</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/207194052</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Okolie Chukwuebuka John</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/207190274</Text>
</View> 

<View style={styles.group}>
      <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'flex-start'}}>Suraj Umoru Faruk</Text>
      <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'flex-start',color:'#ff720d'}}>ENG/2071950689</Text>
</View> 

<Text style={{fontSize:14, fontWeight:'normal', alignSelf:'center',color:'#636362'}}>Developed by:</Text>
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
</View>     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#dfeaf2',
      
      },

      group:{
        width:"90%",
        marginLeft:20,
        marginBottom:20,
        
        },

  chart:{
    width:Dimensions.get("window").width-10,
  marginTop:10,
  height:Dimensions.get("window").height-10,
  },

  logo: {
      width: 150,
      height: 150

  },

  text: {
   
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 4
   
},

preboto: {
  color:'#0f2c40',
  fontSize: 40,
  fontWeight:'bold'
  
},
title: {
  color:'#363636',
  fontSize: 14,
  fontWeight:'bold'
  
},

button: {
  marginBottom:30,
  
  
},

ProgressChart: {
  backgroundColor: '#fff',
  borderRadius: 16,
  position:'relative',
  elevation:1,
  borderWidth:1,
  borderColor:'#0731ed',
  alignItems: 'stretch',
  width:Dimensions.get("window").width-10,
  height: 220,
  alignSelf:'center',
  marginBottom:10
},

commitChart: {
  backgroundColor: '#fff',
  borderRadius: 16,
  position:'relative',
  elevation:1,
  borderWidth:1,
  borderColor:'#0731ed',
  alignItems: 'stretch',
  width:Dimensions.get("window").width-10,
  height: 220,
  alignSelf:'center',
  alignItems:'center'
},

});
