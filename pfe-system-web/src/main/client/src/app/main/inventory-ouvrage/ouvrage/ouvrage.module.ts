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
import {MatTreeModule} from '@angular/material/tree';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { OuvrageListComponent } from './list/ouvrage-list/ouvrage-list.component';
import { OuvrageListService } from './list/ouvrage-list/ouvrage-list.service';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { OuvrageAddComponent } from './ouvrage-add/ouvrage-add.component';
import { OuvrageEditComponent } from './ouvrage-edit/ouvrage-edit.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { OuvrageShowComponent } from './ouvrage-show/ouvrage-show.component';
import {StationTraitementConvComponent} from "./ouvrage-add/Type/station-traitement-conv/station-traitement-conv.component";
import {ReservoirComponent} from "./ouvrage-add/Type/reservoir/reservoir.component";
import {ForageComponent} from "./ouvrage-add/Type/forage/forage.component";
import {StationPompageComponent} from "./ouvrage-add/Type/station-pompage/station-pompage.component";
import {BriseChargeComponent} from "./ouvrage-add/Type/brise-charge/brise-charge.component";
import {StationNonConvComponent} from "./ouvrage-add/Type/station-non-conv/station-non-conv.component";
import { BriseChargeStepperComponent } from './ouvrage-add/steppers/brise-charge-stepper/brise-charge-stepper.component';
import { ForageStepperComponent } from './ouvrage-add/steppers/forage-stepper/forage-stepper.component';
import { ReservoirStepperComponent } from './ouvrage-add/steppers/reservoir-stepper/reservoir-stepper.component';
import { StationNonConvStepperComponent } from './ouvrage-add/steppers/station-non-conv-stepper/station-non-conv-stepper.component';
import { StationTraitementConvStepperComponent } from './ouvrage-add/steppers/station-traitement-conv-stepper/station-traitement-conv-stepper.component';
import { StationPompageStepperComponent } from './ouvrage-add/steppers/station-pompage-stepper/station-pompage-stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import { SecurityComponent } from './composant/security/security.component';
import { PriseEauComponent } from './composant/station-traitement/prise-eau/prise-eau.component';
import { ReservoirEauBruteComponent } from './composant/station-traitement/reservoir-eau-brute/reservoir-eau-brute.component';
import { ComposantPretraitementComponent } from './composant/station-traitement/composant-pretraitement/composant-pretraitement.component';
import { ComposantAerationComponent } from './composant/station-traitement/composant-aeration/composant-aeration.component';
import { BassinMelangeComponent } from './composant/station-traitement/bassin-melange/bassin-melange.component';
import { DecanteurComponent } from './composant/station-traitement/decanteur/decanteur.component';
import { FiltreComponent } from './composant/station-traitement/filtre/filtre.component';
import { ReservoirEauTraiteComponent } from './composant/station-traitement/reservoir-eau-traite/reservoir-eau-traite.component';
import { KitMembraneComponent } from './composant/station-traitement/kit-membrane/kit-membrane.component';
import { StationPhpComponent } from './composant/station-traitement/station-php/station-php.component';
import { LocalStockageChimiqueComponent } from './composant/station-traitement/local-stockage-chimique/local-stockage-chimique.component';
import { PostPrepInjectionComponent } from './composant/station-traitement/post-prep-injection/post-prep-injection.component';
import { PostRecyclageBouesComponent } from './composant/station-traitement/post-recyclage-boues/post-recyclage-boues.component';
import { PostRecyclageEauLavavgeComponent } from './composant/station-traitement/post-recyclage-eau-lavavge/post-recyclage-eau-lavavge.component';
import { BatimentElectriqueComponent } from './composant/station-traitement/batiment-electrique/batiment-electrique.component';
import { GroupeElectrogeneComponent } from './composant/station-traitement/groupe-electrogene/groupe-electrogene.component';
import { PostTransElecComponent } from './composant/station-pompage-et-forage/post-trans-elec/post-trans-elec.component';
import { GroupeElecPompPompComponent } from './composant/station-pompage-et-forage/groupe-elec-pomp-pomp/groupe-elec-pomp-pomp.component';
import { GroupeElecPompMoteurComponent } from './composant/station-pompage-et-forage/groupe-elec-pomp-moteur/groupe-elec-pomp-moteur.component';
import { ArmoirElecCmdComponent } from './composant/station-pompage-et-forage/armoir-elec-cmd/armoir-elec-cmd.component';
import { AntiBelierComponent } from './composant/station-pompage-et-forage/anti-belier/anti-belier.component';
import { SoupageDechargeComponent } from './composant/station-pompage-et-forage/soupage-decharge/soupage-decharge.component';
import { VannePompageComponent } from './composant/station-pompage-et-forage/vanne-pompage/vanne-pompage.component';
import { ClapetAntiRetourComponent } from './composant/station-pompage-et-forage/clapet-anti-retour/clapet-anti-retour.component';
import { VenteuseComponent } from './composant/station-pompage-et-forage/venteuse/venteuse.component';
import { JointDemantageComponent } from './composant/station-pompage-et-forage/joint-demantage/joint-demantage.component';
import { CompteurComponent } from './composant/station-pompage-et-forage/compteur/compteur.component';
import { CollecteurAspirationComponent } from './composant/station-pompage-et-forage/collecteur-aspiration/collecteur-aspiration.component';
import { CollecteurReffoullementComponent } from './composant/station-pompage-et-forage/collecteur-reffoullement/collecteur-reffoullement.component';
import { VanneArriveeComponent } from './composant/reservoir/vanne-arrivee/vanne-arrivee.component';
import { VanneSortieComponent } from './composant/reservoir/vanne-sortie/vanne-sortie.component';
import { FlotteurComponent } from './composant/reservoir/flotteur/flotteur.component';
import { EchelleComponent } from './composant/reservoir/echelle/echelle.component';
import { ConduiteTropPleinComponent } from './composant/reservoir/conduite-trop-plein/conduite-trop-plein.component';
import { ConduiteVidangeComponent } from './composant/reservoir/conduite-vidange/conduite-vidange.component';
import { PosteChlorationComponent } from './composant/reservoir/poste-chloration/poste-chloration.component';
import { ColonnesMontantesComponent } from './composant/station-pompage-et-forage/colonnes-montantes/colonnes-montantes.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: 'add',
        component: OuvrageAddComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementConventionelle',
        component: StationTraitementConvComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Reservoir',
        component: ReservoirComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Forage',
        component: ForageComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationPompage',
        component: StationPompageComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/BriseCharge',
        component: BriseChargeComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementNonConventionelle',
        component: StationNonConvComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementConventionelle/composants',
        component: StationTraitementConvStepperComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Reservoir/composants',
        component: ReservoirStepperComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Forage/composants',
        component: ForageStepperComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationPompage/composants',
        component: StationPompageStepperComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/BriseCharge/composants',
        component: BriseChargeStepperComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementNonConventionelle/composants',
        component: StationNonConvStepperComponent,
        data: {action: 'add'}
    },
    {
        path: ':code/edit',
        component: OuvrageEditComponent,
        data: { action: 'edit' }
    },
    {
        path: ':code/show',
        component: OuvrageShowComponent
    },
    {
        path: 'list',
        component: OuvrageListComponent,
        resolve: { data: OuvrageListService }
    }
];

@NgModule({
    declarations: [OuvrageListComponent, OuvrageAddComponent, OuvrageEditComponent, OuvrageShowComponent, StationTraitementConvComponent, StationPompageComponent, ReservoirComponent, ForageComponent, BriseChargeComponent, StationNonConvComponent,  BriseChargeStepperComponent, ForageStepperComponent, ReservoirStepperComponent, StationNonConvStepperComponent, StationTraitementConvStepperComponent, StationPompageStepperComponent, SecurityComponent, PriseEauComponent, ReservoirEauBruteComponent, ComposantPretraitementComponent, ComposantAerationComponent, BassinMelangeComponent, DecanteurComponent, FiltreComponent, ReservoirEauTraiteComponent, KitMembraneComponent, StationPhpComponent, LocalStockageChimiqueComponent, PostPrepInjectionComponent, PostRecyclageBouesComponent, PostRecyclageEauLavavgeComponent, BatimentElectriqueComponent, GroupeElectrogeneComponent, PostTransElecComponent, GroupeElecPompPompComponent, GroupeElecPompMoteurComponent, ArmoirElecCmdComponent, AntiBelierComponent, SoupageDechargeComponent, VannePompageComponent, ClapetAntiRetourComponent, VenteuseComponent, JointDemantageComponent, CompteurComponent, CollecteurAspirationComponent, CollecteurReffoullementComponent, VanneArriveeComponent, VanneSortieComponent, FlotteurComponent, EchelleComponent, ConduiteTropPleinComponent, ConduiteVidangeComponent, PosteChlorationComponent, ColonnesMontantesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSortModule,
        MatTableModule,
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
