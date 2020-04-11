ALTER TABLE IF EXISTS pfe.ouvrage_chain
drop column id_ouvrage,
drop column id_chaine;

ALTER TABLE IF EXISTS pfe.ouvrage_chain
add column ouvrage_id bigint,
add column chain_id bigint;



ALTER TABLE IF EXISTS pfe.ouvrage_chain
ADD CONSTRAINT relationchainouvrage1 FOREIGN KEY (chain_id) REFERENCES pfe.chain;
ALTER TABLE IF EXISTS pfe.ouvrage_chain
ADD CONSTRAINT relationchainouvrage2 FOREIGN KEY (ouvrage_id) REFERENCES pfe.ouvrage;