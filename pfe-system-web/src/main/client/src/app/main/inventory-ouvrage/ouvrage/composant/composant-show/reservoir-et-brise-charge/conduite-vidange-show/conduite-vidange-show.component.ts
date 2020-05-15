import { Component, OnInit } from '@angular/core';
import {EquipementHydroMeca} from "../../../../../../model/composant.model";
import {ComposantGetService} from "../../../composant-get.service";
import {ActivatedRoute} from "@angular/router";
import {FuseTranslationLoaderService} from "../../../../../../../../@fuse/services/translation-loader.service";
import {locale as french} from "../../station-pompage-et-forage/i18n/fr";
import {locale as arabic} from "../../station-pompage-et-forage/i18n/ar";
import {fuseAnimations} from "../../../../../../../../@fuse/animations";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-conduite-vidange-show',
  templateUrl: './conduite-vidange-show.component.html',
  styleUrls: ['./conduite-vidange-show.component.scss'],
    animations: fuseAnimations
})
export class ConduiteVidangeShowComponent implements OnInit {

    equipement: EquipementHydroMeca;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.equipement=new EquipementHydroMeca();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (this.typeEquipement(response.data[15])) this.equipement = new EquipementHydroMeca(this.typeEquipement(response.data[15]));
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

    typeEquipement(composants):EquipementHydroMeca{
        for (var i in composants){
            if (composants[i].equipementType =='ConduiteVidange') return composants[i];
        }
        return null;
    }

}
