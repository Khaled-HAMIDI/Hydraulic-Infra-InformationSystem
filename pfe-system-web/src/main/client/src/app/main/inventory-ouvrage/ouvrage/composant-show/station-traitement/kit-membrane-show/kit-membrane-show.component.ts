import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {KitMembrane} from "../../../../../model/composant.model";

@Component({
  selector: 'app-kit-membrane-show',
  templateUrl: './kit-membrane-show.component.html',
  styleUrls: ['./kit-membrane-show.component.scss'],
    animations: fuseAnimations
})
export class KitMembraneShowComponent implements OnInit {

    kit: KitMembrane;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.kit=new KitMembrane();
    }

    ngOnInit(): void {
        this.composantShowService.loadKitMembrane(this.route.snapshot.params['code']).then(
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
        this.kit= new KitMembrane(composant);

    }

}
