create sequence pfe.cycle_seq start 1 increment 1;

create table pfe.cycle
(
  id                 int8 not null,
  start               date,
  stop                date ,
  cycle                varchar(255),
  ouvrage_id            bigint,
  primary key (id)
);

ALTER TABLE IF EXISTS pfe.cycle
ADD CONSTRAINT relationcycleouvrage FOREIGN KEY (ouvrage_id) REFERENCES pfe.ouvrage;

alter table pfe.cycle

add column version integer,
add column created_by varchar(255),
add column creation_date timestamp,
add column last_modified_by varchar(255),
add column last_modified_date timestamp;