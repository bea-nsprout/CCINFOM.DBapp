
-- ITEM MASTERLIST COMMANDS

-- CREATE NEW ITEMS
	-- check first if item exists in item mast
		SELECT EXISTS (
			SELECT 1
			FROM item_masterlist items
			WHERE items.item_code = '0001010000TEMP036Y'
		) AS item_exists;
        
			-- if return 0: can add
            -- if return 1: do not add (warn the user), because that record already exists


    -- insert new item into the database
        INSERT INTO item_masterlist (item_code, item_desc, unit) VALUES
		('0001010000TEMP036Y', 'TEST OR TEMP RECORD 36 YDS', 'ROLL'); -- 	replace 	
		
    -- update the warehouse inventory
        INSERT INTO warehouse_inventory (item_code, warehouse_id)
		SELECT '0001010000TEMP036Y', warehouse_id
		FROM warehouse;
        
        -- this is a nested query that will introduce the new item to all the rows

-- MODIFY ITEM DESCRIPTION
	UPDATE item_masterlist
	SET item_desc = 'TEST OR TEMP RECORD 36 YDS', unit = 'ROLL'
	WHERE item_code = '0001010000TEMP036Y';
    
    
-- MODIFY: ARCHIVE / UNARCHIVE AN ITEM
	UPDATE item_masterlist
    SET archived = NOT archived
    WHERE item_code = '0001010000TEMP036Y';
    
-- DELETE AN ITEM: restricted delete
	DELETE FROM item_masterlist 
    WHERE item_code = '0001010000TEMP036Y';
    
-- VIEW: ALL ITEMS
	SELECT *
    FROM item_masterlist;
    
    -- view all items but with filter
		SELECT *
        FROM item_masterlist
        WHERE archived = false;
        
        SELECT *
        FROM item_masterlist
        WHERE archived = true;
        
-- VIEW: selected item, given itemcode
	SELECT *
    FROM item_masterlist
    WHERE item_code = '0001010000TEMP036Y';