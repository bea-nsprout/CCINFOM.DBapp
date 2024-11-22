-- PERSONNEL 
-- CREATE NEW PERSONNEL 
	-- check if personnel_id already exists
		SELECT EXISTS (
			SELECT 1
			FROM personnel p
			WHERE p.personnel_id = 5 -- Replace 5 with the actual personnel_id	
		) AS personnel_id_exists;

		-- if it returns 0, you can add a personnel
		-- Add a new personnel if it does not exist
        INSERT INTO personnel (first_name, last_name, position, archived) VALUES
		('Mickey', 'Mouse', 'Admin', 0);
            
-- MODIFY the Personnel Position 
	UPDATE personnel 
    SET position = 'Manager'
    WHERE personnel_id = 5;
    
-- MODIFY, Archive PersonneL
	UPDATE personnel 
    SET archived = 1 /* 1 */
    WHERE personnel_id = 5;

-- MODIFY, Unarichive Personnel
	UPDATE personnel
	SET archive = 0 /* 0 */
	WHERE personnel_id = 5;
