import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./components/config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Authentication } from "./components/Authentication";

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [motto, setMotto] = useState("");
  console.log(username);
  console.log(motto);
  const handleClick = () => {
    set(ref(db, "users/" + username), {
      username: username,
      motto: motto,
    })
      .then(() => {
        setUsername("");
        setMotto("");
        alert("Successfully added");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTop}>Test Database</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => {
          setUsername(username);
        }}
        style={styles.textboxes}
      ></TextInput>
      <TextInput
        placeholder="Motto"
        value={motto}
        onChangeText={(motto) => {
          setMotto(motto);
        }}
        style={styles.textboxes}
      ></TextInput>
      <button style={styles.submitButton} onClick={handleClick}>
        Submit
      </button>
      <button
        style={styles.submitButton}
        onClick={() => navigation.navigate("Authentication")}
      >
        Go to Auth
      </button>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textboxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  textTop: {
    fontSize: 30,
    color: "green",
  },
  submitButton: {
    margin: 15,
    borderRadius: 15,
    width: "25%",
    height: "5%",
    backgroundColor: "pink",
  },
});
