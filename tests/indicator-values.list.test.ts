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

describe("List indicators' values", async () => {
  test("As an auth user, I can list the values of a custom indicator for a given collectivity", async () => {
    const customIndicatorId = "1";

    const { data, error } = await client.rpc("get_indicateur_valeurs", {
      p_indicateur_id: customIndicatorId,
      p_collectivite_id: collectivityId,
    });

    console.log(error, data);

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);
  });

  test("As a collectivity member, I can list the values of a predefinied indicator without its sources", async () => {
    const predefinedIndicatorId = "cae_1.a";

    const { data, error } = await client.rpc("get_indicateur_valeurs", {
      p_indicateur_id: predefinedIndicatorId,
      p_collectivite_id: collectivityId,
    });

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);
  });

  test("As a collectivity member, I can list the values of a predefinied indicator with its sources", async () => {
    const predefinedIndicatorId = "cae_1.a";

    const { data, error } = await client.rpc("get_indicateur_valeurs", {
      p_indicateur_id: predefinedIndicatorId,
      p_collectivite_id: collectivityId,
      p_with_sources: true,
    });

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(4);
  });
});
