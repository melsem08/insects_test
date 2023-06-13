import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "./Authentication";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./config";

export function Profile() {
  const [image, setImage] = useState(null);
  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    }).then((image) => {
      // console.log(image);
      if (!image.canceled) {
        setImage(image.assets[0].uri);
      }
    });
  }
  function avatarUpload() {
    if (image) {
      fetch(image)
        .then((response) => {
          console.log(response, "<---- RESPONSE");
          return response.blob();
        })
        .then((blob) => {
          const storageRef = ref(storage, "name");
          const uploadTask = uploadBytesResumable(storageRef, blob);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
              });
            }
          );
          // const storageRef = ref(storage, "try3");
          // uploadBytes(storageRef, blob).then((snapshot) => {
          //   console.log("Uploaded a blob or file!");
          // });
        });
    }
  }
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function checkImage() {
    if (image) {
      return (
        <TouchableOpacity onPress={avatarUpload} style={styles.button}>
          <Text>Do you like your avatar? Want to save it?</Text>
        </TouchableOpacity>
      );
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textTop}>{`Hello, ${auth.currentUser?.email}`}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.buttonTop}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <View style={imageUploaderStyles.container}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={addImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {checkImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  buttonTop: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#D33CFC",
    width: "60%",
    padding: 30,
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
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
