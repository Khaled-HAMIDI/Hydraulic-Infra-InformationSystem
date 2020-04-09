alter table ouvrage
drop column tank_capacity;

alter table ouvrage
add column chemical_monthly_bill float8,
add column tank_capacity2 float8,
add column tank_capacity1 float8,
add column cote_tn float8,
add column debit_load_breaker float8,
add column charges_amont_et_aval float8,
add column current_debit float8,
add column exploitation_debit float8,
add column electric_alimentation boolean,
add column tank_type varchar(255),
add column tank_role varchar(255),
add column treatment_station_type varchar(255);