alter table anti_ram

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;