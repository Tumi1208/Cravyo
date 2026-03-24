import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
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
import {
  addStoredPaymentMethod,
  createMaskedCardLabel,
  defaultProfileImageKey,
  getCachedStoredProfileDetails,
  loadNotificationSettingValues,
  loadStoredPaymentMethods,
  saveNotificationSettingValues,
  saveStoredPaymentMethods,
  saveStoredProfileDetails,
  subscribeToStoredProfileDetails,
  syncStoredProfileDetails,
} from "./storage";
import type {
  DeliveryAddress,
  NotificationSettingValues,
  PaymentMethod,
  ProfileField,
  ProfileFormValues,
  ProfileImageKey,
  ProfileMenuItem,
  SettingsItem,
} from "./types";

function showProfileNotice(title: string, message: string) {
  Alert.alert(title, message);
}

const defaultNotificationValues = notificationSettings.reduce<NotificationSettingValues>(
  (result, item) => {
    result[item.id] = item.enabled;
    return result;
  },
  {},
);

const defaultPaymentMethodId =
  paymentMethods.find((item) => item.isSelected)?.id ?? paymentMethods[0]?.id ?? "";

const profileImageSources: Record<Exclude<ProfileImageKey, "default">, ImageSourcePropType> = {
  pizza: require("../../../assets/images/foods/pizza-1.jpg"),
  burger: require("../../../assets/images/foods/burger-1.jpg"),
};

function createProfileFieldDefaults(fullName?: string, email?: string) {
  const defaults = profileFields.reduce<ProfileFormValues>((result, field) => {
    result[field.id] = field.value;
    return result;
  }, {});

  if (fullName) {
    defaults["full-name"] = fullName;
  }

  if (email) {
    defaults.email = email;
  }

  return defaults;
}

function formatCardPreviewNumber(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "").slice(0, 16);
  const groupedDigits = digits.match(/.{1,4}/g)?.join(" ") ?? "";

  return groupedDigits || "0000 0000 0000 0000";
}

function formatExpiryDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function useSharedProfileDetails(session?: {
  fullName?: string;
  identifier?: string;
} | null) {
  const isFocused = useIsFocused();
  const defaultFullName = session?.fullName?.trim() || profileUser.fullName;
  const defaultEmail = session?.identifier?.trim() || profileUser.email;
  const [profileDetails, setProfileDetails] = useState(() =>
    getCachedStoredProfileDetails(createProfileFieldDefaults(defaultFullName, defaultEmail)),
  );

  useEffect(() => {
    const defaultFields = createProfileFieldDefaults(defaultFullName, defaultEmail);

    setProfileDetails(getCachedStoredProfileDetails(defaultFields));

    const unsubscribe = subscribeToStoredProfileDetails(() => {
      setProfileDetails(getCachedStoredProfileDetails(defaultFields));
    });

    return unsubscribe;
  }, [defaultEmail, defaultFullName]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let isMounted = true;
    const defaultFields = createProfileFieldDefaults(defaultFullName, defaultEmail);

    void syncStoredProfileDetails(defaultFields).then((nextProfileDetails) => {
      if (!isMounted) {
        return;
      }

      setProfileDetails(nextProfileDetails);
    });

    return () => {
      isMounted = false;
    };
  }, [defaultEmail, defaultFullName, isFocused]);

  return profileDetails;
}

export function ProfileMenuScreen() {
  const router = useRouter();
  const { session } = useMockAuth();
  const profileDetails = useSharedProfileDetails(session);
  const fullName = profileDetails.fields["full-name"] ?? "";
  const email = profileDetails.fields.email ?? "";
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <ReferenceScreenShell backgroundColor="#F9A45F">
      <View style={styles.menuRoot}>
        <View style={styles.menuAccentPanel} />
        <View style={styles.menuAccentHandle} />

        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={10}
          onPress={handleBack}
          style={styles.menuBackButton}
        >
          <Feather color="#D2783B" name="chevron-left" size={20} />
        </Pressable>

        <View style={styles.menuCard}>
          <View style={styles.menuHeader}>
            <AvatarBadge imageKey={profileDetails.imageKey} size={44} />

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
  const isFocused = useIsFocused();
  const profileDetails = useSharedProfileDetails(session);
  const [fields, setFields] = useState<ProfileFormValues>(() => profileDetails.fields);
  const [imageKey, setImageKey] = useState<ProfileImageKey>(profileDetails.imageKey);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    setFields(profileDetails.fields);
    setImageKey(profileDetails.imageKey);
  }, [isFocused, profileDetails]);

  const updateField = (fieldId: string, value: string) => {
    setFields((current) => ({
      ...current,
      [fieldId]: value,
    }));
  };

  const handleSelectProfileImage = () => {
    Alert.alert("Profile Photo", "Select a mock photo to save locally.", [
      {
        text: "Pizza",
        onPress: () => setImageKey("pizza"),
      },
      {
        text: "Burger",
        onPress: () => setImageKey("burger"),
      },
      {
        text: "Default",
        onPress: () => setImageKey(defaultProfileImageKey),
      },
    ]);
  };

  const handleUpdateProfile = async () => {
    await saveStoredProfileDetails(fields, imageKey);
    showProfileNotice("Profile Updated", "Your profile details were saved locally in this prototype.");
  };

  return (
    <CravyoSheetScreen backHref="/profile" title="My Profile">
      <View style={styles.profileAvatarSection}>
        <ProfileAvatarCard imageKey={imageKey} onPress={handleSelectProfileImage} />
      </View>

      {profileFields.map((field) => (
        <ProfileTextField
          field={field}
          key={field.id}
          value={fields[field.id] ?? ""}
          onChangeText={(value) => updateField(field.id, value)}
        />
      ))}

      <PrimaryPillButton
        label="Update Profile"
        onPress={handleUpdateProfile}
        style={styles.formButton}
      />
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

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          showProfileNotice(
            "Add New Address",
            "Adding a new delivery address is not available in this prototype yet.",
          )
        }
        style={styles.textOnlyButton}
      >
        <Text style={styles.textOnlyButtonLabel}>Add New Address</Text>
      </Pressable>
    </CravyoSheetScreen>
  );
}

export function PaymentMethodsScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(defaultPaymentMethodId);
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let isMounted = true;

    void loadStoredPaymentMethods().then((storedPaymentMethods) => {
      if (!isMounted) {
        return;
      }

      setMethods(storedPaymentMethods.methods);
      setSelectedId(storedPaymentMethods.selectedId);
    });

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const handleSelectPaymentMethod = (paymentMethodId: string) => {
    setSelectedId(paymentMethodId);
    setMethods((current) => {
      const nextMethods = current.map((item) => ({
        ...item,
        isSelected: item.id === paymentMethodId,
      }));

      void saveStoredPaymentMethods(nextMethods, paymentMethodId);

      return nextMethods;
    });
  };

  return (
    <CravyoSheetScreen backHref="/profile" title="Payment Methods">
      <View style={styles.selectionList}>
        {methods.map((item, index) => (
          <PaymentRow
            isLast={index === methods.length - 1}
            isSelected={item.id === selectedId}
            item={item}
            key={item.id}
            onPress={() => handleSelectPaymentMethod(item.id)}
          />
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/profile/add-card")}
        style={styles.textOnlyButton}
      >
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
              onPress={
                href
                  ? () => router.push(href)
                  : () =>
                      showProfileNotice(
                        "Delete Account",
                        "Account deletion is not available in this prototype yet.",
                      )
              }
            />
          );
        })}
      </View>
    </CravyoSheetScreen>
  );
}

export function NotificationSettingScreen() {
  const isFocused = useIsFocused();
  const [values, setValues] = useState<NotificationSettingValues>(defaultNotificationValues);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    let isMounted = true;

    void loadNotificationSettingValues().then((storedValues) => {
      if (!isMounted) {
        return;
      }

      setValues(storedValues);
    });

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const toggleValue = (settingId: string, nextValue: boolean) => {
    setValues((current) => {
      const nextValues = {
        ...current,
        [settingId]: nextValue,
      };

      void saveNotificationSettingValues(nextValues);

      return nextValues;
    });
  };

  return (
    <CravyoSheetScreen backHref="/profile/settings" title="Notification Setting">
      <View style={styles.toggleList}>
        {notificationSettings.map((item) => (
          <View key={item.id} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{item.label}</Text>
            <Switch
              ios_backgroundColor="#F6E2D2"
              onValueChange={(nextValue) => toggleValue(item.id, nextValue)}
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const handleChangePassword = () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      showProfileNotice("Missing Information", "Complete all password fields before saving.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showProfileNotice("Passwords Do Not Match", "Enter the same new password twice.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showProfileNotice("Password Changed", "Your password was updated locally in this prototype.");
  };

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

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          showProfileNotice(
            "Forgot Password",
            "Use the password recovery flow from the login screen to reset your password.",
          )
        }
        style={styles.forgotPasswordButton}
      >
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

      <PrimaryPillButton
        label="Change Password"
        onPress={handleChangePassword}
        style={styles.formButton}
      />
    </CravyoSheetScreen>
  );
}

export function AddCardScreen() {
  const router = useRouter();
  const { session } = useMockAuth();
  const profileDetails = useSharedProfileDetails(session);
  const defaultCardHolderName = profileDetails.fields["full-name"] ?? "";
  const [cardHolderName, setCardHolderName] = useState(defaultCardHolderName);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setCardHolderName((current) => (current.trim() ? current : defaultCardHolderName));
  }, [defaultCardHolderName]);

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/profile/payment-methods");
  };

  const handleSaveCard = async () => {
    if (!cardHolderName.trim() || !cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
      showProfileNotice("Missing Information", "Complete all card fields before saving.");
      return;
    }

    const nextPaymentMethod: PaymentMethod = {
      id: `card-${Date.now()}`,
      label: createMaskedCardLabel(cardNumber),
      iconName: "credit-card-outline",
      isSelected: true,
    };

    await addStoredPaymentMethod(nextPaymentMethod);

    Alert.alert("Card Saved", "Your new card was saved locally in this prototype.", [
      {
        text: "OK",
        onPress: handleClose,
      },
    ]);
  };

  return (
    <CravyoSheetScreen backHref="/profile/payment-methods" title="Add Card">
      <CardPreview
        cardHolderName={cardHolderName}
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        fallbackCardHolderName={defaultCardHolderName}
      />

      <LabeledTextField
        autoCapitalize="words"
        label="Card holder name"
        onChangeText={setCardHolderName}
        placeholder="John Smith"
        value={cardHolderName}
      />

      <LabeledTextField
        autoCapitalize="none"
        keyboardType="number-pad"
        label="Card Number"
        onChangeText={(value) =>
          setCardNumber(value.replace(/[^\d ]/g, "").slice(0, 19))
        }
        placeholder="0000 0000 0000 0000"
        value={cardNumber}
      />

      <View style={styles.inlineFieldRow}>
        <LabeledTextField
          autoCapitalize="none"
          containerStyle={styles.inlineField}
          keyboardType="number-pad"
          label="Expiry Date"
          onChangeText={(value) => setExpiryDate(formatExpiryDateInput(value))}
          placeholder="04/28"
          value={expiryDate}
        />

        <LabeledTextField
          autoCapitalize="none"
          containerStyle={styles.inlineField}
          keyboardType="number-pad"
          label="CVV"
          onChangeText={(value) => setCvv(value.replace(/\D/g, "").slice(0, 4))}
          placeholder="0000"
          value={cvv}
        />
      </View>

      <PrimaryPillButton label="Save Card" onPress={handleSaveCard} style={styles.formButton} />
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

function AvatarBadge({
  imageKey,
  size,
}: {
  imageKey: ProfileImageKey;
  size: number;
}) {
  const imageSource = imageKey === "default" ? null : profileImageSources[imageKey];

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
      {imageSource ? (
        <Image resizeMode="cover" source={imageSource} style={styles.avatarBadgeImage} />
      ) : (
        /*
          TODO: Replace this placeholder with the exported CRAVYO profile avatar
          artwork once the design asset pack includes the final portrait images.
        */
        <MaterialCommunityIcons color="#FFFFFF" name="account" size={size * 0.55} />
      )}
    </View>
  );
}

function ProfileAvatarCard({
  imageKey,
  onPress,
}: {
  imageKey: ProfileImageKey;
  onPress: () => void;
}) {
  const imageSource = imageKey === "default" ? null : profileImageSources[imageKey];

  return (
    <View style={styles.profileAvatarCard}>
      {imageSource ? (
        <Image resizeMode="cover" source={imageSource} style={styles.profileAvatarImage} />
      ) : (
        <MaterialCommunityIcons color="#FFFFFF" name="account" size={58} />
      )}

      <Pressable
        accessibilityLabel="Change profile photo"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onPress}
        style={styles.profileAvatarAction}
      >
        <MaterialCommunityIcons color="#FFFFFF" name="camera-outline" size={14} />
      </Pressable>
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
    <LabeledTextField
      autoCapitalize={field.id === "full-name" ? "words" : "none"}
      keyboardType={field.keyboardType}
      label={field.label}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

function LabeledTextField({
  autoCapitalize,
  containerStyle,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value,
}: {
  autoCapitalize?: "characters" | "none" | "sentences" | "words";
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: "default" | "email-address" | "number-pad" | "phone-pad";
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <View style={[styles.fieldGroup, containerStyle]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize ?? "none"}
        autoCorrect={false}
        keyboardType={keyboardType ?? "default"}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor="#B89C8A"
        style={styles.fieldInput}
        value={value}
      />
    </View>
  );
}

function CardPreview({
  cardHolderName,
  cardNumber,
  expiryDate,
  fallbackCardHolderName,
}: {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  fallbackCardHolderName: string;
}) {
  return (
    <View style={styles.cardPreview}>
      <View style={styles.cardPreviewAccent} />
      <View style={styles.cardPreviewTopRow}>
        <View style={styles.cardPreviewChip} />
        <View style={styles.cardPreviewMark} />
      </View>

      <Text style={styles.cardPreviewNumber}>{formatCardPreviewNumber(cardNumber)}</Text>

      <View style={styles.cardPreviewDetails}>
        <View>
          <Text style={styles.cardPreviewCaption}>Card Holder Name</Text>
          <Text numberOfLines={1} style={styles.cardPreviewValue}>
            {cardHolderName.trim() || fallbackCardHolderName}
          </Text>
        </View>

        <View>
          <Text style={styles.cardPreviewCaption}>Expiry Date</Text>
          <Text style={styles.cardPreviewValue}>{expiryDate.trim() || "04/28"}</Text>
        </View>
      </View>
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
          autoCapitalize="none"
          autoCorrect={false}
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
      onPress={onPress}
      style={[styles.selectionRow, !isLast ? styles.selectionDivider : null]}
    >
      <View style={styles.selectionRowLeft}>
        <MaterialCommunityIcons color="#E97B35" name={item.iconName} size={28} />
        <Text style={styles.selectionTitle}>{item.label}</Text>
      </View>
      <Feather color="#DF8E57" name="chevron-right" size={18} />
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
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.primaryPillButton, style]}>
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
    overflow: "hidden",
  },
  avatarBadgeImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
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
    overflow: "hidden",
  },
  profileAvatarImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
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
  inlineFieldRow: {
    flexDirection: "row",
    gap: 14,
  },
  inlineField: {
    flex: 1,
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
  cardPreview: {
    marginBottom: 30,
    borderRadius: 28,
    backgroundColor: "#3F8158",
    overflow: "hidden",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 24,
  },
  cardPreviewAccent: {
    position: "absolute",
    top: -42,
    left: -28,
    width: 210,
    height: 120,
    borderRadius: 40,
    backgroundColor: "#F2B37A",
    transform: [{ rotate: "-18deg" }],
  },
  cardPreviewTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPreviewChip: {
    width: 34,
    height: 24,
    borderRadius: 7,
    backgroundColor: "#F5C78A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  cardPreviewMark: {
    width: 46,
    height: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#F8EBDD",
  },
  cardPreviewNumber: {
    marginTop: 40,
    color: "#FFF9F2",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  cardPreviewDetails: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  cardPreviewCaption: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  cardPreviewValue: {
    marginTop: 4,
    color: "#FFF9F2",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
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
