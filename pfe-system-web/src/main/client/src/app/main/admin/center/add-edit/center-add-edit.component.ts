import { Component, OnInit, OnDestroy } from '@angular/core';
import { Center, User } from '../../../model/admin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { CenterAddEditService } from './center-add-edit.service';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../../../node_modules/rxjs';
import { AyamsValidators } from '@ayams/validators';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { tileLayer, latLng, marker, icon, Map, map, Draggable, MarkerOptions, LeafletMouseEvent } from 'leaflet';

const REGX_CODE = "^[a-zA-Z0-9]{2}$";

@Component({
    selector: 'center-add-edit',
    templateUrl: './center-add-edit.component.html',
    styleUrls: ['./center-add-edit.component.scss'],
    animations: fuseAnimations
})

export class CenterAddEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    center: Center;
    pageType: string;
    centerForm: FormGroup;
    headOfTheStructures: User[];
    currentchef: any;
    options: any;
    theplace: any;
    lats: any;
    lngs: any;
    lati: number;
    long: number;
    unit:any;
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


    constructor(private centerAddEditService: CenterAddEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.center = new Center();
        this.fuseTranslationLoader.loadTranslations(french, arabic);

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
                this.headOfTheStructures = sortBy(response.data[1], ['lastname', 'firstname']);
                this.initForm(response.data[0], response.action);
                this.unit=response.data[2];
            },
            (error) => {
                console.log(error);
            }
        );
        if(this.pageType=="edit"){
        this.lati = this.center.latitude;
        this.long = this.center.longitude;
        }
        else{
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


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create center form
     *
     * @returns {FormGroup}
     */
    createCenterForm(): FormGroup {
        let obj = {
            id: [this.center.id],
            code: [this.center.code, Validators.pattern(REGX_CODE)],
            address: [this.center.address, Validators.required],
            designation: [this.center.designation, Validators.required],
            phone: [this.center.phone, AyamsValidators.phoneFormatValidator()],
            email: [this.center.email, Validators.email],
            latitude: [this.center.latitude, Validators.required],
            longitude: [this.center.longitude, Validators.required],

            fax                     : [this.center.fax                    , Validators.required],
            rib                     : [this.center.rib                    , Validators.required],
            rip                     : [this.center.rip                    , Validators.required],
            taxIdNumber             : [this.center.taxIdNumber            , Validators.required],
            thirdPartyCode          : [this.center.thirdPartyCode         , Validators.required],
            bankOfDomiciliation     : [this.center.bankOfDomiciliation    , Validators.required],
            businessRegisterNumber  : [this.center.businessRegisterNumber , Validators.required],
            taxIdentificationNumber : [this.center.taxIdentificationNumber, Validators.required],
        };

        if (this.pageType === "edit") {
            // obj['code'] = [this.center.code];
            obj['headOfTheStructure'] = [this.center.headOfTheStructure.id || this.center.headOfTheStructure, Validators.required];
        }
        return this.formBuilder.group(obj);

    }

    /**
     * Save center
     */
    onSave(): void {
        const center = this.centerForm.getRawValue();

        if (center.id && isEmpty(center.headOfTheStructure))
            center.headOfTheStructure = "";

        this.centerAddEditService.saveCenter(center)
            .then((centerShowDto: any) => {

                if (center.id) {
                    this.initForm(centerShowDto, "edit");
                    window.history.replaceState({}, '', `/admin/centers/${centerShowDto.id}/edit`);
                }
                else
                    this.initForm(false, "add");
            });
    }


    initForm(center, type) {


        this.center = type == "edit" ? new Center(center) : new Center();
        this.center.code = type == "edit" ? this.center.code.substring(2,4) : '';
        this.pageType = type;

        this.centerForm = this.createCenterForm();
        type == "edit" ? this.changeCurrentChef(this.centerForm.get('headOfTheStructure').value) : this.changeCurrentChef('');

    }

    changeCurrentChef(IdCurrentChef) {
        this.currentchef = find(this.headOfTheStructures, { 'id': IdCurrentChef })
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
            this.lati=coord.lat.toFixed(6);
            this.long=coord.lng.toFixed(6);
            this.theplace.setLatLng(coord);
        });
    }
    onCoordChange() {
        const coord = latLng(this.lati, this.long);
        this.theplace.setLatLng(coord);
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


}
