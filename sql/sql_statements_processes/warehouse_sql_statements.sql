
-- WAREHOUSE TABLE COMMANDS

-- CREATE: new warehouse
	-- 1. check first if warehouse (name and loc) exists in the warehouse table  
		SET @new_wh_name = 'insertstringname2';
        SET @new_wh_loc = 'insertstringloc2';
        
		SELECT EXISTS (
			SELECT 1
			FROM warehouses
			WHERE warehouse_name = @new_wh_name AND location = @new_wh_loc
		) AS warehouse_exists;
        
			-- if return 0: can add
            -- if return 1: do not add (warn the user), because that record already exists


    -- 2. insert new warehouse into database
        INSERT INTO warehouses (warehouse_name, location) VALUES
		(@new_wh_name, @new_wh_loc);
        
        SET @last_whID = LAST_INSERT_ID();
		
    -- 3. update the warehouse inventory
        INSERT INTO inventories (item_code, warehouse_id)
		SELECT item_code, @last_whID
		FROM items;
        
        -- this is a nested query that will introduce the new warehouse and setup all the possible items
        
-- MODIFY
	-- COPY PASTE EXISTS CHECKER ABOVE (CREATE.1): checking if warehouse name and loc exists in the table
    UPDATE warehouses
    SET warehouse_name = 'insertstringnameNEW', location = 'insertstringlocationNEW'
    WHERE warehouse_id = 'insertINTwarehouse_id';
    
-- VIEW DROPDOWN
	-- also for DROPDOWN
    -- i deliberately left out the warehouse id, because i dont think it's needed?
-- VIEW #1: NO FILTER
	SELECT warehouse_name, location
    FROM warehouses
    WHERE archived = false;
    
    -- if you need the id, this returns the ID of warehouse.
    SELECT warehouse_id
    FROM warehouses
    WHERE warehouse_name = 'Warehouse A' /*replace*/ AND location = 'Manila, Metro Manila' /*replace*/;

-- VIEW #2: NAME FILTER, list all warehouses and their location that have the name
	SELECT warehouse_name, location
    FROM warehouses
    WHERE warehouse_name LIKE '%house%' /*replace*/;

-- VIEW #3: LOCATION FILTER, list all warehouses and their name that satisfies the input
	SELECT warehouse_name, location
    FROM warehouses
    WHERE location LIKE '%Manila%' /*replace*/;

-- VIEW #4: STATUS FILTER
    SELECT warehouse_name, location
    FROM warehouses
    WHERE archived = true /*or false*/;

-- DELETE
    -- 1. PRE-DELETE PROCESS: before warehouse can be deleted, check first if in inventory, request, or production contains data, to avoid orphans
    
    SET @warehouse_id = 8 /*warehouseid to check for deletion*/;
    
	SELECT NOT EXISTS (
			SELECT 1
			FROM inventories
			WHERE warehouse_id = @warehouse_id AND quantity > 0
		) AND NOT EXISTS (
			SELECT 1
			FROM requests
			WHERE warehouse_from_id = @warehouse_id OR warehouse_to_id = @warehouse_id
		) AND NOT EXISTS (
			SELECT 1
			FROM productions
			WHERE warehouse_id = @warehouse_id
		) AND NOT EXISTS (
			SELECT 1
            FROM trucks
			WHERE warehouse_id = @warehouse_id
		) AND NOT EXISTS (SELECT 1
            FROM adjustments
            WHERE warehouse_id = @warehouse_id
        ) AS no_existing_item;
        
			-- return true if no instance of items in given warehouse, PROCEED TO NEXT SQL STATEMENT
			-- return false if has instance of item/s in given warehouse, ASK USER TO 'ARCHIVE' INSTEAD
	
    -- 2. ACTUAL DELETE PROCESS
		-- 2.1. DELETE INSTANCES FROM WAREHOUSE INVENTORY: 
		-- if above statement true, delete all the instances in warehouse inventory; if false, dont! ask user to archive it instead
		DELETE FROM inventories
        WHERE warehouse_id = @warehouse_id;
        
        -- 2.2. DELETE THE WAREHOUSE RECORD
        DELETE FROM warehouses
        WHERE warehouse_id = @warehouse_id;
		
