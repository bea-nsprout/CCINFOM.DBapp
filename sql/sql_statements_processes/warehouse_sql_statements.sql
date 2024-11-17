
-- WAREHOUSE TABLE COMMANDS

-- CREATE: new warehouse
	-- check first if warehouse (name and loc) exists in the warehouse table
		SELECT EXISTS (
			SELECT 1
			FROM warehouse
			WHERE warehouse_name = 'insertstringname' AND location = 'insertstringlocation'
		) AS warehouse_exists;
        
			-- if return 0: can add
            -- if return 1: do not add (warn the user), because that record already exists


    -- insert new warehouse into database
        INSERT INTO warehouse (warehouse_name, location) VALUES
		('insertstringname', 'insertstringlocation'); -- 	replace 	
		
    -- update the warehouse inventory
        INSERT INTO warehouse_inventory (item_code, warehouse_id)
		SELECT item_code, 'insertstringname'
		FROM item_masterlist;
        
        -- this is a nested query that will introduce the new warehouse and setup all the possible items
        
-- MODIFY
	-- COPY PASTE EXISTS CHECKER ABOVE: checking if warehouse name and loc exists in the table
    UPDATE warehouse
    SET warehouse_name = 'insertstringnameNEW', location = 'insertstringlocationNEW'
    WHERE warehouse_id = 'insertINTwarehouse_id'