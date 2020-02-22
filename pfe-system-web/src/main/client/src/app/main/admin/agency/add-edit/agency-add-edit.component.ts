import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agency, Center, User } from '../../../model/admin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgencyAddEditService } from './agency-add-edit.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AyamsValidators } from '@ayams/validators';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { tileLayer, latLng, marker, icon, Map, LeafletMouseEvent } from 'leaflet';

const REGX_CODE = "^[a-zA-Z0-9]{2}$";

@Component({
    selector: 'agency-add-edit',
    templateUrl: './agency-add-edit.component.html',
    styleUrls: ['./agency-add-edit.component.scss'],
    animations: fuseAnimations
})

export class AgencyAddEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    agency: Agency;
    pageType: string;
    agencyForm: FormGroup;
    centers: Center[];
    centerCode: string;
    headOfTheStructures: User[];
    currentchef: any;
    options: any;
    theplace: any;
    lats: any;
    lngs: any;
    lati: number;
    long: number;
    unit: any;
    //from assemetrik
    // Define our base layers so we can reference them multiple times
    streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Layers control object with our two base layers and the three overlay layers
    layersControl = {
        baseLayers: {
            'Street Maps': this.streetMaps,
            'Wikimedia Maps': this.wMaps
        }

    };

    constructor(
        private agencyAddEditService: AgencyAddEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.agency = new Agency();
        this.fuseTranslationLoader.loadTranslations(french, arabic);

    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.centers = response.data[1];
                this.headOfTheStructures = sortBy(response.data[2], ['lastname', 'firstname']);
                this.initForm(response.data[0], response.action);
                this.unit = response.data[3];
            },
            (error) => {
                console.log(error);
            }
        );
        if (this.pageType == "edit") {
            this.lati = this.agency.latitude;
            this.long = this.agency.longitude;
        }
        else {
            this.lati = this.unit.latitude;
            this.long = this.unit.longitude;
        }
        this.options = {

            layers: [this.streetMaps, this.theplace = marker([this.lati, this.long], {
                icon: icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'leaflet/marker-icon.png',
                    shadowUrl: 'leaflet/marker-shadow.png'
                }), draggable: true
            })],
            zoom: 14,
            center: latLng(this.lati, this.long)
        };

    }

    /**
     * Create agency form
     *
     * @returns {FormGroup}
     */
    createAgencyForm(): FormGroup {
        let obj = {
            id: [this.agency.id],
            centerCode: [{ value: this.agency.center.id, disabled: true }],
            code: [this.agency.code, Validators.pattern(REGX_CODE)],
            center: [this.agency.center.id || this.agency.center, AyamsValidators.requiredAndNotEmptyObjectValidator()],
            agencyType: [this.agency.agencyType.id || this.agency.agencyType, AyamsValidators.requiredAndNotEmptyObjectValidator()],
            address: [this.agency.address, Validators.required],
            designation: [this.agency.designation, Validators.required],
            phone: [this.agency.phone, AyamsValidators.phoneFormatValidator()],
            email: [this.agency.email, Validators.email],
            latitude: [this.agency.latitude, Validators.required],
            longitude: [this.agency.longitude, Validators.required],

            fax: [this.agency.fax, Validators.required],
            rib: [this.agency.rib, Validators.required],
            rip: [this.agency.rip, Validators.required],
            agency: [this.agency.agency, Validators.required],
            taxIdNumber: [this.agency.taxIdNumber, Validators.required],
            thirdPartyCode: [this.agency.thirdPartyCode, Validators.required],
            bankOfDomiciliation: [this.agency.bankOfDomiciliation, Validators.required],
            businessRegisterNumber: [this.agency.businessRegisterNumber, Validators.required],
            taxIdentificationNumber: [this.agency.taxIdentificationNumber, Validators.required],
        };

        if (this.pageType === "edit") {
            // obj['code'] = [this.agency.code];
            obj['headOfTheStructure'] = [this.agency.headOfTheStructure.id || this.agency.headOfTheStructure, Validators.required];
        }

        return this.formBuilder.group(obj);

    }

    /**
     * Save agency
     */
    onSave(): void {
        const agency = this.agencyForm.getRawValue();

        if (agency.id && isEmpty(agency.headOfTheStructure)) {
            agency.headOfTheStructure = "";
        }        

        this.agencyAddEditService.saveAgency(agency)
            .then((agencyShowDto: any) => {

                if (agency.id) {
                    this.initForm(agencyShowDto, "edit");
                    window.history.replaceState({}, '', `/admin/agencies/${agencyShowDto.id}/edit`);
                }
                else
                    this.initForm(false, "add");
            });
    }


    initForm(agency, type) {

        this.agency = type == "edit" ? new Agency(agency) : new Agency();
        this.agency.code = type == "edit" ? this.agency.code.substring(4,6) : '';
        this.pageType = type;
        this.agencyForm = this.createAgencyForm();

        type == "edit" ? this.changeCurrentChef(this.agencyForm.get('headOfTheStructure').value) : this.changeCurrentChef('');
    }

    changeCurrentChef(IdCurrentChef) {
        this.currentchef = find(this.headOfTheStructures, { 'username': IdCurrentChef });
    }

    onMapReady(map: Map) {
        map.on('click', <LeafletMouseEvent>($event) => {
            const coord = $event.latlng;
            this.lati = coord.lat.toFixed(6);
            this.long = coord.lng.toFixed(6);
            this.theplace.setLatLng(coord);
        });

        this.theplace.on('dragend', <DragEndEvent>($event) => {
            const coord = $event.latlng;
            this.lati = coord.lat.toFixed(6);
            this.long = coord.lng.toFixed(6);
            this.theplace.setLatLng(coord);
        });
    }
    onCoordChange() {
        const coord = latLng(this.lati, this.long);
        this.theplace.setLatLng(coord);
    }

    onSelectChange(centerId) {
        this.agencyForm.get('centerCode').setValue(centerId);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
