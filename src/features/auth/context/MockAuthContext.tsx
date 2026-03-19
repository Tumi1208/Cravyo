import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import type { AuthFieldValues } from "../validation";

export type MockAuthSession = {
  id: string;
  identifier: string;
  fullName?: string;
  signedInAt: string;
};

export type MockSignUpDraft = {
  fullName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
};

type MockAuthContextValue = {
  session: MockAuthSession | null;
  isAuthenticated: boolean;
  signUpDraft: MockSignUpDraft | null;
  signIn: (input: { identifier: string; fullName?: string }) => void;
  signOut: () => void;
  saveSignUpDraft: (values: AuthFieldValues) => void;
  clearSignUpDraft: () => void;
};

const MockAuthContext = createContext<MockAuthContextValue | undefined>(undefined);

function buildMockSession(input: {
  identifier: string;
  fullName?: string;
}): MockAuthSession {
  return {
    id: `mock-session-${Date.now()}`,
    identifier: input.identifier.trim(),
    fullName: input.fullName?.trim() || undefined,
    signedInAt: new Date().toISOString(),
  };
}

export function MockAuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<MockAuthSession | null>(null);
  const [signUpDraft, setSignUpDraft] = useState<MockSignUpDraft | null>(null);

  const signIn = (input: { identifier: string; fullName?: string }) => {
    setSession(buildMockSession(input));
    setSignUpDraft(null);
  };

  const signOut = () => {
    setSession(null);
    setSignUpDraft(null);
  };

  const saveSignUpDraft = (values: AuthFieldValues) => {
    setSignUpDraft({
      fullName: values["full-name"]?.trim() ?? "",
      email: values.email?.trim() ?? "",
      mobileNumber: values["mobile-number"]?.trim() ?? "",
      dateOfBirth: values["date-of-birth"]?.trim() ?? "",
    });
  };

  const clearSignUpDraft = () => {
    setSignUpDraft(null);
  };

  return (
    <MockAuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        signUpDraft,
        signIn,
        signOut,
        saveSignUpDraft,
        clearSignUpDraft,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);

  if (!context) {
    throw new Error("useMockAuth must be used within a MockAuthProvider.");
  }

  return context;
}
