import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  const [content, setContent] = useState([]);
  const [index, setIndex] = useState(0);

  // Content to display with delays
  const onboardingContent = [
    "Your, on board, Briefly we allow you to understand how it works here 😊",
    "1. Calculate Your carbon footprints using rapid APIs",
    "2. Press save to save it to our databases and allow us send the results to your email for tracking...",
    "3. Go to next page for educational purposes",
    "4. The last page to set goals to reduce the carbon emissions",
    '"Caring for our common mother, earth"',
  ];

  useEffect(() => {
    // Display content with delays
    const timer = setTimeout(() => {
      if (index < onboardingContent.length) {
        setContent((prevContent) => [...prevContent, onboardingContent[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [index]);

  const handleNext = () => {
    // Navigate to CarbonFootprintInput screen
    navigation.navigate("CarbonFootprintInput");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {content.map((line, i) => (
          <Text key={i} style={styles.text}>
            {line}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#4CAF50",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default OnboardingScreen;
