import { describe, expect, test } from "vitest";
import { client } from "../lib/database/client";
import { signIn, testCredentials } from "./shared/auth";
import { AuthApiError } from "@supabase/supabase-js";

describe("User can sign in", () => {
  test("Get user when credentials are correct", async () => {
    const result = await signIn();

    expect(result.error).toBeNull();
    expect(result.data.user).toMatchObject({
      email: testCredentials.email,
      role: "authenticated",
    });
  });

  test("Get error when credentials are incorrect", async () => {
    const badCredentials = {
      email: "bad@bad.fr",
      password: "bad",
    };

    const result = await signIn(badCredentials);

    expect(result.error).toBeInstanceOf(AuthApiError);
    expect(result.data).toMatchObject({
      user: null,
      session: null,
    });
  });
});
