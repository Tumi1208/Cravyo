import type { AuthScreenConfig } from "./types";

export const authScreens = {
  login: {
    formId: "login",
    title: "Log In",
    backHref: "/launch-2",
    intro: {
      title: "Welcome",
      description:
        "Welcome back. Sign in to continue ordering your favorite meals quickly and easily.",
    },
    fields: [
      {
        id: "email",
        label: "Email or Mobile Number",
        type: "text",
        placeholder: "example@example.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "*************",
        autoCapitalize: "none",
        autoComplete: "password",
      },
    ],
    forgotPassword: {
      label: "Forget Password",
      href: "/(auth)/set-password",
    },
    primaryAction: {
      label: "Log In",
      href: "/(tabs)",
      framed: true,
    },
    social: {
      label: "or sign up with",
    },
    footerLink: {
      prompt: "Don't have an account?",
      actionLabel: "Sign Up",
      href: "/(auth)/sign-up",
    },
    contentTopSpacing: 24,
    primaryTopSpacing: 54,
  },
  loginAlt: {
    formId: "login-alt",
    title: "Hello!",
    backHref: "/launch-2",
    intro: {
      title: "Welcome",
    },
    fields: [
      {
        id: "email",
        label: "Email or Mobile Number",
        type: "text",
        placeholder: "example@example.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "*************",
        autoCapitalize: "none",
        autoComplete: "password",
      },
    ],
    forgotPassword: {
      label: "Forget Password",
      href: "/(auth)/set-password",
    },
    primaryAction: {
      label: "Log In",
      href: "/(tabs)",
      framed: true,
    },
    social: {
      label: "or",
    },
    footerLink: {
      prompt: "Don't have an account?",
      actionLabel: "Sign Up",
      href: "/(auth)/sign-up",
    },
    contentTopSpacing: 32,
    primaryTopSpacing: 56,
  },
  signUp: {
    formId: "sign-up",
    title: "New Account",
    backHref: "/(auth)",
    fields: [
      {
        id: "full-name",
        label: "Full name",
        type: "text",
        placeholder: "example@example.com",
        autoCapitalize: "words",
        autoComplete: "name",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "*************",
        autoCapitalize: "none",
        autoComplete: "password-new",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "example@example.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoComplete: "email",
      },
      {
        id: "mobile-number",
        label: "Mobile Number",
        type: "text",
        placeholder: "+ 123 456 789",
        keyboardType: "phone-pad",
        autoCapitalize: "none",
        autoComplete: "tel",
      },
      {
        id: "date-of-birth",
        label: "Date of birth",
        type: "text",
        placeholder: "DD / MM /YYYY",
        keyboardType: "numbers-and-punctuation",
        autoCapitalize: "none",
      },
    ],
    disclaimer: {
      lineOne: "By continuing, you agree to",
      lineTwo: "Terms of Use and Privacy Policy.",
    },
    primaryAction: {
      label: "Sign Up",
      href: "/(auth)/set-password",
      framed: true,
    },
    social: {
      label: "or sign up with",
    },
    footerLink: {
      prompt: "Already have an account?",
      actionLabel: "Log in",
      href: "/(auth)",
    },
    contentTopSpacing: 26,
    primaryTopSpacing: 14,
  },
  setPassword: {
    formId: "set-password",
    title: "Set Password",
    backHref: "/(auth)/sign-up",
    intro: {
      description:
        "Create a strong password to keep your account secure and easy to access anytime.",
    },
    fields: [
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "*************",
        autoCapitalize: "none",
        autoComplete: "password-new",
      },
      {
        id: "confirm-password",
        label: "Confirm Password",
        type: "password",
        placeholder: "*************",
        autoCapitalize: "none",
        autoComplete: "password",
      },
    ],
    primaryAction: {
      label: "Create New Password",
      href: "/(tabs)",
    },
    contentTopSpacing: 34,
    primaryTopSpacing: 46,
  },
} satisfies Record<string, AuthScreenConfig>;
