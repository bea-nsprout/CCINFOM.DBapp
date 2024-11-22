-- PRODUCTION
-- 1. create a new production record    
	-- 1a. pick a production method (choose either one)
		-- custom date
			INSERT INTO productions (item_code, date_produced, qty_produced, warehouse_id) VALUES
			('0001370000SILV036Y' /*@itemcode*/, '2024-11-18', 70 /*@produced*/, 1 /*@warehouseid*/);
        
		-- current date (automatic)
			INSERT INTO productions (item_code, date_produced, qty_produced, warehouse_id) VALUES
			('0001370000SILV036Y' /*@itemcode*/, CURDATE(), 70 /*@produced*/, 1 /*@warehouseid*/);

	-- 1b. update the warehouse_inventory
		UPDATE inventories inv
        SET inv.quantity = inv.quantity + 70 /*@produced*/
        WHERE inv.item_code = '0001370000SILV036Y' /*@itemcode*/ AND inv.warehouse_id = 1 /*@warehouseid*/;
        
-- 2. MODIFY existing production record (quantity)
	-- if you wanna show the list of production records, check below #4 
	-- 2a. preparations (store the value of return!)
		SELECT qty_produced AS old_qty
        FROM productions
        WHERE production_id = 2 /*@productionid*/;
        
	-- 2b. update production record
		UPDATE productions
		SET qty_produced = 30 /*@newqty*/
		WHERE production_id = 2 /*@productionid*/;
        
	-- 2c. update warehouse_inventory record
		UPDATE inventories inv
        SET inv.quantity = inv.quantity - 70 /*@oldqty*/ + 30 /*@newqty*/
        WHERE inv.item_code = '0001370000SILV036Y' /*@itemcode*/ AND inv.warehouse_id = 1 /*@warehouseid*/;
    
    
-- 3. DELETE
	-- 3a. preparations (store the value of return!) code is the same as 2a
		SELECT qty_produced AS old_qty
        FROM productions
        WHERE production_id = 2 /*@productionid*/;
        
	-- 3b. delete production record
		DELETE FROM productions
		WHERE production_id = 2 /*@productionid*/;
	
    -- 3c. update warehouse_inventory record
		UPDATE inventories inv
        SET inv.quantity = inv.quantity - 70 /*@oldqty*/ 
        WHERE inv.item_code = '0001370000SILV036Y' /*@itemcode*/ AND inv.warehouse_id = 1 /*@warehouseid*/;
    
-- 4. VIEW all production records
	-- no filter:
		SELECT p.production_id, p.date_produced, p.item_code, i.item_desc, p.qty_produced, p.warehouse_id
        FROM productions p
        LEFT JOIN item_masterlist i ON p.item_code = i.item_code;
        
	-- filter: given date
		SELECT *
        FROM productions
        WHERE date_produced = '2024-11-18' /*@date*/;
        
	-- filter: date range
		SELECT *
        FROM productions
		WHERE date_produced BETWEEN '2024-11-02' /*@date1*/ AND '2024-11-18' /*date2*/;
        
	-- filter: itemcode
		SELECT *
        FROM productions
        WHERE item_code = '0001370000SILV036Y' /*@itemcode*/;

        
        
		
        
	