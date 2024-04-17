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

describe("Update indicator values", async () => {
  test("As an auth user, I can update the values of a custom indicator", async () => {
    const customIndicatorId = 1;

    const { data, error } = await client
      .from("indicateur_personnalise_valeurs")
      .update({
        resultat: 200,
      })
      .eq("indicateur_id", customIndicatorId)
      .eq("annee", 2023);

    expect(error).toBeNull();
    expect(data).toBeNull();
  });

  test("As an auth user, I can update the values of a predefined indicator", async () => {
    const predefinedIndicatorId = "cae_1.a";

    const { data, error } = await client
      .from("indicateur_predefini_valeurs")
      .update({
        resultat: 800,
      })
      .eq("indicateur_id", predefinedIndicatorId)
      .eq("collectivite_id", collectivityId)
      .eq("annee", 2023);

    expect(error).toBeNull();
    expect(data).toBeNull();
  });
});
