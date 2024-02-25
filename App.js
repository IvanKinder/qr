import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
 import Scanner from "./Screens/Scanner";
 import Menu from "./Screens/Menu";
 import ShortWeather from "./Screens/ShortWeather";
import JSONWeather from "./Screens/JSONWeather";

 const Stack = createStackNavigator();

 function App() {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Scanner" component={Scanner} />
       <Stack.Screen name="Menu" component={Menu} />
       <Stack.Screen name="ShortWeather" component={ShortWeather} />
       <Stack.Screen name="JSONWeather" component={JSONWeather} />
    </Stack.Navigator>
  )
 }

 export default () => {
  return (
     <NavigationContainer>
      <App />
     </NavigationContainer>
  )
 }