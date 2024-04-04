import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CarbonFootprintCalculator from "./screens/calculator/CarbonFootprintCalculator.js";
import HomeScreen from "./screens/HomeScreen";
import TipsScreen from "./screens/TipsScreen.js";
import Signup from "./screens/Signup";
import Login from "./screens/Login.js";
import { AuthContextProvider } from "./components/context/authContext.js";
import OnboardingScreen from "./screens/OnboardingScreen.js";

const Stack = createStackNavigator();

const App = () => {
  const handleSubmission = (data) => {
    // Handle the submitted data (e.g., save it, display it, etc.)
    console.log("Submitted data:", data);
  };

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          {/* Other screens */}
          <Stack.Screen
            name="CarbonFootprintInput"
            options={{ headerShown: false }}
          >
            {(props) => (
              <CarbonFootprintCalculator
                {...props}
                onSubmit={handleSubmission}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Tips" component={TipsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
