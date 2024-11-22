-- REPORT WAREHOUSE INVENTORY
	-- DATE: there's a requirement that we should add the date for each report, so please do that.. like date the report was generated
    -- BODY: comparing 2 warehouses
	SET @v1 = 4;
	SET @v2 = 5;

	SELECT i1.item_code, SUM(i1.quantity) AS First_Total, SUM(i2.quantity) AS Second_Total
	FROM inventories i1
	JOIN inventories i2 ON i1.item_code = i2.item_code AND i1.warehouse_id != i2.warehouse_id  
	JOIN warehouses w1 ON i1.warehouse_id = w1.warehouse_id
	JOIN warehouses w2 ON i2.warehouse_id = w2.warehouse_id 
	WHERE i1.warehouse_id = @v1 AND i2.warehouse_id = @v2
	GROUP BY i1.warehouse_id, i2.warehouse_id, i1.item_code  
	ORDER BY First_Total, Second_Total, i1.item_code;
		
	/* If you guys want to sort it by warehouse ID: 
	ORDER BY i1.warehouse_id, i2.warehouse_id, i1.item_code; */
        
-- Report the total # of items produced in all warehouses
	-- past 30 days 
	SELECT w.warehouse_id, w.warehouse_name,
	(
        	SELECT SUM(p.qty_produced) 
        	FROM productions p 
        	WHERE p.warehouse_id = w.warehouse_id AND p.date_produced BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()
    	) AS Total_Produced_Past_30_Days

	FROM warehouses w
	ORDER BY w.warehouse_id;

	-- past 365 days 
	SELECT w.warehouse_id, w.warehouse_name,
     	(
	        SELECT SUM(p.qty_produced) 
        	FROM productions p 
       		WHERE p.warehouse_id = w.warehouse_id AND p.date_produced BETWEEN (CURDATE() - INTERVAL 365 DAY) AND CURDATE()
    	) AS Total_Produced_Past_Year 
	
    	FROM warehouses w
	ORDER BY w.warehouse_id;
