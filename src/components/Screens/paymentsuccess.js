import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableHighlight, Dimensions, ToastAndroid,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Button } from 'react-native-paper';


export default function PaymentSuccess({ navigation }) {
 

  return (
    <SafeAreaView style={styles.body}>
    <StatusBar 
      translucent
      backgroundColor="#fff"
      barStyle="light-content" 
    />
  <View>
  <View>
  <MaterialCommunityIcons name="checkbox-marked-circle-outline" style={{fontSize:130, alignSelf:'center', marginTop:30, color:'green'}}/>
       <Text style={{fontSize:25, marginTop:10, marginLeft:10,fontWeight:'bold', alignSelf:'center',color:'#000'}}>
            Payment Complete!
        </Text>
        </View>


        <Pressable style={{marginTop:0, borderRadius:5, width:'100%', height:100,backgroundColor:'#fff'}}>
         <Text style={{fontSize:16, marginTop:10, marginLeft:10,fontWeight:'normal', alignSelf:'center',color:'#000'}}>
           Your payment was successful!.
          </Text>
          <Text style={{fontSize:14, marginTop:10, marginLeft:10,fontWeight:'normal', alignSelf:'center',color:'red'}}>
           proceed to Load Meter.
          </Text>
        </Pressable>

    <Pressable style={{alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:50,
    width:200,
    alignSelf:'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00b300',
    marginTop: 20,
    marginBottom:100,
    backgroundColor: '#00b300',}} onPress={()=>navigation.navigate('Home')}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Go to Home</Text>
    </Pressable>
</View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  body: {
    height:Dimensions.get("window").height,
    backgroundColor:'#fff'
    },

});
