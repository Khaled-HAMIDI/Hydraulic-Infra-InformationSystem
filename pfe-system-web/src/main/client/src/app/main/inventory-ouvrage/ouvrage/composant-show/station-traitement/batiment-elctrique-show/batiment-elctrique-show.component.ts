import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {BatimentElectrique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-batiment-elctrique-show',
  templateUrl: './batiment-elctrique-show.component.html',
  styleUrls: ['./batiment-elctrique-show.component.scss'],
    animations: fuseAnimations
})
export class BatimentElctriqueShowComponent implements OnInit {

    batiment: BatimentElectrique;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.batiment=new BatimentElectrique();
    }

    ngOnInit(): void {
        this.composantShowService.loadBatimentElectrique(this.route.snapshot.params['code']).then(
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
        this.batiment= new BatimentElectrique(composant);
    }

}
