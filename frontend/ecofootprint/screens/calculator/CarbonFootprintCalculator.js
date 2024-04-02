import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const CarbonFootprintCalculator = ({ navigation }) => {
  const [selectedFactor, setSelectedFactor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);

  const calculateCarbonFootprint = async () => {
    try {
      let apiUrl = "";
      let params = {};

      switch (selectedFactor) {
        case "Fuel":
          apiUrl = "https://carbonfootprint1.p.rapidapi.com/FuelToCO2e";
          params = { type: category, litres:quantity };
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
            "8645d75245msh17a75789c2c2b54p134494jsn00e9f5c229c0",
          "X-RapidAPI-Host": "carbonfootprint1.p.rapidapi.com",
        },
      });
      console.log(response.data);

      setResult(response.data);

      // Send data to backend API
      await axios.post("http://localhost:3000/carbonfootprint", {
        selectedFactor,
        quantity,
        category,
        result
      });

    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Failed to calculate carbon footprint. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Factor</Text>
      <Picker
        selectedValue={selectedFactor}
        onValueChange={(itemValue) => setSelectedFactor(itemValue)}
        style={[styles.picker, { backgroundColor: 'white' }]}
      >
        <Picker.Item label="Select Factor" value="" />
        <Picker.Item label="Fuel" value="Fuel" />
        <Picker.Item label="Clean Energy" value="Clean Energy" />
        <Picker.Item label="Books and Cellulose Papers" value="Books and Cellulose Papers" />
      </Picker>

      {/* Render input fields based on selected factor */}
      {selectedFactor === "Books and Cellulose Papers" && (
        <>
          <Text style={styles.label}>Enter Weight (kgs):</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: 'white' }]}
            placeholder="Enter Weight"
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
          <Text style={styles.label}>Select Unit:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[styles.picker, { backgroundColor: 'white' }]}
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
            style={[styles.picker, { backgroundColor: 'white' }]}
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
            style={[styles.textInput, { backgroundColor: 'white' }]}
          />
        </>
      )}

      {selectedFactor === "Fuel" && (
        <>
          <Text style={styles.label}>Select Fuel Type:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[styles.picker, { backgroundColor: 'white' }]}
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
            style={[styles.textInput, { backgroundColor: 'white' }]}
          />
        </>
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Results:</Text>
          <Text style={styles.resultText}>CO2e: {result.carbonEquivalent} {result.carbonEquivalent_unit}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.navigate("Home")}
          color="#FFD700" 
        />
        
        <Button
          title="Calculate"
          onPress={calculateCarbonFootprint}
          color="#FFD700" 
        />
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
    backgroundColor: 'green', // Set background color to green
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    height: 20,
    maxWidth: '80%',
    padding: 0,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'white', // Set background color of inputs to white
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'white', // Set background color of picker to white
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9', // Light gray background color
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  resultText: {
    fontSize: 16,
    color: '#333', // Dark text color
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent', // Set transparent background to avoid overlapping with the main content
  },
  
  buttonSpacer: {
    width: 10, // Adjust the width for desired spacing
  },
});

export default CarbonFootprintCalculator;
