import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StateProvider } from "./context/Context";
import Scanner from "./Screens/Scanner";
import WeatherList from "./Screens/WeatherList";

const Stack = createStackNavigator();

function App() {
  return (
    <StateProvider>
      <Stack.Navigator>
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="WeatherList" component={WeatherList} />
      </Stack.Navigator>
    </StateProvider>
  )
}

export default () => {
  return (
    <NavigationContainer>
    <App />
    </NavigationContainer>
  )
}