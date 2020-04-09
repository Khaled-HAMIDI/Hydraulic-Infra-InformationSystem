/*
  Sequences creation
 */
create sequence IF NOT EXISTS pfe.attached_document_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.authority_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.commune_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.notification_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.organisational_structure_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.role_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.user_seq start 1 increment 1;
create sequence IF NOT EXISTS pfe.wilaya_seq start 1 increment 1;

/*
  Database tables creation
 */

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
  CONSTRAINT uk_ox1hxxq5fgr8w2vu7q98owls4 UNIQUE (code)
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
  CONSTRAINT notification_pkey PRIMARY KEY (id)
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
  bank_of_domiciliation character varying(255),
  business_register_number character varying(255),
  code character varying(255),
  deleted boolean,
  deleted_date timestamp without time zone,
  designation character varying(255),
  email character varying(255),
  enabled boolean,
  fax character varying(255),
  latitude double precision,
  longitude double precision,
  phone character varying(255),
  rib character varying(255),
  rip character varying(255),
  tax_id_number character varying(255),
  tax_identification_number character varying(255),
  third_party_code character varying(255),
  is_deployed boolean,
  head_of_the_structure_id bigint,
  center_id bigint,
  unit_id bigint,
  CONSTRAINT organisational_structure_pkey PRIMARY KEY (id),
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
  CONSTRAINT role_authority_pkey PRIMARY KEY (role_id, authority_id)
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
  CONSTRAINT ukjo6mqd4iun7wmyi6rrwtavqv0 UNIQUE (employee_code, deleted, deleted_date),
  CONSTRAINT ukoi2qdfpjukl7afa4j1c39w56o UNIQUE (username, deleted, deleted_date)
);

CREATE TABLE IF NOT EXISTS pfe.user_role
(
  user_id bigint NOT NULL,
  role_id bigint NOT NULL,
  CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id)
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


/*
  Foreign key constraints creation
 */

  ALTER TABLE IF EXISTS pfe.commune
  ADD CONSTRAINT fk20420skck56uftudatgny7c25 FOREIGN KEY (wilaya_id) REFERENCES pfe.wilaya;

  ALTER TABLE IF EXISTS pfe.notification
  ADD CONSTRAINT fkb0yvoep4h4k92ipon31wmdf7e FOREIGN KEY (user_id) REFERENCES pfe.user;

  ALTER TABLE IF EXISTS pfe.organisational_structure
  ADD CONSTRAINT fk2si3udlujuml63ljupyb3yweo FOREIGN KEY (unit_id) REFERENCES pfe.organisational_structure;

  ALTER TABLE IF EXISTS pfe.organisational_structure
  ADD CONSTRAINT fkfvy26ftuwke74uaibj2dsp6pr FOREIGN KEY (head_of_the_structure_id) REFERENCES pfe.user;

  ALTER TABLE IF EXISTS pfe.organisational_structure
  ADD CONSTRAINT fkpkqc3rcs362kvf4h81n1svqth FOREIGN KEY (center_id) REFERENCES pfe.organisational_structure;

  ALTER TABLE IF EXISTS pfe.role_authority
  ADD CONSTRAINT fk2052966dco7y9f97s1a824bj1 FOREIGN KEY (role_id) REFERENCES pfe.role;

  ALTER TABLE IF EXISTS pfe.role_authority
  ADD CONSTRAINT fkqbri833f7xop13bvdje3xxtnw FOREIGN KEY (authority_id) REFERENCES pfe.authority;

  ALTER TABLE IF EXISTS pfe.user
  ADD CONSTRAINT fkcy1wy3k0oyasccxw5ljww7s4w FOREIGN KEY (organisational_structure_id) REFERENCES pfe.organisational_structure;

  ALTER TABLE IF EXISTS pfe.user_role
  ADD CONSTRAINT fk859n2jvi8ivhui0rl0esws6o FOREIGN KEY (user_id) REFERENCES pfe.user;

  ALTER TABLE IF EXISTS pfe.user_role
  ADD CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES pfe.role;


                                                    /* INSERT UNITS */
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '01', 'ADRAR');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '02', 'CHLEF');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '03', 'LAGHOUAT');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '04', 'OUM EL BOUAGHI');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '05', 'BATNA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '06', 'BEJAIA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '07', 'BISKRA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '08', 'BECHAR');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '09', 'BLIDA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '10', 'BOUIRA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '11', 'TAMANRASSET');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '12', 'TEBESSA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '13', 'TLEMCEN');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '14', 'TIARET');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '15', 'TIZI-OUZOU');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', false, true, false, '16', 'ALGER');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '17', 'DJELFA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '18', 'JIJEL');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '19', 'SETIF');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '20', 'SAIDA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '21', 'SKIKDA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '22', 'SIDI BEL-ABBES');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '23', 'ANNABA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '24', 'GUELMA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', false, true, false, '25', 'CONSTANTINE');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '26', 'MEDEA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '27', 'MOSTAGANEM');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '28', 'MSILA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '29', 'MASCARA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '30', 'OUARGLA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', false, true, false, '31', 'ORAN');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '32', 'EL BAYADH');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '33', 'ILLIZI');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '34', 'B.B.ARRERIDJ');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '35', 'BOUMERDES');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '36', 'EL TARF');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '37', 'TINDOUF');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '38', 'TISSEMSILT');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '39', 'EL-OUED');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '40', 'KHENCHELA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '41', 'SOUK AHRAS');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', false, true, false, '42', 'TIPAZA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '43', 'MILA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '44', 'AIN-DEFLA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '45', 'NAAMA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '46', 'AIN TEMOUCHENT');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '47', 'GHARDAIA');
INSERT INTO pfe.organisational_structure(id, created_by, creation_date, version, structure_type, enabled, deleted, is_deployed, code, designation) VALUES (NEXTVAL('ORGANISATIONAL_STRUCTURE_SEQ'), 'clientele-system', '2019-04-02 11:40:00.165', 0, 'UNIT', true, false, false, '48', 'RELIZANE');


                                       /* ADD USER username: amine password: Ade.2019 */

ALTER SEQUENCE pfe.organisational_structure_seq RESTART WITH 49;

INSERT INTO pfe.organisational_structure (structure_type, id, created_by, creation_date, last_modified_by, last_modified_date, version, address, code, designation, email, enabled, phone, head_of_the_structure_id, deleted, is_deployed, latitude, longitude, unit_id, center_id, deleted_date)
VALUES ('CENTER', NEXTVAL('pfe.organisational_structure_seq'), 'pfe-system', '2019-04-04 10:40:00.141', NULL, NULL, 0, 'Setif', 'C1', 'centre 1', 'c1@ade.dz', 't', '0665985947', NULL, 'f', 'f', NULL, NULL, 19, NULL, '1900-01-01 00:00:00');

INSERT INTO pfe.role (id, created_by, creation_date, last_modified_by, last_modified_date, version, designation, role, deleted, deleted_date,system_entity)
VALUES (NEXTVAL('pfe.role_seq'), 'amine', NULL, NULL, NULL, 0, 'commercial', 'commercial', false, '1900-01-01 00:00:00', true);

INSERT INTO pfe.user (id, created_by, creation_date, last_modified_by, last_modified_date, version, deleted, deleted_date, email, enabled, first_name, last_name, password, phone_number, username, employee_code, organisational_structure_id)
VALUES (NEXTVAL('pfe.user_seq'), 'amine', NULL, NULL, NULL, 2, 'f', '1900-01-01 00:00:00', 'amine@ade.dz', 't', 'Mohamed amine', 'Bensalem', '$2a$10$c1MH7Vu.Rd7bnAqVWL75f.bpoXRwPJeJOeh6gB8F25kFznA4YEre6', '0556287943', 'amine', 'C001', CURRVAL('pfe.organisational_structure_seq'));

INSERT INTO pfe.authority (id, created_by, creation_date, last_modified_by,last_modified_date, version, authority, description)
VALUES (NEXTVAL('pfe.authority_seq'), 'amine', NULL, NULL, NULL, 0, '*:*', 'tous les droits');

INSERT INTO pfe.user_role (user_id, role_id)
VALUES (CURRVAL('pfe.user_seq'), CURRVAL('pfe.role_seq'));

INSERT INTO pfe.role_authority (role_id, authority_id)
VALUES (CURRVAL('pfe.role_seq'), CURRVAL('pfe.authority_seq'));