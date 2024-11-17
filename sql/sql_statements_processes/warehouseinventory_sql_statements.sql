
-- WAREHOUSE INVENTORY COMMANDS

-- MODIFY update the quantity (ONLY quantity)
	UPDATE warehouse_inventory
    SET quantity = 'insertINTquantity'
    WHERE item_code = 'insertSTRINGitemcode' AND warehouse_id = 'insertINTwarehouseid';
    
-- VIEW all nonzero items in warehouse
	SELECT * 
    FROM warehouse_inventory
    WHERE quantity > 0;
    
    -- with filter (i just copy pasted, maybe you wanna make true or false a variable ?)
		SELECT * 
		FROM warehouse_inventory
		WHERE quantity > 0 AND archived = true;
        
        SELECT * 
		FROM warehouse_inventory
		WHERE quantity > 0 AND archived = false;
        
-- VIEW all items in the warehouse
	SELECT *
    FROM warehouse_inventory;
    
    -- with filter (what if make a true/ false variable?)
		SELECT *
		FROM warehouse_inventory
        WHERE archived = true;
        
        SELECT *
        FROM warehouse_inventory
        WHERE archived = false;