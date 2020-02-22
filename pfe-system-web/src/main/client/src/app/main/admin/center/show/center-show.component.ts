import { Component, OnInit, OnDestroy } from '@angular/core';
import { Center } from '../../../model/admin.model';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { tileLayer, latLng, marker, icon} from 'leaflet';

@Component({
  selector: 'center-show',
  templateUrl: './center-show.component.html',
  styleUrls: ['./center-show.component.scss'],
  animations: fuseAnimations
})
export class CenterShowComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  center: Center;
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

  constructor(private route: ActivatedRoute, private fuseTranslationLoader: FuseTranslationLoaderService) {
    this._unsubscribeAll = new Subject();
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit() {

    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {

        this.center = response.data[0];
      },
      (error) => {
        console.log(error);
      }
    );
        this.lati=this.center.latitude;
        this.long=this.center.longitude;

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

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

}
