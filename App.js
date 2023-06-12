import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./components/config";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  console.log(username);
  console.log(email);
  const handleClick = () => {
    set(ref(db, "users/" + username), {
      username: username,
      email: email,
    })
      .then(() => {
        setUsername("");
        setEmail("");
        alert("Successfully added");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTop}>Test InsectiSpy</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => {
          setUsername(username);
        }}
        style={styles.textboxes}
      ></TextInput>
      <TextInput
        placeholder="E-Mail"
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
        style={styles.textboxes}
      ></TextInput>
      <button style={styles.submitButton} onClick={handleClick}>
        Submit
      </button>
      <StatusBar style="auto" />
    </View>
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
