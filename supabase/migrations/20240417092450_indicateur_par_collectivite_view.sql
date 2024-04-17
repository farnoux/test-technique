
CREATE OR REPLACE VIEW indicateur_par_collectivite
WITH (security_invoker = ON)
AS
  SELECT DISTINCT i.id, v.collectivite_id, i.nom, i.description, i.unite
  FROM indicateur_predefini AS i
  LEFT JOIN indicateur_predefini_valeurs AS v
    ON i.id = v.indicateur_id
  
  UNION ALL

  SELECT i.id::text, i.collectivite_id, i.nom, i.description, i.unite
  FROM indicateur_personnalise AS i
  ;

