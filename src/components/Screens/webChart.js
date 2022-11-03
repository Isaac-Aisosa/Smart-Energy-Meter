import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LineChart } from "react-native-chart-kit";
import { WebView } from 'react-native-webview';


export default function WebChart({ navigation })
 {
 
  return (
      <View style={styles.container}>
   <WebView 
   style={styles.container}
   useWebKit={true}
   source={{ uri: 'https://energy-monitor-website.web.app' }}
/>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width,
        backgroundColor: '#dfeaf2',
      
      },


});
