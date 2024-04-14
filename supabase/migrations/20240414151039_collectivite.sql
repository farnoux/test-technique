begin;

create table collectivite
(
    id  serial primary key,
    nom text not null
);
comment on table collectivite is
    'Une collectivité nommée. '
        'Seul le service role peut écrire dans cette table.';

alter table collectivite
    enable row level security;
create policy allow_read on collectivite for select using (true);
comment on policy allow_read on collectivite is
    'Tout le monde peut lire les collectivités.';

commit;
