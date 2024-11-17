-- TRANSFER
-- create a new request record
	INSERT INTO request (transfer_id, 
						date_transferred,
                        truck_id,
                        quantity, 
                        unit, 
                        warehouse_from_id, 
                        warehouse_to_id) VALUES
	(1, '2024-11-05', 'insertstringname', 100, 'ROLL', 1, 2);
    
	UPDATE transfer t
	JOIN request r ON t.transfer_id = r.transfer_id
	SET t.item_code = "09009GFDSG", 
		t.date_transferred = "2024-08-11", 
		t.quantity = 2, 
		t.unit = 'Roll',
		r.qty_balance = r.qty_total - t.quantity
	WHERE t.transfer_id = r.transfer_id;
    
    UPDATE warehouse_inventory wi
	JOIN transfer t ON t.item_code = wi.item_code
	SET wi.quantity = wi.quantity - t.quantity
	WHERE t.transfer_id = 1;
    
-- Modify an existing record and update qty_balance accordingly
	UPDATE transfer t
	JOIN warehouse_inventory wi ON t.item_code = wi.item_code
	JOIN request r ON t.transfer_id = r.transfer_id
	SET t.item_code = "09009GFDSG", 
		t.date_transferred = "2024-08-11", 
		t.unit = 'Roll',
		r.qty_balance = r.qty_balance + (
			(SELECT t_old.quantity 
			FROM transfer t_old 
			WHERE t_old.transfer_id = t.transfer_id) 
			- t.quantity
		),
		t.quantity = 50 -- some number
	WHERE t.transfer_id = r.transfer_id;
        
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
    
