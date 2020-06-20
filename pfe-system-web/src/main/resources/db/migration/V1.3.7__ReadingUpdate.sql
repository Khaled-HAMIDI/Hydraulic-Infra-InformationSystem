ALTER TABLE IF EXISTS pfe.exploitation_reading
drop column nominal_capacity;

ALTER TABLE IF EXISTS pfe.exploitation_reading
drop column resudiel_capacity;

ALTER TABLE IF EXISTS pfe.exploitation_reading
drop column electric_index;

ALTER TABLE IF EXISTS pfe.exploitation_reading
drop column hour_index;

ALTER TABLE IF EXISTS pfe.exploitation_reading
add column volume_in float8;

ALTER TABLE IF EXISTS pfe.exploitation_reading
add column volume_out float8;

ALTER TABLE IF EXISTS pfe.exploitation_reading
add column debit float8;