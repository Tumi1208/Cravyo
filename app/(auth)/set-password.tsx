import { AuthFormScreen } from "../../src/features/auth/components/AuthFormScreen";
import { authScreens } from "../../src/features/auth/mock";

export default function SetPasswordScreen() {
  return <AuthFormScreen screen={authScreens.setPassword} />;
}
