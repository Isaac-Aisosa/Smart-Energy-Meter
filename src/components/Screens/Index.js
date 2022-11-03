import * as React from 'react';
import { View, Text, Button } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './Dashboard'
import Settings from './Settings'
import load from './load'
import energy from './energy'


const Tab = createBottomTabNavigator();


export default function MyTabs() {
  return (
    
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: '#03a696',
        
      }}
    >

      
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={25} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Load"
        component={load}
        options={{
          tabBarLabel: 'Load Management',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-circle-right" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Energy"
        component={energy}
        options={{
          tabBarLabel: 'Reload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="transmission-tower" color={color} size={25} />
          ),
        }}
      />

       <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-horizontal-circle" color={color} size={25} />
          ),
        }}
      />



    </Tab.Navigator>

     





  );
}