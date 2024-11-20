-- REQUEST

-- Create a new request record [ DONE ]
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO request (request_id, 
					personnel_id,
                     date_requested,
                     item_code,
                     qty_balance, 
                     qty_total, 
                     warehouse_from_id, 
                     warehouse_to_id) 
VALUES (@last_request_id ,1 , CURDATE(), 'ADLER_STREBEL', 99, 100, 1, 2);

SET FOREIGN_KEY_CHECKS = 1;
 
-- Modify an existing record
UPDATE request
SET item_code = '0000123SDF', 
    date_requested = '2024-12-01',
    qty_balance = 101, 
    qty_total = 105, 
    status = 'COMPLETE'
WHERE qty_total - qty_balance > 0;

-- delete existing record -- [ DONE ]
	DELETE FROM request
    WHERE request_id = 1 /* Some request_id */ AND qty_balance = 0; /* ask bea */
    
-- view all request -- [ DONE ]
	-- given a requestID
	SELECT * 
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
    
-- view all pending requests -- [ DONE ]
	SELECT * 
    FROM request
    WHERE status = 'PENDING';
