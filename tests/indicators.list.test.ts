import { User } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { client } from "../lib/database/client";
import { getAuthUser, signIn, signOut } from "./shared/auth";

const collectivityId = 1;
let user: User;

beforeAll(async () => {
  await signIn();
  user = await getAuthUser();
});

afterAll(async () => {
  await signOut();
});

describe("List indicators", async () => {
  test("As an auth user, I can list both predefined and custom indicators for a given collectivity", async () => {
    const { data, error } = await client
      .from("indicateur_par_collectivite")
      .select(`*`)
      .eq("collectivite_id", collectivityId);

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);
    expect(data).toContainEqual({
      id: expect.any(String),
      collectivite_id: expect.any(Number),
      nom: expect.any(String),
      description: expect.any(String),
      unite: expect.any(String),
    });
  });

});
