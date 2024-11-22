-- TRUCK COMMANDS
-- CREATE NEW TRUCK (warehouse_id and truck_id)
	-- check if truck_id already exists
		SELECT EXISTS (
			SELECT 1
            FROM trucks t
            WHERE t.truck_id = 'ABC123' -- Replace 'ABC123' with the actual truck_id
        ) AS truck_id_exists;

        -- if it returns 0, you can add a truck
		-- Add a new truck if it does not exist
		INSERT INTO trucks (truck_id, warehouse_id)
		VALUES ('ABC123', 123456);

-- MODIFY TRUCK IN WHICH WAREHOUSE
	UPDATE trucks
    SET warehouse_id = 123456
    WHERE truck_id = 'ABC123';
    
-- DELETE A TRUCK 
	DELETE FROM trucks
	WHERE truck_id = 'ABC123';

-- VIEW
	-- No Filter
	SELECT *
	FROM trucks;

	-- Truck Plate Number
	SELECT *
	FROM trucks
	WHERE truck_id = 'TRK001';

	-- Warehouse
	SELECT *
	FROM trucks
	WHERE warehouse_id = 1;

	-- Active Status
	SELECT *
	FROM trucks
	WHERE archived = 0;
