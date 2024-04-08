import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const navigateToRegisterScreen = () => {
    navigation.navigate("Signup"); // Changed to "SignUp"
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login"); // Changed to "Login"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EcoFootprint</Text>
      <Text style={styles.quote}>
        "Let's take care of our common home by monitoring and reducing our
        carbon emissions."
      </Text>
      <Text style={styles.phrase}>
        One step and you're into the system. Register to continue.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={navigateToRegisterScreen}
          color="#FFD700"
        />
        <Button title="Login" onPress={navigateToLoginScreen} color="#FFD700" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    textAlign: "center",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#FFF",
    marginBottom: 10,
    textAlign: "center",
  },
  phrase: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
