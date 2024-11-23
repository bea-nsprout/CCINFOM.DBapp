
-- ITEM MASTERLIST COMMANDS

-- CREATE NEW ITEMS
	-- check first if item exists in item mast
		SELECT EXISTS (
			SELECT 1
			FROM items i
			WHERE i.item_code = '0001010000TEMP036Y'
		) AS item_exists;
        
			-- if return 0: can add
            -- if return 1: do not add (warn the user), because that record already exists


    -- insert new item into the database
        INSERT INTO items (item_code, item_desc, unit) VALUES
		('0001010000TEMP036Y', 'TEST OR TEMP RECORD 36 YDS', 'ROLL'); -- 	replace 	
		
    -- update the warehouse inventory
        INSERT INTO inventories (item_code, warehouse_id)
		SELECT '0001010000TEMP036Y', warehouse_id
		FROM warehouses;
        
        -- this is a nested query that will introduce the new item to all the rows

-- MODIFY ITEM DESCRIPTION
	UPDATE items
	SET item_desc = 'TEST OR TEMP RECORD 36 YDS', unit = 'ROLL'
	WHERE item_code = '0001010000TEMP036Y';
    
    
-- MODIFY: ARCHIVE / UNARCHIVE AN ITEM
	UPDATE items
    SET archived = NOT archived
    WHERE item_code = '0001010000TEMP036Y';
    
-- DELETE AN ITEM: restricted delete
	-- check if all warehouses have 0 inventory and no instance in requests/transfer/production
		SET @itemcode = '0001370000SILV036Y';
        
		SELECT NOT EXISTS (
			SELECT 1
			FROM inventories
			WHERE item_code = @itemcode AND quantity > 0
		) AND NOT EXISTS (
			SELECT 1
			FROM requests
			WHERE item_code = @itemcode
		) AND NOT EXISTS (
			SELECT 1
			FROM productions
			WHERE item_code = @itemcode
		) AS no_existing_item;
			-- return true if no instance of item, PROCEED TO NEXT SQL STATEMENT
			-- return false if has instance of item, ASK USER TO 'ARCHIVE' ITEM INSTEAD
	
    -- if above statement true, delete all the instances in warehouse inventory; if false, dont! ask user to archive it instead
		DELETE FROM inventories
        WHERE item_code = '0001010000TEMP036Y';
    
    -- delete the actual thing
		DELETE FROM items 
		WHERE item_code = '0001010000TEMP036Y';
    
-- VIEW
	-- VIEW #1: NO FILTER
		SELECT *
        FROM items;
        
	-- VIEW #2: selected item, given itemcode
		SELECT *
		FROM items
		WHERE item_code LIKE '%0001010000TEMP036Y%' /*user_input*/;
        
	-- VIEW #3: ITEM DESCRIPTION
		SELECT * 
        FROM items
        WHERE item_desc LIKE '%DE%' /*user_input*/;
        
	-- VIEW #4: STATUS
		SELECT * 
        FROM items
        WHERE archived = true /*true or false*/;
        