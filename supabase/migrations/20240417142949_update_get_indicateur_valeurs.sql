
drop function if exists "public"."get_indicateur_valeurs"(p_indicateur_id text, p_collectivite_id integer);

CREATE OR REPLACE FUNCTION public.get_indicateur_valeurs(
	p_indicateur_id text,
	p_collectivite_id int,
	p_with_sources boolean default false
)
	RETURNS TABLE(indicateur_id text, source text, annee int, resultat float, objectif float, commentaire text)
	LANGUAGE plpgsql
	SECURITY INVOKER
	SET search_path TO 'public'
AS $fn$
BEGIN
	
	-- If id pattern is like 'cae_1.a' then query predefined indicators
	IF p_indicateur_id ~ '^[a-zA-Z]*_\d\.[a-zA-Z]$' THEN
		
		
		IF p_with_sources THEN 
			
			RETURN QUERY
			
			SELECT v.indicateur_id, NULL as source, v.annee, v.resultat, v.objectif, v.commentaire
			FROM indicateur_predefini_valeurs AS v
			WHERE v.indicateur_id = p_indicateur_id
			AND v.collectivite_id = p_collectivite_id
			
			UNION ALL 
			
			SELECT ext_v.indicateur_id, s.nom AS source, ext_v.annee, ext_v.resultat, ext_v.objectif, ext_v.commentaire
			FROM indicateur_source_externe_valeurs ext_v
			LEFT JOIN source_externe AS s ON ext_v.source_id = s.id
			LEFT JOIN collectivite_source_externe AS cse ON s.id = cse.source_externe_id 
			WHERE ext_v.indicateur_id = p_indicateur_id
			AND cse.collectivite_id = p_collectivite_id
			;
		
		ELSE 
		
			RETURN QUERY
			
			SELECT v.indicateur_id, NULL as source, v.annee, v.resultat, v.objectif, v.commentaire
				FROM indicateur_predefini_valeurs AS v
				WHERE v.indicateur_id = p_indicateur_id
				AND v.collectivite_id = p_collectivite_id
				;
		
		END IF;
		
	-- Else query custom indicators
	ELSE
		
		RETURN QUERY 
		
		SELECT v.indicateur_id::text, NULL as source, v.annee, v.resultat, v.objectif, v.commentaire
		FROM indicateur_personnalise AS i
		LEFT JOIN indicateur_personnalise_valeurs AS v
		ON i.id = v.indicateur_id
		WHERE v.indicateur_id = p_indicateur_id::int
		AND i.collectivite_id = p_collectivite_id
		;
	
	END IF;
	
END;
$fn$
;
