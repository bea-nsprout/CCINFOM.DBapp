-- REQUEST

-- Create a new request record
INSERT INTO request (request_id, 
                     personnel_id,
                     date_requested,
                     item_code,
                     qty_balance, 
                     qty_total, 
                     unit, 
                     warehouse_from_id, 
                     warehouse_to_id, 
                     status) 
VALUES (1, 1, '2024-11-01', '0001370000SILV036Y', 100, 100, 'ROLL', 1, 2, 'COMPLETE');
 
-- Modify an existing record
UPDATE request
SET item_code = '0000123SDF', 
    date_requested = '2024-12-01',
    qty_balance = 101, 
    qty_total = 105, 
    status = 'PENDING'
WHERE qty_total - qty_balance > 0;

-- delete existing record
	DELETE FROM request
    WHERE request_id = 1 AND qty_balance = 0;
    
-- view all request 
	-- given a requestID
	SELECT * 
    FROM request 
    WHERE request_id = 1;
    
    -- given date requested
    SELECT *
    FROM request
	WHERE date_requested = '2024-12-01';
    
    -- given an item code
    SELECT *
    FROM request
    WHERE item_code = 2;
    
-- view all pending requests
	SELECT * 
    FROM request
    WHERE status = 'PENDING';
    
    
