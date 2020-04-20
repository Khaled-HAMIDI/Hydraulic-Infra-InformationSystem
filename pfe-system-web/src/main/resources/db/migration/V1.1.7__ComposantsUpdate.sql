alter table water_intake
add column nature varchar(255);

create sequence pfe.traitement_station_equipement_seq start 1 increment 1;
create table pfe.traitement_station_equipement
(
  id                 int8 not null,
  capacity           float8,
  number             float8,
  type_equipement    varchar(255),
  type               varchar(255),
  form               varchar(255),
  nature             varchar(255),
  state              varchar(255),
  enabled            boolean,
  version            integer,
  created_by         varchar(255),
  creation_date      timestamp,
  last_modified_by   varchar(255),
  last_modified_date timestamp,

  primary key (id)
);

alter table ouvrage_component
drop column capacity,
drop column type,
drop column form,
drop column nature,
drop column state,
drop column enabled,
add column type_composant varchar(255);

alter table membrane_kit
add column number float8;

alter table php_station
add column number float8;

alter table product_storage
add column number float8;

alter table generator
add column number float8;


create sequence pfe.chemical_post_seq start 1 increment 1;
create table pfe.chemical_post
(
  id                 int8 not null,
  post_type          varchar(255),
  type               varchar(255),
  dimension          float8,
  form               varchar(255),
  post_number        float8,
  implantation_place varchar(255),
  injection_point    varchar(255),
  injection          varchar(255),
  pump_type          varchar(255),
  debit              float8,
  hmt                float8,
  power              float8,
  pump_number        float8,
  enabled            boolean,
  mode               varchar(255),
  state              varchar(255),
  version            integer,
  created_by         varchar(255),
  creation_date      timestamp,
  last_modified_by   varchar(255),
  last_modified_date timestamp,

  primary key (id)
);

alter table transformation_station
drop column location;

alter table electro_group_pump
drop column gepi,
drop column power,
add column npsh float8,
add column rotation_speed float8,
add column functionning_number float8,
add column secours_number float8,
add column genre varchar(255);

alter table electro_group_motor
add column speed float8,
add column functionning_number float8,
add column secours_number float8,
add column nominale_intensite float8,
add column alimentation_tension float8;

create sequence pfe.electrical_cabinet_seq start 1 increment 1;
create table pfe.electrical_cabinet
(
  id                 int8 not null,
  power              float8,
  number             float8,
  observation        varchar(255),
  state              varchar(255),
  brand              varchar(255),
  version            integer,
  created_by         varchar(255),
  creation_date      timestamp,
  last_modified_by   varchar(255),
  last_modified_date timestamp,

  primary key (id)
);

create sequence pfe.relief_valve_seq start 1 increment 1;
create table pfe.relief_valve
(
  id                 int8 not null,
  brand              varchar(255),
  service_pressure    float8,
  etancheite_pressure float8,
  tarage_pressure     float8,
  type                varchar(255),
  version             integer,
  created_by          varchar(255),
  creation_date       timestamp,
  last_modified_by    varchar(255),
  last_modified_date  timestamp,

  primary key (id)
);

alter table hedromeca_equipment
add column equipement_type varchar(255),
add column type varchar(255),
add column number float8;

create sequence pfe.chloration_post_seq start 1 increment 1;
create table pfe.chloration_post
(
  id                 int8 not null,
  abri               boolean,
  type               varchar(255),
  dimension          float8,
  dosage             varchar(255),
  injection_point    varchar(255),
  pump_type          varchar(255),
  debit              float8,
  hmt                float8,
  power              float8,
  pump_number        float8,
  enabled            boolean,
  state              varchar(255),
  version            integer,
  created_by         varchar(255),
  creation_date      timestamp,
  last_modified_by   varchar(255),
  last_modified_date timestamp,

  primary key (id)
);

drop table electrical_equipment;
drop sequence equipement_electrique_seq;

drop table metering_pump;
drop sequence pompe_doseuse_seq;