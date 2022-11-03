// In App.js in a new project

import * as React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Home from './src/components/Screens/Index'
import BuyEnergy from './src/components/Screens/buyEnergy'
import PaymentSuccess from './src/components/Screens/paymentsuccess'


const Stack = createStackNavigator();

class App extends React.Component {
  render(){ 
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='screen'>
        <Stack.Screen name="Home" component={Home}  
          
        options={{ title: 'Smart Energy Meter',
        headerShown: false,
        headerTitleStyle: {
        fontWeight: 'normal',   
        },
        }}/>

<Stack.Screen name="BuyEnergy" component={BuyEnergy}  
          
          options={{ title: 'Buy Energy',
          headerShown: true,
          headerTitleStyle: {
          fontWeight: 'normal',   
          },
          }}/> 

<Stack.Screen name="PaymentSuccess" component={PaymentSuccess}  
          options={{ title: 'Payment Success',
          headerShown: true,
          headerTitleStyle: {
          fontWeight: 'normal',   
          },
          }}/> 


     </Stack.Navigator>  
    </NavigationContainer>

  );

  
}

}
export default (App)

