/*
  Sequences creation
 */
create sequence pfe.prise_eau_seq start 1 increment 1;
create sequence pfe.kit_seq start 1 increment 1;
create sequence pfe.stockage_produit_seq start 1 increment 1;
create sequence pfe.equipement_hedromeca_seq start 1 increment 1;
create sequence pfe.post_transformation_seq start 1 increment 1;
create sequence pfe.groupe_electro_pompe_seq start 1 increment 1;
create sequence pfe.groupe_electro_moteur_seq start 1 increment 1;
create sequence pfe.anti_belier_seq start 1 increment 1;

/*
  Database tables creation
 */
 create table pfe.prise_eau
(
  id                 int8 not null,
  type               varchar(255),
  dimension          varchar(255),
  primary key (id)
);

 create table pfe.kit_membrane
(
  id                 int8 not null,
  caracteristique    varchar(255),
  primary key (id)
);
create table pfe.stockage_produit
(
  id                 int8 not null,
  type               varchar(255),
  form               varchar(255),
  dimention          varchar(255),
  arrangement        varchar(255),
  etat               varchar(255),
  primary key (id)
);

create table pfe.equipement_hedromeca
(
  id                 int8 not null,
  dn                 float8,
  pn                 float8,
  materiaux          varchar(255),
  etat               varchar(255),
  observation        text,
  primary key (id)
);

create table pfe.post_transformation
(
  id                 int8 not null,
  marque             varchar(255),
  emplacement        varchar(255),
  puissance          float8,
  up_us              float8,
  ip_is              float8,
  ucc                float8,
  couplage           varchar(255),
  nhuile             varchar(255),
  nabri              varchar(255),
  pmt                float8,
  pbt                float8,
  pmd                float8,
  tarif              float8,
  pma                float8,
  tcomptage          varchar(255),
  primary key (id)
);

create table pfe.groupe_electro_pompe
(
  id                 int8 not null,
  marque             varchar(255),
  gepi               float8,
  puissance          float8,
  hmt                float8,
  debit              float8,
  etat               varchar(255),
  date               date,
  primary key (id)
);

create table pfe.groupe_electro_moteur
(
  id                 int8 not null,
  marque             varchar(255),
  mode               varchar(255),
  type               varchar(255),
  puissance          float8,
  etat               varchar(255),
  date               date,
  primary key (id)
);

create table pfe.anti_belier
(
  id                 int8 not null,
  marque             varchar(255),
  type               varchar(255),
  pression_service   float8,
  pression_epreuve   float8,
  pression_regonflage float8,
  capacite               float8,
  compresseur        boolean,
  primary key (id)
);