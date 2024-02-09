import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CarbonFootprintResult = ({ result }) => {
  if (!result) {
    return null;
  }

  const {
    co2e,
    co2e_unit,
    co2e_calculation_method,
    co2e_calculation_origin,
    emission_factor,
    constituent_gases,
    activity_data,
    audit_trail,
  } = result;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carbon Footprint Result:</Text>
      <Text style={styles.text}>{`CO2e: ${co2e} ${co2e_unit}`}</Text>
      <Text
        style={styles.text}
      >{`Calculation Method: ${co2e_calculation_method}`}</Text>
      <Text
        style={styles.text}
      >{`Calculation Origin: ${co2e_calculation_origin}`}</Text>

      {emission_factor && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Emission Factor:</Text>
          <Text style={styles.text}>{`Name: ${emission_factor.name}`}</Text>
          <Text
            style={styles.text}
          >{`Activity ID: ${emission_factor.activity_id}`}</Text>
          {/* Add more details about emission factor as needed */}
        </View>
      )}

      {constituent_gases && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Constituent Gases:</Text>
          <Text
            style={styles.text}
          >{`CO2e Total: ${constituent_gases.co2e_total}`}</Text>
          <Text style={styles.text}>{`CO2: ${constituent_gases.co2}`}</Text>
          {/* Add more details about constituent gases as needed */}
        </View>
      )}

      {activity_data && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Activity Data:</Text>
          <Text
            style={styles.text}
          >{`Activity Value: ${activity_data.activity_value} ${activity_data.activity_unit}`}</Text>
        </View>
      )}

      <Text style={styles.text}>{`Audit Trail: ${audit_trail}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50", // Green background color
    padding: 16,
    borderRadius: 8,
    marginVertical: 8, // Added space above and below the component
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white", // White text color
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white", // White text color
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "white", // White text color
  },
  section: {
    marginTop: 16,
  },
});

export default CarbonFootprintResult;
