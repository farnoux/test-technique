INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '19545cc6-3b8f-4344-b37d-83cf9c59889b', 'authenticated', 'authenticated', 'yolo@dodo.com', '$2a$10$aXvWTCSKAP6zZHebzCuCd.BGPSQK98diiUOGQEqaOAI2aZqasAO6C', '2024-04-14 19:32:12.904048 +00:00', null, '', null, '', null, '', '', null, '2024-04-14 19:32:16.336604 +00:00', '{"provider": "email", "providers": ["email"]}', '{}', null, '2024-04-14 19:32:12.898806 +00:00', '2024-04-14 19:32:16.338023 +00:00', null, null, '', '', null, '', 0, null, '', null, false, null);

INSERT INTO public.collectivite (id, nom) VALUES (1, 'Le bois joli');
INSERT INTO public.collectivite (id, nom) VALUES (2, 'Tournon');

INSERT INTO public.membre (user_id, collectivite_id) VALUES ('19545cc6-3b8f-4344-b37d-83cf9c59889b', 1);

INSERT INTO public.indicateur_predefini (id, nom, description, unite) VALUES ('cae_1.a', 'Émission de GES', 'Émissions de gaz à effet de serre globales annuelles du territoire exprimées en tonnes équivalent CO2.', 'teq CO2');
INSERT INTO public.indicateur_predefini (id, nom, description, unite) VALUES ('cae_2.a', 'Consommation énergétique territoriale', 'Cet indicateur estime la consommation énergétique finale annuelle du territoire, selon les exigences réglementaires des PCAET (décret n°2016-849 du 28 juin 2016 et arrêté du 4 août 2016 relatifs au plan climat-air-énergie territorial)', 'GWh');

INSERT INTO public.indicateur_predefini_valeurs (collectivite_id, indicateur_id, annee, resultat, objectif, commentaire) VALUES (1, 'cae_1.a', 2023, 11, 9, 'un commentaire');
INSERT INTO public.indicateur_predefini_valeurs (collectivite_id, indicateur_id, annee, resultat, objectif, commentaire) VALUES (1, 'cae_1.a', 2024, null, 8, 'un autre commentaire');

INSERT INTO public.indicateur_personnalise (id, collectivite_id, nom, description, unite) VALUES (1, 1, 'Composteurs distribués', 'Le nombre de composteurs distribués aux habitants', 'nombre');

INSERT INTO public.indicateur_personnalise_valeurs (indicateur_id, annee, resultat, objectif, commentaire) VALUES (1, 2023, 500, null, 'un commentaire');
INSERT INTO public.indicateur_personnalise_valeurs (indicateur_id, annee, resultat, objectif, commentaire) VALUES (1, 2025, null, 800, 'un autre commentaire');
