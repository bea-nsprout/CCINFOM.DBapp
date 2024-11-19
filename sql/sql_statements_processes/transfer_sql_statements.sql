-- TRANSFER
-- create a new transfer record
-- Insert a new transfer record
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO transfer (request_id, personnel_id, 
			item_code, date_transferred, truck_id, 
			quantity, unit, warehouse_from_id, warehouse_to_id)
VALUES (1, 1, '0001010000YGGO036Y', CURDATE(), 'WOW', 100, 'ROLL', 4, 2);

SET FOREIGN_KEY_CHECKS = 1;

-- Assign value to variable (amount transferred)
SET @v1 = 20;  -- Amount to transfer

-- Update the qty_balance in the request table
	UPDATE request r
	JOIN transfer t ON t.request_id = r.request_id
	SET r.qty_balance = r.qty_total - @v1
	WHERE t.transfer_id = 4; /* Should be the same transfer_id in transfer table */

-- Update the warehouse_inventory table for the source warehouse (decrease quantity)
	UPDATE warehouse_inventory wi
	JOIN transfer t ON t.item_code = wi.item_code
	SET wi.quantity = wi.quantity - @v1
	WHERE wi.warehouse_id = t.warehouse_from_id
  		AND t.transfer_id = 4; /* Should be the same transfer_id in transfer table */

-- Update the warehouse_inventory table for the destination warehouse (increase quantity)
	UPDATE warehouse_inventory wi
	JOIN transfer t ON t.item_code = wi.item_code
	SET wi.quantity = wi.quantity + @v1
	WHERE wi.warehouse_id = t.warehouse_to_id
 		AND t.transfer_id = 4; /* Should be the same transfer_id in transfer table */

-- transfer record
-- SELECT * 
-- FROM transfer;

-- request record
-- SELECT * 
-- FROM request;

-- warehouse inventory record
-- SELECT * 
-- FROM warehouse_inventory;

    
-- Modify an existing record and update qty_balance accordingly
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
  
-- delete existing record
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

-- view all request 
    -- given date transferred
    SELECT *
    FROM transfer
	WHERE date_transferred = '2024-12-01';
    
-- given an item code
    SELECT *
    FROM transfer
    WHERE item_code = '09009GFDSG';
    
