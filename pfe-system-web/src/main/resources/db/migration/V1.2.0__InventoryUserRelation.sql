ALTER TABLE IF EXISTS pfe.inventory
drop column responsable;

ALTER TABLE IF EXISTS pfe.inventory
add column user_id bigint;


ALTER TABLE IF EXISTS pfe.inventory
ADD CONSTRAINT relationinventoryuser FOREIGN KEY (user_id) REFERENCES pfe.user;