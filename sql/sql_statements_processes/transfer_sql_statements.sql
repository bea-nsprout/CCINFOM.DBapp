-- TRANSFER
-- Insert a new transfer record [ FIXED ]
	SET @v1 = 90;  -- Amount to transfer
	SET FOREIGN_KEY_CHECKS = 0;
	SET @last_transfer_id = LAST_INSERT_ID();

	INSERT INTO transfer (request_id, personnel_id, date_transferred, truck_id, quantity)
	VALUES (@last_transfer_id + 1, 1, CURDATE(), 'WOW', @v1); 
	/* This makes the transfer_id equal to the request_id */
    
	SET FOREIGN_KEY_CHECKS = 1;
	
	-- Update the qty_balance in the request table
	UPDATE request r
	SET r.qty_balance = r.qty_balance - @v1
	WHERE r.request_id = 17; /* Should be the same transfer_id in transfer table */

	-- Ask bea how do I link warehouse_inventory to transfer
	-- Update the warehouse_inventory table for the source warehouse (decrease quantity)
	-- 	UPDATE warehouse_inventory wi
	-- 	JOIN transfer t ON t.item_code = wi.item_code
	-- 	SET wi.quantity = wi.quantity - @v1
	-- 	WHERE wi.warehouse_id = t.warehouse_from_id
	--   		AND t.transfer_id = 17; /* Should be the same transfer_id in transfer table */-- 

-- transfer record
-- SELECT * 
-- FROM transfer;

-- request record
-- SELECT * 
-- FROM request;

-- warehouse inventory record
-- SELECT * 
-- FROM warehouse_inventory;

    
-- Modify an existing record and update qty_balance accordingly [ NOT YET FIXED ]
	SET @old_quantity = (SELECT t1.quantity 
			FROM transfer t1
			WHERE t1.transfer_id = 1); -- 1 is some transfer_id

	UPDATE transfer t
	SET t.item_code = "09009GFDSG", 
		t.date_transferred = "2024-08-11", 
		t.unit = 'Roll',
		t.quantity = 50 -- New quantity
	WHERE t.transfer_id = 1; -- 1 is some transfer_id

	UPDATE request r
	SET r.qty_balance = r.qty_balance + (@old_quantity - t.quantity)
	WHERE r.transfer_id = 1; -- 1 is some transfer_id
  
-- delete existing record [ FIXED ]
	-- Update warehouse_inventory to add back the deleted quantity
	UPDATE warehouse_inventory wi
	JOIN transfer t ON wi.item_code = t.item_code
	SET 
		wi.quantity = wi.quantity + t.quantity
	WHERE t.transfer_id = 1; 

	-- Update request to adjust qty_balance
	UPDATE request r
	JOIN transfer t ON r.transfer_id = t.transfer_id
	SET 
		r.qty_balance = r.qty_balance + t.quantity
	WHERE t.transfer_id = 1; 

	-- Delete the transfer record
	DELETE FROM transfer
	WHERE transfer_id = 1;

-- view all request [ FIXED ]
    -- given date transferred
    SELECT *
    FROM transfer
	WHERE date_transferred = '2024-12-01';
    
-- given an item code [ FIXED ]
    SELECT *
    FROM transfer
    WHERE item_code = '09009GFDSG';
    
