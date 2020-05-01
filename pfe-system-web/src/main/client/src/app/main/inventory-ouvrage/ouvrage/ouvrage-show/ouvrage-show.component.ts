import { Component, OnInit } from '@angular/core';
import {Ouvrage} from '../../../model/ouvrage.model';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {OuvrageShowService} from "./ouvrage-show.service";



@Component({
  selector: 'app-ouvrage-show',
  templateUrl: './ouvrage-show.component.html',
  styleUrls: ['./ouvrage-show.component.scss'],
    animations: fuseAnimations
})
export class OuvrageShowComponent implements OnInit {

    ouvrage: Ouvrage;

    constructor(
        private ouvrageShowService: OuvrageShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit(): void {
        this.ouvrageShowService.get(this.route.snapshot.params['code']).then(
            (ouvrage) => {
                this.initOuvrage(ouvrage);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initOuvrage(ouvrage) {
        this.ouvrage= new Ouvrage(ouvrage);

    }

}
