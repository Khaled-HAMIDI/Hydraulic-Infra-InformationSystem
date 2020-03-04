/*
  Sequences creation
 */
create sequence pfe.securite_seq start 1 increment 1;
create sequence pfe.station_php_seq start 1 increment 1;
create sequence pfe.groupe_electrogene_seq start 1 increment 1;
create sequence pfe.personne_exploitation_seq start 1 increment 1;
create sequence pfe.batiment_electrique_seq start 1 increment 1;
create sequence pfe.composant_ouvrage_seq start 1 increment 1;
create sequence pfe.pompe_doseuse_seq start 1 increment 1;
create sequence pfe.bloc_local_seq start 1 increment 1;
create sequence pfe.equipement_electrique_seq start 1 increment 1;
create sequence pfe.ouvrage_seq start 1 increment 1;
create sequence pfe.chaine_seq start 1 increment 1;
create sequence pfe.ouvrage_chaine_seq start 1 increment 1;
create sequence pfe.inventaire_seq start 1 increment 1;
create sequence pfe.inventaire_ouvrage_seq start 1 increment 1;
create sequence pfe.inventaire_composant_seq start 1 increment 1;



/*
  Database tables creation
 */
 create table pfe.securite
(
  id                 int8 not null,
  cloture            boolean,
  nature             varchar(255),
  guerite            float8,
  agents_securite    float8,
  armement           boolean,
  telesurveillance   boolean,
  acces              varchar(255),

  primary key (id)
);


create table pfe.station_php
(
  id                 int8 not null,
  debit              float8,
  hmt                float8,
  puissance          float8,

  primary key (id)
);


create table pfe.groupe_electrogene
(
  id                 int8 not null,
  nature             varchar(255),
  cuve_stockage      float8,
  puissance          float8,

  primary key (id)
);


create table pfe.personne_exploitation
(
  id                 int8 not null,
  nom                varchar(255),
  prenom             varchar(255),
  fonction           varchar(255),
  qualification      varchar(255),
  experience         float8,

  primary key (id)
);


create table pfe.batiment_electrique
(
  id                 int8 not null,
  etat               varchar(255),
  nature             varchar(255),
  superficie         float8,

  primary key (id)
);


create table pfe.composant_ouvrage
(
  id                 int8 not null,
  capacite           float8,
  type               varchar(255),
  forme              varchar(255),
  nature             varchar(255),
  etat               varchar(255),
  fonctionnement     boolean,

  primary key (id)
);


create table pfe.pompe_doseuse
(
  id                 int8 not null,
  debit              float8,
  type               varchar(255),
  hmt                varchar(255),
  puisssance         float8 ,
  mode               varchar(255),
  fonctionnement     boolean,
  etat               varchar(255),

  primary key (id)
);

create table pfe.bloc_local
(
  id                 int8 not null,
  superficie         float8,
  nature             varchar(255),
  etat               varchar(255),

  primary key (id)
);


create table pfe.bloc_local
(
  id                 int8 not null,
  puissance          float8,
  nature             varchar(255),

  primary key (id)
);


create table pfe.ouvrage
(
  id                    int8 not null,
  code                  float8,
  nom                   varchar(255),
  type                  varchar(255),
  fonctionnement        varchar(255),
  etat                  varchar(255),
  localite              varchar(255),
  commune               int8 not null,
  cordonnee             float8,
  superficie            float8,
  capacite_installee    float8,
  capacite_actuelle     float8,
  nature_construction   varchar(255),
  date_mise_service     date,
  date_exploitation     date,
  maitre_ouvrage        varchar(255),
  cout_realisation      float8,
  ligne_specialisee     float8,
  facture_m_energie     float8,
  effectif_total        float8,


  primary key (id)
);


create table pfe.chaine
(
  id                 int8 not null,
  code               float8,
  nom                varchar(255),

  primary key (id)
);


create table pfe.ouvrage_chaine
(
  id                 int8 not null,
  id_ouvrage         int8 not null,
  id_chaine          int8 not null,
  position           float8,

  primary key (id)
);


create table pfe.inventaire
(
  id                 int8 not null,
  responsable        int8 not null,
  date               date ,
  position           float8,

  primary key (id)
);


create table pfe.inventaire_ouvrage
(
  id                 int8 not null,
  id_inventaire      int8 not null,
  id_ouvrage         int8 not null,

  primary key (id)
);

create table pfe.inventaire_composant
(
  id                 int8 not null,
  id_inventaire      int8 not null,
  id_composant       int8 not null,
  etat               varchar(255),
  ecart              varchar(255),

  primary key (id)
);