INSERT INTO item_masterlist (item_code, item_desc, unit) VALUES
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

INSERT INTO warehouse (warehouse_name, location) VALUES
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

INSERT INTO truck (truck_id, warehouse_id) VALUES
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

-- THIS IS USELESS: USE THE FUNCTION IN WAREHOUSEINVENTORY INSTEAD!!
-- INSERT INTO warehouse_inventory (item_code, warehouse_id, quantity) VALUES
-- ('0001370000SILV036Y', 1, 100),
-- ('0001390007GOLD036Y', 2, 200),
-- ('003200MEDMRBLU072Y', 3, 150),
-- ('0001010000YGGO036Y', 4, 120),
-- ('003200MEDMLBLU072Y', 5, 180),
-- ('003200MEDMYGLD072Y', 6, 210),
-- ('003200MEDMWHTE072Y', 7, 130),
-- ('003200BIG0LBLU036Y', 8, 160),
-- ('003200BIG0RBLU036Y', 9, 140),
-- ('003200BIG0WHTE036Y', 10, 170),
-- ('000701004IYGLD036Y', 1, 110),
-- ('000701004IRED0036Y', 2, 90),
-- ('000701004IEGRN036Y', 3, 160),
-- ('000701004IWHTE036Y', 4, 140),
-- ('0007010050RBLU036Y', 5, 100),
-- ('0007010050RED0036Y', 6, 150),
-- ('0007010050YGLD036Y', 7, 180),
-- ('003001SMALAGRN036Y', 8, 140),
-- ('003001SMALBGRN036Y', 9, 200),
-- ('003001SMALBLCK036Y', 10, 120);

-- Initialies warehouse inventory based on the warehouses data given
INSERT INTO warehouse_inventory (item_code, warehouse_id) SELECT im.item_code, w.warehouse_id FROM item_masterlist im JOIN warehouse w;

INSERT INTO production (item_code, date_produced, qty_produced, unit, warehouse_id) VALUES
('0001370000SILV036Y', '2022-11-01', 50, 'ROLL', 1),
('0001370000GOLD036Y', '2022-12-02', 100, 'ROLL', 2),
('003200MEDMYGLD072Y', '2023-01-03', 75, 'ROLL', 3),
('0001010000YGGO036Y', '2023-02-04', 60, 'ROLL', 4),
('003200BIG0WHTE036Y', '2023-03-05', 90, 'ROLL', 5),
('003200MEDMYGLD072Y', '2023-04-06', 105, 'ROLL', 6),
('003200BIG0RBLU036Y', '2023-05-07', 65, 'ROLL', 7),
('003200BIG0WHTE036Y', '2023-06-08', 80, 'ROLL', 8),
('003200BIG0RBLU036Y', '2023-07-09', 70, 'ROLL', 9),
('003200BIG0WHTE036Y', '2023-08-10', 85, 'ROLL', 10),
('0001010000YGGO036Y', '2023-09-11', 50, 'ROLL', 1),
('0007010050YGLD036Y', '2023-10-12', 45, 'ROLL', 2),
('0007010050YGLD036Y', '2023-11-13', 80, 'ROLL', 3),
('0007010050YGLD036Y', '2023-12-14', 70, 'ROLL', 4),
('0007010050YGLD036Y', '2024-01-15', 50, 'ROLL', 5),
('0007010050YGLD036Y', '2024-02-16', 75, 'ROLL', 6),
('0008110007PIGO050Y', '2024-03-17', 90, 'ROLL', 7),
('003001SMALAGRN036Y', '2024-04-18', 70, 'ROLL', 8),
('003001SMALYGLD036Y', '2024-05-19', 100, 'ROLL', 9),
('003200MEDMYGLD072Y', '2024-06-20', 60, 'ROLL', 10);


INSERT INTO request (personnel_id, date_requested, item_code, qty_balance, qty_total, unit, warehouse_from_id, warehouse_to_id) VALUES
(1, '2022-11-01', '0001370000SILV036Y', 100, 100, 'ROLL', 1, 2),
(2, '2022-12-02', '0001370000GOLD036Y', 200, 200, 'ROLL', 2, 3),
(3, '2023-01-03', '003200MEDMYGLD072Y', 150, 150, 'ROLL', 3, 4),
(4, '2023-02-04', '0001010000YGGO036Y', 120, 120, 'ROLL', 4, 5),
(5, '2023-03-05', '003200BIG0WHTE036Y', 180, 180, 'ROLL', 5, 6),
(6, '2023-04-06', '003200MEDMYGLD072Y', 210, 210, 'ROLL', 6, 7),
(7, '2023-05-07', '003200BIG0RBLU036Y', 130, 130, 'ROLL', 7, 8),
(8, '2023-06-08', '003200BIG0WHTE036Y', 160, 160, 'ROLL', 8, 9),
(9, '2023-07-09', '003200BIG0RBLU036Y', 140, 140, 'ROLL', 9, 10),
(10, '2023-08-10', '003200BIG0WHTE036Y', 170, 170, 'ROLL', 10, 1),
(1, '2023-09-11', '0001010000YGGO036Y', 110, 110, 'ROLL', 1, 2),
(2, '2023-10-12', '0007010050YGLD036Y', 90, 90, 'ROLL', 2, 3),
(3, '2023-11-13', '0007010050YGLD036Y', 160, 160, 'ROLL', 3, 4),
(4, '2023-12-14', '0007010050YGLD036Y', 140, 140, 'ROLL', 4, 5),
(5, '2024-01-15', '0007010050YGLD036Y', 100, 100, 'ROLL', 5, 6),
(6, '2024-02-16', '0007010050YGLD036Y', 150, 150, 'ROLL', 6, 7),
(7, '2024-03-17', '0008110007PIGO050Y', 180, 180, 'ROLL', 7, 8),
(8, '2024-04-18', '003001SMALAGRN036Y', 140, 140, 'ROLL', 8, 9),
(9, '2024-05-19', '003001SMALYGLD036Y', 200, 200, 'ROLL', 9, 10),
(10, '2024-06-20', '003200MEDMYGLD072Y', 120, 120, 'ROLL', 10, 1);


INSERT INTO transfer (request_id, personnel_id, item_code, date_transferred, truck_id, quantity, unit, warehouse_from_id, warehouse_to_id) VALUES
(1, 1, '0001370000SILV036Y', '2022-11-01', 'TRK001', 50, 'ROLL', 1, 2),
(2, 2, '0001370000GOLD036Y', '2022-12-02', 'TRK002', 100, 'ROLL', 2, 3),
(3, 3, '003200MEDMYGLD072Y', '2023-01-03', 'TRK003', 75, 'ROLL', 3, 4),
(4, 4, '0001010000YGGO036Y', '2023-02-04', 'TRK004', 60, 'ROLL', 4, 5),
(5, 5, '003200BIG0WHTE036Y', '2023-03-05', 'TRK005', 90, 'ROLL', 5, 6),
(6, 6, '003200MEDMYGLD072Y', '2023-04-06', 'TRK006', 105, 'ROLL', 6, 7),
(7, 7, '003200BIG0RBLU036Y', '2023-05-07', 'TRK007', 65, 'ROLL', 7, 8),
(8, 8, '003200BIG0WHTE036Y', '2023-06-08', 'TRK008', 80, 'ROLL', 8, 9),
(9, 9, '003200BIG0RBLU036Y', '2023-07-09', 'TRK009', 70, 'ROLL', 9, 10),
(10, 10, '003200BIG0WHTE036Y', '2023-08-10', 'TRK010', 85, 'ROLL', 10, 1),
(11, 1, '0001010000YGGO036Y', '2023-09-11', 'TRK001', 50, 'ROLL', 1, 2),
(12, 2, '0007010050YGLD036Y', '2023-10-12', 'TRK002', 45, 'ROLL', 2, 3),
(13, 3, '0007010050YGLD036Y', '2023-11-13', 'TRK003', 80, 'ROLL', 3, 4),
(14, 4, '0007010050YGLD036Y', '2023-12-14', 'TRK004', 70, 'ROLL', 4, 5),
(15, 5, '0007010050YGLD036Y', '2024-01-15', 'TRK005', 50, 'ROLL', 5, 6),
(16, 6, '0007010050YGLD036Y', '2024-02-16', 'TRK006', 75, 'ROLL', 6, 7),
(17, 7, '0008110007PIGO050Y', '2024-03-17', 'TRK007', 90, 'ROLL', 7, 8),
(18, 8, '003001SMALAGRN036Y', '2024-04-18', 'TRK008', 70, 'ROLL', 8, 9),
(19, 9, '003001SMALYGLD036Y', '2024-05-19', 'TRK009', 100, 'ROLL', 9, 10),
(20, 10, '003200MEDMYGLD072Y', '2024-06-20', 'TRK010', 60, 'ROLL', 10, 1);

-- Decrease quantity from the source warehouse
UPDATE warehouse_inventory wi
JOIN transfer t ON wi.item_code = t.item_code AND wi.warehouse_id = t.warehouse_from_id
SET wi.quantity = wi.quantity - t.quantity;

-- Increase quantity in the destination warehouse
UPDATE warehouse_inventory wi
JOIN transfer t ON wi.item_code = t.item_code AND wi.warehouse_id = t.warehouse_to_id
SET wi.quantity = wi.quantity + t.quantity;

-- Update qty_balance in request:
UPDATE request r
JOIN transfer t ON r.request_id = t.request_id
SET r.qty_balance = r.qty_balance - t.quantity
WHERE r.request_id = t.request_id;





