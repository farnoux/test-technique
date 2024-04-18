import { z } from "zod";

export const indicatorValuesSchema = z.object({
  indicateur_id: z.string(),
  source: z.string().nullable(),
  annee: z.number(),
  resultat: z.number().nullable(),
  objectif: z.number().nullable(),
  commentaire: z.string().nullable(),
});
