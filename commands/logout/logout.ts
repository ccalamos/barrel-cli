import { Store } from "utils";

export default function logout(): void {
  const authConfigKeys = ["accessToken", "username", "name"];
  authConfigKeys.forEach((key: string) => Store.remove(key));

  console.log("Successfully logged out!");
}
