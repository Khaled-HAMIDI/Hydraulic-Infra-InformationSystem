ALTER TABLE IF EXISTS pfe.site
add column unit_id bigint;


ALTER TABLE IF EXISTS pfe.site
ADD CONSTRAINT relationunitsite FOREIGN KEY (unit_id) REFERENCES pfe.organisational_structure;