
CREATE OR REPLACE FUNCTION public.get_indicateur_valeurs(
    p_indicateur_id text,
    p_collectivite_id int
)
    RETURNS TABLE(indicateur_id text, collectivite_id int, annee int, resultat float, objectif float, commentaire text)
    LANGUAGE plpgsql
    SECURITY INVOKER
    SET search_path TO 'public'
AS $fn$
BEGIN
        
    CASE
    
    -- If id pattern is like 'cae_1.a' then query predefined indicators
    WHEN p_indicateur_id ~ '^[a-zA-Z]*_\d\.[a-zA-Z]$' THEN
        RETURN QUERY 
        SELECT v.indicateur_id, v.collectivite_id, v.annee, v.resultat, v.objectif, v.commentaire
        FROM indicateur_predefini_valeurs AS v
        WHERE v.indicateur_id = p_indicateur_id
        AND v.collectivite_id = p_collectivite_id
        ;
    
    -- Else query custom indicators
    ELSE
        
        RETURN QUERY 
        SELECT v.indicateur_id::text, i.collectivite_id, v.annee, v.resultat, v.objectif, v.commentaire
        FROM indicateur_personnalise AS i
        LEFT JOIN indicateur_personnalise_valeurs AS v
        ON i.id = v.indicateur_id
        WHERE v.indicateur_id = p_indicateur_id::int
        AND i.collectivite_id = p_collectivite_id
        ;
    
    END CASE;
    
END;
$fn$
;