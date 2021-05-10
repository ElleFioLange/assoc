import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Filter from "bad-words";
import {
  View,
  Pressable,
  Text,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

const filter = new Filter();

export default function Share({ navigation, route }: ShareProps): JSX.Element {
  const { item } = route.params;

  const [itemCode, setItemCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [generating, setGenerating] = useState(false);

  const shortcutItemDirectoryRef = firebase
    .database()
    .ref("shortcutItemDirectory");
  const shortcutCodeDirectoryRef = firebase
    .database()
    .ref("shortcutCodeDirectory");

  useEffect(() => {
    shortcutItemDirectoryRef
      .child(item.id)
      .on("value", (snapshot) => setItemCode(snapshot.val()));
    return function cleanup() {
      shortcutItemDirectoryRef.child(item.id).off();
    };
  });

  function checkProfanity(potential: string) {
    let i,
      j,
      // eslint-disable-next-line prefer-const
      subStrings = [];

    for (i = 0; i < potential.length; i++) {
      for (j = i + 1; j < potential.length + 1; j++) {
        subStrings.push(potential.slice(i, j));
      }
    }

    subStrings.forEach((string) => {
      if (filter.isProfane(string)) {
        return true;
      }
    });

    return false;
  }

  async function checkCode(potential: string) {
    const check = await shortcutCodeDirectoryRef.child(potential).once("value");
    if (check.val()) return false;
    return true;
  }

  async function generateCode(): Promise<string> {
    setGenerating(true);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * 62));
    }
    if (checkCode(result)) {
      setGenerating(false);
      return result;
    }
    return generateCode();
  }

  async function submitCode() {
    if (codeInput.length !== 8) {
      Alert.alert("Code must be exactly 8 characters");
    } else if (!(await checkCode(codeInput))) {
      Alert.alert("Code is already in use");
    } else if (checkProfanity(codeInput)) {
      Alert.alert("Watch your profanity", "Right, I'm sorry");
    } else {
      shortcutItemDirectoryRef.child(item.id).set(codeInput);
      shortcutCodeDirectoryRef.child(codeInput).set(item.id);
    }
  }

  return itemCode ? (
    <View style={[styles.container, styles.whiteBg]}>
      <Text style={styles.shareText}>Use code</Text>
      <Text style={styles.shareCode} selectable>
        {itemCode}
      </Text>
      <Text style={styles.shareText}>to share this item.</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? accentBlueLite : accentBlue,
          },
          styles.logOut,
          styles.marginTopDouble,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.avenir, styles.logOutText]}>Back</Text>
      </Pressable>
    </View>
  ) : (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <View
        style={[styles.container, styles.whiteBg]}
        pointerEvents={generating ? "none" : "auto"}
      >
        <Text style={[styles.avenir, styles.shareText]}>
          No code has been set for this item yet. Enter a custom 8 character
          code (emojis count as 2 characters), or generate a new one to share
          this item.
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <CustomTextInput
            placeholder="code"
            props={{ autoCapitalize: "none", maxLength: 8 }}
            style={styles.marginTopDouble}
            value={codeInput}
            setValue={setCodeInput}
          />
        </KeyboardAvoidingView>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? accentBlueLite : accentBlue,
            },
            styles.logOut,
            styles.marginTop,
          ]}
          onPress={submitCode}
        >
          <Text style={[styles.avenir, styles.logOutText]}>Submit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? accentBlueLite : accentBlue,
            },
            styles.logOut,
            styles.marginTop,
          ]}
          onPress={async () => {
            const generatedCode = await generateCode();
            setCodeInput(generatedCode);
          }}
        >
          <Text style={[styles.avenir, styles.logOutText]}>
            {generating ? "Generating..." : "Generate"}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? accentBlueLite : accentBlue,
            },
            styles.logOut,
            styles.marginTop,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.avenir, styles.logOutText]}>Cancel</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}
