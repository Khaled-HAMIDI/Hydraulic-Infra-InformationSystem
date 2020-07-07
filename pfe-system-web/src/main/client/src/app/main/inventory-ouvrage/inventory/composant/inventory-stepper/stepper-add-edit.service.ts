import { Injectable, Type } from '@angular/core';
import {InventoryComposantComponent} from "../inventory-composant/inventory-composant.component";

@Injectable({
    providedIn: 'root'
})
export class StepperAddEditService {
    briseChargeComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Obturateur',
            'ComponentName': 'Obturateur',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArrivee',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurDebimetre',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantage',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'Flotteur',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDecharge',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortie',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'Venteuse',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortie',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortie',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPlein',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidange',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'Echelle',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChloration',
        }
        ];


    forageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElec',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogene',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompPomp',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompMoteur',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoirElecCmd',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBelier',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDecharge',
        },
        {
            'title': 'Vanne ',
            'ComponentName': 'VanneArrivee',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetour',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'Venteuse',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurDebimetre',
        },
        {
            'title': 'Colonnes montantes' ,
            'ComponentName': 'ColonnesMontantes',
        }
    ];

    reservoirComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArrivee',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantage',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurDebimetre',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'Flotteur',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortie',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'Venteuse',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortie',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortie',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPlein',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidange',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'Echelle',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChloration',
        }
    ];


    stationTraitementNonConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEau',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBrute',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitement',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelange',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'Filtre',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraite',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembrane',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhp',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimique',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjection',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBoues',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavavge',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElectrique',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogene',
        }
    ];


    stationTraitementConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEau',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBrute',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitement',
        },
        {
            'title': 'Equipement d\'aération',
            'ComponentName': 'ComposantAeration',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelange',
        },
        {
            'title': 'Décanteur',
            'ComponentName': 'Decanteur',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'Filtre',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraite',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembrane',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhp',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimique',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjection',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBoues',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavavge',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElectrique',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogene',
        }
    ];

    stationPompageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'Security',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElec',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogene',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompMoteur',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompPomp',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoirElecCmd',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBelier',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDecharge',
        },
        {
            'title': 'Vanne',
            'ComponentName': 'VanneArrivee',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetour',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'Venteuse',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurDebimetre',
        },
        {
            'title': 'Joint de démontage' ,
            'ComponentName': 'JointDemantage',
        },
        {
            'title': 'Collecteur d’aspiration ',
            'ComponentName': 'CollecteurAspiration',
        },
        {
            'title': 'Collecteur de refoulement' ,
            'ComponentName': 'CollecteurReffoullement',
        }
    ];

    constructor() { }

}

export const componentMapping: { [key: string]: Type<any>; } = {

    'InventoryComposantComponent': InventoryComposantComponent,

};