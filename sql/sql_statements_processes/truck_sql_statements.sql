-- TRUCK COMMANDS
-- CREATE NEW TRUCK (warehouse_id and truck_id)
	-- check if truck_id already exists
		SELECT EXISTS (
			SELECT 1
            FROM truck t
            WHERE t.truck_id = 'ABC123' -- Replace 'ABC123' with the actual truck_id
        ) AS truck_id_exists;

        -- if it returns 0, you can add a truck
		-- Add a new truck if it does not exist
		INSERT INTO truck (truck_id, warehouse_id)
		VALUES ('ABC123', 123456);

-- MODIFY TRUCK IN WHICH WAREHOUSE
	UPDATE truck 
    SET warehouse_id = 123456
    WHERE truck_id = 'ABC123';
    
-- DELETE A TRUCK 
	DELETE FROM truck 
	WHERE truck_id = 'ABC123';