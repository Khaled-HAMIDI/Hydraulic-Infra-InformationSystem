alter table equipement_hedromeca
rename column materiaux to materials;
alter table equipement_hedromeca
rename column etat to state;

alter table equipement_hedromeca rename to hedromeca_equipment;



alter table groupe_electro_moteur
rename column marque to brand;
alter table groupe_electro_moteur
rename column etat to state;
alter table groupe_electro_moteur
rename column puissance to power;

alter table groupe_electro_moteur rename to electro_group_motor ;



alter table groupe_electro_pompe
rename column marque to brand;
alter table groupe_electro_pompe
rename column puissance to power;
alter table groupe_electro_pompe
rename column etat to state;

alter table groupe_electro_pompe rename to electro_group_pump ;



alter table kit_membrane
rename column caracteristique to characteristic;

alter table kit_membrane rename to membrane_kit ;



alter table post_transformation
rename column marque to brand;
alter table post_transformation
rename column puissance to power;
alter table post_transformation
rename column emplacement to location;
alter table post_transformation
rename column couplage to coupling;
alter table post_transformation
rename column nhuile to oil_nature;
alter table post_transformation
rename column nabri to abri_nature;

alter table post_transformation rename to transformation_station ;


alter table prise_eau rename to water_intake ;



alter table stockage_produit
rename column etat to state;

alter table stockage_produit rename to product_storage ;