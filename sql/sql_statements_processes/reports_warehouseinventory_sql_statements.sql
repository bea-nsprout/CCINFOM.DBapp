-- REPORT WAREHOUSE INVENTORY, COMPARING 2 WAREHOUSES
	-- DATE: there's a requirement that we should add the date for each report, so please do that.. like date the report was generated
    -- BODY: comparing 2 warehouses
	SET @v1 = 4;
	SET @v2 = 5;

	SELECT i1.item_code, SUM(i1.quantity) AS First_Total_Sum, SUM(i2.quantity) AS Second_Total_Sum
	FROM inventories i1
	JOIN inventories i2 ON i1.item_code = i2.item_code AND i1.warehouse_id != i2.warehouse_id  
	JOIN warehouses w1 ON i1.warehouse_id = w1.warehouse_id
	JOIN warehouses w2 ON i2.warehouse_id = w2.warehouse_id 
	WHERE i1.warehouse_id = @v1 AND i2.warehouse_id = @v2
	GROUP BY i1.warehouse_id, i2.warehouse_id, i1.item_code  
	ORDER BY First_Total_Sum, Second_Total_Sum, i1.item_code;
		
	/* If you guys want to sort it by warehouse ID: 
	ORDER BY i1.warehouse_id, i2.warehouse_id, i1.item_code; */

	-- Count the request of Warehouse FROM id
	SET @v1 = 4;
	SET @v2 = 5;

	SELECT COUNT(CASE WHEN i1.warehouse_from_id = @v1 THEN 1 END) AS First_Request_Count,
	COUNT(CASE WHEN i2.warehouse_from_id = @v2 THEN 1 END) AS Second_Request_Count
	FROM requests i1
	JOIN requests i2 ON i1.request_id = i2.request_id
	WHERE i1.warehouse_from_id = @v1 OR i2.warehouse_from_id = @v2;

	-- Count the request of Warehouse TO id
	SET @v1 = 4;
	SET @v2 = 5;

	SELECT COUNT(CASE WHEN i1.warehouse_to_id = @v1 THEN 1 END) AS First_Request_Count,
	COUNT(CASE WHEN i2.warehouse_to_id = @v2 THEN 1 END) AS Second_Request_Count
	FROM requests i1
	JOIN requests i2 ON i1.request_id = i2.request_id
	WHERE i1.warehouse_to_id = @v1 OR i2.warehouse_to_id = @v2;

	-- Count the transfer of warehouse ID
	/* ADLER DO THIS TMRR!! */
        
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






-- TRANSFER REPORT: number of transfers from past n days
    SET @ndays = 1000;

    SELECT warehouse_name, location,
           IF(transfers_out is null, 0, transfers_out) AS transfers_out,
           IF(transfers_in is null, 0, transfers_in) AS transfers_in
    FROM warehouses w
    LEFT JOIN (SELECT warehouse_id, COUNT(*) AS transfers_in
            FROM transfers t
            JOIN requests r ON t.request_id = r.request_id
            JOIN warehouses w ON warehouse_to_id = warehouse_id
            WHERE date_transferred BETWEEN (CURDATE() - INTERVAL @ndays DAY) AND CURDATE()
            GROUP BY warehouse_to_id) AS received
        ON received.warehouse_id = w.warehouse_id
    LEFT JOIN ( SELECT warehouse_id, COUNT(*) AS transfers_out
        FROM transfers t
        JOIN requests r ON t.request_id = r.request_id
        JOIN warehouses w ON warehouse_from_id = warehouse_id
        WHERE date_transferred BETWEEN (CURDATE() - INTERVAL @ndays DAY) AND CURDATE()
        GROUP BY warehouse_from_id) AS delivered
        ON delivered.warehouse_id = w.warehouse_id
    ORDER BY w.warehouse_id DESC;

