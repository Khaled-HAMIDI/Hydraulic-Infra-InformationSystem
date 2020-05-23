import { Injectable, Type } from '@angular/core';

import {SecurityShowComponent} from "../../composant/composant-show/security-show/security-show.component";
import {VanneArriveeShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/vanne-arrivee-show/vanne-arrivee-show.component";
import {OpturateurShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/obturateur-show/opturateur-show.component";
import {JointDemantageShowComponent} from "../../composant/composant-show/station-pompage-et-forage/joint-demantage-show/joint-demantage-show.component";
import {SoupapeDechargeShowComponent} from "../../composant/composant-show/station-pompage-et-forage/soupape-decharge-show/soupape-decharge-show.component";
import {PosteChlorationShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/poste-chloration-show/poste-chloration-show.component";
import {ConduiteTropPleinShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/conduite-trop-plein-show/conduite-trop-plein-show.component";
import {LocalStockageChimiqueShowComponent} from "../../composant/composant-show/station-traitement/local-stockage-chimique-show/local-stockage-chimique-show.component";
import {ComposantAerationShowComponent} from "../../composant/composant-show/station-traitement/composant-aeration-show/composant-aeration-show.component";
import {VanneSortieShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/vanne-sortie-show/vanne-sortie-show.component";
import {GroupeElectrogeneShowComponent} from "../../composant/composant-show/station-traitement/groupe-electrogene-show/groupe-electrogene-show.component";
import {PostRecyclageBouesShowComponent} from "../../composant/composant-show/station-traitement/post-recyclage-boues-show/post-recyclage-boues-show.component";
import {CollecteurReffoullementShowComponent} from "../../composant/composant-show/station-pompage-et-forage/collecteur-reffoullement-show/collecteur-reffoullement-show.component";
import {EchelleShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/echelle-show/echelle-show.component";
import {CollecteurAspirationShowComponent} from "../../composant/composant-show/station-pompage-et-forage/collecteur-aspiration-show/collecteur-aspiration-show.component";
import {GroupeElecPompPompShowComponent} from "../../composant/composant-show/station-pompage-et-forage/groupe-elec-pomp-pomp-show/groupe-elec-pomp-pomp-show.component";
import {StationPhpShowComponent} from "../../composant/composant-show/station-traitement/station-php-show/station-php-show.component";
import {ComposantPretraitementShowComponent} from "../../composant/composant-show/station-traitement/composant-pretraitement-show/composant-pretraitement-show.component";
import {CompteurShowComponent} from "../../composant/composant-show/station-pompage-et-forage/compteur-show/compteur-show.component";
import {GroupeElecPompMoteurShowComponent} from "../../composant/composant-show/station-pompage-et-forage/groupe-elec-pomp-moteur-show/groupe-elec-pomp-moteur-show.component";
import {DecanteurShowComponent} from "../../composant/composant-show/station-traitement/decanteur-show/decanteur-show.component";
import {ReservoirEauTraiteShowComponent} from "../../composant/composant-show/station-traitement/reservoir-eau-traite-show/reservoir-eau-traite-show.component";
import {FiltreShowComponent} from "../../composant/composant-show/station-traitement/filtre-show/filtre-show.component";
import {KitMembraneShowComponent} from "../../composant/composant-show/station-traitement/kit-membrane-show/kit-membrane-show.component";
import {PostTransElecShowComponent} from "../../composant/composant-show/station-pompage-et-forage/post-trans-elec-show/post-trans-elec-show.component";
import {VenteuseShowComponent} from "../../composant/composant-show/station-pompage-et-forage/venteuse-show/venteuse-show.component";
import {CollonnesMontantesShowComponent} from "../../composant/composant-show/station-pompage-et-forage/collonnes-montantes-show/collonnes-montantes-show.component";
import {JointDemantageSortieShowComponent} from "../../composant/composant-show/station-pompage-et-forage/joint-demantage-sortie-show/joint-demantage-sortie-show.component";
import {ClapetAntiRetourShowComponent} from "../../composant/composant-show/station-pompage-et-forage/clapet-anti-retour-show/clapet-anti-retour-show.component";
import {PriseEauShowComponent} from "../../composant/composant-show/station-traitement/prise-eau-show/prise-eau-show.component";
import {ConduiteVidangeShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/conduite-vidange-show/conduite-vidange-show.component";
import {PostPrepInjectionShowComponent} from "../../composant/composant-show/station-traitement/post-prep-injection-show/post-prep-injection-show.component";
import {FlotteurShowComponent} from "../../composant/composant-show/reservoir-et-brise-charge/flotteur-show/flotteur-show.component";
import {ReservoirEauBruteShowComponent} from "../../composant/composant-show/station-traitement/reservoir-eau-brute-show/reservoir-eau-brute-show.component";
import {BassinMelangeShowComponent} from "../../composant/composant-show/station-traitement/bassin-melange-show/bassin-melange-show.component";
import {CompteurSortieShowComponent} from "../../composant/composant-show/station-pompage-et-forage/compteur-sortie-show/compteur-sortie-show.component";
import {ArmoireElecCmdShowComponent} from "../../composant/composant-show/station-pompage-et-forage/armoire-elec-cmd-show/armoire-elec-cmd-show.component";
import {AntiBilierShowComponent} from "../../composant/composant-show/station-pompage-et-forage/anti-bilier-show/anti-bilier-show.component";
import {BatimentElctriqueShowComponent} from "../../composant/composant-show/station-traitement/batiment-elctrique-show/batiment-elctrique-show.component";
import {PostRecyclageEauLavageShowComponent} from "../../composant/composant-show/station-traitement/post-recyclage-eau-lavage-show/post-recyclage-eau-lavage-show.component";

@Injectable({
    providedIn: 'root'
})
export class StepperShowServie {
    briseChargeComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Obturateur',
            'ComponentName': 'OpturateurShowComponent',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArriveeShowComponent',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurShowComponent',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantageShowComponent',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'FlotteurShowComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDechargeShowComponent',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortieShowComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseShowComponent',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortieShowComponent',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortieShowComponent',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPleinShowComponent',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidangeShowComponent',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'EchelleShowComponent',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChlorationShowComponent',
        }
    ];


    forageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElecShowComponent',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompPompShowComponent',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompMoteurShowComponent',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoireElecCmdShowComponent',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBilierShowComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDechargeShowComponent',
        },
        {
            'title': 'Vanne ',
            'ComponentName': 'VanneArriveeShowComponent',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetourShowComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseShowComponent',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurShowComponent',
        },
        {
            'title': 'Colonnes montantes' ,
            'ComponentName': 'CollonnesMontantesShowComponent',
        }
    ];

    reservoirComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Vanne d\'arrivée',
            'ComponentName': 'VanneArriveeShowComponent',
        },
        {
            'title': 'Joint de démontage arrivée',
            'ComponentName': 'JointDemantageShowComponent',
        },
        {
            'title': 'Compteur/débitmètre arrivée',
            'ComponentName': 'CompteurShowComponent',
        },
        {
            'title': 'Flotteur',
            'ComponentName': 'FlotteurShowComponent',
        },
        {
            'title': 'Vanne de distribution',
            'ComponentName': 'VanneSortieShowComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseShowComponent',
        },
        {
            'title': 'Joint de démontage distribution',
            'ComponentName': 'JointDemantageSortieShowComponent',
        },
        {
            'title': 'Compteur/débitmètre distribution',
            'ComponentName': 'CompteurSortieShowComponent',
        },
        {
            'title': 'Conduite trop plein',
            'ComponentName': 'ConduiteTropPleinShowComponent',
        },
        {
            'title': 'Conduite de vidange',
            'ComponentName': 'ConduiteVidangeShowComponent',
        },
        {
            'title': 'Échelle',
            'ComponentName': 'EchelleShowComponent',
        },
        {
            'title': 'Poste de Chloration',
            'ComponentName': 'PosteChlorationShowComponent',
        }
    ];


    stationTraitementNonConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEauShowComponent',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBruteShowComponent',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitementShowComponent',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelangeShowComponent',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'FiltreShowComponent',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraiteShowComponent',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembraneShowComponent',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhpShowComponent',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimiqueShowComponent',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjectionShowComponent',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBouesShowComponent',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavageShowComponent',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElctriqueShowComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneShowComponent',
        }
    ];


    stationTraitementConventionelleComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Prise d\'eau brute',
            'ComponentName': 'PriseEauShowComponent',
        },
        {
            'title': 'Réservoir d\'eau brute',
            'ComponentName': 'ReservoirEauBruteShowComponent',
        },
        {
            'title': 'Equipement de prétraitement',
            'ComponentName': 'ComposantPretraitementShowComponent',
        },
        {
            'title': 'Equipement d\'aération',
            'ComponentName': 'ComposantAerationShowComponent',
        },
        {
            'title': 'Bassin de mélange',
            'ComponentName': 'BassinMelangeShowComponent',
        },
        {
            'title': 'Décanteur',
            'ComponentName': 'DecanteurShowComponent',
        },
        {
            'title': 'Filtre',
            'ComponentName': 'FiltreShowComponent',
        },
        {
            'title': 'Réservoir d\'eau traité',
            'ComponentName': 'ReservoirEauTraiteShowComponent',
        },
        {
            'title': 'Kit de membrane',
            'ComponentName': 'KitMembraneShowComponent',
        },
        {
            'title': 'Station PHP',
            'ComponentName': 'StationPhpShowComponent',
        },
        {
            'title': 'Local de stockage des produits chimiques',
            'ComponentName': 'LocalStockageChimiqueShowComponent',
        },
        {
            'title': 'Poste de préparation et d’injection',
            'ComponentName': 'PostPrepInjectionShowComponent',
        },
        {
            'title': 'Poste de recyclage de boues',
            'ComponentName': 'PostRecyclageBouesShowComponent',
        },
        {
            'title': 'Poste de recyclage des eaux de lavage',
            'ComponentName': 'PostRecyclageEauLavageShowComponent',
        },
        {
            'title': 'Bâtiment électrique',
            'ComponentName': 'BatimentElctriqueShowComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneShowComponent',
        }
    ];

    stationPompageComposants = [
        {
            'title': 'Securité',
            'ComponentName': 'SecurityShowComponent',
        },
        {
            'title': 'Poste transformation électrique',
            'ComponentName': 'PostTransElecShowComponent',
        },
        {
            'title': 'Groupe électrogène',
            'ComponentName': 'GroupeElectrogeneShowComponent',
        },
        {
            'title': 'Groupe électropompe:Partie pompe',
            'ComponentName': 'GroupeElecPompMoteurShowComponent',
        },
        {
            'title': 'Groupe électropompe:Partie moteur',
            'ComponentName': 'GroupeElecPompPompShowComponent',
        },
        {
            'title': 'Armoire Électrique de commande',
            'ComponentName': 'ArmoireElecCmdShowComponent',
        },
        {
            'title': 'Anti-bélier',
            'ComponentName': 'AntiBilierShowComponent',
        },
        {
            'title': 'Soupape de décharge',
            'ComponentName': 'SoupapeDechargeShowComponent',
        },
        {
            'title': 'Vanne',
            'ComponentName': 'VanneArriveeShowComponent',
        },
        {
            'title': 'Clapet anti retour ',
            'ComponentName': 'ClapetAntiRetourShowComponent',
        },
        {
            'title': 'Ventouse',
            'ComponentName': 'VenteuseShowComponent',
        },
        {
            'title': 'Compteur/débitmètre',
            'ComponentName': 'CompteurShowComponent',
        },
        {
            'title': 'Joint de démontage' ,
            'ComponentName': 'JointDemantageShowComponent',
        },
        {
            'title': 'Collecteur d’aspiration ',
            'ComponentName': 'CollecteurAspirationShowComponent',
        },
        {
            'title': 'Collecteur de refoulement' ,
            'ComponentName': 'CollecteurReffoullementShowComponent',
        }
    ];

    constructor() { }

}

export const componentMapping: { [key: string]: Type<any>; } = {

    'SecurityShowComponent': SecurityShowComponent,
    'VanneArriveeShowComponent': VanneArriveeShowComponent,
    'OpturateurShowComponent':OpturateurShowComponent,
    'JointDemantageShowComponent':JointDemantageShowComponent,
    'CompteurShowComponent':CompteurShowComponent,
    'FlotteurShowComponent':FlotteurShowComponent,
    'SoupapeDechargeShowComponent':SoupapeDechargeShowComponent,
    'VanneSortieShowComponent':VanneSortieShowComponent,
    'VenteuseShowComponent':VenteuseShowComponent,
    'ConduiteTropPleinShowComponent':ConduiteTropPleinShowComponent,
    'ConduiteVidangeShowComponent':ConduiteVidangeShowComponent,
    'EchelleShowComponent':EchelleShowComponent,
    'PosteChlorationShowComponent':PosteChlorationShowComponent,
    'PostTransElecShowComponent':PostTransElecShowComponent,
    'GroupeElecPompMoteurShowComponent':GroupeElecPompMoteurShowComponent,
    'GroupeElecPompPompShowComponent':GroupeElecPompPompShowComponent,
    'ArmoireElecCmdShowComponent':ArmoireElecCmdShowComponent,
    'AntiBilierShowComponent':AntiBilierShowComponent,
    'ClapetAntiRetourShowComponent':ClapetAntiRetourShowComponent,
    'CollonnesMontantesShowComponent':CollonnesMontantesShowComponent,
    'GroupeElectrogeneShowComponent':GroupeElectrogeneShowComponent,
    'ReservoirEauBruteShowComponent':ReservoirEauBruteShowComponent,
    'ReservoirEauTraiteShowComponent':ReservoirEauTraiteShowComponent,
    'KitMembraneShowComponent':KitMembraneShowComponent,
    'StationPhpShowComponent':StationPhpShowComponent,
    'LocalStockageChimiqueShowComponent':LocalStockageChimiqueShowComponent,
    'PostPrepInjectionShowComponent':PostPrepInjectionShowComponent,
    'PostRecyclageBouesShowComponent':PostRecyclageBouesShowComponent,
    'PostRecyclageEauLavageShowComponent':PostRecyclageEauLavageShowComponent,
    'BatimentElctriqueShowComponent':BatimentElctriqueShowComponent,
    'PriseEauShowComponent':PriseEauShowComponent,
    'BassinMelangeShowComponent':BassinMelangeShowComponent,
    'FiltreShowComponent':FiltreShowComponent,
    'ComposantAerationShowComponent':ComposantAerationShowComponent,
    'ComposantPretraitementShowComponent':ComposantPretraitementShowComponent,
    'DecanteurShowComponent':DecanteurShowComponent,
    'CollecteurAspirationShowComponent':CollecteurAspirationShowComponent,
    'CollecteurReffoullementShowComponent':CollecteurReffoullementShowComponent,
    'CompteurSortieShowComponent':CompteurSortieShowComponent,
    'JointDemantageSortieShowComponent':JointDemantageSortieShowComponent,



};