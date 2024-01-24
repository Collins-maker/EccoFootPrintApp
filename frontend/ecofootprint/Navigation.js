// Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import App from "./App";
import CarbonFootprintInput from "./screens/CarbonFootprintInput";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App" headerMode="none">
        <Stack.Screen name="App" component={App} />
        <Stack.Screen
          name="CarbonFootprintInput"
          component={CarbonFootprintInput}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
