import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import ActionBar from "../components/ActionBar";
import CustomTextInput from "../components/CustomTextInput";
import { useAppSelector } from "../utils/reduxHooks";
import { styles } from "../utils/styles";

// TODO Report functionality

export default function Share({ navigation, route }: ShareProps): JSX.Element {
  const { item } = route.params;
  const uid = useAppSelector((state) => state.user.uid);

  const [itemCode, setItemCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
      .on("value", (snapshot) => setItemCode(snapshot.val().code));
    return function cleanup() {
      shortcutItemDirectoryRef.child(item.id).off();
    };
  });

  async function checkProfanity(potential: string) {
    const response = await axios.get(
      "https://community-purgomalum.p.rapidapi.com/containsprofanity",
      {
        params: { text: potential },
        headers: {
          "x-rapidapi-key":
            "2de6f8e75dmsh3d44193d16219b3p1b4accjsn11b047d66add",
          "x-rapidapi-host": "community-purgomalum.p.rapidapi.com",
        },
      }
    );

    return response.data;
  }

  async function checkInUse(potential: string) {
    const check = await shortcutCodeDirectoryRef.child(potential).once("value");
    if (check.val()) return true;
    return false;
  }

  async function generateCode(): Promise<string> {
    setGenerating(true);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * 62));
    }
    const profane = await checkProfanity(result);
    const inUse = await checkInUse(result);
    if (!(profane || inUse)) {
      setGenerating(false);
      return result;
    }
    return generateCode();
  }

  async function submitCode() {
    setSubmitting(true);
    if (codeInput.length !== 8) {
      Alert.alert("Code must be exactly 8 characters");
    } else if (await checkProfanity(codeInput)) {
      Alert.alert("Watch your profanity", "Right, I'm sorry");
    } else if (await checkInUse(codeInput)) {
      Alert.alert("Code is already in use");
    } else {
      shortcutItemDirectoryRef
        .child(item.id)
        .set({ code: codeInput, author: uid });
      shortcutCodeDirectoryRef.child(codeInput).set(item.id);
    }
    setSubmitting(false);
  }

  function report() {
    Alert.alert("Snitches get stitches");
  }

  return itemCode ? (
    <View style={[styles.container, styles.whiteBg]}>
      <Text style={styles.shareText}>Use code</Text>
      <Text style={styles.shareCode} selectable>
        {itemCode}
      </Text>
      <Text style={styles.shareText}>to share this item.</Text>
      <ActionBar
        title="Back"
        style={styles.marginTopDouble}
        onPress={() => navigation.goBack()}
      />
      <ActionBar
        title="Report profanity"
        style={styles.marginTop}
        onPress={report}
      />
      {__DEV__ && (
        <ActionBar
          title="Reset"
          style={styles.marginTop}
          onPress={() => {
            shortcutCodeDirectoryRef.child(itemCode).remove();
            shortcutItemDirectoryRef.child(item.id).remove();
          }}
        />
      )}
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
          this item. Be careful, this can&apos;t be changed afterwards.
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
        <ActionBar
          title={submitting ? "Submitting..." : "Submit"}
          style={styles.marginTopDouble}
          onPress={submitCode}
        />
        <ActionBar
          title={generating ? "Generating..." : "Generate"}
          style={styles.marginTop}
          onPress={async () => {
            const generatedCode = await generateCode();
            setCodeInput(generatedCode);
          }}
        />
        <ActionBar
          title="Cancel"
          style={styles.marginTop}
          onPress={() => navigation.goBack()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
