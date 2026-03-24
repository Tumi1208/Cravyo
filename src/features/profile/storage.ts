import AsyncStorage from "@react-native-async-storage/async-storage";

import { PROFILE_STORAGE_KEY } from "./constants";
import { notificationSettings, paymentMethods, profileFields } from "./mock";
import type {
  NotificationSettingValues,
  PaymentMethod,
  ProfileFormValues,
  ProfileImageKey,
  ProfileStorageState,
  StoredProfileDetails,
  StoredPaymentMethods,
} from "./types";

export const defaultProfileImageKey: ProfileImageKey = "default";

type ProfileDetailsListener = () => void;

const defaultProfileFieldValues = profileFields.reduce<ProfileFormValues>((result, field) => {
  result[field.id] = field.value;
  return result;
}, {});

const defaultNotificationValues = notificationSettings.reduce<NotificationSettingValues>(
  (result, item) => {
    result[item.id] = item.enabled;
    return result;
  },
  {},
);

const defaultSelectedPaymentMethodId =
  paymentMethods.find((item) => item.isSelected)?.id ?? paymentMethods[0]?.id ?? "";

let cachedStoredProfile = createDefaultProfileStorageState().profile;
const profileDetailsListeners = new Set<ProfileDetailsListener>();

function normalizePaymentMethods(methods: PaymentMethod[], selectedId: string) {
  return methods.map((item) => ({
    ...item,
    isSelected: item.id === selectedId,
  }));
}

function createDefaultStoredPaymentMethods(): StoredPaymentMethods {
  return {
    methods: normalizePaymentMethods(paymentMethods, defaultSelectedPaymentMethodId),
    selectedId: defaultSelectedPaymentMethodId,
  };
}

function createDefaultProfileStorageState(): ProfileStorageState {
  return {
    notifications: { ...defaultNotificationValues },
    paymentMethods: createDefaultStoredPaymentMethods(),
    profile: {
      fields: {},
      imageKey: defaultProfileImageKey,
    },
  };
}

function notifyProfileDetailsListeners() {
  profileDetailsListeners.forEach((listener) => listener());
}

function setCachedStoredProfile(profile: ProfileStorageState["profile"]) {
  cachedStoredProfile = {
    fields: { ...profile.fields },
    imageKey: resolveProfileImageKey(profile.imageKey),
  };

  notifyProfileDetailsListeners();
}

function resolveStoredProfileDetails(
  profile: Partial<ProfileStorageState["profile"]> | undefined,
  defaultFields?: ProfileFormValues,
): StoredProfileDetails {
  return {
    fields: {
      ...(defaultFields ?? defaultProfileFieldValues),
      ...(profile?.fields ?? {}),
    },
    imageKey: resolveProfileImageKey(profile?.imageKey),
  };
}

function resolveProfileImageKey(imageKey?: string): ProfileImageKey {
  if (imageKey === "pizza" || imageKey === "burger") {
    return imageKey;
  }

  return defaultProfileImageKey;
}

function resolveStoredPaymentMethods(state?: Partial<StoredPaymentMethods>): StoredPaymentMethods {
  const methods =
    state?.methods && state.methods.length
      ? state.methods.map((item) => ({
          ...item,
          iconName: item.iconName ?? "credit-card-outline",
        }))
      : paymentMethods;

  const preferredSelectedId = state?.selectedId ?? methods[0]?.id ?? defaultSelectedPaymentMethodId;
  const selectedId = methods.some((item) => item.id === preferredSelectedId)
    ? preferredSelectedId
    : methods[0]?.id ?? defaultSelectedPaymentMethodId;

  return {
    methods: normalizePaymentMethods(methods, selectedId),
    selectedId,
  };
}

async function readProfileStorageState() {
  try {
    const rawValue = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

    if (!rawValue) {
      return createDefaultProfileStorageState();
    }

    const parsed = JSON.parse(rawValue) as Partial<ProfileStorageState>;

    const nextState = {
      notifications: {
        ...defaultNotificationValues,
        ...(parsed.notifications ?? {}),
      },
      paymentMethods: resolveStoredPaymentMethods(parsed.paymentMethods),
      profile: {
        fields: parsed.profile?.fields ?? {},
        imageKey: resolveProfileImageKey(parsed.profile?.imageKey),
      },
    } satisfies ProfileStorageState;

    cachedStoredProfile = {
      fields: { ...nextState.profile.fields },
      imageKey: nextState.profile.imageKey,
    };

    return nextState;
  } catch {
    return createDefaultProfileStorageState();
  }
}

async function writeProfileStorageState(state: ProfileStorageState) {
  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
}

export async function loadNotificationSettingValues() {
  const state = await readProfileStorageState();
  return state.notifications;
}

export async function saveNotificationSettingValues(values: NotificationSettingValues) {
  const currentState = await readProfileStorageState();

  await writeProfileStorageState({
    ...currentState,
    notifications: {
      ...defaultNotificationValues,
      ...values,
    },
  });
}

export async function loadStoredPaymentMethods() {
  const state = await readProfileStorageState();
  return state.paymentMethods;
}

export async function saveStoredPaymentMethods(
  methods: PaymentMethod[],
  selectedId: string,
) {
  const currentState = await readProfileStorageState();

  await writeProfileStorageState({
    ...currentState,
    paymentMethods: resolveStoredPaymentMethods({
      methods,
      selectedId,
    }),
  });
}

export async function addStoredPaymentMethod(method: PaymentMethod) {
  const currentPaymentMethods = await loadStoredPaymentMethods();
  const nextMethods = normalizePaymentMethods(
    [method, ...currentPaymentMethods.methods.filter((item) => item.id !== method.id)],
    method.id,
  );

  await saveStoredPaymentMethods(nextMethods, method.id);

  return {
    methods: nextMethods,
    selectedId: method.id,
  } satisfies StoredPaymentMethods;
}

export async function loadStoredProfileDetails(defaultFields?: ProfileFormValues) {
  const state = await readProfileStorageState();
  return resolveStoredProfileDetails(state.profile, defaultFields);
}

export async function saveStoredProfileDetails(
  fields: ProfileFormValues,
  imageKey: ProfileImageKey,
) {
  const currentState = await readProfileStorageState();
  const nextStoredProfile: ProfileStorageState["profile"] = {
    fields: {
      ...defaultProfileFieldValues,
      ...fields,
    },
    imageKey: resolveProfileImageKey(imageKey),
  };

  setCachedStoredProfile(nextStoredProfile);

  await writeProfileStorageState({
    ...currentState,
    profile: nextStoredProfile,
  });
}

export function getCachedStoredProfileDetails(defaultFields?: ProfileFormValues) {
  return resolveStoredProfileDetails(cachedStoredProfile, defaultFields);
}

export function subscribeToStoredProfileDetails(listener: ProfileDetailsListener) {
  profileDetailsListeners.add(listener);

  return () => {
    profileDetailsListeners.delete(listener);
  };
}

export async function syncStoredProfileDetails(defaultFields?: ProfileFormValues) {
  const state = await readProfileStorageState();
  const nextProfileDetails = resolveStoredProfileDetails(state.profile, defaultFields);

  setCachedStoredProfile(state.profile);

  return nextProfileDetails;
}

export function createMaskedCardLabel(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "");
  const lastFourDigits = digits.slice(-4).padStart(4, "0");

  return `*** *** *** ${lastFourDigits}`;
}
