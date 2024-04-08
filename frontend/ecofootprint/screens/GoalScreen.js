import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode as base64decode } from "base-64";

global.atob = base64decode;

const GoalsScreen = () => {
  const [carbonFootprints, setCarbonFootprints] = useState(null);
  const [goals, setGoals] = useState({
    Fuel: "",
    CleanEnergy: "",
    BooksAndCellulosePapers: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      console.log("Retrieved JWT token:", token);

      // Send request to backend to fetch data using JWT token
      const response = await axios.get("http://192.168.8.113:4000/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
        },
      });

      setCarbonFootprints(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      Alert.alert("Error", "Failed to fetch data. Please try again.");
    }
  };

  const handleSaveGoals = async () => {
    try {
      // Disable the button to prevent multiple clicks
      setButtonDisabled(true);

      // Decode the JWT token to access its payload
      const token = await AsyncStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Retrieve the UserID from the decoded token payload
      const user = decodedToken;

      // Prepare payload with goals for each category
      const payload = {
        Goals: {
          Fuel: parseInt(goals["Fuel"]),
          CleanEnergy: parseInt(goals["CleanEnergy"]),
          BooksAndCellulosePapers: parseInt(goals["BooksAndCellulosePapers"]),
        },
      };

      // Save goals to the database
      const response = await axios.post(
        "http://192.168.8.113:4000/goals",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
          },
        }
      );

      console.log("Goals saved successfully:", response.data);
      // You can perform additional actions after successful save if needed

      // Display success message to the user
      Alert.alert("Success", "Goals saved successfully.");
    } catch (error) {
      console.error("Failed to save goals:", error);
      Alert.alert("Error", "Failed to save goals. Please try again.");
    } finally {
      // Enable the button after request completes (whether success or failure)
      setButtonDisabled(false);
    }
  };

  // Define state variable to manage button disabled state
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Goals</Text>
      <View style={styles.inputContainer}>
        <Text>Fuel:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          keyboardType="numeric"
          value={goals["Fuel"]}
          onChangeText={(text) => setGoals({ ...goals, Fuel: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Clean Energy:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          keyboardType="numeric"
          value={goals["CleanEnergy"]}
          onChangeText={(text) => setGoals({ ...goals, CleanEnergy: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Books AndC ellulose Papers:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          keyboardType="numeric"
          value={goals["BooksAndCellulosePapers"]}
          onChangeText={(text) =>
            setGoals({ ...goals, BooksAndCellulosePapers: text })
          }
        />
      </View>
      <Button
        title="Save Goals"
        onPress={handleSaveGoals}
        color="#FFD700"
        disabled={buttonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
});

export default GoalsScreen;
