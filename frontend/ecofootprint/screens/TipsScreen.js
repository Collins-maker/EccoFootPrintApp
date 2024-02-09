import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const TipsScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://news.climate.columbia.edu/2018/12/27/35-ways-reduce-carbon-footprint/",
        }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default TipsScreen;
