import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {GroupeElectroMoteur} from "../../../../../model/composant.model";

@Component({
  selector: 'app-groupe-elec-pomp-moteur-show',
  templateUrl: './groupe-elec-pomp-moteur-show.component.html',
  styleUrls: ['./groupe-elec-pomp-moteur-show.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompMoteurShowComponent implements OnInit {

    groupe: GroupeElectroMoteur;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.groupe=new GroupeElectroMoteur();
    }

    ngOnInit(): void {
        this.composantShowService.loadMoteur(this.route.snapshot.params['code']).then(
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
        this.groupe= new GroupeElectroMoteur(composant);

    }

}
