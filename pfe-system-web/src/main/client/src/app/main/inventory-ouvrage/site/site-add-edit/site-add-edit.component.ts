import { Component, OnInit, OnDestroy } from '@angular/core';
import { Site } from './model/site.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteAddEditService } from './site-add-edit.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '@ayams/components/date-format/format-datepicker';


const REGX_CODE = "^-?[0-9][0-9,\.]+$";

@Component({
    selector: 'app-site-add-edit',
    templateUrl: './site-add-edit.component.html',
    styleUrls: ['./site-add-edit.component.scss'],
    animations: fuseAnimations,
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})

export class SiteAddEditComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    siteForm;
    pageType;
    name;
    type;
    site: Site;

    constructor(
        private siteAddEditService: SiteAddEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.site = new Site();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.name = response.data[0].name
                this.initForm(response.data[0], response.action);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    createSiteForm(): FormGroup { 
        return this.formBuilder.group({
            id: [this.site.id],
            name: [this.site.name, Validators.required],
            //space: [this.site.space, [Validators.min(0),Validators.pattern(REGX_CODE)]],
        });
    }

    onSave(): void {
        const site = this.siteForm.getRawValue();
        this.siteAddEditService.saveSite(site)
            .then(() => {
                    this.router.navigate(['/patrimony/sites']);
            });
    }

    initForm(site, type) {
        if (type == 'edit') {
            this.site = new Site(site);
        } else {
            this.site = new Site();
        }
        this.pageType = type;
        this.siteForm = this.createSiteForm();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
