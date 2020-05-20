import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AcademyCourseService, componentMapping } from './course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadComponenteDirective } from './load-component.directive';
import { DynamicComponent } from '../dynamic-component.component';

@Component({
    selector: 'academy-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcademyCourseComponent implements OnInit, OnDestroy {
    @ViewChild(LoadComponenteDirective, { static: true }) integrationHost: LoadComponenteDirective;

    animationDirection: 'left' | 'right' | 'none';
    courses: any[] = [];
    courseStepContent: any;
    currentStep: number;
    action = "add" // or add

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCourseService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _academyCourseService: AcademyCourseService,
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
                this.courses = response.data.courses;
                this.loadComponent(this.courses[0].ComponentName);
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
        if (this.action != "edit") return;
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep === this.courses.length - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;

        this.loadComponent(this.courses[this.currentStep].ComponentName);
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep === 0 || this.action != "edit") {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
        this.loadComponent(this.courses[this.currentStep].ComponentName);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


    loadComponent(componentName: string): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentMapping[componentName]);
        const viewContainerRef = this.integrationHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<DynamicComponent>componentRef.instance).data = {};
        if ((<DynamicComponent>componentRef.instance).validateEvent) {
            (<DynamicComponent>componentRef.instance).validateEvent.subscribe(($event) => {
                if (this.currentStep === this.courses.length - 1) {
                    this.router.navigate(['/patrimony/ouvrages/list']);
                }
                else {
                    this.gotoNextStep();
                }
            });
        }
    }

}
