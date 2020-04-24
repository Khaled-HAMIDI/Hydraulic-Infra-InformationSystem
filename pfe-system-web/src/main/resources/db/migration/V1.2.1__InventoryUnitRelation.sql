ALTER TABLE IF EXISTS pfe.inventory
add column unit_id bigint;


ALTER TABLE IF EXISTS pfe.inventory
ADD CONSTRAINT relationinventoryunit FOREIGN KEY (unit_id) REFERENCES pfe.organisational_structure;