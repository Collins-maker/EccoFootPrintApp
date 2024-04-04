// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   Button,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";
// import Navigation from "./Navigation";

// const Auth = () => {
//   const [users, setUsers] = useState([]);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://192.168.100.2:4000/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const response = await axios.post("http://192.168.100.2/register", {
//         username,
//         email,
//         password,
//       });
//       console.log("User created:", response.data);
//       fetchUsers(); // Refresh the user list after creating a new user
//       // Navigation.navigate("CalculateCarbonFootprint");
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>EcoFootprint</Text>

//       <View style={styles.centeredContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="User Name"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         <Button
//           title="Register"
//           onPress={registerUser}
//           color="#FFD700" // Yellow color for the button
//         />
//       </View>

//       <Text style={styles.heading}>Users:</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.username}
//         renderItem={({ item }) => (
//           <View style={styles.userContainer}>
//             <Text style={styles.username}>{item.username}</Text>
//             <Text style={styles.email}>{item.email}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#4CAF50", // Green background color
//     padding: 20,
//     justifyContent: "flex-end", // Align users at the bottom
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#FFF", // White text color
//     marginBottom: 20,
//   },
//   centeredContainer: {
//     backgroundColor: "#FFF", // White background color
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#FFF", // White text color
//     marginBottom: 10,
//   },
//   userContainer: {
//     backgroundColor: "#FFF", // White background color
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   email: {
//     fontSize: 14,
//     color: "#666",
//   },
//   input: {
//     height: 40,
//     borderColor: "#FFF",
//     borderWidth: 1,
//     backgroundColor: "#FFF", // White background color
//     marginBottom: 10,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
// });

// export default Auth;
