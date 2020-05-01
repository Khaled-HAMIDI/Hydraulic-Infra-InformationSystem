create sequence pfe.site_seq start 1 increment 1;

create table pfe.site
(
  id                 int8 not null,
  name               varchar(255),
  primary key (id)
);

ALTER TABLE IF EXISTS pfe.ouvrage
add column unit_id bigint;


ALTER TABLE IF EXISTS pfe.ouvrage
ADD CONSTRAINT relationouvrageunit FOREIGN KEY (unit_id) REFERENCES pfe.organisational_structure;


ALTER TABLE IF EXISTS pfe.ouvrage
add column site_id bigint;


ALTER TABLE IF EXISTS pfe.ouvrage
ADD CONSTRAINT relationouvragesite FOREIGN KEY (site_id) REFERENCES pfe.site;