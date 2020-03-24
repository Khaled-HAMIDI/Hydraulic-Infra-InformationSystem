
alter table anti_belier
rename column marque to brand;
alter table anti_belier
rename column capacite to capacity;
alter table anti_belier
rename column pression_epreuve to test_pressure;
alter table anti_belier
rename column pression_regonflage to inflation_pressure;
alter table anti_belier
rename column compresseur to compressor;
alter table anti_belier
rename column pression_service to service_pressure;


alter table anti_belier rename to anti_ram;