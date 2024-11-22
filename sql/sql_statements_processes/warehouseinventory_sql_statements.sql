
-- WAREHOUSE INVENTORY COMMANDS

-- MODIFY update the quantity (ONLY quantity)
	UPDATE inventories
    SET quantity = 20 			-- repace with new quantity
    WHERE item_code = 'insertSTRINGitemcode' AND warehouse_id = 'insertINTwarehouseid';
    
-- VIEW all nonzero items in warehouse
	SELECT * 
    FROM inventories
    WHERE quantity > 0;
    
    -- with filter (i just copy pasted, maybe you wanna make true or false a variable ?)
		SELECT * 
		FROM inventories
		WHERE quantity > 0 AND archived = true;
        
        SELECT * 
		FROM inventories
		WHERE quantity > 0 AND archived = false;
        
-- VIEW all items in the warehouse
	SELECT *
    FROM inventories;
    
    -- with filter (what if make a true/ false variable?)
		SELECT *
		FROM inventories
        WHERE archived = true;
        
        SELECT *
        FROM inventories
        WHERE archived = false;