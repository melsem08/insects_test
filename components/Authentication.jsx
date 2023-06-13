import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export const auth = getAuth();
export function Authentication({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  console.log(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      navigation.replace("Profile");
      // ...
    }
  });

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(`Logged in with email: ${userCredentials.user.email}`);
        console.log(userCredentials);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function handleGoogleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.textTop}>InsectiSpy Authentication</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
          style={styles.textboxes}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
          style={styles.textboxes}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign-in with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  textboxes: {
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 3,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#0782F9",
  },
  textTop: {
    fontSize: 30,
    color: "green",
  },
});
