import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {EquipementHydroMeca, PostChimique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-collecteur-aspiration-show',
  templateUrl: './collecteur-aspiration-show.component.html',
  styleUrls: ['./collecteur-aspiration-show.component.scss'],
    animations: fuseAnimations
})
export class CollecteurAspirationShowComponent implements OnInit {

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
            if (composants[i].equipementType =='CollecteurAspiration') return composants[i];
        }
        return null;
    }

}
