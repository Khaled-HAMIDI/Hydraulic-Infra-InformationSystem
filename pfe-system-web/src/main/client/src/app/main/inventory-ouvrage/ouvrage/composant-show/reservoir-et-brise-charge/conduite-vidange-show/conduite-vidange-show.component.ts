import { Component, OnInit } from '@angular/core';
import {EquipementHydroMeca} from "../../../../../model/composant.model";
import {ComposantShowService} from "../../composant-show.service";
import {ActivatedRoute} from "@angular/router";
import {FuseTranslationLoaderService} from "../../../../../../../@fuse/services/translation-loader.service";
import {locale as french} from "../../station-pompage-et-forage/i18n/fr";
import {locale as arabic} from "../../station-pompage-et-forage/i18n/ar";
import {fuseAnimations} from "../../../../../../../@fuse/animations";

@Component({
  selector: 'app-conduite-vidange-show',
  templateUrl: './conduite-vidange-show.component.html',
  styleUrls: ['./conduite-vidange-show.component.scss'],
    animations: fuseAnimations
})
export class ConduiteVidangeShowComponent implements OnInit {

    equipement: EquipementHydroMeca;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.equipement=new EquipementHydroMeca();
    }

    ngOnInit(): void {
        this.composantShowService.loadHydroMeca(this.route.snapshot.params['code']).then(
            (composants) => {
                if (this.typeEquipement(composants)) {
                    this.initComposant(this.typeEquipement(composants));
                }
                else this.exist =false ;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initComposant(composant) {
        this.equipement= new EquipementHydroMeca(composant);
    }

    typeEquipement(composants):EquipementHydroMeca{
        for (var i in composants){
            if (composants[i].equipementType =='ConduiteVidange') return composants[i];
        }
        return null;
    }

}
