import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import {} from "../components/makeApiCall";

const CarbonFootprintInput = () => {
  const [selectedFactor, setSelectedFactor] = useState("AirQualityHealthIndex");
  const [params, setParams] = useState({
    O3: "10",
    NO2: "10",
    PM: "10",
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const apiResult = await makeApiCall(selectedFactor, params);
      setResult(apiResult);
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <View>
      <Text>Select Carbon Emission Factor:</Text>
      <SelectPicker
        selectedValue={selectedFactor}
        onValueChange={(itemValue) => setSelectedFactor(itemValue)}
      >
        {/* Include all available factors in the SelectPicker */}
      </SelectPicker>

      {/* Input fields based on selected factor */}
      {/* Add more input fields as needed for other parameters */}

      <Button title="Calculate" onPress={handleSubmit} />

      {/* Display the result */}
      {result && (
        <View>
          <Text>Carbon Footprint Result</Text>
          <Text>
            {selectedFactor}: {result[selectedFactor]}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CarbonFootprintInput;
