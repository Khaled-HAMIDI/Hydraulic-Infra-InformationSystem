import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unit, User } from '../../../model/admin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { UnitShowEditService } from './unit-show-edit.service';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { Subject } from '../../../../../../node_modules/rxjs';
import { AyamsValidators } from '@ayams/validators';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { tileLayer, latLng, marker, icon, Map, map, Draggable,MarkerOptions, LeafletMouseEvent } from 'leaflet';


@Component({
    selector: 'unit-show-edit',
    templateUrl: './unit-show-edit.component.html',
    styleUrls: ['./unit-show-edit.component.scss'],
    animations: fuseAnimations
})

export class UnitShowEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    unit: Unit;
    unitForm: FormGroup;
    headOfTheStructures: User[];
    currentchef: any;
    btnEdit: boolean = true;
    options:any;
    theplace:any;
    lats:any;
    lngs:any;
    lati:number;
    long:number;
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

    constructor(private unitShowEditService: UnitShowEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this._unsubscribeAll = new Subject();
        this.unit = new Unit();
        this.fuseTranslationLoader.loadTranslations(french, arabic);

    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.headOfTheStructures = sortBy(response.data[0][1], ['lastname', 'firstname']);
                this.initForm(response.data[0][0]);
            },
            (error) => {
                console.log(error);
            }
        );
        this.lati=this.unit.latitude;
        this.long=this.unit.longitude;

        this.options = {
           
            layers: [ this.streetMaps, this.theplace = marker([ this.lati,this.long ], {
                icon: icon({
                  iconSize: [ 25, 41 ],
                  iconAnchor: [ 13, 41 ],
                  iconUrl: 'leaflet/marker-icon.png',
                  shadowUrl: 'leaflet/marker-shadow.png'
                }),draggable:true
              })],
            zoom: 14,
            center: latLng(this.lati, this.long)
          };

    }

    /**
     * Create unit form
     *
     * @returns {FormGroup}
     */
    createUnitForm(): FormGroup {
        let obj = {
            id: [this.unit.id],
            code: [this.unit.id],
            address: [this.unit.address, Validators.required],
            designation: [this.unit.designation, Validators.required],
            phone: [this.unit.phone, AyamsValidators.phoneFormatValidator()],
            email: [this.unit.email, Validators.email],
            latitude: [this.unit.latitude, Validators.required],
            longitude: [this.unit.longitude, Validators.required],
            headOfTheStructure: [this.unit.headOfTheStructure.id || this.unit.headOfTheStructure, AyamsValidators.requiredAndNotEmptyObjectValidator()],

            fax                     : [this.unit.fax                    , Validators.required],
            rib                     : [this.unit.rib                    , Validators.required],
            rip                     : [this.unit.rip                    , Validators.required],
            taxIdNumber             : [this.unit.taxIdNumber            , Validators.required],
            thirdPartyCode          : [this.unit.thirdPartyCode         , Validators.required],
            bankOfDomiciliation     : [this.unit.bankOfDomiciliation    , Validators.required],
            businessRegisterNumber  : [this.unit.businessRegisterNumber , Validators.required],
            taxIdentificationNumber : [this.unit.taxIdentificationNumber, Validators.required],
        };
        return this.formBuilder.group(obj);
    }

    /**
     * Save unit
     */
    onSave(): void {
        const unit = this.unitForm.getRawValue();

        if (isEmpty(unit.headOfTheStructure))
            unit.headOfTheStructure = "";

        this.unitShowEditService.saveUnit(unit)
            .then(() => {
                this.initForm(unit);
            });
    }


    initForm(unit) {

        this.unit = new Unit(unit);

        this.unitForm = this.createUnitForm();
        this.changeCurrentChef(this.unitForm.get('headOfTheStructure').value);
        this.disableForm();
    }

    changeCurrentChef(IdCurrentChef) {
        this.currentchef = find(this.headOfTheStructures, { 'id': IdCurrentChef })
    }

    onMapReady(map: Map) {
        map.on('click',  <LeafletMouseEvent>($event)=> {
             const coord = $event.latlng;
                this.lati=coord.lat.toFixed(6);
                this.long=coord.lng.toFixed(6);
                this.theplace.setLatLng(coord);
              });

              this.theplace.on('dragend', <DragEndEvent>($event) => {
                const coord = $event.latlng;
                this.lati=coord.lat.toFixed(6);
                this.long=coord.lng.toFixed(6);
                this.theplace.setLatLng(coord);
            });
          }

     onCoordChange(){
            const coord = latLng(this.lati,this.long);
            this.theplace.setLatLng(coord);
     }

    

    disableForm() {
        this.unitForm.disable();
        this.btnEdit = true;
    }

    enableForm() {
        this.unitForm.enable();
        this.btnEdit = false;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
