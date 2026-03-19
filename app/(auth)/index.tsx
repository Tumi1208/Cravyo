import { AuthFormScreen } from "../../src/features/auth/components/AuthFormScreen";
import { authScreens } from "../../src/features/auth/mock";

export default function AuthEntryScreen() {
  return <AuthFormScreen screen={authScreens.login} />;
}
