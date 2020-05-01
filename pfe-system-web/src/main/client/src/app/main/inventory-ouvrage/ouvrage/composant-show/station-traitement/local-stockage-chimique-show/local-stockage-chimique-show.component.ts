import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {LocalStockage} from "../../../../../model/composant.model";

@Component({
  selector: 'app-local-stockage-chimique-show',
  templateUrl: './local-stockage-chimique-show.component.html',
  styleUrls: ['./local-stockage-chimique-show.component.scss'],
    animations: fuseAnimations
})
export class LocalStockageChimiqueShowComponent implements OnInit {

    local: LocalStockage;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.local=new LocalStockage();
    }

    ngOnInit(): void {
        this.composantShowService.loadLocalStockageChimique(this.route.snapshot.params['code']).then(
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
        this.local= new LocalStockage(composant);

    }

}
