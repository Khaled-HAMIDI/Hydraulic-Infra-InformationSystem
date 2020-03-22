/* Ouvrage classe Correction */


alter table ouvrage
alter column code type varchar(255);

alter table ouvrage
drop column ligne_specialisee;

alter table ouvrage
drop column fonctionnement;

alter table ouvrage
add column ligne_specialisee boolean,
add column fonctionnement boolean;

alter table ouvrage
alter column effectif_total type int8;
