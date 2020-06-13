ALTER SEQUENCE inventaire_seq RENAME to inventory_seq;
ALTER SEQUENCE inventaire_ouvrage_seq RENAME to inventory_ouvrage_seq;

ALTER TABLE  pfe.inventory_ouvrage
add column responsable_id bigint;

ALTER TABLE  pfe.inventory_ouvrage
rename column id_ouvrage to ouvrage_id;

ALTER TABLE  pfe.inventory_ouvrage
rename column id_inventaire to inventory_id;

ALTER TABLE  pfe.inventory_ouvrage
ADD CONSTRAINT relationinventoryouvrage1 FOREIGN KEY (inventory_id) REFERENCES pfe.inventory,
ADD CONSTRAINT relationinventoryouvrage2 FOREIGN KEY (ouvrage_id) REFERENCES pfe.ouvrage,
ADD CONSTRAINT relationuser FOREIGN KEY (responsable_id) REFERENCES pfe.user;
