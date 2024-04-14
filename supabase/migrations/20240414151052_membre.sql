begin;

create table membre
(
    user_id         uuid references auth.users  not null,
    collectivite_id int references collectivite not null,
    primary key (user_id, collectivite_id)
);
comment on table membre is
    'Un utilisateur est membre de la collectivité si il est rattaché à une collectivité dans cette table. '
        'Seul le service role peut ajouter des membres.';

alter table membre
    enable row level security;

create policy allow_read on membre for select using (user_id = auth.uid());
comment on policy allow_read on membre is
    'Permet à l''utilisateur de sélectionner les collectivités dont il est membre.';

create function
    is_membre(collectivite_id int)
    returns boolean
    volatile
    security invoker
begin
    atomic
    select exists(select 1
                  from membre m
                  where auth.uid() = m.user_id
                    and m.collectivite_id = $1);
end;
comment on function is_membre is
    'Vrai si l''utilisateur est membre de la collectivité.';

commit;
