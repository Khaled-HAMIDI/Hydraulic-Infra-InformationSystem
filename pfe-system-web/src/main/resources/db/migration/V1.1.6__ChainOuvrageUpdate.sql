ALTER TABLE IF EXISTS pfe.ouvrage_chain
alter column position type int4;

ALTER TABLE IF EXISTS pfe.chain
ADD CONSTRAINT uniquechaincode UNIQUE (code);
