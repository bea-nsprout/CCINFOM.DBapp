
-- item mast

-- CREATE NEW ITEMS
	-- check first if item exists in item mast
		SELECT EXISTS (
			SELECT 1
			FROM item_masterlist items
			WHERE items.item_code = '0001010000YGGO036Y'
		) AS item_exists;


    -- insert new item into the database
        INSERT INTO item_masterlist (item_code, item_desc, unit) VALUES
		('0001010000YGGO036Y', 'MET. LACE 101-14 YGD W GOLD 36 YDS', 'ROLL'); -- 	replace 	
		
    -- update the warehouse inventory
    
    