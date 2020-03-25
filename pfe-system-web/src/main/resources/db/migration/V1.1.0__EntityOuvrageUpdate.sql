alter table ouvrage
drop column localite,
drop column commune,
drop column cordonnee;


alter table ouvrage
add column coordinate_x float8,
add column coordinate_y float8,
add column coordinate_z float8,
add column  remote_management boolean,
add column hmt float8,
add column power float8,
add column  abri boolean,
add column nb_pump int4,
add column pump_debit float8,
add column water_tank boolean,
add column tank_capacity float8,
add column water_source varchar(255),
add column form varchar(255),
add column nb_compartment int4,
add column distribution boolean,
add column population_served float8,
add column raft_rating float8,
add column cote_trop_full float8,
add column process varchar(255);



alter table ouvrage
rename column fonctionnement to enabled;
alter table ouvrage
rename column etat to state;
alter table ouvrage
rename column superficie to area;
alter table ouvrage
rename column nom to name;
alter table ouvrage
rename column capacite_installee to installed_capacity;
alter table ouvrage
rename column capacite_actuelle to current_capacity;
alter table ouvrage
rename column nature_construction to construction_type;
alter table ouvrage
rename column date_mise_service to commissioning_date;
alter table ouvrage
rename column date_exploitation to operating_date;
alter table ouvrage
rename column cout_realisation to realization_cost;
alter table ouvrage
rename column ligne_specialisee to specialized_line;
alter table ouvrage
rename column effectif_total to total_workforce;
alter table ouvrage
rename column facture_m_energie to energy_monthly_bill;