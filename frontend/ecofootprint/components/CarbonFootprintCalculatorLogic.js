import React, { useState } from "react";
import axios from "axios";

const CarbonFootprintCalculatorLogic = ({ navigation }) => {
  const [selectedFactor, setSelectedFactor] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [solarEnergyCategory, setSolarEnergyCategory] = useState("");
  const [consumedAmount, setConsumedAmount] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [litres, setLitres] = useState("");
  const [result, setResult] = useState(null);

  const calculateCarbonFootprint = async () => {
    try {
      let apiUrl = "";
      let params = {};

      switch (selectedFactor) {
        case "FuelToCO2e":
          apiUrl = "https://carbonfootprint1.p.rapidapi.com/FuelToCO2e";
          params = { type: fuelType, litres };
          break;
        case "TreeEquivalent":
          apiUrl = "https://carbonfootprint1.p.rapidapi.com/TreeEquivalent";
          params = { weight, unit };
          break;
        case "CleanHydroToCarbonFootprint":
          apiUrl =
            "https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint";
          params = { energy: solarEnergyCategory, consumption: consumedAmount };
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
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Failed to calculate carbon footprint. Please try again."
      );
    }
  };

  return {
    selectedFactor,
    setSelectedFactor,
    weight,
    setWeight,
    unit,
    setUnit,
    solarEnergyCategory,
    setSolarEnergyCategory,
    consumedAmount,
    setConsumedAmount,
    fuelType,
    setFuelType,
    litres,
    setLitres,
    result,
    setResult,
    calculateCarbonFootprint,
    navigation,
  };
};

export default CarbonFootprintCalculatorLogic;
