import { Injectable, Type } from '@angular/core';
import {InventoryComposantComponent} from "../inventory-composant/inventory-composant.component";
import {SecurityComponent} from "../../../ouvrage/composant/composant-add-edit/security/security.component";

@Injectable({
    providedIn: 'root'
})
export class StepperAddEditService {
    briseChargeComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Obturateur',
            'ComponentName': 'ObturateurComponent',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArriveeComponent',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurComponent',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantageComponent',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'FlotteurComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupageDechargeComponent',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortieComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseComponent',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortieComponent',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortieComponent',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPleinComponent',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidangeComponent',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'EchelleComponent',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChlorationComponent',
        }
        ];


    forageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElecComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneComponent',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompPompComponent',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompMoteurComponent',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoirElecCmdComponent',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBelierComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupageDechargeComponent',
        },
        {
            'title': 'Vanne ',
            'ComponentName': 'VanneArriveeComponent',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetourComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseComponent',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurComponent',
        },
        {
            'title': 'Colonnes montantes' ,
            'ComponentName': 'ColonnesMontantesComponent',
        }
    ];

    reservoirComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArriveeComponent',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantageComponent',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurComponent',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'FlotteurComponent',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortieComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseComponent',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortieComponent',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortieComponent',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPleinComponent',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidangeComponent',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'EchelleComponent',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChlorationComponent',
        }
    ];


    stationTraitementNonConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEauComponent',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBruteComponent',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitementComponent',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelangeComponent',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'FiltreComponent',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraiteComponent',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembraneComponent',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhpComponent',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimiqueComponent',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjectionComponent',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBouesComponent',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavavgeComponent',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElectriqueComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneComponent',
        }
    ];


    stationTraitementConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEauComponent',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBruteComponent',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitementComponent',
        },
        {
            'title': 'Equipement d\'aération',
            'ComponentName': 'ComposantAerationComponent',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelangeComponent',
        },
        {
            'title': 'Décanteur',
            'ComponentName': 'DecanteurComponent',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'FiltreComponent',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraiteComponent',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembraneComponent',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhpComponent',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimiqueComponent',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjectionComponent',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBouesComponent',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavavgeComponent',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElectriqueComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneComponent',
        }
    ];

    stationPompageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityComponent',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElecComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneComponent',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompMoteurComponent',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompPompComponent',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoirElecCmdComponent',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBelierComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupageDechargeComponent',
        },
        {
            'title': 'Vanne',
            'ComponentName': 'VanneArriveeComponent',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetourComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseComponent',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurComponent',
        },
        {
            'title': 'Joint de démontage' ,
            'ComponentName': 'JointDemantageComponent',
        },
        {
            'title': 'Collecteur d’aspiration ',
            'ComponentName': 'CollecteurAspirationComponent',
        },
        {
            'title': 'Collecteur de refoulement' ,
            'ComponentName': 'CollecteurReffoullementComponent',
        }
    ];

    constructor() { }

}

export const componentMapping: { [key: string]: Type<any>; } = {

    'SecurityComponent': InventoryComposantComponent,
    'VanneArriveeComponent': InventoryComposantComponent,
    'ObturateurComponent':InventoryComposantComponent,
    'JointDemantageComponent':InventoryComposantComponent,
    'CompteurComponent':InventoryComposantComponent,
    'FlotteurComponent':InventoryComposantComponent,
    'SoupageDechargeComponent':InventoryComposantComponent,
    'VanneSortieComponent':InventoryComposantComponent,
    'VenteuseComponent':InventoryComposantComponent,
    'ConduiteTropPleinComponent':InventoryComposantComponent,
    'ConduiteVidangeComponent':InventoryComposantComponent,
    'EchelleComponent':InventoryComposantComponent,
    'PosteChlorationComponent':InventoryComposantComponent,
    'PostTransElecComponent':InventoryComposantComponent,
    'GroupeElecPompMoteurComponent':InventoryComposantComponent,
    'GroupeElecPompPompComponent':InventoryComposantComponent,
    'ArmoirElecCmdComponent':InventoryComposantComponent,
    'AntiBelierComponent':InventoryComposantComponent,
    'ClapetAntiRetourComponent':InventoryComposantComponent,
    'CollonnesMontantesShowComponent':InventoryComposantComponent,
    'GroupeElectrogeneComponent':InventoryComposantComponent,
    'ReservoirEauBruteComponent':InventoryComposantComponent,
    'ReservoirEauTraiteComponent':InventoryComposantComponent,
    'KitMembraneComponent':InventoryComposantComponent,
    'StationPhpComponent':InventoryComposantComponent,
    'LocalStockageChimiqueComponent':InventoryComposantComponent,
    'PostPrepInjectionComponent':InventoryComposantComponent,
    'PostRecyclageBouesComponent':InventoryComposantComponent,
    'PostRecyclageEauLavavgeComponent':InventoryComposantComponent,
    'BatimentElectriqueComponent':InventoryComposantComponent,
    'PriseEauComponent':InventoryComposantComponent,
    'BassinMelangeComponent':InventoryComposantComponent,
    'FiltreComponent':InventoryComposantComponent,
    'ComposantAerationComponent':InventoryComposantComponent,
    'ComposantPretraitementComponent':InventoryComposantComponent,
    'DecanteurComponent':InventoryComposantComponent,
    'CollecteurAspirationComponent':InventoryComposantComponent,
    'CollecteurReffoullementComponent':InventoryComposantComponent,
    'CompteurSortieComponent':InventoryComposantComponent,
    'JointDemantageSortieComponent':InventoryComposantComponent,

    

};