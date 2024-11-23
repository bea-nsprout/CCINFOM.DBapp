INSERT INTO items (item_code, item_desc, unit) VALUES
('0001010000YGGO036Y', 'MET. LACE 101-14 YGD W GOLD 36 YDS', 'ROLL'),	
('0001370000GOLD036Y', 'MET. LACE 137-50 GOLD 36 YDS', 'ROLL'),	
('0001370000SILV036Y', 'MET. LACE 137-50 SILVER 36 YDS', 'ROLL'),	
('0007010050YGLD036Y', 'FRINGES 701 2" (50MM) Y. GOLD 36 YDS', 'ROLL'),	
('0008100007AGRN050Y', 'DE SATIN RIBBON 810 1/4" (7MM) A. GREEN 50 YDS', 'ROLL'),	
('0008100007EGRN050Y', 'DE SATIN RIBBON 810 1/4" (7MM) E. GREEN 50 YDS', 'ROLL'),	
('0008100007LBLU050Y', 'DE SATIN RIBBON 810 1/4" (7MM) LT. BLUE 50 YDS', 'ROLL'),	
('0008110007EGGO050Y', 'DE SATIN RIBBON W/MET. 811 1/4" (7MM) EGN W GOLD 50 YDS', 'ROLL'),	
('0008110007PIGO050Y', 'DE SATIN RIBBON W/MET. 811 1/4" (7MM) PNK W GOLD 50 YDS', 'ROLL'),		
('0008120022PEGO050Y', 'ORGANZA SATIN W/ MET. 812 7/8" (22MM) PCH W GOLD 50 YDS', 'ROLL'),	
('0008120022RBGO050Y', 'ORGANZA SATIN W/ MET. 812 7/8" (22MM) RBL W GOLD 50 YDS', 'ROLL'),	
('0008130036MGLD050Y', 'CUT EDGE RIBBON 813 #9 36MM MATTE GOLD 50 YDS', 'ROLL'),	
('0008130036TANG050Y', 'CUT EDGE RIBBON 813 #9 36MM TANGERINE 50 YDS', 'ROLL'),	
('0008130070AGRN050Y', 'CUT EDGE RIBBON 813 #40 70MM A. GREEN 50 YDS', 'ROLL'),	
('0008130070LBLU050Y', 'CUT EDGE RIBBON 813 #40 70MM LT. BLUE 50 YDS', 'ROLL'),	
('003001SMALAGRN036Y', 'JAP. CORD 3001 SMALL A. GREEN 36 YDS', 'ROLL'),	
('003001SMALYGLD036Y', 'JAP. CORD 3001 SMALL Y. GOLD 36 YDS', 'ROLL'),	
('003200BIG0RBLU036Y', 'WED. CORD 3200 BIG ROYAL BLUE 36 YDS', 'ROLL'),	
('003200BIG0WHTE036Y', 'WED. CORD 3200 BIG WHITE 36 YDS', 'ROLL'),	
('003200MEDMYGLD072Y', 'WED. CORD 3200 MED. Y. GOLD 72 YDS', 'ROLL');

INSERT INTO personnel (first_name, last_name, position) VALUES
('Alice', 'Johnson', 'manager'),
('Bob', 'Smith', 'secretary'),
('Charlie', 'Brown', 'checker'),
('David', 'Williams', 'driver'),
('Eva', 'Jones', 'admin'),
('Frank', 'Miller', 'manager'),
('Grace', 'Davis', 'secretary'),
('Hannah', 'García', 'checker'),
('Isaac', 'Rodriguez', 'driver'),
('Jack', 'Martínez', 'admin'),
('Karen', 'Hernandez', 'manager'),
('Leo', 'Lopez', 'secretary'),
('Maya', 'Gonzalez', 'checker'),
('Nathan', 'Perez', 'driver'),
('Olivia', 'Wilson', 'admin'),
('Paul', 'Moore', 'manager'),
('Quinn', 'Taylor', 'secretary'),
('Rachel', 'Anderson', 'checker'),
('Samuel', 'Thomas', 'driver'),
('Tina', 'Jackson', 'admin'),
('Ursula', 'White', 'manager'),
('Victor', 'Harris', 'secretary'),
('Walter', 'Clark', 'checker'),
('Xander', 'Lewis', 'driver'),
('Yvonne', 'Young', 'admin');

INSERT INTO warehouses (warehouse_name, location) VALUES
('Warehouse A', 'Manila, Metro Manila'),
('Warehouse B', 'Cebu City, Cebu'),
('Warehouse C', 'Davao City, Davao del Sur'),
('Warehouse D', 'Quezon City, Metro Manila'),
('Warehouse E', 'Taguig, Metro Manila'),
('Warehouse F', 'Makati, Metro Manila'),
('Warehouse G', 'Iloilo City, Iloilo'),
('Warehouse H', 'Cagayan de Oro, Misamis Oriental'),
('Warehouse I', 'Zamboanga City, Zamboanga del Sur'),
('Warehouse J', 'Batangas City, Batangas');

INSERT INTO trucks (truck_id, warehouse_id) VALUES
('TRK001', 1),
('TRK002', 2),
('TRK003', 3),
('TRK004', 4),
('TRK005', 5),
('TRK006', 6),
('TRK007', 7),
('TRK008', 8),
('TRK009', 9),
('TRK010', 10);

-- Initialies warehouse inventory based on the warehouses data given
INSERT INTO inventories (item_code, warehouse_id) SELECT im.item_code, w.warehouse_id FROM items im JOIN warehouses w;

INSERT INTO productions (item_code, date_produced, qty_produced, warehouse_id) VALUES
('0001370000SILV036Y', '2022-11-01', 120, 1),
('0001370000GOLD036Y', '2022-12-02', 100, 2),
('003200MEDMYGLD072Y', '2023-01-03', 75, 3),
('0001010000YGGO036Y', '2023-02-04', 60, 4),
('003200BIG0WHTE036Y', '2023-03-05', 90, 5),
('003200MEDMYGLD072Y', '2023-04-06', 105, 6),
('003200BIG0RBLU036Y', '2023-05-07', 65, 7),
('003200BIG0WHTE036Y', '2023-06-08', 80, 8),
('003200BIG0RBLU036Y', '2023-07-09', 70, 9),
('003200BIG0WHTE036Y', '2023-08-10', 85, 10),
('0001010000YGGO036Y', '2023-09-11', 50, 1),
('0007010050YGLD036Y', '2023-10-12', 45, 2),
('0007010050YGLD036Y', '2023-11-13', 80, 3),
('0007010050YGLD036Y', '2023-12-14', 70, 4),
('0007010050YGLD036Y', '2024-01-15', 50, 5),
('0007010050YGLD036Y', '2024-02-16', 75, 6),
('0008110007PIGO050Y', '2024-03-17', 90, 7),
('003001SMALAGRN036Y', '2024-04-18', 70, 8),
('003001SMALYGLD036Y', '2024-05-19', 100, 9),
('003200MEDMYGLD072Y', '2024-06-20', 60, 10);

INSERT INTO requests (personnel_id, date_requested, item_code, qty_balance, qty_total, warehouse_from_id, warehouse_to_id) VALUES
(1, '2022-11-01', '0001370000SILV036Y', 100, 100, 1, 2),
(2, '2022-12-02', '0001370000GOLD036Y', 200, 200, 2, 3),
(3, '2023-01-03', '003200MEDMYGLD072Y', 150, 150, 3, 4),
(4, '2023-02-04', '0001010000YGGO036Y', 120, 120, 4, 5),
(5, '2023-03-05', '003200BIG0WHTE036Y', 180, 180, 5, 6),
(6, '2023-04-06', '003200MEDMYGLD072Y', 210, 210, 6, 7),
(7, '2023-05-07', '003200BIG0RBLU036Y', 130, 130, 7, 8),
(8, '2023-06-08', '003200BIG0WHTE036Y', 160, 160, 8, 9),
(9, '2023-07-09', '003200BIG0RBLU036Y', 140, 140, 9, 10),
(10, '2023-08-10', '003200BIG0WHTE036Y', 170, 170, 10, 1),
(1, '2023-09-11', '0001010000YGGO036Y', 110, 110, 1, 2),
(2, '2023-10-12', '0007010050YGLD036Y', 90, 90, 2, 3),
(3, '2023-11-13', '0007010050YGLD036Y', 160, 160, 3, 4),
(4, '2023-12-14', '0007010050YGLD036Y', 140, 140, 4, 5),
(5, '2024-01-15', '0007010050YGLD036Y', 100, 100, 5, 6),
(6, '2024-02-16', '0007010050YGLD036Y', 150, 150, 6, 7),
(7, '2024-03-17', '0008110007PIGO050Y', 180, 180, 7, 8),
(8, '2024-04-18', '003001SMALAGRN036Y', 140, 140, 8, 9),
(9, '2024-05-19', '003001SMALYGLD036Y', 200, 200, 9, 10),
(10, '2024-06-20', '003200MEDMYGLD072Y', 120, 120, 10, 1);


INSERT INTO transfers (request_id, personnel_id, date_transferred, truck_id, quantity) VALUES
(1, 1, '2022-11-01', 'TRK001', 70),
(2, 2, '2022-12-02', 'TRK002', 100),
(3, 3, '2023-01-03', 'TRK003', 75),
(4, 4, '2023-02-04', 'TRK004', 60),
(5, 5, '2023-03-05', 'TRK005', 90),
(6, 6, '2023-04-06', 'TRK006', 105),
(7, 7, '2023-05-07', 'TRK007', 65),
(8, 8, '2023-06-08', 'TRK008', 80),
(9, 9, '2023-07-09', 'TRK009', 70),
(10, 10, '2023-08-10', 'TRK010', 60),
(11, 1, '2023-09-11', 'TRK001', 50),
(12, 2, '2023-10-12', 'TRK002', 45),
(13, 3, '2023-11-13', 'TRK003', 80),
(14, 4, '2023-12-14', 'TRK004', 70),
(15, 5, '2024-01-15', 'TRK005', 50),
(16, 6, '2024-02-16', 'TRK006', 75),
(17, 7, '2024-03-17', 'TRK007', 90),
(18, 8, '2024-04-18', 'TRK008', 70),
(19, 9, '2024-05-19', 'TRK009', 100),
(1, 10, '2024-06-20', 'TRK010', 20);

INSERT INTO adjustments (time_log, item_code, qty_adjusted, warehouse_id) VALUES
('2022-01-01 10:00:00', '0001370000SILV036Y', -10, 1),
('2022-02-01 11:00:00', '0001370000GOLD036Y', 20, 2),
('2022-03-01 12:00:00', '003200MEDMYGLD072Y', -15, 3),
('2022-04-01 13:00:00', '0001010000YGGO036Y', 30, 4),
('2022-05-01 14:00:00', '003200BIG0WHTE036Y', -25, 5),
('2022-06-01 15:00:00', '003200MEDMYGLD072Y', 40, 6),
('2022-07-01 16:00:00', '003200BIG0RBLU036Y', -35, 7),
('2022-08-01 17:00:00', '003200BIG0WHTE036Y', 50, 8),
('2022-09-01 18:00:00', '003200BIG0RBLU036Y', -45, 9),
('2022-10-01 19:00:00', '003200BIG0WHTE036Y', 60, 10),
('2023-01-01 10:00:00', '0001370000SILV036Y', -10, 1),
('2023-02-01 11:00:00', '0001370000GOLD036Y', 20, 2),
('2023-03-01 12:00:00', '003200MEDMYGLD072Y', -15, 3),
('2023-04-01 13:00:00', '0001010000YGGO036Y', 30, 4),
('2023-05-01 14:00:00', '003200BIG0WHTE036Y', -25, 5),
('2024-06-01 15:00:00', '003200MEDMYGLD072Y', 40, 6),
('2024-07-01 16:00:00', '003200BIG0RBLU036Y', -35, 7),
('2024-08-01 17:00:00', '003200BIG0WHTE036Y', 50, 8),
('2024-09-01 18:00:00', '003200BIG0RBLU036Y', -45, 9),
('2024-10-01 19:00:00', '003200BIG0WHTE036Y', 60, 10);


-- Increase quantity from production
UPDATE inventories wi
JOIN productions p on wi.item_code = p.item_code AND wi.warehouse_id = p.warehouse_id
SET wi.quantity = wi.quantity + p.qty_produced
WHERE wi.warehouse_id = p.warehouse_id;

-- (displays updated)
    SELECT *
    FROM inventories
    WHERE quantity > 0;

-- Decrease quantity from the source warehouse
UPDATE inventories wi
JOIN (
    SELECT r.item_code, r.warehouse_from_id, SUM(t.quantity) AS total_transferred
    FROM requests r
    JOIN transfers t ON r.request_id = t.request_id
    GROUP BY r.request_id
) sum ON wi.item_code = sum.item_code AND wi.warehouse_id = sum.warehouse_from_id
SET wi.quantity = wi.quantity - sum.total_transferred
WHERE wi.item_code = sum.item_code AND wi.warehouse_id = sum.warehouse_from_id;

-- Increase quantity in the destination warehouse
UPDATE inventories wi
JOIN (
    SELECT r.item_code, r.warehouse_to_id, SUM(t.quantity) AS total_transferred
    FROM requests r
    JOIN transfers t ON r.request_id = t.request_id
    GROUP BY r.request_id
) sum ON wi.item_code = sum.item_code AND wi.warehouse_id = sum.warehouse_to_id
SET wi.quantity = wi.quantity + sum.total_transferred
WHERE wi.item_code = sum.item_code AND wi.warehouse_id = sum.warehouse_to_id;


-- Update qty_balance in request:
UPDATE requests r
JOIN (
    SELECT request_id, SUM(quantity) AS total_transferred
    FROM transfers
    GROUP BY request_id
) t ON r.request_id = t.request_id
SET r.qty_balance = r.qty_balance - t.total_transferred
WHERE r.request_id = t.request_id;

-- (Displays updated)
    SELECT r.request_id, wi.*, r.qty_total, r.qty_balance, t.quantity
    FROM requests r
    JOIN inventories wi ON wi.item_code = r.item_code  AND wi.warehouse_id = r.warehouse_from_id
    JOIN transfers t ON r.request_id = t.request_id
    WHERE r.request_id = t.request_id;
