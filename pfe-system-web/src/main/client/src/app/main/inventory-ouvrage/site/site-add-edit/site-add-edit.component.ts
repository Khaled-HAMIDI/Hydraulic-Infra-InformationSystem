import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Site } from './model/site.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SiteAddEditService } from './site-add-edit.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { pullAllWith, sortBy } from 'lodash-es';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '@ayams/components/date-format/format-datepicker';
import { isEqual } from 'date-fns';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Authority } from 'app/main/model/admin.model';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatTreeNestedDataSource } from '@angular/material';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
const COLUMN_NAMES: string[] = [
    'type',
    'ouvrage',
];


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
    public customPatterns = { 'A': { pattern: new RegExp('@"^-?[0-9][0-9,\.]+$"') } };
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


    createSiteForm(type): FormGroup {
        let obj;
        obj = {
            id: [this.site.id],
            name: [this.site.name, Validators.required],
            space: [this.site.space, [Validators.min(0),Validators.pattern(REGX_CODE)]],
        };
        return this.formBuilder.group(obj);
    }


    onSave(): void {
        const site = this.siteForm.getRawValue();
        site.start = moment(site.start).format('YYYY-MM-DD')
        site.stop = moment(site.stop).format('YYYY-MM-DD')
        this.siteAddEditService.saveSite(site)
            .then(() => {
                    this.router.navigate(['/patrimony/sites']);
            });
    }


    initForm(site, type) {
        if (type == 'edit') {
            this.site = new Site(site);
            console.log(this.site);
        } else {
            this.site = new Site();
        }
        this.pageType = type;
        this.siteForm = this.createSiteForm(type);
    }


    // Chips
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredPermissions: Observable<Authority[]>;


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}




