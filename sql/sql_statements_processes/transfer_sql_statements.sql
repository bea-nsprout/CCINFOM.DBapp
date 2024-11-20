-- TRANSFER

	SET @v1 = 90; -- Amount to transfer

-- create a true or false if the request is valid or not
	INSERT INTO transfer (request_id, personnel_id, date_transferred, truck_id, quantity)
	VALUES (1, 1, CURDATE(), 'TRK0001', @v1); 
	/* Ensure request_id exists in the `request` table */

	UPDATE request r
	SET r.qty_balance = r.qty_balance - @v1
	WHERE r.request_id = 1 /* valid request_id */ AND r.qty_balance >= @v1; 
	/* Ensure request_id matches the transfer request */

-- REVISE THIS !!! with join clause 
	-- UPDATE warehouse_inventory wi
	-- JOIN transfer t ON t.item_code = wi.item_code /* Assuming item_code is unique */
	-- SET wi.quantity = wi.quantity - @v1
	-- WHERE wi.warehouse_id = t.warehouse_from_id
	--   AND t.request_id = 1; 
	/* Link the warehouse inventory and transfer records */

	-- SELECT * FROM transfer WHERE request_id = 1;
	-- SELECT * FROM request WHERE request_id = 1;
	-- SELECT * FROM warehouse_inventory;
    
-- Modify an existing record and update qty_balance accordingly [ FIXED ]
	SET @v1 = 50; -- New transfer quantity
	SET @transfer_id = 6; -- Transfer ID to modify

	SELECT r.qty_total AS old_qty
    	FROM request r
    	WHERE r.request_id = 2;
    
   	UPDATE transfer
	SET quantity = @v1
	WHERE transfer_id = @transfer_id;

	UPDATE request r
	JOIN transfer t ON r.request_id = t.request_id
	SET r.qty_balance = r.qty_total - 100 /* Old Quantity */ + @v1 /* New Quantity */
	WHERE t.transfer_id = @transfer_id;
    
-- SELECT * FROM transfer WHERE transfer_id = @transfer_id;
-- SELECT * FROM request r
-- JOIN transfer t ON r.request_id = t.request_id
-- WHERE t.transfer_id = @transfer_id;
    
  
-- delete existing record [ FIXED ]
	-- Update warehouse_inventory to add back the deleted quantity
	-- consult how warehouse inventory will be linked
	-- 	UPDATE warehouse_inventory wi
	-- 	JOIN transfer t ON wi.item_code = t.item_code
	-- 	SET 
	-- 		wi.quantity = wi.quantity + t.quantity
	-- 	WHERE t.transfer_id = 1; 

	-- Update request to adjust qty_balance
    
    SET @v1 = 14; /* transfer_id */
    
	UPDATE request r
	JOIN transfer t ON r.request_id = t.request_id
	SET 
		r.qty_balance = r.qty_balance + t.quantity
	WHERE t.transfer_id = @v1; 

	-- Delete the transfer record
	DELETE FROM transfer
	WHERE transfer_id = @v1;

-- view all request [ FIXED ]
    -- given date transferred
    -- join with request then join with masterlist, display the item description
	SELECT *
    FROM transfer
	WHERE date_transferred = '2024-12-01';
    
-- given an item code [ FIXED ]
	-- join with request then join with masterlist, display the item description
    SELECT *
    FROM transfer
    WHERE item_code = '09009GFDSG';
    
