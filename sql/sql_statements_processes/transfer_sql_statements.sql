-- TRANSFER 
	-- Create Transfer [ FIXED ]
	SET @v1 = 90; -- Amount to transfer

	INSERT INTO transfer (request_id, personnel_id, date_transferred, truck_id, quantity)
	VALUES (1, 1, CURDATE(), 'TRK0001', @v1);

	UPDATE request r
	SET r.qty_balance = r.qty_balance - @v1
	WHERE r.request_id = 1 AND r.qty_balance >= @v1; 

	UPDATE warehouse_inventory wi
	JOIN request r ON wi.item_code = r.item_code
	JOIN transfer t ON r.request_id = t.request_id
	SET wi.quantity = wi.quantity - @v1
	WHERE wi.warehouse_id = t.warehouse_from_id AND t.request_id = 1 AND wi.quantity >= @v1;

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
	SET @v1 = 14; /* transfer_id to be deleted */

	UPDATE warehouse_inventory wi
	JOIN request r ON wi.item_code = r.item_code
	JOIN transfer t ON r.request_id = t.transfer_id
	SET wi.quantity = wi.quantity + t.quantity
	WHERE t.transfer_id = @v1;

	UPDATE request r
	JOIN transfer t ON r.request_id = t.request_id
	SET r.qty_balance = r.qty_balance + t.quantity
	WHERE t.transfer_id = @v1;

	DELETE FROM transfer
	WHERE transfer_id = @v1;

-- view all request [ FIXED ]
    -- given date transferred
    -- join with request then join with masterlist, display the item description
	SELECT transfer.*, im.item_desc
    FROM transfer 
    JOIN request r ON transfer.request_id = r.request_id
    JOIN item_masterlist im ON r.item_code = im.item_code
	WHERE date_transferred = '2023-04-06';
    
-- given an item code [ FIXED ]
	-- join with request then join with masterlist, display the item description
	SELECT transfer.*, im.item_code, im.item_desc
    FROM transfer 
    JOIN request r ON transfer.request_id = r.request_id
    JOIN item_masterlist im ON r.item_code = im.item_code
	WHERE im.item_code = '0001010000YGGO036Y';
    
