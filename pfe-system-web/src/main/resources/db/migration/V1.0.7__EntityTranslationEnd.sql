alter table chaine
rename column nom to name;

alter table chaine rename to chain;



alter table composant_ouvrage
rename column capacite to capacity;
alter table composant_ouvrage
rename column forme to form;
alter table composant_ouvrage
rename column etat to state;
alter table composant_ouvrage
rename column fonctionnement to enabled;

alter table composant_ouvrage rename to ouvrage_component;



alter table equipement_electrique
rename column puissance to power;

alter table equipement_electrique rename to electrical_equipment;



alter table batiment_electrique
rename column etat to state;
alter table batiment_electrique
rename column superficie to area;

alter table batiment_electrique rename to electric_building;


alter table bloc_local
rename column etat to state;
alter table bloc_local
rename column superficie to area;

alter table bloc_local rename to local_block;



alter table groupe_electrogene
rename column puissance to power;
alter table groupe_electrogene
rename column cuve_stockage to storage_tank;

alter table groupe_electrogene rename to generator;


alter table ouvrage_chaine rename to ouvrage_chain;


alter table inventaire rename to inventory;



alter table inventaire_composant
rename column etat to state;
alter table inventaire_composant
rename column ecart to gap;

alter table inventaire_composant rename to inventory_component;

alter table inventaire_ouvrage rename to inventory_ouvrage;


alter table pompe_doseuse
rename column puisssance to power;
alter table pompe_doseuse
rename column fonctionnement to enabled;
alter table pompe_doseuse
rename column etat to state;

alter table pompe_doseuse rename to metering_pump;



alter table securite
rename column cloture to closing;
alter table securite
rename column guerite to entry_box;
alter table securite
rename column agents_securite to nb_agents;
alter table securite
rename column armement   to weaponry;
alter table securite
rename column telesurveillance to remote_monitoring;
alter table securite
rename column acces to access;

alter table securite rename to security;


alter table station_php
rename column puissance to power;

alter table station_php rename to php_station;