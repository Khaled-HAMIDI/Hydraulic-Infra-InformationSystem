import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {EquipementStationTraitement, PostChimique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-reservoir-eau-brute-show',
  templateUrl: './reservoir-eau-brute-show.component.html',
  styleUrls: ['./reservoir-eau-brute-show.component.scss'],
    animations: fuseAnimations
})
export class ReservoirEauBruteShowComponent implements OnInit {

    equipement: EquipementStationTraitement;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.equipement=new EquipementStationTraitement();
    }

    ngOnInit(): void {
        this.composantShowService.loadEquipementStationTraitement(this.route.snapshot.params['code']).then(
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
        this.equipement= new EquipementStationTraitement(composant);
    }

    typeEquipement(composants):EquipementStationTraitement{
        for (var i in composants){
            if (composants[i].typeEquipement =='ReservoirEauBrute') return composants[i];
        }
        return null;
    }

}
