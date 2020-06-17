import { Injectable, Type } from '@angular/core';
import {SecurityComponent} from "../../composant/composant-add-edit/security/security.component";
import {VanneArriveeComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/vanne-arrivee/vanne-arrivee.component";
import {ObturateurComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/obturateur/obturateur.component";
import {JointDemantageComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/joint-demantage/joint-demantage.component";
import {CompteurComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/compteur/compteur.component";
import {FlotteurComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/flotteur/flotteur.component";
import {VanneSortieComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/vanne-sortie/vanne-sortie.component";
import {VenteuseComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/venteuse/venteuse.component";
import {ConduiteTropPleinComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/conduite-trop-plein/conduite-trop-plein.component";
import {ConduiteVidangeComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/conduite-vidange/conduite-vidange.component";
import {EchelleComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/echelle/echelle.component";
import {PostTransElecComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/post-trans-elec/post-trans-elec.component";
import {GroupeElecPompMoteurComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/groupe-elec-pomp-moteur/groupe-elec-pomp-moteur.component";
import {GroupeElecPompPompComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/groupe-elec-pomp-pomp/groupe-elec-pomp-pomp.component";
import {ArmoirElecCmdComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/armoire-elec-cmd/armoir-elec-cmd.component";
import {AntiBelierComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/anti-belier/anti-belier.component";
import {ClapetAntiRetourComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/clapet-anti-retour/clapet-anti-retour.component";
import {CollonnesMontantesShowComponent} from "../../composant/composant-show/station-pompage-et-forage/collonnes-montantes-show/collonnes-montantes-show.component";
import {GroupeElectrogeneComponent} from "../../composant/composant-add-edit/station-traitement/groupe-electrogene/groupe-electrogene.component";
import {ReservoirEauBruteComponent} from "../../composant/composant-add-edit/station-traitement/reservoir-eau-brute/reservoir-eau-brute.component";
import {ReservoirEauTraiteComponent} from "../../composant/composant-add-edit/station-traitement/reservoir-eau-traite/reservoir-eau-traite.component";
import {KitMembraneComponent} from "../../composant/composant-add-edit/station-traitement/kit-membrane/kit-membrane.component";
import {StationPhpComponent} from "../../composant/composant-add-edit/station-traitement/station-php/station-php.component";
import {LocalStockageChimiqueComponent} from "../../composant/composant-add-edit/station-traitement/local-stockage-chimique/local-stockage-chimique.component";
import {PostPrepInjectionComponent} from "../../composant/composant-add-edit/station-traitement/post-prep-injection/post-prep-injection.component";
import {PostRecyclageBouesComponent} from "../../composant/composant-add-edit/station-traitement/post-recyclage-boues/post-recyclage-boues.component";
import {PostRecyclageEauLavavgeComponent} from "../../composant/composant-add-edit/station-traitement/post-recyclage-eau-lavavge/post-recyclage-eau-lavavge.component";
import {BatimentElectriqueComponent} from "../../composant/composant-add-edit/station-traitement/batiment-electrique/batiment-electrique.component";
import {PriseEauComponent} from "../../composant/composant-add-edit/station-traitement/prise-eau/prise-eau.component";
import {BassinMelangeComponent} from "../../composant/composant-add-edit/station-traitement/bassin-melange/bassin-melange.component";
import {FiltreComponent} from "../../composant/composant-add-edit/station-traitement/filtre/filtre.component";
import {ComposantAerationComponent} from "../../composant/composant-add-edit/station-traitement/composant-aeration/composant-aeration.component";
import {ComposantPretraitementComponent} from "../../composant/composant-add-edit/station-traitement/composant-pretraitement/composant-pretraitement.component";
import {DecanteurComponent} from "../../composant/composant-add-edit/station-traitement/decanteur/decanteur.component";
import {CollecteurAspirationComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/collecteur-aspiration/collecteur-aspiration.component";
import {CollecteurReffoullementComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/collecteur-reffoullement/collecteur-reffoullement.component";
import {CompteurSortieComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/compteur-sortie/compteur-sortie.component";
import {JointDemantageSortieComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/joint-demantage-sortie/joint-demantage-sortie.component";
import {SoupageDechargeComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/soupape-decharge/soupage-decharge.component";
import {PosteChlorationComponent} from "../../composant/composant-add-edit/reservoir-et-brise-charge/poste-chloration/poste-chloration.component";
import {ColonnesMontantesComponent} from "../../composant/composant-add-edit/station-pompage-et-forage/colonnes-montantes/colonnes-montantes.component";

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

    'SecurityComponent': SecurityComponent,
    'VanneArriveeComponent': VanneArriveeComponent,
    'ObturateurComponent':ObturateurComponent,
    'JointDemantageComponent':JointDemantageComponent,
    'CompteurComponent':CompteurComponent,
    'FlotteurComponent':FlotteurComponent,
    'SoupageDechargeComponent':SoupageDechargeComponent,
    'VanneSortieComponent':VanneSortieComponent,
    'VenteuseComponent':VenteuseComponent,
    'ConduiteTropPleinComponent':ConduiteTropPleinComponent,
    'ConduiteVidangeComponent':ConduiteVidangeComponent,
    'EchelleComponent':EchelleComponent,
    'PosteChlorationComponent':PosteChlorationComponent,
    'PostTransElecComponent':PostTransElecComponent,
    'GroupeElecPompMoteurComponent':GroupeElecPompMoteurComponent,
    'GroupeElecPompPompComponent':GroupeElecPompPompComponent,
    'ArmoirElecCmdComponent':ArmoirElecCmdComponent,
    'AntiBelierComponent':AntiBelierComponent,
    'ClapetAntiRetourComponent':ClapetAntiRetourComponent,
    'CollonnesMontantesShowComponent':ColonnesMontantesComponent,
    'GroupeElectrogeneComponent':GroupeElectrogeneComponent,
    'ReservoirEauBruteComponent':ReservoirEauBruteComponent,
    'ReservoirEauTraiteComponent':ReservoirEauTraiteComponent,
    'KitMembraneComponent':KitMembraneComponent,
    'StationPhpComponent':StationPhpComponent,
    'LocalStockageChimiqueComponent':LocalStockageChimiqueComponent,
    'PostPrepInjectionComponent':PostPrepInjectionComponent,
    'PostRecyclageBouesComponent':PostRecyclageBouesComponent,
    'PostRecyclageEauLavavgeComponent':PostRecyclageEauLavavgeComponent,
    'BatimentElectriqueComponent':BatimentElectriqueComponent,
    'PriseEauComponent':PriseEauComponent,
    'BassinMelangeComponent':BassinMelangeComponent,
    'FiltreComponent':FiltreComponent,
    'ComposantAerationComponent':ComposantAerationComponent,
    'ComposantPretraitementComponent':ComposantPretraitementComponent,
    'DecanteurComponent':DecanteurComponent,
    'CollecteurAspirationComponent':CollecteurAspirationComponent,
    'CollecteurReffoullementComponent':CollecteurReffoullementComponent,
    'CompteurSortieComponent':CompteurSortieComponent,
    'JointDemantageSortieComponent':JointDemantageSortieComponent,

    

};