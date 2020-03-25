alter table chain

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table electrical_equipment

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table electric_building

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table electro_group_motor

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table electro_group_pump

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table generator

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table hedromeca_equipment

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table inventory

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table inventory_component

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table inventory_ouvrage

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table local_block

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table membrane_kit

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table metering_pump

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table ouvrage

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table ouvrage_chain

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table ouvrage_component

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table personne_exploitation

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table php_station

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table product_storage

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table security

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table transformation_station

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;

alter table water_intake

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;