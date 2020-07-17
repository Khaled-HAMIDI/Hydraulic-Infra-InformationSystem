Alter TABLE pfe.component
add column cost float8;

Alter TABLE pfe.ouvrage
add column commune_id bigint;

Alter TABLE pfe.ouvrage
ADD CONSTRAINT relationCommune FOREIGN KEY (commune_id) REFERENCES pfe.commune;