import { User } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { client } from "../lib/database/client";
import { getAuthUser, signIn, signOut } from "./shared/auth";

let user: User;

beforeAll(async () => {
  await signIn();
  user = await getAuthUser();
});

afterAll(async () => {
  await signOut();
});

describe("List collectivities", async () => {
  test("As an auth user, I can list the collectivities that I am a member of", async () => {
    const { data, error } = await client
      .from("collectivite")
      .select(`id, nom, membre!inner()`)
      .eq("membre.user_id", user.id);

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(1);
  });

  test("As a random user, I can list all the existing collectivities", async () => {
    const { data, error } = await client.from("collectivite").select(`id, nom`);

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);
  });
});
