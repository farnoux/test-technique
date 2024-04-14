begin;

create table indicateur_predefini
(
    id          text primary key,
    nom         text not null,
    description text not null,
    unite       text not null
);
comment on table indicateur_predefini is
    'Représente un indicateur prédéfini, disponible chaque collectivités '
        '- ex: les émissions GES. '
        'Seul le service role peut modifier ces indicateurs.';
alter table indicateur_predefini
    enable row level security;
create policy enable_read on indicateur_predefini for select using (true);
comment on policy enable_read on indicateur_predefini is
    'Tout le monde peut lire les indicateurs prédéfinis.';

create table indicateur_predefini_valeurs
(
    collectivite_id int references collectivite          not null,
    indicateur_id   text references indicateur_predefini not null,
    annee           int                                  not null,
    resultat        float,
    objectif        float,
    commentaire     text,
    primary key (collectivite_id, indicateur_id, annee)
);
comment on table indicateur_predefini_valeurs is
    'Représente les valeurs des indicateurs personnalisés pour chaque collectivité et chaque année';
alter table indicateur_predefini_valeurs
    enable row level security;
create policy allow_all on indicateur_predefini_valeurs for all
    using (is_membre(collectivite_id));
comment on policy allow_all on indicateur_predefini_valeurs is
    'Permet toutes les actions CRUD aux membres de la collectivité.';

commit;
