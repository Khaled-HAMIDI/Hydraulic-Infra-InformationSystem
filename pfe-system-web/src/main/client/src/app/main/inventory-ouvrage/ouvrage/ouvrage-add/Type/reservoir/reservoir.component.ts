import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ouvrage } from "../../../../../model/ouvrage.model";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ReservoirService } from "./reservoir.service";
import { Subject } from 'rxjs';
import { ToolsService } from '@ayams/services/tools.service';
import { tileLayer, latLng, marker, icon, Map, map, Draggable, MarkerOptions, LeafletMouseEvent } from 'leaflet';



/* A appliquer pour le code des ouvrages
const REGX_CODE = "^[a-zA-Z0-9]{2}$";*/

@Component({
    selector: 'app-reservoir',
    templateUrl: './reservoir.component.html',
    styleUrls: ['./reservoir.component.scss'],
    animations: fuseAnimations
})
export class ReservoirComponent implements OnInit, OnDestroy {

    ouvrage: Ouvrage;
    ouvrageAdd: Ouvrage;
    ouvrageForm: FormGroup;

    theplace: any;
    options: any;
    lati: number;
    long: number;

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

    filesToBeAttached: any[];
    isFilesValid: boolean;
    public onUploadEventSubject: Subject<void>;


    constructor(
        private toolsService: ToolsService,
        private router: Router,
        private reservoirService: ReservoirService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.ouvrage = new Ouvrage();
        this.ouvrage.enabled = true;
        this.ouvrage.specializedLine = true;
        this.ouvrage.abri = true;
        this.ouvrage.remoteManagement = true;
        this.ouvrage.waterTank = true;
        this.ouvrage.electricAlimentation = true;

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        //  File Init
        this.onUploadEventSubject = new Subject();
        this.isFilesValid = false;

        this.filesToBeAttached = [
            {
                name: 'PV de réception',
                title: 'PV de réception',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , if case update set id of entity 
                attachedDocumentType: 'PV_REC',
                required: true
            },
            {
                name: 'Documentation technique',
                title: 'Documentation technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'DOC_TECH'
            },
            {
                name: 'Plans de recollement',
                title: 'Plans de recollement',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'PLAN_RC'
            },
            {
                name: 'Fiche technique',
                title: 'Fiche technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'FICH_TECH'
            }
        ];
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.ouvrage.site = this.route.snapshot.paramMap.get('id');
        this.initFormReservoir();

        //Just for now
        this.lati = 36.697833;
        this.long = 3.178480;
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

    /*Forms types*/

    createReservoirForm(): FormGroup {
        let obj = {
            code: [this.ouvrage.code, Validators.required],
            name: [this.ouvrage.name, Validators.required],
            enabled: [this.ouvrage.enabled, Validators.required],
            form: [this.ouvrage.form, Validators.required],
            state: [this.ouvrage.state, Validators.required],
            nbCompartment: [this.ouvrage.nbCompartment, Validators.required],
            raftRating: [this.ouvrage.raftRating, Validators.required],
            coteTropFull: [this.ouvrage.coteTropFull, Validators.required],
            coordinateX: [this.ouvrage.coordinateX, Validators.required],
            coordinateZ: [this.ouvrage.coordinateZ],
            coordinateY: [this.ouvrage.coordinateY, Validators.required],
            area: [this.ouvrage.area, Validators.required],
            constructionType: [this.ouvrage.constructionType, Validators.required],
            commissioningDate: [this.ouvrage.commissioningDate, Validators.required],
            operatingDate: [this.ouvrage.operatingDate, Validators.required],
            maitreOuvrage: [this.ouvrage.maitreOuvrage, Validators.required],
            realizationCost: [this.ouvrage.realizationCost, Validators.required],
            remoteManagement: [this.ouvrage.remoteManagement, Validators.required],
            tankCapacity1: [this.ouvrage.tankCapacity1, Validators.required],
            specializedLine: [this.ouvrage.specializedLine, Validators.required],
            energyMonthlyBill: [this.ouvrage.energyMonthlyBill, Validators.required],
            totalWorkforce: [this.ouvrage.totalWorkforce, Validators.required],
            distribution: [this.ouvrage.distribution, Validators.required],
            electricAlimentation: [this.ouvrage.electricAlimentation, Validators.required],
            tankType: [this.ouvrage.tankType, Validators.required],
            tankRole: [this.ouvrage.tankRole, Validators.required],
            populationServed: [this.ouvrage.populationServed]
        };

        return this.formBuilder.group(obj);

    }

    initFormReservoir() {
        this.ouvrageForm = this.createReservoirForm();
    }

    /**
     * Save ouvrage
     */
    onSave(): void {
        const ouvrage = this.ouvrageForm.getRawValue();

        this.ouvrageAdd = new Ouvrage();

        this.ouvrageAdd.code = ouvrage.code;
        this.ouvrageAdd.name = ouvrage.name;
        this.ouvrageAdd.type = 'Reservoir';
        this.ouvrageAdd.enabled = ouvrage.enabled;
        this.ouvrageAdd.form = ouvrage.form;
        this.ouvrageAdd.state = ouvrage.state;
        this.ouvrageAdd.site = this.ouvrage.site;
        this.ouvrageAdd.nbCompartment = ouvrage.nbCompartment;
        this.ouvrageAdd.raftRating = ouvrage.raftRating;
        this.ouvrageAdd.coteTropFull = ouvrage.coteTropFull;
        this.ouvrageAdd.coordinateX = ouvrage.coordinateX;
        this.ouvrageAdd.coordinateY = ouvrage.coordinateY;
        this.ouvrageAdd.coordinateZ = ouvrage.coordinateZ;
        this.ouvrageAdd.area = ouvrage.area;
        this.ouvrageAdd.constructionType = ouvrage.constructionType;
        this.ouvrageAdd.commissioningDate = ouvrage.commissioningDate;
        this.ouvrageAdd.operatingDate = ouvrage.operatingDate;
        this.ouvrageAdd.maitreOuvrage = ouvrage.maitreOuvrage;
        this.ouvrageAdd.realizationCost = ouvrage.realizationCost;
        this.ouvrageAdd.remoteManagement = ouvrage.remoteManagement;
        this.ouvrageAdd.tankCapacity1 = ouvrage.tankCapacity1;
        this.ouvrageAdd.specializedLine = ouvrage.specializedLine;
        this.ouvrageAdd.energyMonthlyBill = ouvrage.energyMonthlyBill;
        this.ouvrageAdd.totalWorkforce = ouvrage.totalWorkforce;
        this.ouvrageAdd.distribution = ouvrage.distribution;
        this.ouvrageAdd.populationServed = ouvrage.populationServed;
        this.ouvrageAdd.electricAlimentation = ouvrage.electricAlimentation;
        this.ouvrageAdd.tankType = ouvrage.tankType;
        this.ouvrageAdd.tankRole = ouvrage.tankRole;

        if (this.ouvrageAdd.tankRole == '') this.ouvrageAdd.tankRole = 'none';
        if (this.ouvrageAdd.tankType == '') this.ouvrageAdd.tankType = 'none';
        if (this.ouvrageAdd.waterSource == '') this.ouvrageAdd.waterSource = 'none';
        if (this.ouvrageAdd.process == '') this.ouvrageAdd.process = 'none';
        if (this.ouvrageAdd.state == '') this.ouvrageAdd.state = 'none';
        if (this.ouvrageAdd.form == '') this.ouvrageAdd.form = 'none';
        if (this.ouvrageAdd.type == '') this.ouvrageAdd.type = 'none';
        if (this.ouvrageAdd.treatmentStationType == '') this.ouvrageAdd.treatmentStationType = 'none';
        this.reservoirService.saveOuvrage(this.ouvrageAdd)
            .then((response: any) => {
                this.onSubmitFiles(response.id)
            },
                (error) => {
                    console.log("No")
                });
    }



    ngOnDestroy(): void {

    }

    /**
     * To toggle the sliders
     */
    toggleEnabled(): void {
        this.ouvrage.enabled = !this.ouvrage.enabled;
    }

    toggleDistribution(): void {
        this.ouvrage.distribution = !this.ouvrage.distribution;
    }


    toggleSpecializedLine(): void {
        this.ouvrage.specializedLine = !this.ouvrage.specializedLine;
    }


    toggleRemoteManagement(): void {
        this.ouvrage.remoteManagement = !this.ouvrage.remoteManagement;
    }

    toggleElectricAlimentation(): void {
        this.ouvrage.electricAlimentation = !this.ouvrage.electricAlimentation;
    }

    // Map functions

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

    autoCoordinates(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition,this.showCoordinatesError);
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    showPosition(position): void {
        this.ouvrageForm.controls['coordinateX'].setValue(position.coords.latitude);
        this.lati = position.coords.latitude;
        console.log('this.lati');
        this.ouvrageForm.controls['coordinateY'].setValue(position.coords.longitude);
        this.long = position.coords.altitude;
        this.ouvrageForm.controls['coordinateZ'].setValue(position.coords.altitude);
    }

    showCoordinatesError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                console.log('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                console.log('An unknown error occurred.');
                break;
        }
    }

    // File Functions-------------------------------------------------------------------------
    onAllRequiredAttached(isFilesValid: boolean): void {
        this.isFilesValid = isFilesValid;
    }
    uploadFiles(entityId: number): void {

        this.filesToBeAttached.forEach(item => {
            item.attachmentEntityId = entityId.toString();
        });

        this.onUploadEventSubject.next();
    }
    errorUploadFiles(): void {
        this.toolsService.hideProgressBar();
        this.toolsService.showError("error Upload Files");
        this.router.navigate(['composants/' + this.ouvrageAdd.code], { relativeTo: this.route });
    }
    successUploadFiles(): void {
        this.toolsService.hideProgressBar();
        //this.toolsService.showSuccess("success Upload Files");
        this.router.navigate(['composants/' + this.ouvrageAdd.code], { relativeTo: this.route });
    }

    onSubmitFiles(id) {
        this.uploadFiles(id);
    }

}

