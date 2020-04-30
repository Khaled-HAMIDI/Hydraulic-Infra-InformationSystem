import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {SoupapeDecharge} from "../../../../../model/composant.model";

@Component({
  selector: 'app-soupape-decharge-show',
  templateUrl: './soupape-decharge-show.component.html',
  styleUrls: ['./soupape-decharge-show.component.scss'],
    animations: fuseAnimations
})
export class SoupapeDechargeShowComponent implements OnInit {

    soupape: SoupapeDecharge;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.soupape=new SoupapeDecharge();
    }

    ngOnInit(): void {
        this.composantShowService.loadSoupape(this.route.snapshot.params['code']).then(
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
        this.soupape= new SoupapeDecharge(composant);

    }

}
