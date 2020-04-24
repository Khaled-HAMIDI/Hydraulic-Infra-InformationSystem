alter table ouvrage_component RENAME TO component;

alter table component
add column ouvrage_id int8;

alter table anti_ram
add column ouvrage_id int8;

alter table chemical_post
add column ouvrage_id int8;

alter table chloration_post
add column ouvrage_id int8;

alter table electrical_cabinet
add column ouvrage_id int8;

alter table electric_building
add column ouvrage_id int8;

alter table electro_group_motor
add column ouvrage_id int8;

alter table electro_group_pump
add column ouvrage_id int8;

alter table generator
add column ouvrage_id int8;

alter table hedromeca_equipment
add column ouvrage_id int8;

alter table local_block
add column ouvrage_id int8;

alter table membrane_kit
add column ouvrage_id int8;

alter table php_station
add column ouvrage_id int8;

alter table product_storage
add column ouvrage_id int8;

alter table relief_valve
add column ouvrage_id int8;

alter table security
add column ouvrage_id int8;

alter table traitement_station_equipement
add column ouvrage_id int8;

alter table transformation_station
add column ouvrage_id int8;

alter table water_intake
add column ouvrage_id int8;

alter table  pfe.component
add constraint relationcomponentouvrage FOREIGN KEY (ouvrage_id) REFERENCES pfe.ouvrage;