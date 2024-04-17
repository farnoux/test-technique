
CREATE TABLE "public"."source_externe" (
    "id" int4 NOT NULL,
    "nom" text NOT NULL,
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX source_externe_nom_key ON public.source_externe USING btree (nom)

COMMENT ON TABLE "public"."source_externe" IS 'Valeurs des indicateurs externes pour chaque source et chaque année';


CREATE TABLE "public"."indicateur_source_externe_valeurs" (
    "source_id" int4 NOT NULL,
    "indicateur_id" text NOT NULL,
    "annee" int4 NOT NULL,
    "resultat" float8,
    "objectif" float8,
    "commentaire" text,
    CONSTRAINT "indicateur_predefini_valeurs_collectivite_id_fkey" FOREIGN KEY ("source_id") REFERENCES "public"."source_externe"("id"),
    CONSTRAINT "indicateur_predefini_valeurs_indicateur_id_fkey" FOREIGN KEY ("indicateur_id") REFERENCES "public"."indicateur_predefini"("id"),
    PRIMARY KEY ("source_id","indicateur_id","annee")
);

COMMENT ON TABLE "public"."indicateur_source_externe_valeurs" IS 'Valeurs des indicateurs predefini pour chaque source externe et chaque année';
