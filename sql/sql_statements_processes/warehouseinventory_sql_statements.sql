
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
        
-- VIEW 
	
	-- No Filter
	SELECT *
   	FROM inventories;
    
    	-- itemcode
	SELECT *
	FROM inventories
	WHERE item_code = '003200MEDMYGLD072Y';

	-- warehouse
	SELECT *
	FROM inventories
	WHERE warehouse_id = 1;

	-- status
	SELECT *
	FROM inventories
        WHERE archived = true;
        
        SELECT *
        FROM inventories
        WHERE archived = false;
