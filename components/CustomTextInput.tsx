import React, { useRef } from "react";
import {
  TextInput,
  Animated,
  Easing,
  StyleProp,
  TextStyle,
  TextInputProps,
} from "react-native";
import { styles, width } from "../utils/styles";

const AnimTextInput = Animated.createAnimatedComponent(TextInput);

export default function CustomTextInput({
  placeholder,
  props,
  style,
  value,
  setValue,
}: {
  placeholder: string;
  props?: TextInputProps;
  emailKeyboard?: boolean;
  autoCapitalize?: boolean;
  style?: StyleProp<TextStyle>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const anim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>();

  const toggleFocus = (focused: boolean) => {
    focused
      ? Animated.timing(anim, {
          useNativeDriver: true,
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
        }).start()
      : Animated.timing(anim, {
          useNativeDriver: true,
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
        }).start();
  };

  return (
    <AnimTextInput
      onChangeText={setValue}
      allowFontScaling={false}
      disableFullscreenUI
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#9194ab"
      ref={inputRef}
      style={[
        styles.input,
        styles.shadow,
        {
          shadowOffset: {
            width: 0,
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
          },
          shadowRadius: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10],
          }),
        },
        styles.border,
        style,
      ]}
      onFocus={() => toggleFocus(true)}
      onBlur={() => toggleFocus(false)}
      {...props}
    />
  );
}
