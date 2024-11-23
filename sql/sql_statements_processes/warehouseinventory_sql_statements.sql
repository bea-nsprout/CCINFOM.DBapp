
-- INVENTORY COMMANDS

-- MODIFY update the quantity (ONLY quantity)
    -- DROPDOWN
        SELECT item_code, item_desc
        FROM items
        WHERE item_code LIKE '%str%' OR item_desc LIKE '%str%';

    -- DROPDOWN: WAREHOUSE
        SELECT warehouse_name, location
        FROM warehouses
        WHERE warehouse_name LIKE '%str%';

    -- 1. UPDATE INVENTORY
	UPDATE inventories
    SET quantity = 20 			-- repace with new quantity
    WHERE item_code = 'insertSTRINGitemcode' AND warehouse_id = 'insertINTwarehouseid';

    -- 2. CREATE ADJUSTMENT NEW RECORD
        INSERT INTO inventories (item_code, warehouse_id, quantity) VALUES

    
-- VIEW all nonzero items in warehouse
	SELECT * 
    FROM inventories
    WHERE quantity > 0;
    
    -- with filter (i just copy pasted, maybe you wanna make true or false a variable ?)
		SELECT * 
		FROM inventories
		WHERE quantity > 0;
        
        SELECT * 
		FROM inventories
		WHERE quantity > 0;
        
-- VIEW 
	
	-- VIEW #1: NO FILTER
        SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
        FROM inventories inv
        JOIN items i ON inv.item_code = i.item_code
        JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
        ORDER BY inv.warehouse_id;
    
    -- VIEW #2: FILTER ITEMCODE
        SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
        FROM inventories inv
        JOIN items i ON inv.item_code = i.item_code
        JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
        WHERE inv.item_code LIKE '%137%'
        ORDER BY inv.item_code;

	-- VIEW #3: FILTER WAREHOUSE
        SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
        FROM inventories inv
        JOIN items i ON inv.item_code = i.item_code
        JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
        WHERE w.warehouse_name LIKE '% A%'
        ORDER BY inv.item_code;

	-- VIEW #4: QUANTITY > 0
        SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
        FROM inventories inv
        JOIN items i ON inv.item_code = i.item_code
        JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
        WHERE inv.item_code LIKE '%%' AND inv.quantity > 0
        ORDER BY inv.item_code;