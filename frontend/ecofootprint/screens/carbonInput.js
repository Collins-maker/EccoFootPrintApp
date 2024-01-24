import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const CarbonFootprintInput = ({ onSubmit }) => {
  const [O3, setO3] = useState("10");
  const [NO2, setNO2] = useState("10");
  const [PM, setPM] = useState("10");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      // Make the RapidAPI call using fetch
      const response = await fetch(
        `https://carbonfootprint1.p.rapidapi.com/AirQualityHealthIndex?O3=${O3}&NO2=${NO2}&PM=${PM}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8645d75245msh17a75789c2c2b54p134494jsn00e9f5c229c0",
            "X-RapidAPI-Host": "carbonfootprint1.p.rapidapi.com",
          },
        }
      );

      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      // Parse the JSON response
      const responseData = await response.json();

      // Check if the 'airQualityHealthIndex' property is present in the response
      if ("airQualityHealthIndex" in responseData) {
        console.log("RapidAPI response:", responseData);
        // Store the result in the state
        setResult(responseData);
        // Pass the submitted data to the parent component
        onSubmit({ O3, NO2, PM });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error calling RapidAPI:", error.message);
      Alert.alert(
        "Error",
        "Failed to fetch data from RapidAPI. Please try again."
      );
    }
  };

  return (
    <View>
      <Text>Enter Air Quality Details:</Text>
      <TextInput
        placeholder="O3"
        keyboardType="numeric"
        value={O3}
        onChangeText={(text) => setO3(text)}
      />
      <TextInput
        placeholder="NO2"
        keyboardType="numeric"
        value={NO2}
        onChangeText={(text) => setNO2(text)}
      />
      <TextInput
        placeholder="PM"
        keyboardType="numeric"
        value={PM}
        onChangeText={(text) => setPM(text)}
      />
      <Button title="Calculate" onPress={handleSubmit} />

      {/* Display the result */}
      {result && (
        <View>
          <Text>Carbon Footprint Result</Text>
          <Text>Air Quality Health Index: {result.airQualityHealthIndex}</Text>
        </View>
      )}
    </View>
  );
};

export default CarbonFootprintInput;
