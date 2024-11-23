
-- ADJUSTMENTS TABLE COMMANDS

-- CREATE (is part of INVENTORIES EDIT)

-- MODIFY (only adjust qty)
    SET @to_adjust = '2024-11-23 12:31:10'; -- record to adjust
    SET @new_qty = 0;

    SELECT @old_qty := qty_adjusted, @itemcode := item_code, @warehouseid := warehouse_id
    FROM adjustments
    WHERE time_log = @to_adjust;

    UPDATE adjustments
    SET qty_adjusted = @new_qty
    WHERE time_log = @to_adjust;

    UPDATE inventories inv
    SET inv.quantity = inv.quantity - @old_qty + @new_qty
    WHERE inv.item_code = @itemcode AND inv.warehouse_id = @warehouseid;


-- DELETE
    SET @to_adjust = '2024-11-23 12:31:10'; -- record to delete

    SELECT @old_qty := qty_adjusted, @itemcode := item_code, @warehouseid := warehouse_id
    FROM adjustments
    WHERE time_log = @to_adjust;

    DELETE FROM adjustments
    WHERE time_log = @to_adjust;

    UPDATE inventories inv
    SET inv.quantity = inv.quantity - @old_qty
    WHERE inv.item_code = @itemcode AND inv.warehouse_id = @warehouseid;


SELECT *
from inventories
where item_code = '0001010000YGGO036Y' and warehouse_id = 2;

-- VIEW
    -- VIEW #1: NO FILTER
        SELECT time_log, warehouse_name, item_code, qty_adjusted
        FROM adjustments a
        JOIN warehouses w ON w.warehouse_id = a.warehouse_id;

    -- VIEW #2: FILTER DATE RANGE
        SELECT time_log, warehouse_name, item_code, qty_adjusted
        FROM adjustments a
        JOIN warehouses w ON w.warehouse_id = a.warehouse_id
        WHERE DATE(time_log) BETWEEN '2024-11-23' AND '2024-11-23';

-- VIEW #3: FILTER ITEMCODE
        SELECT time_log, warehouse_name, item_code, qty_adjusted
        FROM adjustments a
        JOIN warehouses w ON w.warehouse_id = a.warehouse_id
        WHERE item_code LIKE '%101%';

-- VIEW #3: FILTER WAREHOUSE
        SELECT time_log, warehouse_name, item_code, qty_adjusted
        FROM adjustments a
        JOIN warehouses w ON w.warehouse_id = a.warehouse_id
        WHERE warehouse_name LIKE '% B%';