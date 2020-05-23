import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadComponenteDirective } from '../../../load-component.directive';
import { DynamicComponent } from '../../../dynamic-component.component';
import {StepperShowServie, componentMapping} from "../stepper-show.servie";
import {SteppersAddEditService} from "../../../ouvrage-add/steppers/steppers-add-edit.service";

@Component({
  selector: 'app-reservoir-show-stepper',
  templateUrl: './reservoir-show-stepper.component.html',
  styleUrls: ['./reservoir-show-stepper.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReservoirShowStepperComponent implements OnInit, OnDestroy {
    @ViewChild(LoadComponenteDirective, { static: true }) integrationHost: LoadComponenteDirective;

    animationDirection: 'left' | 'right' | 'none';
    composants: any[] = [];
    currentStep: number;

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    private _unsubscribeAll: Subject<any>;


    constructor(
        private steppersService: StepperShowServie,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private route: ActivatedRoute,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to courses
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.composants = this.steppersService.reservoirComposants;
                this.loadComponent(this.composants[0].ComponentName);
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
        if (this.currentStep === 0 ) {
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentMapping[componentName]);
        const viewContainerRef = this.integrationHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<DynamicComponent>componentRef.instance).data = {};
        if ((<DynamicComponent>componentRef.instance).validateEvent) {
            (<DynamicComponent>componentRef.instance).validateEvent.subscribe(($event) => {
                if (this.currentStep === this.composants.length - 1) {
                    this.router.navigate(['/patrimony/ouvrages/list']);
                }
                else {
                    this.gotoNextStep();
                }
            });
        }
    }

}
