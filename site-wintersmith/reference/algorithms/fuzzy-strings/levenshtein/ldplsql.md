---
title: "Levenshtein Distance Algorithm: Oracle PL/SQL Implementation"
template: page.jade
---

by Barbara Boehmer (baboehme@hotmail.com)

	CREATE OR REPLACE FUNCTION ld -- Levenshtein distance
	  (p_source_string   IN VARCHAR2,
	   p_target_string   IN VARCHAR2)
	  RETURN                NUMBER
	  DETERMINISTIC
	AS
	  v_length_of_source    NUMBER := NVL (LENGTH (p_source_string), 0);
	  v_length_of_target    NUMBER := NVL (LENGTH (p_target_string), 0);
	  TYPE mytabtype IS     TABLE OF NUMBER INDEX BY BINARY_INTEGER;
	  column_to_left        mytabtype;
	  current_column        mytabtype;
	  v_cost                NUMBER := 0;
	BEGIN
	  IF v_length_of_source = 0 THEN
		RETURN v_length_of_target;
	  ELSIF v_length_of_target = 0 THEN
		RETURN v_length_of_source;
	  ELSE
		FOR j IN 0 .. v_length_of_target LOOP
		  column_to_left(j) := j;
		END LOOP;
		FOR i IN 1.. v_length_of_source LOOP
		  current_column(0) := i;
		  FOR j IN 1 .. v_length_of_target LOOP
			IF SUBSTR (p_source_string, i, 1) =
			   SUBSTR (p_target_string, j, 1)
			THEN v_cost := 0;
			ELSE v_cost := 1;
			END IF;
			current_column(j) := LEAST (current_column(j-1) + 1,
										column_to_left(j) + 1,
										column_to_left(j-1) + v_cost);
		  END LOOP;
		  FOR j IN 0 .. v_length_of_target  LOOP
			column_to_left(j) := current_column(j);
		  END LOOP;
		END LOOP;
	  END IF;
	  RETURN current_column(v_length_of_target);
	END ld;
