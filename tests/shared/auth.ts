import { client } from "../../lib/database/client";

export const testCredentials = {
  email: "yolo@dodo.com",
  password: "yolododo",
};

export function signIn(credentials?: { email: string; password: string }) {
  return client.auth.signInWithPassword(credentials ?? testCredentials);
}

export function signOut() {
  return client.auth.signOut();
}

export async function getAuthUser() {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
}
