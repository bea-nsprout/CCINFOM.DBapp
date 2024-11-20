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
	WHERE r.request_id = 17 AND r.qty_balance >= @v1; /* Should be the same transfer_id in transfer table */

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

    
-- Modify an existing record and update qty_balance accordingly [ FIXED ]
	SET @v1 = 40; -- New transfer quantity
	SET @transfer_id = 6; -- Transfer ID to modify

	UPDATE transfer
	SET quantity = @v1
	WHERE transfer_id = @transfer_id;

	UPDATE request r
	JOIN transfer t ON r.request_id = t.request_id
	SET r.qty_balance = r.qty_total - t.quantity
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
    
    SET @v1 = 14;
    
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
    SELECT *
    FROM transfer
	WHERE date_transferred = '2024-12-01';
    
-- given an item code [ FIXED ]
    SELECT *
    FROM transfer
    WHERE item_code = '09009GFDSG';
    
