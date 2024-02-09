import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const CarbonFootprintCalculator = () => {
  const [selectedFactor, setSelectedFactor] = useState("");
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [solarEnergyConsumption, setSolarEnergyConsumption] = useState("");
  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  // Add state variables for other parameters as needed

  const calculateCarbonFootprint = async () => {
    try {
      let apiUrl = "";
      let params = {};

      switch (selectedFactor) {
        case "AirQualityHealthIndex":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/AirQualityHealthIndex";
          params = { O3: "10", NO2: "10", PM: "10" };
          break;
        case "CarbonFootprintFromMotorBike":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromMotorBike";
          params = { type: "SmallMotorBike", distance: "400" };
          break;
        case "CarbonFootprintFromCarTravel":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel";
          params = { distance, vehicle: vehicleType };
          break;
        case "CarbonFootprintFromPublicTransit":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit";
          params = { distance: "1000", type: "Taxi" };
          break;
        case "CleanHydroToCarbonFootprint":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint";
          params = { energy: "Solar", consumption: solarEnergyConsumption };
          break;
        default:
          // Handle invalid or no selection
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

      // Here you can send the data to your backend or database
      // Use a function to send the data to your backend
      // sendDataToBackend(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Failed to calculate carbon footprint. Please try again."
      );
    }
  };

  const sendDataToBackend = (data) => {
    // Implement your logic to send data to the backend
    // For example, you can use fetch or axios to send a POST request to your server
    // You can also pass 'data' as the request payload
    // Example:
    // fetch('YOUR_BACKEND_API_URL', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(result => console.log(result))
    // .catch(error => console.error('Error sending data to backend:', error));
  };

  return (
    <View>
      <Text>Select Factor:</Text>
      <Picker
        selectedValue={selectedFactor}
        onValueChange={(itemValue) => setSelectedFactor(itemValue)}
      >
        <Picker.Item label="Select Factor" value="" />
        <Picker.Item
          label="Air Quality Health Index"
          value="AirQualityHealthIndex"
        />
        <Picker.Item
          label="Carbon Footprint from MotorBike"
          value="CarbonFootprintFromMotorBike"
        />
        <Picker.Item
          label="Carbon Footprint from Car Travel"
          value="CarbonFootprintFromCarTravel"
        />
        <Picker.Item
          label="Carbon Footprint from Public Transit"
          value="CarbonFootprintFromPublicTransit"
        />
        <Picker.Item
          label="Clean Hydro to Carbon Footprint"
          value="CleanHydroToCarbonFootprint"
        />
        {/* Add more items based on available factors */}
      </Picker>

      {/* Add input fields based on the selected factor */}
      {selectedFactor === "CarbonFootprintFromCarTravel" && (
        <>
          <Text>Enter Distance:</Text>
          <TextInput
            placeholder="Distance"
            keyboardType="numeric"
            value={distance}
            onChangeText={(text) => setDistance(text)}
          />
          <Text>Enter Vehicle Type:</Text>
          <TextInput
            placeholder="Vehicle Type"
            value={vehicleType}
            onChangeText={(text) => setVehicleType(text)}
          />
        </>
      )}

      {selectedFactor === "CleanHydroToCarbonFootprint" && (
        <>
          <Text>Enter Solar Energy Consumption:</Text>
          <TextInput
            placeholder="Solar Energy Consumption"
            keyboardType="numeric"
            value={solarEnergyConsumption}
            onChangeText={(text) => setSolarEnergyConsumption(text)}
          />
        </>
      )}
      {/* Display results */}
      {result && (
        <View>
          <Text>Results:</Text>
          <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}

      <Button
        title="Calculate Carbon Footprint"
        onPress={calculateCarbonFootprint}
      />

      <Button title="View Tips" onPress={() => navigation.navigate("Tips")} />
    </View>
  );
};

export default CarbonFootprintCalculator;
