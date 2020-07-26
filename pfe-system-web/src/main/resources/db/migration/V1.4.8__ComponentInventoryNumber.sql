Alter TABLE pfe.component
add column physical_number float8;

Alter TABLE pfe.inventory_component
drop column gap,
add column gap float8,
add column component_id bigint;

Alter TABLE pfe.inventory_component
ADD CONSTRAINT relationComponent FOREIGN KEY (component_id) REFERENCES pfe.component;