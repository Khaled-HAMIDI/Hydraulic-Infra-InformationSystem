drop table anti_ram;
drop sequence anti_belier_seq;

drop table chemical_post;
drop sequence chemical_post_seq;

drop table chloration_post;
drop sequence chloration_post_seq;

drop table electrical_cabinet;
drop sequence electrical_cabinet_seq;

drop table electric_building;
drop sequence batiment_electrique_seq;

drop table electro_group_motor;
drop sequence groupe_electro_moteur_seq;

drop table electro_group_pump;
drop sequence groupe_electro_pompe_seq;

drop table generator;
drop sequence groupe_electrogene_seq;

drop table hedromeca_equipment;
drop sequence equipement_hedromeca_seq;

drop table local_block;
drop sequence bloc_local_seq;

drop table membrane_kit;
drop sequence kit_seq;

drop table php_station;
drop sequence station_php_seq;

drop table product_storage;
drop sequence stockage_produit_seq;

drop table relief_valve;
drop sequence relief_valve_seq;

drop table security;
drop sequence securite_seq;

drop table traitement_station_equipement;
drop sequence traitement_station_equipement_seq;

drop table transformation_station;
drop sequence post_transformation_seq;

drop table water_intake;
drop sequence prise_eau_seq;

alter sequence composant_ouvrage_seq RENAME TO component_seq;

alter table component
add column discriminator varchar(255),
add column brand_anti_ram varchar(255),
add column capacity_anti_ram float8,
add column service_pressure_anti_ram float8,
add column test_pressure_anti_ram float8,
add column inflation_pressure_anti_ram float8,
add column type_anti_ram varchar(255),
add column compressor_anti_ram boolean,
add column post_type_chemical_posts varchar(255),
add column type_chemical_posts varchar(255),
add column dimension_chemical_posts float8,
add column form_chemical_posts varchar(255),
add column post_number_chemical_posts float8,
add column implantation_place_chemical_posts varchar(255),
add column injection_point_chemical_posts varchar(255),
add column injection_chemical_posts varchar(255),
add column pump_type_chemical_posts varchar(255),
add column debit_chemical_posts float8,
add column hmt_chemical_posts float8,
add column power_chemical_posts float8,
add column pump_number_chemical_posts float8,
add column enabled_chemical_posts boolean,
add column mode_chemical_posts varchar(255),
add column state_chemical_posts varchar(255),
add column abri_chloration_post boolean,
add column type_chloration_post varchar(255),
add column dimension_chloration_post float8,
add column dosage_chloration_post varchar(255),
add column injection_point_chloration_post varchar(255),
add column pump_type_chloration_post varchar(255),
add column debit_chloration_post float8,
add column hmt_chloration_post float8,
add column power_chloration_post float8,
add column pump_number_chloration_post float8,
add column enabled_chloration_post boolean,
add column state_chloration_post varchar(255),
add column power_electrical_cabinet float8,
add column number_electrical_cabinet float8,
add column observation_electrical_cabinet varchar(255),
add column state_electrical_cabinet varchar(255),
add column brand_electrical_cabinet varchar(255),
add column area_electric_building float8,
add column nature_electric_building varchar(255),
add column state_electric_building varchar(255),
add column brand_electro_group_motor varchar(255),
add column power_electro_group_motor float8,
add column state_electro_group_motor varchar(255),
add column mode_electro_group_motor varchar(255),
add column type_electro_group_motor varchar(255),
add column date_electro_group_motor date,
add column functionning_number_electro_group_motor float8,
add column secours_number_electro_group_motor float8,
add column alimentation_tension_electro_group_motor float8,
add column nominale_intensite_electro_group_motor float8,
add column speed_electro_group_motor float8,
add column brand_electro_group_pump varchar(255),
add column hmt_electro_group_pump float8,
add column state_electro_group_pump varchar(255),
add column date_electro_group_pump date,
add column npsh_electro_group_pump float8,
add column rotation_speed_electro_group_pump float8,
add column debit_electro_group_pump float8,
add column functionning_number_electro_group_pump float8,
add column secours_number_electro_group_pump float8,
add column genre_electro_group_pump varchar(255),
add column storage_tank_generator float8,
add column nature_generator varchar(255),
add column power_generator float8,
add column number_generator float8,
add column equipement_type_hedromeca_equipment varchar(255),
add column type_hedromeca_equipment varchar(255),
add column number_hedromeca_equipment float8,
add column dn_hedromeca_equipment float8,
add column pn_hedromeca_equipment float8,
add column materials_hedromeca_equipment varchar(255),
add column state_hedromeca_equipment varchar(255),
add column observation_hedromeca_equipment varchar(255),
add column area_local_block float8,
add column nature_local_block varchar(255),
add column state_local_block varchar(255),
add column characteristic_membrane_kit varchar(255),
add column number_membrane_kit float8,
add column debit_php_station float8,
add column hmt_php_station float8,
add column power_php_station float8,
add column number_php_station float8,
add column type_product_storage varchar(255),
add column form_product_storage varchar(255),
add column dimention_product_storage varchar(255),
add column arrangement_product_storage varchar(255),
add column number_product_storage float8,
add column state_product_storage varchar(255),
add column brand_relief_valve varchar(255),
add column service_pressure_relief_valve float8,
add column etancheite_pressure_relief_valve float8,
add column tarage_pressure_relief_valve float8,
add column type_relief_valve varchar(255),
add column closing_security boolean,
add column nature_security varchar(255),
add column entry_box_security float8,
add column nb_agents_security float8,
add column weaponry_security boolean,
add column remote_monitoring_security boolean,
add column access_security varchar(255),
add column capacity_traitement_station_equipement float8,
add column type_equipement_traitement_station_equipement varchar(255),
add column type_traitement_station_equipement varchar(255),
add column number_traitement_station_equipement float8,
add column form_traitement_station_equipement varchar(255),
add column nature_traitement_station_equipement varchar(255),
add column state_traitement_station_equipement varchar(255),
add column enabled_traitement_station_equipement boolean,
add column brand_transformation_station varchar(255),
add column power_transformation_station float8,
add column up_us_transformation_station float8,
add column ip_is_transformation_station float8,
add column ucc_transformation_station float8,
add column coupling_transformation_station varchar(255),
add column oil_nature_transformation_station varchar(255),
add column abri_nature_transformation_station varchar(255),
add column pmt_transformation_station float8,
add column pbt_transformation_station float8,
add column pmd_transformation_station float8,
add column tarif_transformation_station float8,
add column pma_transformation_station float8,
add column tcomptage_transformation_station varchar(255),
add column type_water_intake varchar(255),
add column dimension_water_intake varchar(255),
add column nature_water_intake varchar(255);

