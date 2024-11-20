-- REPORT WAREHOUSE INVENTORY
	-- DATE: there's a requirement that we should add the date for each report, so please do that.. like date the report was generated
    -- BODY: comparing 2 warehouses
		SELECT items.item_description, inv1.quantity, 
        FROM item_masterlist items
        JOIN warehouse_inventory inv1 ON inv1.item_code = items.item_code	
        JOIN warehouse_inventory inv2 ON inv2.item_code = items.item_code AND 
        
    
