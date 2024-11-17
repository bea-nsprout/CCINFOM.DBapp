-- DROP DATABASE warehousedb;

-- CREATE DATABASE warehouseDB;

-- 4 core tables as follows:
CREATE TABLE item_masterlist (
	item_code varchar(20) PRIMARY KEY NOT NULL,
    item_desc varchar(150) NOT NULL,
    unit varchar(10) NOT NULL,
    archived boolean NOT NULL DEFAULT false
);

CREATE TABLE warehouse (
	warehouse_id int PRIMARY KEY AUTO_INCREMENT,
    warehouse_name varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    archived boolean NOT NULL DEFAULT false
);

CREATE TABLE truck (
	truck_id varchar(10) PRIMARY KEY NOT NULL,
    warehouse_id int NOT NULL,
    archived boolean NOT NULL DEFAULT false,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT
);

CREATE TABLE personnel (
	personnel_id int PRIMARY KEY AUTO_INCREMENT ,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    position varchar(50) NOT NULL,
    archived boolean NOT NULL DEFAULT false
);

-- 4 transaction tables as follows
CREATE TABLE warehouse_inventory (
	item_code varchar(20) NOT NULL,
    warehouse_id int NOT NULL,
    quantity int NOT NULL DEFAULT 0,
    
    PRIMARY KEY (item_code, warehouse_id),
    FOREIGN KEY (item_code) REFERENCES item_masterlist(item_code) ON DELETE RESTRICT,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT
    
);

CREATE TABLE request (
	request_id int PRIMARY KEY AUTO_INCREMENT,
    personnel_id int NOT NULL,
    date_requested date NOT NULL,
    item_code varchar(20) NOT NULL,
    qty_balance int NOT NULL,
    qty_total int NOT NULL,
    unit varchar(10) NOT NULL,
    warehouse_from_id int NOT NULL,    	-- id of W.house that requests were from
    warehouse_to_id int NOT NULL,		-- id of w.house that requests were sent to
    status ENUM('PENDING', 'COMPLETE') NOT NULL DEFAULT 'PENDING',
    
    FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id) ON DELETE RESTRICT, 
    FOREIGN KEY (item_code) REFERENCES item_masterlist(item_code) ON DELETE RESTRICT,
    FOREIGN KEY (warehouse_from_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT,
    FOREIGN KEY (warehouse_to_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT
);

CREATE TABLE transfer (
	transfer_id int PRIMARY KEY AUTO_INCREMENT, 
    request_id int NOT NULL, 
    personnel_id int NOT NULL, 
    item_code varchar(20) NOT NULL,
    date_transferred date NOT NULL,
    truck_id varchar(10) NOT NULL,
    quantity int NOT NULL,
    unit varchar(10) NOT NULL,
    warehouse_from_id int NOT NULL,    	-- id of W.house that items were from
    warehouse_to_id int NOT NULL,		-- id of w.house that items were sent to
    
	FOREIGN KEY (request_id) REFERENCES request(request_id) ON DELETE RESTRICT, 
    FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id) ON DELETE RESTRICT, 
    FOREIGN KEY (item_code) REFERENCES item_masterlist(item_code) ON DELETE RESTRICT, 
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id) ON DELETE RESTRICT, 
    FOREIGN KEY (warehouse_from_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT,
    FOREIGN KEY (warehouse_to_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT
);

CREATE TABLE production (
	production_id int PRIMARY KEY AUTO_INCREMENT,
	item_code varchar(20) NOT NULL,
    date_produced date NOT NULL,
    qty_produced int NOT NULL,
    unit varchar(10) NOT NULL,
    warehouse_id int NOT NULL, 
    
    FOREIGN KEY (item_code) REFERENCES item_masterlist(item_code) ON DELETE RESTRICT, 
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id) ON DELETE RESTRICT
);

