import { User } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { adminClient, client } from "../lib/database/client";
import { getAuthUser, signIn, signOut } from "./shared/auth";

const collectivityId = 1;
const sourceId = 1;
const indicatorId = "cae_1.a";
const annee = 2025;

let user: User;

beforeAll(async () => {
  await signIn();
  user = await getAuthUser();
});

afterAll(async () => {
  await signOut();

  // Remove the inserted value
  await adminClient
    .from("indicateur_source_externe_valeurs")
    .delete()
    .match({ indicateur_id: indicatorId, annee: annee, source_id: sourceId });
});

describe("Insert indicator values", async () => {
  test("As an auth user, I cannot insert values of an external source indicators", async () => {
    const { data, error } = await client
      .from("indicateur_source_externe_valeurs")
      .insert({
        indicateur_id: indicatorId,
        resultat: 200,
        annee: annee,
        objectif: 300,
        source_id: sourceId,
      });

    // Expect insert to fail
    expect(data).toBeNull();
    expect(error).toMatchObject({
      message: expect.any(String),
      code: expect.any(String),
    });
  });

  test("As an admin user, I can insert values of an external source indicators", async () => {
    const { data, error } = await adminClient
      .from("indicateur_source_externe_valeurs")
      .insert({
        indicateur_id: indicatorId,
        resultat: 200,
        annee: annee,
        objectif: 300,
        source_id: sourceId,
      });

    // Expect insert to success
    expect(error).toBeNull();
    expect(data).toBeNull();
  });
});
