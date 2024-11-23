-- REQUEST

-- Create a new request record [ DONE ]
	INSERT INTO requests (
		     personnel_id,
                     date_requested,
                     item_code,
                     qty_balance, 
                     qty_total, 
                     warehouse_from_id, 
                     warehouse_to_id) 
	VALUES (1 , CURDATE(), '0001010000YGGO036Y', 99, 100, 1, 2);
 
-- Modify an existing record [ DONE ]
	SET @new_qty_balance = 50; /* provide the qty_balance */

	UPDATE requests
	SET
    	qty_balance = @new_qty_balance 
		/* provide the request_id */
	WHERE qty_total >= @new_qty_balance AND request_id = 3;

-- delete existing record -- [ DONE ]
	DELETE FROM requests
    WHERE request_id = 1 /* Some request_id */ AND qty_balance = 0;
    
-- view all request -- [ DONE ]
	-- no filter
	SELECT 	request_id, item_code, qty_balance, date_requested, 
	warehouse_from_id, warehouse_to_id, IF(qty_balance > 0, 'PENDING', 'COMPLETED') AS status
	FROM requests
	ORDER BY request_id DESC;
    
	-- given date requested -- [ DONE ]
	SELECT 	request_id, item_code, qty_balance, date_requested, 
	warehouse_from_id, warehouse_to_id, IF(qty_balance > 0, 'PENDING', 'COMPLETED') AS status
    	FROM requests 
	WHERE date_requested = '2023-01-03'
   	ORDER BY request_id DESC;

    	-- given an item code -- [ DONE ]
    	SELECT 	r.request_id, r.item_code, r.qty_balance, r.date_requested, 
	r.warehouse_from_id, r.warehouse_to_id, IF(r.qty_balance > 0, 'PENDING', 'COMPLETED') AS status
    	FROM requests r
	JOIN items im ON r.item_code = im.item_code 
    	WHERE im.item_code = '003200BIG0RBLU036Y'
        ORDER BY r.request_id DESC;

	-- given a status of qty_balance
	SELECT r.request_id, r.item_code, r.qty_balance, r.date_requested, 
    	r.warehouse_from_id, r.warehouse_to_id, IF(r.qty_balance > 0, 'PENDING', 'COMPLETED') AS status
	FROM requests r
	WHERE IF(r.qty_balance > 0, 'PENDING', 'COMPLETED') = 'PENDING' /* PENDING or COMPLETED */
	ORDER BY r.request_id DESC;

	-- given a warehouse from ID
    	SELECT 	r.request_id, r.item_code, r.qty_balance, r.date_requested, 
	r.warehouse_from_id, r.warehouse_to_id, IF(r.qty_balance > 0, 'PENDING', 'COMPLETED') AS status
    	FROM requests r
    	WHERE r.warehouse_from_id = 1
        ORDER BY r.request_id DESC;

	-- given a warehouse to ID
    	SELECT 	r.request_id, r.item_code, r.qty_balance, r.date_requested, 
	r.warehouse_from_id, r.warehouse_to_id, IF(r.qty_balance > 0, 'PENDING', 'COMPLETED') AS status
    	FROM requests r
    	WHERE r.warehouse_to_id = 1
        ORDER BY r.request_id DESC;
