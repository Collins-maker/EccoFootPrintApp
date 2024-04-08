import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TipsScreen = ({ navigation }) => {
  const handleNavigateToGoalsScreen = () => {
    navigation.navigate("GoalsScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tips to Reduce Carbon Emissions</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Clean Energy</Text>
        <Text style={styles.content}>
          <View style={styles.container}>
            <Text style={styles.heading}>
              Energy is at the heart of the climate challenge – and key to the
              solution.
            </Text>

            <Text style={styles.paragraph}>
              A large chunk of the greenhouse gases that blanket the Earth and
              trap the sun’s heat are generated through energy production, by
              burning fossil fuels to generate electricity and heat. Fossil
              fuels, such as coal, oil and gas, are by far the largest
              contributor to global climate change, accounting for over 75
              percent of global greenhouse gas emissions and nearly 90 percent
              of all carbon dioxide emissions.
            </Text>

            <Text style={styles.paragraph}>
              The science is clear: to avoid the worst impacts of climate
              change, emissions need to be reduced by almost half by 2030 and
              reach net-zero by 2050. To achieve this, we need to end our
              reliance on fossil fuels and invest in alternative sources of
              energy that are clean, accessible, affordable, sustainable, and
              reliable. Renewable energy sources – which are available in
              abundance all around us, provided by the sun, wind, water, waste,
              and heat from the Earth – are replenished by nature and emit
              little to no greenhouse gases or pollutants into the air.
            </Text>

            <Text style={styles.paragraph}>
              Fossil fuels still account for more than 80 percent of global
              energy production, but cleaner sources of energy are gaining
              ground. About 29 percent of electricity currently comes from
              renewable sources.
            </Text>

            {/* Add more paragraphs as needed */}
          </View>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Fuel</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>1.</Text> Change incandescent light
            bulbs (which waste 90 percent of their energy as heat) to light
            emitting diodes (LEDs). Though LEDs cost more, they use a quarter
            ofuko wapi? the energy and last up to 25 times longer. They are also
            preferable to compact fluorescent lamp (CFL) bulbs, which emit 80
            percent of their energy as heat and contain mercury.
          </Text>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>2.</Text> Switch lights off when you
            leave the room and unplug your electronic devices when they are not
            in use.
          </Text>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>3.</Text> Turn your water heater
            down to 120˚F. This can save about 550 pounds of CO2 a year.
          </Text>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>4.</Text> Installing a low-flow
            showerhead to reduce hot water use can save 350 pounds of CO2.
            Taking shorter showers helps, too.
          </Text>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>5.</Text> Lower your thermostat in
            winter and raise it in summer. Use less air conditioning in the
            summer; instead opt for fans, which require less electricity. And
            check out these other ways to beat the heat without air
            conditioning.
          </Text>
          <Text style={styles.content}>
            <Text style={styles.listNumber}>6.</Text> Sign up to get your
            electricity from clean energy through your local utility or a
            certified renewable energy provider. Green-e.org can help you find
            certified green energy providers.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Trees</Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus
          justo in nulla viverra, vitae consequat quam laoreet. Aenean nec justo
          consequat, consectetur leo non, placerat turpis.
        </Text>
      </View>

      <Text style={styles.heading}>Frequently Asked Questions (FAQs)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Q: What is carbon emissions?</Text>
        <Text style={styles.content}>
          A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus
          justo in nulla viverra, vitae consequat quam laoreet.
        </Text>
      </View>

      {/* Add more FAQ items as needed */}

      <View style={styles.buttonContainer}>
        <Button
          title="Set Goals"
          onPress={handleNavigateToGoalsScreen}
          color="#FFD700"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  listNumber: {
    fontWeight: "bold",
    marginRight: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },
});

export default TipsScreen;
