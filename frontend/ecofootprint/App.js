// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CarbonFootprintCalculator from "./screens/CarbonFootprintCalculator.js";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

const App = () => {
  const handleSubmission = (data) => {
    // Handle the submitted data (e.g., save it, display it, etc.)
    console.log("Submitted data:", data);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Other screens */}
        <Stack.Screen name="CarbonFootprintInput">
          {(props) => (
            <CarbonFootprintCalculator {...props} onSubmit={handleSubmission} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
