-- TRANSFER 
	-- Create Transfer [ FIXED ]
	SET @v1 = 90; -- Amount to transfer

	INSERT INTO transfers (request_id, personnel_id, date_transferred, truck_id, quantity)
	VALUES (1, 1, CURDATE(), 'TRK0001', @v1);

	UPDATE requests r
	SET r.qty_balance = r.qty_balance - @v1
	WHERE r.request_id = 1 AND r.qty_balance >= @v1; 

	UPDATE inventories wi
	JOIN requests r ON wi.item_code = r.item_code
	JOIN transfers t ON r.request_id = t.request_id
	SET wi.quantity = wi.quantity - @v1
	WHERE wi.warehouse_id = r.warehouse_from_id AND t.request_id = 1 AND wi.quantity >= @v1;

	-- SELECT * FROM transfer WHERE request_id = 1;
	-- SELECT * FROM request WHERE request_id = 1;
	-- SELECT * FROM warehouse_inventory;
    
-- Modify an existing record and update qty_balance accordingly [ FIXED ]
	SET @v1 = 50; -- New transfer quantity
	SET @transfer_id = 6; -- Transfer ID to modify

	SELECT r.qty_total AS old_qty
    	FROM requests r
    	WHERE r.request_id = 2;
    
   	UPDATE transfers
	SET quantity = @v1
	WHERE transfer_id = @transfer_id;

	UPDATE requests r
	JOIN transfers t ON r.request_id = t.request_id
	SET r.qty_balance = r.qty_total - 100 /* Old Quantity */ + @v1 /* New Quantity */
	WHERE t.transfer_id = @transfer_id;
    
	-- SELECT * FROM transfer WHERE transfer_id = @transfer_id;
	-- SELECT * FROM request r
	-- JOIN transfer t ON r.request_id = t.request_id
	-- WHERE t.transfer_id = @transfer_id;
  
-- delete existing record [ FIXED ]
	SET @v1 = 14; /* transfer_id to be deleted */

	UPDATE inventories wi
	JOIN requests r ON wi.item_code = r.item_code
	JOIN transfers t ON r.request_id = t.transfer_id
	SET wi.quantity = wi.quantity + t.quantity
	WHERE t.transfer_id = @v1;

	UPDATE requests r
	JOIN transfers t ON r.request_id = t.request_id
	SET r.qty_balance = r.qty_balance + t.quantity
	WHERE t.transfer_id = @v1;

	DELETE FROM transfers
	WHERE transfer_id = @v1;

-- VIEW
	-- No Filter
	SELECT * FROM transfers
   	ORDER BY transfer_id DESC;

	-- Given Date 
	SELECT *
	FROM transfers
	WHERE date_transferred BETWEEN '2023-04-06' AND '2024-05-01'
	ORDER BY date_transferred DESC;

	-- Given an item_code
	SELECT transfers.*, im.item_code
   	FROM transfers
    	JOIN requests r ON transfers.request_id = r.request_id
    	JOIN items im ON r.item_code = im.item_code
	WHERE im.item_code = '0001010000YGGO036Y'
    	ORDER BY transfer_id DESC;

	-- status 
	SELECT *, IF(quantity > 0, 'PENDING', 'COMPLETED') AS status
	FROM transfers
    	ORDER BY transfer_id DESC;

	-- warehouse from 
	SELECT t.*, r.warehouse_from_id
	FROM transfers t 
	JOIN requests r ON t.request_id = r.request_id
	WHERE r.warehouse_from_id = 1
    	ORDER BY transfer_id DESC; 

	-- warehouse to 
	SELECT t.*, r.warehouse_to_id
	FROM transfers t 
	JOIN requests r ON t.request_id = r.request_id
	WHERE r.warehouse_to_id = 1
    	ORDER BY transfer_id DESC; 
