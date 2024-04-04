// screens/Login.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../components/context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const loginResult = await login(inputs);
      console.log("Login response:", loginResult);

      if (loginResult.success) {
        console.log("Login successful!");
        // Navigation logic for successful login
      } else {
        console.log("Login failed. Invalid credentials.");
        setErr("Invalid credentials.");
      }
    } catch (err) {
      console.log("Login failed. Error:", err.message || "An error occurred");
      setErr(err.message || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={inputs.username}
          onChangeText={(value) => handleChange("username", value)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={inputs.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        {err && <Text style={styles.error}>{err}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.bottomText}>Have no account yet? Register</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
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
  error: {
    color: "red",
  },
  button: {
    backgroundColor: "rgb(103, 202, 248)",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  bottomText: {
    marginTop: 20,
  },
});

export default Login;
