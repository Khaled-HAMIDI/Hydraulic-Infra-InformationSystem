/*
  Sequences creation
 */
create sequence IF NOT EXISTS pfe.activity_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.attachement_document_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.authority_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.bank_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.commune_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.district_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.guardianship_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.notification_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.organisational_structure_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.role_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.sous_activity_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.street_assignement_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.street_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.user_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.wilaya_seq start 1 increment 1;

/*
  Database tables creation
 */


CREATE  TABLE IF NOT EXISTS pfe.activity
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  CONSTRAINT activity_pkey PRIMARY KEY (id),
  CONSTRAINT uk_76m5oa9mk3fc03eiro4xcr4q5 UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS pfe.attached_document
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  attached_document_type character varying(255),
  attachment_entity character varying(255),
  attachment_entity_id character varying(255),
  file_extension character varying(255),
  media_type character varying(255),
  path_to_scanned_document character varying(255),
  upload_date timestamp without time zone,
  CONSTRAINT attached_document_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pfe.authority
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  authority character varying(255),
  description character varying(255),
  CONSTRAINT authority_pkey PRIMARY KEY (id),
  CONSTRAINT uk_nrgoi6sdvipfsloa7ykxwlslf UNIQUE (authority)
);

CREATE TABLEIF NOT EXISTS pfe.bank
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  CONSTRAINT bank_pkey PRIMARY KEY (id),
  CONSTRAINT uk_nc70mw7kj0k56c4pjpl6b0xwt UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS pfe.commune
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  administrator character varying(255),
  code character varying(255),
  connected_to_ona_network boolean,
  designation character varying(255),
  wilaya_id bigint,
  CONSTRAINT commune_pkey PRIMARY KEY (id),
  CONSTRAINT fk20420skck56uftudatgny7c25 FOREIGN KEY (wilaya_id)
      REFERENCES pfe.wilaya (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_ox1hxxq5fgr8w2vu7q98owls4 UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS pfe.district
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  agency_id bigint,
  CONSTRAINT district_pkey PRIMARY KEY (id),
  CONSTRAINT fk5pksytyx77k4qknosg5qmslea FOREIGN KEY (agency_id)
      REFERENCES pfe.organisational_structure (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_7ava2vvsdlafw7ca6y5j2a6q8 UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS pfe.guardianship
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  CONSTRAINT guardianship_pkey PRIMARY KEY (id),
  CONSTRAINT uk_j97wlqyqftuhe2r1wl24kfcre UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS pfe.notification
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  action_value character varying(255),
  code character varying(255),
  gone boolean,
  gone_date timestamp without time zone,
  message character varying(255),
  notification_action character varying(255),
  notification_level character varying(255),
  seen boolean,
  seen_date timestamp without time zone,
  user_id bigint,
  CONSTRAINT notification_pkey PRIMARY KEY (id),
  CONSTRAINT fkb0yvoep4h4k92ipon31wmdf7e FOREIGN KEY (user_id)
      REFERENCES pfe."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS pfe.organisational_structure
(
  structure_type character varying(31) NOT NULL,
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  address character varying(255),
  agency character varying(255),
  bank_of_domiciliation character varying(255),
  business_register_number character varying(255),
  code character varying(255),
  deleted boolean,
  deleted_date timestamp without time zone,
  designation character varying(255),
  email character varying(255),
  enabled boolean,
  epeor_code character varying(255),
  fax character varying(255),
  latitude double precision,
  longitude double precision,
  phone character varying(255),
  rib character varying(255),
  rip character varying(255),
  tax_id_number character varying(255),
  tax_identification_number character varying(255),
  third_party_code character varying(255),
  agency_type character varying(255),
  is_deployed boolean,
  head_of_the_structure_id bigint,
  center_id bigint,
  unit_id bigint,
  CONSTRAINT organisational_structure_pkey PRIMARY KEY (id),
  CONSTRAINT fk2si3udlujuml63ljupyb3yweo FOREIGN KEY (unit_id)
      REFERENCES pfe.organisational_structure (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkfvy26ftuwke74uaibj2dsp6pr FOREIGN KEY (head_of_the_structure_id)
      REFERENCES pfe."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkpkqc3rcs362kvf4h81n1svqth FOREIGN KEY (center_id)
      REFERENCES pfe.organisational_structure (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT head_of_the_structure_id_constrainte UNIQUE (head_of_the_structure_id),
  CONSTRAINT uk_6lr2ddcptks640eqw73d8reqv UNIQUE (business_register_number),
  CONSTRAINT ukkb1exddwi3hgb5w7d0rctig24 UNIQUE (code, deleted, deleted_date)
);

CREATE TABLE IF NOT EXISTS pfe.role
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  deleted boolean,
  deleted_date timestamp without time zone,
  designation character varying(255),
  role character varying(255),
  system_entity boolean,
  CONSTRAINT role_pkey PRIMARY KEY (id),
  CONSTRAINT ukai02n0stvhc9ot6wvy4af2ohf UNIQUE (role, deleted, deleted_date)
);

CREATE TABLE IF NOT EXISTS pfe.role_authority
(
  role_id bigint NOT NULL,
  authority_id bigint NOT NULL,
  CONSTRAINT role_authority_pkey PRIMARY KEY (role_id, authority_id),
  CONSTRAINT fk2052966dco7y9f97s1a824bj1 FOREIGN KEY (role_id)
      REFERENCES pfe.role (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkqbri833f7xop13bvdje3xxtnw FOREIGN KEY (authority_id)
      REFERENCES pfe.authority (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS pfe.sous_activity
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  activity_id bigint,
  CONSTRAINT sous_activity_pkey PRIMARY KEY (id),
  CONSTRAINT fkhmbspmy6n3ifd916dld0113ko FOREIGN KEY (activity_id)
      REFERENCES pfe.activity (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_5bf40dgrw78jowq9uik1n0pub UNIQUE (code)
);

CREATE IF NOT EXISTS TABLE pfe.street
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  district_id bigint,
  CONSTRAINT street_pkey PRIMARY KEY (id),
  CONSTRAINT fk4dnshymf6ro2e3eck8k8qnjaq FOREIGN KEY (district_id)
      REFERENCES pfe.district (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_1x4ndp0sjh9exyjcdtqd9g45q UNIQUE (code)
);

CREATE IF NOT EXISTS TABLE pfe.street_assignment
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  street_id bigint,
  CONSTRAINT street_assignment_pkey PRIMARY KEY (id),
  CONSTRAINT fk9cw3csjjwgqoc2ja4frcq5n9y FOREIGN KEY (street_id)
      REFERENCES pfe.street (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS pfe.user
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  deleted boolean,
  deleted_date timestamp without time zone,
  email character varying(255),
  employee_code character varying(255),
  enabled boolean,
  first_name character varying(255),
  last_name character varying(255),
  password character varying(255),
  phone_number character varying(255),
  username character varying(255) NOT NULL,
  organisational_structure_id bigint,
  CONSTRAINT user_pkey PRIMARY KEY (id),
  CONSTRAINT fkcy1wy3k0oyasccxw5ljww7s4w FOREIGN KEY (organisational_structure_id)
      REFERENCES pfe.organisational_structure (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT ukjo6mqd4iun7wmyi6rrwtavqv0 UNIQUE (employee_code, deleted, deleted_date),
  CONSTRAINT ukoi2qdfpjukl7afa4j1c39w56o UNIQUE (username, deleted, deleted_date)
);

CREATE TABLE IF NOT EXISTS pfe.user_role
(
  user_id bigint NOT NULL,
  role_id bigint NOT NULL,
  CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk859n2jvi8ivhui0rl0esws6o FOREIGN KEY (user_id)
      REFERENCES pfe."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id)
      REFERENCES pfe.role (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS pfe.wilaya
(
  id bigint NOT NULL,
  created_by character varying(255),
  creation_date timestamp without time zone,
  last_modified_by character varying(255),
  last_modified_date timestamp without time zone,
  version integer,
  code character varying(255),
  designation character varying(255),
  CONSTRAINT wilaya_pkey PRIMARY KEY (id),
  CONSTRAINT uk_qjo6gpglrv6rt4fk9qnpalgex UNIQUE (code)
);