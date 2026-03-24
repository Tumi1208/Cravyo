import AsyncStorage from "@react-native-async-storage/async-storage";

import { PROFILE_STORAGE_KEY } from "./constants";
import { notificationSettings, paymentMethods, profileFields } from "./mock";
import type {
  NotificationSettingValues,
  PaymentMethod,
  ProfileFormValues,
  ProfileImageKey,
  ProfileStorageState,
  StoredPaymentMethods,
} from "./types";

export const defaultProfileImageKey: ProfileImageKey = "default";

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

    return {
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

  return {
    fields: {
      ...(defaultFields ?? defaultProfileFieldValues),
      ...state.profile.fields,
    },
    imageKey: state.profile.imageKey,
  };
}

export async function saveStoredProfileDetails(
  fields: ProfileFormValues,
  imageKey: ProfileImageKey,
) {
  const currentState = await readProfileStorageState();

  await writeProfileStorageState({
    ...currentState,
    profile: {
      fields: {
        ...defaultProfileFieldValues,
        ...fields,
      },
      imageKey,
    },
  });
}

export function createMaskedCardLabel(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "");
  const lastFourDigits = digits.slice(-4).padStart(4, "0");

  return `*** *** *** ${lastFourDigits}`;
}
