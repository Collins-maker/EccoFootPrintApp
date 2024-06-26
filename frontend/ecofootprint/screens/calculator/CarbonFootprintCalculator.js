import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarbonFootprintCalculator = ({ navigation }) => {
  const [selectedFactor, setSelectedFactor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);

  const saveData = async () => {
    try {
      // Retrieve session identifier from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      console.log("This is the JWT token:", token);

      // Send data to backend API along with the session identifier
      const response = await axios.post(
        "http://192.168.8.113:4000/footprints",
        {
          selectedFactor,
          quantity,
          category,
          result,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      // You can perform any additional actions after successful save if needed
    } catch (error) {
      console.error("Failed to save data:", error);
      let errorMessage = "Failed to save data. Please try again.";

      if (error.response && error.response.data) {
        errorMessage += " " + error.response.data.error;
      }

      Alert.alert("Error", errorMessage);
    }
  };

  const calculateCarbonFootprint = async () => {
    try {
      let apiUrl = "";
      let params = {};

      switch (selectedFactor) {
        case "Fuel":
          apiUrl = "https://carbonfootprint1.p.rapidapi.com/FuelToCO2e";
          params = { type: category, litres: quantity };
          break;
        case "Books and Cellulose Papers":
          apiUrl = "https://carbonfootprint1.p.rapidapi.com/TreeEquivalent";
          params = { weight: quantity, unit: category };
          break;
        case "Clean Energy":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint";
          params = { energy: category, consumption: quantity };
          break;
        default:
          Alert.alert("Error", "Please select a valid factor.");
          return;
      }

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "X-RapidAPI-Key":
            "d22ec07910msh9c783fb66a488edp18e106jsn845ecc7cf8a4",
          "X-RapidAPI-Host": "carbonfootprint1.p.rapidapi.com",
        },
      });

      const { carbonEquivalent, numberOfTrees } = response.data;

      if (carbonEquivalent !== undefined) {
        setResult(carbonEquivalent);
        resultMessage = `Your footprint is ${carbonEquivalent}.`; // Assign value to resultMessage here

        // Display result message on screen
        // Alert.alert("Carbon Footprint", resultMessage);

        // Display additional information
        Alert.alert(
          "Success!",
          `${resultMessage}\n\n
          The average footprint for people in Kenya is 360 kgs in a year.\n
      The average worldwide carbon footprint is about 4790 kgs in a year.\n
      You can calculate more factors to check your average...\n
      Vision 2030 is to have the average of 100kgs in a year.\n 

      Press save button , to save the results and then:\n
    
      Press View Tips button Check out the tips on how to reduce it.`
        );
      } else if (numberOfTrees !== undefined) {
        setResult(numberOfTrees);
      } else {
        // Handle the case where neither property is present
        console.error("Both carbonEquivalent and numberOfTrees are undefined");
      }

      console.log("This are the results :", result);
    } catch (error) {
      console.error(error);
      let errorMessage =
        "Failed to calculate carbon footprint. Please try again.";

      // Check if error.message is available
      if (error.message) {
        errorMessage += " " + error.message; // Append the detailed error message
      }

      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Factor</Text>
      <Picker
        selectedValue={selectedFactor}
        onValueChange={(itemValue) => setSelectedFactor(itemValue)}
        style={[styles.picker, { backgroundColor: "white" }]}
      >
        <Picker.Item label="Select Factor" value="" />
        <Picker.Item label="Fuel" value="Fuel" />
        <Picker.Item label="Clean Energy" value="Clean Energy" />
        <Picker.Item
          label="Books and Cellulose Papers"
          value="Books and Cellulose Papers"
        />
      </Picker>

      {/* Render input fields based on selected factor */}
      {selectedFactor === "Books and Cellulose Papers" && (
        <>
          <Text style={styles.label}>Enter Weight:</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: "white" }]}
            placeholder="Enter Weight"
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
          <Text style={styles.label}>Select Unit:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[styles.picker, { backgroundColor: "white" }]}
          >
            <Picker.Item label="Select Unit" value="" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lb" value="lb" />
          </Picker>
        </>
      )}

      {selectedFactor === "Clean Energy" && (
        <>
          <Text style={styles.label}>Select Clean Energy Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[styles.picker, { backgroundColor: "white" }]}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Solar" value="Solar" />
            <Picker.Item label="Wind" value="Wind" />
            <Picker.Item label="Biomass" value="Biomass" />
            <Picker.Item label="HydroElectric" value="HydroElectric" />
          </Picker>
          <Text style={styles.label}>Consumed Amount (KWH):</Text>
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={[styles.textInput, { backgroundColor: "white" }]}
          />
        </>
      )}

      {selectedFactor === "Fuel" && (
        <>
          <Text style={styles.label}>Select Fuel Type:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[styles.picker, { backgroundColor: "white" }]}
          >
            <Picker.Item label="Select Fuel Type" value="" />
            <Picker.Item label="Petrol" value="Petrol" />
            <Picker.Item label="Diesel" value="Diesel" />
            <Picker.Item label="LPG" value="LPG" />
          </Picker>
          <Text style={styles.label}>Litres:</Text>
          <TextInput
            placeholder="Enter Litres"
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={[styles.textInput, { backgroundColor: "white" }]}
          />
        </>
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Your CO2 Emission in kgs:</Text>
          <Text style={styles.resultText}>
            {result.carbonEquivalent ?? result.numberOfTrees}
            {result}
            {result.carbonEquivalent_unit ?? result.numberOfTrees_unit}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.navigate("OnboardingScreen")}
          color="#FFD700"
        />

        <Button
          title="Calculate"
          onPress={calculateCarbonFootprint}
          color="#FFD700"
        />
        <Button title="Save" onPress={saveData} color="#FFD700" />

        <View style={styles.buttonSpacer} />
        <Button
          title="View Tips"
          onPress={() => navigation.navigate("Tips")}
          color="#FFD700"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    backgroundColor: "#4CAF50", // Set background color to green
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 20,
    marginBottom: 10,
    height: 20,
    maxWidth: "80%",
    padding: 0,
  },
  textInput: {
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "white", // Set background color of inputs to white
  },
  picker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "white", // Set background color of picker to white
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9", // Light gray background color
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Dark text color
  },
  resultText: {
    fontSize: 16,
    color: "#333", // Dark text color
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent", // Set transparent background to avoid overlapping with the main content
  },

  buttonSpacer: {
    width: 10, // Adjust the width for desired spacing
  },
});

export default CarbonFootprintCalculator;
