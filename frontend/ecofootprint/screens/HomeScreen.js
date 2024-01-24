// HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const navigateToCalculateScreen = () => {
    navigation.navigate("CarbonFootprintInput");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EcoFootprint App</Text>
      <Button
        title="Calculate Carbon Footprint"
        onPress={navigateToCalculateScreen}
        color="#FFD700"
      />
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
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
