-- TRANSFER
-- create a new transfer record
	INSERT INTO transfer (transfer_id, 
			date_transferred,
                        truck_id,
                        quantity, 
                        unit, 
                        warehouse_from_id, 
                        warehouse_to_id) VALUES
	(1, '2024-11-05', 'insertstringname', 100, 'ROLL', 1, 2);

	SET @v1 = 100; -- Assign value to variable

	UPDATE request r
	SET r.qty_balance = r.qty_total - @v1
	WHERE t.transfer_id = r.transfer_id;
    
    	UPDATE warehouse_inventory wi
	SET wi.quantity = wi.quantity - @v1
	WHERE t.transfer_id = 1;
    
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
    
