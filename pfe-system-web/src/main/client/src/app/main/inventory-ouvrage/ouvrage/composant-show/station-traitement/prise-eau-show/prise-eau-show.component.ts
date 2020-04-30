import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {PriseEau} from "../../../../../model/composant.model";

@Component({
  selector: 'app-prise-eau-show',
  templateUrl: './prise-eau-show.component.html',
  styleUrls: ['./prise-eau-show.component.scss'],
    animations: fuseAnimations
})
export class PriseEauShowComponent implements OnInit {

    priseEau: PriseEau;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.priseEau=new PriseEau();
    }

    ngOnInit(): void {
        this.composantShowService.loadPriseEau(this.route.snapshot.params['code']).then(
            (composant) => {
                if (composant) this.initComposant(composant);
                else this.exist =false ;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initComposant(composant) {
        this.priseEau= new PriseEau(composant);

    }

}
