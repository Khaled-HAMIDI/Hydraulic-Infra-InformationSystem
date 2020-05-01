import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {AntiBelier} from "../../../../../model/composant.model";

@Component({
  selector: 'app-anti-bilier-show',
  templateUrl: './anti-bilier-show.component.html',
  styleUrls: ['./anti-bilier-show.component.scss'],
    animations: fuseAnimations
})
export class AntiBilierShowComponent implements OnInit {

    antiBelier: AntiBelier;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.antiBelier=new AntiBelier();
    }

    ngOnInit(): void {
        this.composantShowService.loadAntiBelier(this.route.snapshot.params['code']).then(
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
        this.antiBelier= new AntiBelier(composant);

    }

}
