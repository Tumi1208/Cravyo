import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { CravyoBottomNav } from "../../components/navigation/CravyoBottomNav";
import { CravyoSheetScreen } from "../../components/layout/CravyoSheetScreen";
import { ReferenceScreenShell } from "../../components/layout/ReferenceScreenShell";
import { useMockAuth } from "../auth/context/MockAuthContext";
import {
  deliveryAddresses,
  notificationSettings,
  paymentMethods,
  profileFields,
  profileMenuItems,
  profileUser,
  settingsItems,
} from "./mock";
import type {
  DeliveryAddress,
  NotificationSetting,
  PaymentMethod,
  ProfileField,
  ProfileMenuItem,
  SettingsItem,
} from "./types";

export function ProfileMenuScreen() {
  const router = useRouter();
  const { session } = useMockAuth();

  const fullName = session?.fullName || profileUser.fullName;
  const email = session?.identifier || profileUser.email;

  return (
    <ReferenceScreenShell backgroundColor="#F9A45F">
      <View style={styles.menuRoot}>
        <View style={styles.menuAccentPanel} />
        <View style={styles.menuAccentHandle} />

        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.menuBackButton}
        >
          <Feather color="#D2783B" name="chevron-left" size={20} />
        </Pressable>

        <View style={styles.menuCard}>
          <View style={styles.menuHeader}>
            <AvatarBadge size={44} />

            <View style={styles.menuHeaderCopy}>
              <Text style={styles.menuName}>{fullName}</Text>
              <Text numberOfLines={1} style={styles.menuEmail}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.menuList}>
            {profileMenuItems.map((item) => (
              <MenuRow
                item={item}
                key={item.id}
                onPress={() => router.push(item.href)}
              />
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/profile/logout")}
            style={styles.logoutRow}
          >
            <View style={styles.menuIconWrap}>
              <MaterialCommunityIcons
                color="#E97A33"
                name="logout-variant"
                size={24}
              />
            </View>
            <Text style={styles.logoutLabel}>Log Out</Text>
          </Pressable>
        </View>
      </View>

      <CravyoBottomNav activeKey="" onNavigate={(href) => router.push(href)} />
    </ReferenceScreenShell>
  );
}

export function MyProfileScreen() {
  const { session } = useMockAuth();
  const [fields, setFields] = useState<Record<string, string>>({
    "full-name": session?.fullName || profileFields[0]?.value || "",
    "date-of-birth": profileFields[1]?.value || "",
    email: session?.identifier || profileFields[2]?.value || "",
    "phone-number": profileFields[3]?.value || "",
  });

  const updateField = (fieldId: string, value: string) => {
    setFields((current) => ({
      ...current,
      [fieldId]: value,
    }));
  };

  return (
    <CravyoSheetScreen backHref="/profile" title="My profile">
      <View style={styles.profileAvatarSection}>
        <ProfileAvatarCard />
      </View>

      {profileFields.map((field) => (
        <ProfileTextField
          field={field}
          key={field.id}
          value={fields[field.id] ?? ""}
          onChangeText={(value) => updateField(field.id, value)}
        />
      ))}

      <PrimaryPillButton label="Update Profile" style={styles.formButton} />
    </CravyoSheetScreen>
  );
}

export function DeliveryAddressScreen() {
  const [selectedId, setSelectedId] = useState(
    deliveryAddresses.find((item) => item.isSelected)?.id ?? deliveryAddresses[0]?.id ?? "",
  );

  return (
    <CravyoSheetScreen backHref="/profile" title="Delivery Address">
      <View style={styles.selectionList}>
        {deliveryAddresses.map((item, index) => (
          <SelectionRow
            description={item.line}
            iconName={item.iconName}
            isLast={index === deliveryAddresses.length - 1}
            isSelected={item.id === selectedId}
            key={item.id}
            label={item.label}
            onPress={() => setSelectedId(item.id)}
          />
        ))}
      </View>

      <Pressable accessibilityRole="button" style={styles.textOnlyButton}>
        <Text style={styles.textOnlyButtonLabel}>Add New Address</Text>
      </Pressable>
    </CravyoSheetScreen>
  );
}

export function PaymentMethodsScreen() {
  const [selectedId, setSelectedId] = useState(
    paymentMethods.find((item) => item.isSelected)?.id ?? paymentMethods[0]?.id ?? "",
  );

  return (
    <CravyoSheetScreen backHref="/profile" title="Payment Methods">
      <View style={styles.selectionList}>
        {paymentMethods.map((item, index) => (
          <PaymentRow
            isLast={index === paymentMethods.length - 1}
            isSelected={item.id === selectedId}
            item={item}
            key={item.id}
            onPress={() => setSelectedId(item.id)}
          />
        ))}
      </View>

      <Pressable accessibilityRole="button" style={styles.textOnlyButton}>
        <Text style={styles.textOnlyButtonLabel}>Add New Card</Text>
      </Pressable>
    </CravyoSheetScreen>
  );
}

export function SettingsScreen() {
  const router = useRouter();

  return (
    <CravyoSheetScreen backHref="/profile" title="Settings">
      <View style={styles.selectionList}>
        {settingsItems.map((item, index) => {
          const { href } = item;

          return (
            <SettingsRow
              isLast={index === settingsItems.length - 1}
              item={item}
              key={item.id}
              onPress={href ? () => router.push(href) : undefined}
            />
          );
        })}
      </View>
    </CravyoSheetScreen>
  );
}

export function NotificationSettingScreen() {
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationSettings.map((item) => [item.id, item.enabled])),
  );

  const toggleValue = (item: NotificationSetting) => {
    setValues((current) => ({
      ...current,
      [item.id]: !current[item.id],
    }));
  };

  return (
    <CravyoSheetScreen backHref="/profile/settings" title="Notification Setting">
      <View style={styles.toggleList}>
        {notificationSettings.map((item) => (
          <View key={item.id} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{item.label}</Text>
            <Switch
              ios_backgroundColor="#F6E2D2"
              onValueChange={() => toggleValue(item)}
              thumbColor="#FFFFFF"
              trackColor={{ false: "#F6E2D2", true: "#F3B477" }}
              value={values[item.id] ?? false}
            />
          </View>
        ))}
      </View>
    </CravyoSheetScreen>
  );
}

export function PasswordSettingScreen() {
  const [currentPassword, setCurrentPassword] = useState("password1234");
  const [newPassword, setNewPassword] = useState("cravyo2026");
  const [confirmPassword, setConfirmPassword] = useState("cravyo2026");
  const [visibility, setVisibility] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  return (
    <CravyoSheetScreen backHref="/profile/settings" title="Password Setting">
      <PasswordField
        label="Current Password"
        value={currentPassword}
        visible={visibility.current}
        onChangeText={setCurrentPassword}
        onToggleVisibility={() =>
          setVisibility((current) => ({
            ...current,
            current: !current.current,
          }))
        }
      />

      <Pressable accessibilityRole="button" style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordLabel}>Forgot Password?</Text>
      </Pressable>

      <PasswordField
        label="New Password"
        value={newPassword}
        visible={visibility.next}
        onChangeText={setNewPassword}
        onToggleVisibility={() =>
          setVisibility((current) => ({
            ...current,
            next: !current.next,
          }))
        }
      />

      <PasswordField
        label="Confirm New Password"
        value={confirmPassword}
        visible={visibility.confirm}
        onChangeText={setConfirmPassword}
        onToggleVisibility={() =>
          setVisibility((current) => ({
            ...current,
            confirm: !current.confirm,
          }))
        }
      />

      <PrimaryPillButton label="Change Password" style={styles.formButton} />
    </CravyoSheetScreen>
  );
}

export function LogoutConfirmationScreen() {
  const router = useRouter();
  const { signOut } = useMockAuth();

  const handleLogout = () => {
    signOut();
    router.replace("/launch-1");
  };

  return (
    <View style={styles.logoutOverlay}>
      <Pressable
        accessibilityLabel="Close log out confirmation"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.logoutSheet}>
        <Text style={styles.logoutTitle}>Are you sure you want to log out?</Text>

        <View style={styles.logoutActions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={[styles.modalButton, styles.modalButtonSecondary]}
          >
            <Text style={[styles.modalButtonLabel, styles.modalButtonLabelSecondary]}>
              Cancel
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleLogout}
            style={[styles.modalButton, styles.modalButtonPrimary]}
          >
            <Text style={styles.modalButtonLabel}>Yes, logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MenuRow({
  item,
  onPress,
}: {
  item: ProfileMenuItem;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.menuRow}>
      <View style={styles.menuIconWrap}>
        <MaterialCommunityIcons color="#E97A33" name={item.iconName} size={24} />
      </View>
      <Text style={styles.menuRowLabel}>{item.label}</Text>
    </Pressable>
  );
}

function AvatarBadge({ size }: { size: number }) {
  return (
    <View
      style={[
        styles.avatarBadge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {/*
        TODO: Replace this placeholder with the exported CRAVYO profile avatar
        artwork once the design asset pack includes the final portrait images.
      */}
      <MaterialCommunityIcons color="#FFFFFF" name="account" size={size * 0.55} />
    </View>
  );
}

function ProfileAvatarCard() {
  return (
    <View style={styles.profileAvatarCard}>
      <MaterialCommunityIcons color="#FFFFFF" name="account" size={58} />
      <View style={styles.profileAvatarAction}>
        <MaterialCommunityIcons color="#FFFFFF" name="camera-outline" size={14} />
      </View>
    </View>
  );
}

function ProfileTextField({
  field,
  onChangeText,
  value,
}: {
  field: ProfileField;
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{field.label}</Text>
      <TextInput
        keyboardType={field.keyboardType ?? "default"}
        onChangeText={onChangeText}
        placeholder={field.label}
        placeholderTextColor="#B89C8A"
        style={styles.fieldInput}
        value={value}
      />
    </View>
  );
}

function PasswordField({
  label,
  onChangeText,
  onToggleVisibility,
  value,
  visible,
}: {
  label: string;
  onChangeText: (value: string) => void;
  onToggleVisibility: () => void;
  value: string;
  visible: boolean;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.passwordShell}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor="#B89C8A"
          secureTextEntry={!visible}
          style={styles.passwordInput}
          value={value}
        />

        <Pressable
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          accessibilityRole="button"
          hitSlop={10}
          onPress={onToggleVisibility}
        >
          <MaterialCommunityIcons
            color="#E77A38"
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={18}
          />
        </Pressable>
      </View>
    </View>
  );
}

function SelectionRow({
  description,
  iconName,
  isLast,
  isSelected,
  label,
  onPress,
}: {
  description: string;
  iconName: DeliveryAddress["iconName"];
  isLast: boolean;
  isSelected: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.selectionRow, !isLast ? styles.selectionDivider : null]}
    >
      <View style={styles.selectionRowLeft}>
        <MaterialCommunityIcons color="#E97B35" name={iconName} size={28} />
        <View style={styles.selectionCopy}>
          <Text style={styles.selectionTitle}>{label}</Text>
          <Text style={styles.selectionDescription}>{description}</Text>
        </View>
      </View>
      <RadioIndicator selected={isSelected} />
    </Pressable>
  );
}

function PaymentRow({
  isLast,
  isSelected,
  item,
  onPress,
}: {
  isLast: boolean;
  isSelected: boolean;
  item: PaymentMethod;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.selectionRow, !isLast ? styles.selectionDivider : null]}
    >
      <View style={styles.selectionRowLeft}>
        <MaterialCommunityIcons color="#E97B35" name={item.iconName} size={29} />
        <Text style={styles.selectionTitle}>{item.label}</Text>
      </View>
      <RadioIndicator selected={isSelected} />
    </Pressable>
  );
}

function SettingsRow({
  isLast,
  item,
  onPress,
}: {
  isLast: boolean;
  item: SettingsItem;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      onPress={onPress}
      style={[styles.selectionRow, !isLast ? styles.selectionDivider : null]}
    >
      <View style={styles.selectionRowLeft}>
        <MaterialCommunityIcons color="#E97B35" name={item.iconName} size={28} />
        <Text style={styles.selectionTitle}>{item.label}</Text>
      </View>
      <Feather color="#DF8E57" name="chevron-down" size={18} />
    </Pressable>
  );
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radioOuter, selected ? styles.radioOuterSelected : null]}>
      {selected ? <View style={styles.radioInner} /> : null}
    </View>
  );
}

function PrimaryPillButton({
  label,
  style,
}: {
  label: string;
  style?: object;
}) {
  return (
    <Pressable accessibilityRole="button" style={[styles.primaryPillButton, style]}>
      <Text style={styles.primaryPillLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuRoot: {
    flex: 1,
  },
  menuAccentPanel: {
    position: "absolute",
    top: 86,
    bottom: 0,
    left: 0,
    width: 88,
    borderTopRightRadius: 34,
    backgroundColor: "#F5C4BE",
  },
  menuAccentHandle: {
    position: "absolute",
    top: 126,
    left: 30,
    width: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F5A570",
  },
  menuBackButton: {
    position: "absolute",
    top: 18,
    left: 16,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
  },
  menuCard: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 88,
    width: "84%",
    borderTopLeftRadius: 44,
    borderBottomLeftRadius: 44,
    backgroundColor: "#F0B77D",
    paddingTop: 58,
    paddingHorizontal: 26,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4813E",
  },
  menuHeaderCopy: {
    flex: 1,
    marginLeft: 16,
  },
  menuName: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
  },
  menuEmail: {
    marginTop: 4,
    color: "rgba(255,255,255,0.86)",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
  },
  menuList: {
    marginTop: 32,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.34)",
    paddingVertical: 18,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  menuRowLabel: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "500",
  },
  logoutRow: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  logoutLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
  },
  profileAvatarSection: {
    alignItems: "center",
    marginBottom: 26,
  },
  profileAvatarCard: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 34,
    backgroundColor: "#D48B52",
  },
  profileAvatarAction: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F3B477",
    borderWidth: 2,
    borderColor: "#FFFDFC",
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    marginBottom: 10,
    color: "#2C2422",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  fieldInput: {
    borderRadius: 14,
    backgroundColor: "#FBF1E6",
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: "#4B403B",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
  passwordShell: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#FBF1E6",
    paddingHorizontal: 18,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: "#4B403B",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 18,
  },
  forgotPasswordLabel: {
    color: "#E4A56E",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
  },
  primaryPillButton: {
    alignSelf: "center",
    minWidth: 182,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#F3B477",
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  primaryPillLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  formButton: {
    marginTop: 12,
  },
  selectionList: {
    borderTopWidth: 1,
    borderTopColor: "#F3E2D5",
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 20,
  },
  selectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3E2D5",
  },
  selectionRowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  selectionCopy: {
    flex: 1,
  },
  selectionTitle: {
    color: "#2C2422",
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "700",
  },
  selectionDescription: {
    marginTop: 3,
    color: "#837068",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
  },
  radioOuter: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E8C5A5",
  },
  radioOuterSelected: {
    borderColor: "#E8AE77",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F3B477",
  },
  textOnlyButton: {
    alignSelf: "center",
    marginTop: 48,
  },
  textOnlyButtonLabel: {
    color: "#E6BA8A",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
  },
  toggleList: {
    gap: 22,
    paddingTop: 6,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  toggleLabel: {
    flex: 1,
    color: "#2C2422",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  logoutOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(37, 25, 19, 0.12)",
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  logoutSheet: {
    borderRadius: 26,
    backgroundColor: "#FFFDFC",
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 22,
  },
  logoutTitle: {
    color: "#241E1C",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  logoutActions: {
    marginTop: 24,
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 14,
  },
  modalButtonPrimary: {
    backgroundColor: "#F3B477",
  },
  modalButtonSecondary: {
    backgroundColor: "#FFF6E9",
  },
  modalButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  modalButtonLabelSecondary: {
    color: "#D5AC7D",
  },
});
