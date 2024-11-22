
-- WAREHOUSE TABLE COMMANDS

-- CREATE: new warehouse
	-- 1. check first if warehouse (name and loc) exists in the warehouse table  
		SET @new_wh_name = 'insertstringname2';
        SET @new_wh_loc = 'insertstringloc2';
        
		SELECT EXISTS (
			SELECT 1
			FROM warehouse
			WHERE warehouse_name = @new_wh_name AND location = @new_wh_loc
		) AS warehouse_exists;
        
			-- if return 0: can add
            -- if return 1: do not add (warn the user), because that record already exists


    -- 2. insert new warehouse into database
        INSERT INTO warehouse (warehouse_name, location) VALUES
		(@new_wh_name, @new_wh_loc);
        
        SET @last_whID = LAST_INSERT_ID();
		
    -- 3. update the warehouse inventory
        INSERT INTO warehouse_inventory (item_code, warehouse_id)
		SELECT item_code, @last_whID
		FROM item_masterlist;
        
        -- this is a nested query that will introduce the new warehouse and setup all the possible items
        
-- MODIFY
	-- COPY PASTE EXISTS CHECKER ABOVE (CREATE.1): checking if warehouse name and loc exists in the table
    UPDATE warehouse
    SET warehouse_name = 'insertstringnameNEW', location = 'insertstringlocationNEW'
    WHERE warehouse_id = 'insertINTwarehouse_id';
    
-- VIEW #1: all active warehouses (filter)
	-- also for DROPDOWN
    -- i deliberately left out the warehouse id, because i dont think it's needed?
	SELECT warehouse_name, warehouse_location
    FROM warehouse
    WHERE archived = false;
    
    -- if you need the id, this returns the ID of warehouse.
    SELECT warehouse_id
    FROM warehouse
    WHERE warehouse_name = 'Warehouse A' /*replace*/ AND location = 'Manila, Metro Manila' /*replace*/;
    
-- VIEW #2: given warehouse name, list all warehouses and their location that have the name
	SELECT warehouse_name, location
    FROM warehouse
    WHERE warehouse_name LIKE '%house%' /*replace*/;

-- VIEW #3: given warehouse location, list all warehouses and their name that satisfies the input
	SELECT warehouse_name, location
    FROM warehouse
    WHERE location LIKE '%Manila%' /*replace*/;

-- DELETE
    -- 1. before warehouse can be deleted, check first if in inventory, request, or production contains data, to avoid orphans
    
    SET @warehouse_id = 12 /*warehouseid to check for deletion*/;
    
	SELECT NOT EXISTS (
			SELECT 1
			FROM warehouse_inventory
			WHERE warehouse_id = @warehouse_id AND quantity > 0
		) AND NOT EXISTS (
			SELECT 1
			FROM request
			WHERE warehouse_from_id = @warehouse_id OR warehouse_to_id = @warehouse_id
		) AND NOT EXISTS (
			SELECT 1
			FROM production
			WHERE warehouse_id = @warehouse_id
		) AND NOT EXISTS (
			SELECT 1
            FROM truck
			WHERE warehouse_id = @warehouse_id
		) AS no_existing_item;
        
			-- return true if no instance of items in given warehouse, PROCEED TO NEXT SQL STATEMENT
			-- return false if has instance of item/s in given warehouse, ASK USER TO 'ARCHIVE' INSTEAD
	
    -- 2. DELETE 
		-- 2.1. DELETE INSTANCES FROM WAREHOUSE INVENTORY: 
		-- if above statement true, delete all the instances in warehouse inventory; if false, dont! ask user to archive it instead
		DELETE FROM warehouse_inventory
        WHERE warehouse_id = @warehouse_id;
        
        -- 2.2. DELETE THE WAREHOUSE RECORD
        DELETE FROM warehouse
        WHERE warehouse_id = @warehouse_id;
		