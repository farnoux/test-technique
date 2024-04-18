import { User } from "@supabase/supabase-js";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { adminClient, client } from "../lib/database/client";
import { getAuthUser, signIn, signOut } from "./shared/auth";
import { indicatorValuesSchema } from "../lib/domain/indicator-values";
import { z } from "zod";

const collectivityId = 1;
const sourceId = 1;

let user: User;

beforeAll(async () => {
  await signIn();
  user = await getAuthUser();
});

afterAll(async () => {
  await signOut();
});

describe("List indicator values without sources", async () => {
  test("List values of a custom indicator for a given collectivity", async () => {
    const customIndicatorId = "1";

    const { data, error } = await client.rpc("get_indicateur_valeurs", {
      p_indicateur_id: customIndicatorId,
      p_collectivite_id: collectivityId,
    });

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);

    const schema = z.array(indicatorValuesSchema.extend({ source: z.null() }));

    expect(schema.safeParse(data).success).toBeTruthy();
  });

  test("List values of a predefinied indicator for a given collectivity", async () => {
    const predefinedIndicatorId = "cae_1.a";

    const { data, error } = await client.rpc("get_indicateur_valeurs", {
      p_indicateur_id: predefinedIndicatorId,
      p_collectivite_id: collectivityId,
    });

    expect(error).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(2);

    const schema = z.array(indicatorValuesSchema.extend({ source: z.null() }));

    expect(schema.safeParse(data).success).toBeTruthy();
  });
});

describe("List indicator values with sources", async () => {
  afterEach(async () => {
    // Remove the association
    await adminClient.from("collectivite_source_externe").delete().match({
      collectivite_id: collectivityId,
      source_externe_id: 1,
    });
  });

  test("List values of a predefined indicator for a given collectivity with its associated sources", async () => {
    const predefinedIndicatorId = "cae_1.a";
    const expectedSchema = z.array(indicatorValuesSchema);

    const { data: dataWithoutSources } = await client.rpc(
      "get_indicateur_valeurs",
      {
        p_indicateur_id: predefinedIndicatorId,
        p_collectivite_id: collectivityId,
        p_with_sources: true,
      }
    );

    // No sources included when the collectivity is not associated with the source
    expect(dataWithoutSources).toHaveLength(2);
    expect(expectedSchema.safeParse(dataWithoutSources).success).toBeTruthy();

    // Associate the collectivity with the source
    await adminClient.from("collectivite_source_externe").insert({
      collectivite_id: collectivityId,
      source_externe_id: 1,
    });

    const { data: dataWithSources } = await client.rpc(
      "get_indicateur_valeurs",
      {
        p_indicateur_id: predefinedIndicatorId,
        p_collectivite_id: collectivityId,
        p_with_sources: true,
      }
    );

    // Sources are included when the collectivity is associated with the source
    expect(dataWithSources).toHaveLength(4);
    expect(expectedSchema.safeParse(dataWithSources).success).toBeTruthy();
  });
});
