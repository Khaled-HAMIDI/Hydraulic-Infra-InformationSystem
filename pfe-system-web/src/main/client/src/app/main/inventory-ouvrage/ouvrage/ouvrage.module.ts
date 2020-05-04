import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { OuvrageListComponent } from './list/ouvrage-list/ouvrage-list.component';
import { OuvrageListService } from './list/ouvrage-list/ouvrage-list.service';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { OuvrageAddComponent } from './ouvrage-add/ouvrage-add.component';
import { OuvrageEditComponent } from './ouvrage-edit/ouvrage-edit.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { OuvrageShowComponent } from './ouvrage-show/ouvrage-show.component';
import { StationTraitementConvComponent } from "./ouvrage-add/Type/station-traitement-conv/station-traitement-conv.component";
import { ReservoirComponent } from "./ouvrage-add/Type/reservoir/reservoir.component";
import { ForageComponent } from "./ouvrage-add/Type/forage/forage.component";
import { StationPompageComponent } from "./ouvrage-add/Type/station-pompage/station-pompage.component";
import { BriseChargeComponent } from "./ouvrage-add/Type/brise-charge/brise-charge.component";
import { StationNonConvComponent } from "./ouvrage-add/Type/station-non-conv/station-non-conv.component";
import { BriseChargeStepperComponent } from './ouvrage-add/steppers/brise-charge-stepper/brise-charge-stepper.component';
import { ForageStepperComponent } from './ouvrage-add/steppers/forage-stepper/forage-stepper.component';
import { ReservoirStepperComponent } from './ouvrage-add/steppers/reservoir-stepper/reservoir-stepper.component';
import { StationNonConvStepperComponent } from './ouvrage-add/steppers/station-non-conv-stepper/station-non-conv-stepper.component';
import { StationTraitementConvStepperComponent } from './ouvrage-add/steppers/station-traitement-conv-stepper/station-traitement-conv-stepper.component';
import { StationPompageStepperComponent } from './ouvrage-add/steppers/station-pompage-stepper/station-pompage-stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import { SecurityComponent } from './composant-add-edit/security/security.component';
import { PriseEauComponent } from './composant-add-edit/station-traitement/prise-eau/prise-eau.component';
import { ReservoirEauBruteComponent } from './composant-add-edit/station-traitement/reservoir-eau-brute/reservoir-eau-brute.component';
import { ComposantPretraitementComponent } from './composant-add-edit/station-traitement/composant-pretraitement/composant-pretraitement.component';
import { ComposantAerationComponent } from './composant-add-edit/station-traitement/composant-aeration/composant-aeration.component';
import { BassinMelangeComponent } from './composant-add-edit/station-traitement/bassin-melange/bassin-melange.component';
import { DecanteurComponent } from './composant-add-edit/station-traitement/decanteur/decanteur.component';
import { FiltreComponent } from './composant-add-edit/station-traitement/filtre/filtre.component';
import { ReservoirEauTraiteComponent } from './composant-add-edit/station-traitement/reservoir-eau-traite/reservoir-eau-traite.component';
import { KitMembraneComponent } from './composant-add-edit/station-traitement/kit-membrane/kit-membrane.component';
import { StationPhpComponent } from './composant-add-edit/station-traitement/station-php/station-php.component';
import { LocalStockageChimiqueComponent } from './composant-add-edit/station-traitement/local-stockage-chimique/local-stockage-chimique.component';
import { PostPrepInjectionComponent } from './composant-add-edit/station-traitement/post-prep-injection/post-prep-injection.component';
import { PostRecyclageBouesComponent } from './composant-add-edit/station-traitement/post-recyclage-boues/post-recyclage-boues.component';
import { PostRecyclageEauLavavgeComponent } from './composant-add-edit/station-traitement/post-recyclage-eau-lavavge/post-recyclage-eau-lavavge.component';
import { BatimentElectriqueComponent } from './composant-add-edit/station-traitement/batiment-electrique/batiment-electrique.component';
import { GroupeElectrogeneComponent } from './composant-add-edit/station-traitement/groupe-electrogene/groupe-electrogene.component';
import { PostTransElecComponent } from './composant-add-edit/station-pompage-et-forage/post-trans-elec/post-trans-elec.component';
import { GroupeElecPompPompComponent } from './composant-add-edit/station-pompage-et-forage/groupe-elec-pomp-pomp/groupe-elec-pomp-pomp.component';
import { GroupeElecPompMoteurComponent } from './composant-add-edit/station-pompage-et-forage/groupe-elec-pomp-moteur/groupe-elec-pomp-moteur.component';
import { ArmoirElecCmdComponent } from './composant-add-edit/station-pompage-et-forage/armoire-elec-cmd/armoir-elec-cmd.component';
import { AntiBelierComponent } from './composant-add-edit/station-pompage-et-forage/anti-belier/anti-belier.component';
import { SoupageDechargeComponent } from './composant-add-edit/station-pompage-et-forage/soupape-decharge/soupage-decharge.component';
import { VannePompageComponent } from './composant-add-edit/station-pompage-et-forage/vanne-pompage/vanne-pompage.component';
import { ClapetAntiRetourComponent } from './composant-add-edit/station-pompage-et-forage/clapet-anti-retour/clapet-anti-retour.component';
import { VenteuseComponent } from './composant-add-edit/station-pompage-et-forage/venteuse/venteuse.component';
import { JointDemantageComponent } from './composant-add-edit/station-pompage-et-forage/joint-demantage/joint-demantage.component';
import { CompteurComponent } from './composant-add-edit/station-pompage-et-forage/compteur/compteur.component';
import { CollecteurAspirationComponent } from './composant-add-edit/station-pompage-et-forage/collecteur-aspiration/collecteur-aspiration.component';
import { CollecteurReffoullementComponent } from './composant-add-edit/station-pompage-et-forage/collecteur-reffoullement/collecteur-reffoullement.component';
import { VanneArriveeComponent } from './composant-add-edit/reservoir-et-brise-charge/vanne-arrivee/vanne-arrivee.component';
import { VanneSortieComponent } from './composant-add-edit/reservoir-et-brise-charge/vanne-sortie/vanne-sortie.component';
import { FlotteurComponent } from './composant-add-edit/reservoir-et-brise-charge/flotteur/flotteur.component';
import { EchelleComponent } from './composant-add-edit/reservoir-et-brise-charge/echelle/echelle.component';
import { ConduiteTropPleinComponent } from './composant-add-edit/reservoir-et-brise-charge/conduite-trop-plein/conduite-trop-plein.component';
import { ConduiteVidangeComponent } from './composant-add-edit/reservoir-et-brise-charge/conduite-vidange/conduite-vidange.component';
import { PosteChlorationComponent } from './composant-add-edit/reservoir-et-brise-charge/poste-chloration/poste-chloration.component';
import { ColonnesMontantesComponent } from './composant-add-edit/station-pompage-et-forage/colonnes-montantes/colonnes-montantes.component';
import { OuvragesSelectedBarComponent } from './list/selected-bar/selected-bar.component';
import { SecurityShowComponent } from './composant-show/security-show/security-show.component';
import { ConduiteTropPleinShowComponent } from './composant-show/reservoir-et-brise-charge/conduite-trop-plein-show/conduite-trop-plein-show.component';
import { ConduiteVidangeShowComponent } from './composant-show/reservoir-et-brise-charge/conduite-vidange-show/conduite-vidange-show.component';
import { EchelleShowComponent } from './composant-show/reservoir-et-brise-charge/echelle-show/echelle-show.component';
import { FlotteurShowComponent } from './composant-show/reservoir-et-brise-charge/flotteur-show/flotteur-show.component';
import { PosteChlorationShowComponent } from './composant-show/reservoir-et-brise-charge/poste-chloration-show/poste-chloration-show.component';
import { VanneArriveeShowComponent } from './composant-show/reservoir-et-brise-charge/vanne-arrivee-show/vanne-arrivee-show.component';
import { VanneSortieShowComponent } from './composant-show/reservoir-et-brise-charge/vanne-sortie-show/vanne-sortie-show.component';
import { AntiBilierShowComponent } from './composant-show/station-pompage-et-forage/anti-bilier-show/anti-bilier-show.component';
import { ArmoireElecCmdShowComponent } from './composant-show/station-pompage-et-forage/armoire-elec-cmd-show/armoire-elec-cmd-show.component';
import { ClapetAntiRetourShowComponent } from './composant-show/station-pompage-et-forage/clapet-anti-retour-show/clapet-anti-retour-show.component';
import { CollecteurAspirationShowComponent } from './composant-show/station-pompage-et-forage/collecteur-aspiration-show/collecteur-aspiration-show.component';
import { CollecteurReffoullementShowComponent } from './composant-show/station-pompage-et-forage/collecteur-reffoullement-show/collecteur-reffoullement-show.component';
import { CollonnesMontantesShowComponent } from './composant-show/station-pompage-et-forage/collonnes-montantes-show/collonnes-montantes-show.component';
import { CompteurShowComponent } from './composant-show/station-pompage-et-forage/compteur-show/compteur-show.component';
import { GroupeElecPompMoteurShowComponent } from './composant-show/station-pompage-et-forage/groupe-elec-pomp-moteur-show/groupe-elec-pomp-moteur-show.component';
import { GroupeElecPompPompShowComponent } from './composant-show/station-pompage-et-forage/groupe-elec-pomp-pomp-show/groupe-elec-pomp-pomp-show.component';
import { JointDemantageShowComponent } from './composant-show/station-pompage-et-forage/joint-demantage-show/joint-demantage-show.component';
import { PostTransElecShowComponent } from './composant-show/station-pompage-et-forage/post-trans-elec-show/post-trans-elec-show.component';
import { SoupapeDechargeShowComponent } from './composant-show/station-pompage-et-forage/soupape-decharge-show/soupape-decharge-show.component';
import { VannePompageShowComponent } from './composant-show/station-pompage-et-forage/vanne-pompage-show/vanne-pompage-show.component';
import { VenteuseShowComponent } from './composant-show/station-pompage-et-forage/venteuse-show/venteuse-show.component';
import { BassinMelangeShowComponent } from './composant-show/station-traitement/bassin-melange-show/bassin-melange-show.component';
import { BatimentElctriqueShowComponent } from './composant-show/station-traitement/batiment-elctrique-show/batiment-elctrique-show.component';
import { ComposantAerationShowComponent } from './composant-show/station-traitement/composant-aeration-show/composant-aeration-show.component';
import { ComposantPretraitementShowComponent } from './composant-show/station-traitement/composant-pretraitement-show/composant-pretraitement-show.component';
import { DecanteurShowComponent } from './composant-show/station-traitement/decanteur-show/decanteur-show.component';
import { FiltreShowComponent } from './composant-show/station-traitement/filtre-show/filtre-show.component';
import { GroupeElectrogeneShowComponent } from './composant-show/station-traitement/groupe-electrogene-show/groupe-electrogene-show.component';
import { KitMembraneShowComponent } from './composant-show/station-traitement/kit-membrane-show/kit-membrane-show.component';
import { LocalStockageChimiqueShowComponent } from './composant-show/station-traitement/local-stockage-chimique-show/local-stockage-chimique-show.component';
import { PostPrepInjectionShowComponent } from './composant-show/station-traitement/post-prep-injection-show/post-prep-injection-show.component';
import { PostRecyclageBouesShowComponent } from './composant-show/station-traitement/post-recyclage-boues-show/post-recyclage-boues-show.component';
import { PostRecyclageEauLavageShowComponent } from './composant-show/station-traitement/post-recyclage-eau-lavage-show/post-recyclage-eau-lavage-show.component';
import { PriseEauShowComponent } from './composant-show/station-traitement/prise-eau-show/prise-eau-show.component';
import { ReservoirEauBruteShowComponent } from './composant-show/station-traitement/reservoir-eau-brute-show/reservoir-eau-brute-show.component';
import { ReservoirEauTraiteShowComponent } from './composant-show/station-traitement/reservoir-eau-traite-show/reservoir-eau-traite-show.component';
import { StationPhpShowComponent } from './composant-show/station-traitement/station-php-show/station-php-show.component';
import { BriseChargeShowStepperComponent } from './ouvrage-show/steppers/brise-charge-show-stepper/brise-charge-show-stepper.component';
import { ForageShowStepperComponent } from './ouvrage-show/steppers/forage-show-stepper/forage-show-stepper.component';
import { ReservoirShowStepperComponent } from './ouvrage-show/steppers/reservoir-show-stepper/reservoir-show-stepper.component';
import { StationNonConvShowStepperComponent } from './ouvrage-show/steppers/station-non-conv-show-stepper/station-non-conv-show-stepper.component';
import { StationPompageShowStepperComponent } from './ouvrage-show/steppers/station-pompage-show-stepper/station-pompage-show-stepper.component';
import { StationTraitementConvShowStepperComponent } from './ouvrage-show/steppers/station-traitement-conv-show-stepper/station-traitement-conv-show-stepper.component';
import { OuvrageAddService } from './ouvrage-add/ouvrage-add.service';
import { OuvrageShowService } from './ouvrage-show/ouvrage-show.service';
import { OuvrageEditService } from './ouvrage-edit/ouvrage-edit.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: 'add',
        component: OuvrageAddComponent,
        data: { action: 'add' },
        resolve: { data: OuvrageAddService }
    },
    {
        path: 'add/StationTraitementConventionelle/:id',
        component: StationTraitementConvComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/Reservoir/:id',
        component: ReservoirComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/Forage/:id',
        component: ForageComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/StationPompage/:id',
        component: StationPompageComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/BriseCharge/:id',
        component: BriseChargeComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/StationTraitementNonConventionelle/:id',
        component: StationNonConvComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/StationTraitementConventionelle/composants/:code',
        component: StationTraitementConvStepperComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/Reservoir/composants/:code',
        component: ReservoirStepperComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/Forage/composants/:code',
        component: ForageStepperComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/StationPompage/composants/:code',
        component: StationPompageStepperComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/BriseCharge/composants/:code',
        component: BriseChargeStepperComponent,
        data: { action: 'add' }
    },
    {
        path: 'add/StationTraitementNonConventionelle/composants/:code',
        component: StationNonConvStepperComponent,
        data: { action: 'add' }
    },
    {
        path: ':code/edit',
        component: OuvrageEditComponent,
        data: { action: 'edit' },
        resolve: { data: OuvrageEditService }
    },
    {
        path: 'edit/StationTraitementConventionelle/composants/:code',
        component: StationTraitementConvStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: 'edit/Reservoir/composants/:code',
        component: ReservoirStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: 'edit/Forage/composants/:code',
        component: ForageStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: 'edit/StationPompage/composants/:code',
        component: StationPompageStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: 'edit/BriseCharge/composants/:code',
        component: BriseChargeStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: 'edit/StationTraitementNonConventionelle/composants/:code',
        component: StationNonConvStepperComponent,
        data: { action: 'edit' }
    },
    {
        path: ':code/show',
        component: OuvrageShowComponent,
        resolve: { data: OuvrageShowService }
    },
    {
        path: 'show/StationTraitementConventionelle/composants/:code',
        component: StationTraitementConvShowStepperComponent
    },
    {
        path: 'show/Reservoir/composants/:code',
        component: ReservoirShowStepperComponent
    },
    {
        path: 'show/Forage/composants/:code',
        component: ForageShowStepperComponent
    },
    {
        path: 'show/StationPompage/composants/:code',
        component: StationPompageShowStepperComponent
    },
    {
        path: 'show/BriseCharge/composants/:code',
        component: BriseChargeShowStepperComponent
    },
    {
        path: 'show/StationTraitementNonConventionelle/composants/:code',
        component: StationNonConvShowStepperComponent
    },
    {
        path: 'list',
        component: OuvrageListComponent,
        resolve: { data: OuvrageListService }
    }
];

@NgModule({
    declarations: [OuvrageListComponent, OuvrageAddComponent, OuvrageEditComponent, OuvrageShowComponent, StationTraitementConvComponent, StationPompageComponent, ReservoirComponent, ForageComponent, BriseChargeComponent, StationNonConvComponent,  BriseChargeStepperComponent, ForageStepperComponent, ReservoirStepperComponent, StationNonConvStepperComponent, StationTraitementConvStepperComponent, StationPompageStepperComponent, SecurityComponent, PriseEauComponent, ReservoirEauBruteComponent, ComposantPretraitementComponent, ComposantAerationComponent, BassinMelangeComponent, DecanteurComponent, FiltreComponent, ReservoirEauTraiteComponent, KitMembraneComponent, StationPhpComponent, LocalStockageChimiqueComponent, PostPrepInjectionComponent, PostRecyclageBouesComponent, PostRecyclageEauLavavgeComponent, BatimentElectriqueComponent, GroupeElectrogeneComponent, PostTransElecComponent, GroupeElecPompPompComponent, GroupeElecPompMoteurComponent, ArmoirElecCmdComponent, AntiBelierComponent, SoupageDechargeComponent, VannePompageComponent, ClapetAntiRetourComponent, VenteuseComponent, JointDemantageComponent, CompteurComponent, CollecteurAspirationComponent, CollecteurReffoullementComponent, VanneArriveeComponent, VanneSortieComponent, FlotteurComponent, EchelleComponent, ConduiteTropPleinComponent, ConduiteVidangeComponent, PosteChlorationComponent, ColonnesMontantesComponent, SecurityShowComponent, ConduiteTropPleinShowComponent, ConduiteVidangeShowComponent, EchelleShowComponent, FlotteurShowComponent, PosteChlorationShowComponent, VanneArriveeShowComponent, VanneSortieShowComponent, AntiBilierShowComponent, ArmoireElecCmdShowComponent, ClapetAntiRetourShowComponent, CollecteurAspirationShowComponent, CollecteurReffoullementShowComponent, CollonnesMontantesShowComponent, CompteurShowComponent, GroupeElecPompMoteurShowComponent, GroupeElecPompPompShowComponent, JointDemantageShowComponent, PostTransElecShowComponent, SoupapeDechargeShowComponent, VannePompageShowComponent, VenteuseShowComponent, BassinMelangeShowComponent, BatimentElctriqueShowComponent, ComposantAerationShowComponent, ComposantPretraitementShowComponent, DecanteurShowComponent, FiltreShowComponent, GroupeElectrogeneShowComponent, KitMembraneShowComponent, LocalStockageChimiqueShowComponent, PostPrepInjectionShowComponent, PostRecyclageBouesShowComponent, PostRecyclageEauLavageShowComponent, PriseEauShowComponent, ReservoirEauBruteShowComponent, ReservoirEauTraiteShowComponent, StationPhpShowComponent, BriseChargeShowStepperComponent, ForageShowStepperComponent, ReservoirShowStepperComponent, StationNonConvShowStepperComponent, StationPompageShowStepperComponent, StationTraitementConvShowStepperComponent, OuvragesSelectedBarComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        FormsModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatToolbarModule,
        MatTreeModule,
        AyamsModule,
        NgxMaskModule.forRoot(options),
        MatDatepickerModule,
        MatStepperModule,
    ]
})
export class OuvrageModule { }
