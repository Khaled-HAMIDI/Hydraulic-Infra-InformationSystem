ALTER SEQUENCE inventaire_composant_seq RENAME to inventory_component_seq;

ALTER TABLE pfe.inventory_component
add column ouvrage_id bigint,
drop column id_composant,
add column component_type varchar(255),
add column observation varchar(255);

ALTER TABLE pfe.inventory_component
rename column id_inventaire to inventory_id;


ALTER TABLE pfe.inventory_component
ADD CONSTRAINT relationComposantOuvrage FOREIGN KEY (ouvrage_id) REFERENCES pfe.ouvrage;