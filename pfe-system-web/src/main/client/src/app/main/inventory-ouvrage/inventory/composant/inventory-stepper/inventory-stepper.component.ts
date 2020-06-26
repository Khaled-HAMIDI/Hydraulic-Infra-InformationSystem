import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadComponenteDirective } from '../../load-component.directive';
import { DynamicComponent } from '../../dynamic-component.component';
import {StepperAddEditService, componentMapping} from "./stepper-add-edit.service";
import {InventoryStepperService} from "./inventory-stepper.service";
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {ToolsService} from "../../../../../../@ayams/services/tools.service";

@Component({
  selector: 'app-inventory-stepper',
  templateUrl: './inventory-stepper.component.html',
  styleUrls: ['./inventory-stepper.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InventoryStepperComponent implements OnInit, OnDestroy {

    @ViewChild(LoadComponenteDirective, { static: true }) integrationHost: LoadComponenteDirective;

    animationDirection: 'left' | 'right' | 'none';
    composants: any[] = [];
    currentStep: number;
    code : string;
    completed : boolean;


    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    private _unsubscribeAll: Subject<any>;


    constructor(
        private steppersService: StepperAddEditService,
        private _changeDetectorRef: ChangeDetectorRef,
        private toolsService: ToolsService,
        private _fuseSidebarService: FuseSidebarService,
        private route: ActivatedRoute,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private inventoryStepperService :InventoryStepperService
    ) {
        // Set the defaults
        this.toolsService.loadTranslations(french, arabic);
        this.animationDirection = 'none';
        this.currentStep = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.code = this.inventoryStepperService.code;
        this.completed = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[0])
                //Vérfier si l'ouvrage est déja validé
                if (response.data[1]){
                    if (response.data[0][0].inventoryCode == response.data[1].code) this.completed =false;
                }
                switch (this.route.snapshot.params['type']) {

                    case "StationTraitementConventionelle" :
                        this.composants = this.steppersService.stationTraitementConventionelleComposants;
                        break;
                    case "StationTraitementNonConventionelle":
                        this.composants = this.steppersService.stationTraitementNonConventionelleComposants;
                        break;
                    case "Reservoir":
                        this.composants = this.steppersService.reservoirComposants;
                        break;
                    case "Forage":
                        this.composants = this.steppersService.forageComposants;
                        break;
                    case "StationPompage":
                        this.composants = this.steppersService.stationPompageComposants;
                        break;
                    case "BriseCharge":
                        this.composants = this.steppersService.briseChargeComposants;
                        break;
                }
                if (!this.completed) this.loadComponent(this.composants[0].ComponentName);

            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step): void {

        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;

        this.loadComponent(this.composants[this.currentStep].ComponentName);
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep === this.composants.length - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;

        this.loadComponent(this.composants[this.currentStep].ComponentName);
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
        this.loadComponent(this.composants[this.currentStep].ComponentName);
    }


    loadComponent(componentName: string): void {

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentMapping['InventoryComposantComponent']);
        const viewContainerRef = this.integrationHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.typeComponent = componentName;
        if ((<DynamicComponent>componentRef.instance).validateEvent) {
            (<DynamicComponent>componentRef.instance).validateEvent.subscribe(($event) => {
                if (this.currentStep === this.composants.length - 1) {
                    this.router.navigate(['/patrimony/inventory/current']);
                }
                else {
                    this.gotoNextStep();
                }
            });
        }
    }

    inventoryOuvrageValidate(){
        this.inventoryStepperService.inventoryOuvrageValidate(this.route.snapshot.params['codeInventory'],this.route.snapshot.params['codeOuvrage'])
            .then((response:any) => {
                    console.log(response);
                    this.router.navigate(['/patrimony/inventory/current']);
                },
                (error) => {
                    console.log(error)
                });
    }

}
