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
	SELECT r.*,  im.item_desc
    	FROM requests r
	JOIN item_masterlist im ON r.item_code = im.item_code;

	-- given date requested -- [ DONE ]
	SELECT r.*, im.item_desc
    	FROM requests r
	JOIN item_masterlist im ON r.item_code = im.item_code 
	WHERE r.date_requested = '2023-01-03';

    	-- given an item code -- [ DONE ]
    	SELECT r.*, im.item_desc
    	FROM requests r
	JOIN item_masterlist im ON r.item_code = im.item_code 
    	WHERE im.item_code = '003200BIG0RBLU036Y';

	-- given a status of qty_balance
	SELECT *, IF(qty_balance > 0, 'PENDING', 'COMPLETED') AS status
	FROM requests r;

	-- given a warehouse from ID
    	SELECT r.*, im.item_desc
    	FROM requests r
	JOIN item_masterlist im ON r.item_code = im.item_code 
    	WHERE r.warehouse_from_id = 1;

	-- given a warehouse to ID
	SELECT r.*, im.item_desc
    	FROM requests r
	JOIN item_masterlist im ON r.item_code = im.item_code 
    	WHERE r.warehouse_to_id = 1;


