begin;

create table indicateur_personnalise
(
    id              serial primary key,
    collectivite_id int references collectivite not null,
    nom             text                        not null,
    description     text                        not null,
    unite           text
);
comment on table indicateur_personnalise is
    'Représente un indicateur crée par une collectivité '
        '- ex: nombre de composteurs distribués';
alter table indicateur_personnalise
    enable row level security;
create policy allow_all on indicateur_personnalise for all
    using (is_membre(collectivite_id));
comment on policy allow_all on indicateur_personnalise is
    'Permet toutes les actions CRUD aux membres de la collectivité.';

create table indicateur_personnalise_valeurs
(
    indicateur_id int references indicateur_personnalise not null,
    annee         int                                    not null,
    resultat      float,
    objectif      float,
    commentaire   text,
    unique (indicateur_id, annee)
);
comment on table indicateur_personnalise_valeurs is
    'Représente les valeurs des indicateurs personnalisés pour chaque collectivité et chaque année';
alter table indicateur_personnalise_valeurs
    enable row level security;
create policy allow_all on indicateur_personnalise_valeurs for all
    using (is_membre((select ip.collectivite_id
                      from indicateur_personnalise ip
                      where ip.id = indicateur_personnalise_valeurs.indicateur_id)));
comment on policy allow_all on indicateur_personnalise_valeurs is
    'Permet toutes les actions CRUD aux membres de la collectivité à laquelle l''indicateur appartient.';

commit;
