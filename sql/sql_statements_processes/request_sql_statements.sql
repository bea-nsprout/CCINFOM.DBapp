-- REQUEST

-- Create a new request record [ DONE ]
	INSERT INTO request (
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

	UPDATE request
	SET
    	qty_balance = @new_qty_balance 
		/* provide the request_id */
	WHERE qty_total >= @new_qty_balance AND request_id = 3;

-- delete existing record -- [ DONE ]
	DELETE FROM request
    WHERE request_id = 1 /* Some request_id */ AND qty_balance = 0; /* ask bea */
    
-- view all request -- [ DONE ]
	-- add a join to show the item description, in item_masterlist
	-- given a requestID
	SELECT request.*,  
    FROM request 
    WHERE request_id = 1;
    
    -- given date requested -- [ DONE ]
    SELECT *
    FROM request
	WHERE date_requested = '2024-12-01';
    
    -- given an item code -- [ DONE ]
    SELECT *
    FROM request
    WHERE item_code = 2;

