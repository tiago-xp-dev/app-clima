import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from 'react-native-toast-notifications';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { expo as appConfigs } from './app.json';

import HomeScreen from './src/screens/currentScreen';
import CityScreen from './src/screens/cityScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ToastProvider>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} options={{drawerLabel:'Clima - Atual', title:'Clima - Atual'}}/>
          <Drawer.Screen name="City" component={CityScreen} options={{drawerLabel:'Clima - Cidades', title:'Clima - Cidades'}}/>
          {/* <Drawer.Screen name="Configurações" /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

AppRegistry.registerComponent(appConfigs.name, () => App)