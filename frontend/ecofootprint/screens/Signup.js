import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    const values = {
      username,
      email,
      password,
    };

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      axios.post("http://172.16.55.57:4000/register", values).then((res) => {
        navigation.navigate("Login");
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.subHeading}>It's Quick and Easy!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Username<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="JohnM"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <Text style={styles.label}>
          Email<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="abc@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>
          Password<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Text style={styles.label}>
          Confirm Password<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already registered to our Library?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "rgb(214, 209, 209)",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  required: {
    color: "red",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  termsText: {
    marginTop: 20,
    textAlign: "center",
  },
  link: {
    color: "blue",
  },
  loginText: {
    marginTop: 20,
  },
});

export default Signup;
