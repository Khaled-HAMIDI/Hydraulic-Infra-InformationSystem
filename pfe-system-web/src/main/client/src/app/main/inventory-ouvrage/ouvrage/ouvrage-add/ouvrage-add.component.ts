import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Site } from './ouvrage-add.model';
import { OuvrageAddService } from './ouvrage-add.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import sortBy from 'lodash/sortBy';




@Component({
  selector: 'app-ouvrage-add',
  templateUrl: './ouvrage-add.component.html',
  styleUrls: ['./ouvrage-add.component.scss'],
    animations: fuseAnimations
})

export class OuvrageAddComponent implements OnInit,  OnDestroy{
    private _unsubscribeAll: Subject<any>;
    siteId : String
    site : Site
    sites : Site [];
    centers = [];
    ouvrage: Ouvrage;
    ouvrageForm: FormGroup;
    siteForm: FormGroup;
    autoCordinate :boolean;

    constructor(
        private  ouvrageAddService:OuvrageAddService,
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.ouvrage = new Ouvrage();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.autoCordinate=false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[2])
                this.centers  = response.data[1]
                this.sites = sortBy(response.data[0], ['name']);
                this.initForm();
            },
            (error) => {
                console.log(error);
            }
        );

    }


    createOuvrageForm(): FormGroup {
        let obj = {
            type: [this.ouvrage.type,Validators.required],
            site:[this.ouvrage.site,Validators.required],
            center:[this.ouvrage.center,Validators.required]
        };

        return this.formBuilder.group(obj);

    }

    createSiteForm():FormGroup {
        let obj = {
            site:[this.site.name,Validators.required]
        };
        return this.formBuilder.group(obj);
    }

    initForm(){
        this.site = new Site();
        this.ouvrage = new Ouvrage();
        this.ouvrage.enabled = true;
        this.ouvrage.specializedLine = true;
        this.ouvrage.abri = true;
        this.ouvrage.remoteManagement = true;
        this.ouvrage.waterTank = true;
        this.ouvrage.electricAlimentation = true;
        this.ouvrageForm = this.createOuvrageForm();
        this.siteForm = this.createSiteForm();
    }


    onSelect(): void {
        this.siteId = this.ouvrageForm.get('site').value;
        const centerCode = this.ouvrageForm.get('center').value;
        this.router.navigate([this.ouvrageForm.get('type').value +'/'+ this.siteId + '/'+centerCode],{relativeTo:this.route});
    }
    onSelectSite(): void {
        const site = this.siteForm.getRawValue();
        let siteAdd :Site = new Site;
        siteAdd.name = site.site;
        this.ouvrageAddService.saveSiteOuv(siteAdd)
        .then((response:Site)=> {
            this.siteForm.setValue({['site']:''});
            this.siteId = response.id;
            this.sites.push(response);
            this.sites = sortBy(this.sites, ['name']);
        })
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}




