import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {GroupeElectrogene} from "../../../../../model/composant.model";

@Component({
  selector: 'app-groupe-electrogene-show',
  templateUrl: './groupe-electrogene-show.component.html',
  styleUrls: ['./groupe-electrogene-show.component.scss'],
    animations: fuseAnimations
})
export class GroupeElectrogeneShowComponent implements OnInit {

    groupe: GroupeElectrogene;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.groupe=new GroupeElectrogene();
    }

    ngOnInit(): void {
        this.composantShowService.loadGroupeElectrogene(this.route.snapshot.params['code']).then(
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
        this.groupe= new GroupeElectrogene(composant);

    }

}
