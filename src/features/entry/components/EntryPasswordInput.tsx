import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, type TextInputProps } from "react-native";

import { entryColors } from "../constants";
import { EntryTextInput } from "./EntryTextInput";

type EntryPasswordInputProps = TextInputProps & {
  label: string;
};

export function EntryPasswordInput({
  label,
  ...props
}: EntryPasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <EntryTextInput
      label={label}
      secureTextEntry={isSecure}
      trailing={
        <Pressable
          accessibilityLabel={isSecure ? "Show password" : "Hide password"}
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => setIsSecure((currentValue) => !currentValue)}
          style={styles.toggleButton}
        >
          <Feather
            color={entryColors.iconWarm}
            name={isSecure ? "eye-off" : "eye"}
            size={18}
          />
        </Pressable>
      }
      {...props}
    />
  );
}

const styles = {
  toggleButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
} as const;
