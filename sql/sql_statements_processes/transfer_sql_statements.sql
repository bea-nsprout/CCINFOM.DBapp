-- TRANSFER
-- create a new request record
	INSERT INTO request (transfer_id, 
						request_id,
						date_transferred,
                        truck_id,
                        quantity, 
                        unit, 
                        warehouse_from_id, 
                        warehouse_to_id) VALUES
	(1, 1, '2024-11-05', 1, 100, 'ROLL', 1, 2);
    
-- modify an existing record
	UPDATE transfer
	SET item_code = "09009GFDSG", 
		date_transferred = "2024-08-11",
        quantity = 2,
        unit = 'Roll';
    
-- delete existing record
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
    
