CREATE DATABASE warehouseDB;

CREATE TABLE item_masterlist (
	item_code varchar(20),
    item_desc varchar(150),
    unit varchar(10)
);

CREATE TABLE warehouse (
	warehouse_id int,
    warehouse_name varchar(50),
    location varchar(50)
);

CREATE TABLE warehouse_inventory (
	item_code varchar(20),
    warehouse_id int,
    quantity int
);

CREATE TABLE request (
	request_id int,
    personnel_id int,
    date_requested date,
    item_code varchar(20),
    qty_balance int,
    qty_total int,
    unit varchar(10)
);

CREATE TABLE transfer (
	transfer_id int, 
    request_id int, 
    personnel_id int, 
    item_code varchar(20),
    date_transferred date,
    truck_id varchar(10),
    quantity int,
    unit varchar(10)
);

CREATE TABLE production (
	item_code varchar(20),
    date_produced date,
    qty_produced int,
    unit varchar(10),
    warehouse_id int
);

CREATE TABLE truck (
	truck_id varchar(10),
    warehouse_id int
);

CREATE TABLE personnel (
	personnel_id int,
    first_name varchar(20),
    last_name varchar(20),
    position varchar(50)
);