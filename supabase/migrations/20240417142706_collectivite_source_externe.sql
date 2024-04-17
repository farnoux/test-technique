-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."collectivite_source_externe" (
    "collectivite_id" int4 NOT NULL,
    "source_externe_id" int4 NOT NULL,
    CONSTRAINT "public_collectivite_source_externe_source_externe_id_fkey" FOREIGN KEY ("source_externe_id") REFERENCES "public"."source_externe"("id"),
    CONSTRAINT "public_collectivite_source_externe_collectivite_id_fkey" FOREIGN KEY ("collectivite_id") REFERENCES "public"."collectivite"("id"),
    PRIMARY KEY ("collectivite_id","source_externe_id")
);

comment on table collectivite_source_externe is
    'Représente les sources externes importées par une collectivité';

alter table "public"."collectivite_source_externe" enable row level security;

create policy "Allow read" on "public"."collectivite_source_externe"
as permissive
for select
to authenticated
using (
    is_membre(collectivite_id)
);

