import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {EquipementHydroMeca, PostChimique} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-echelle-show',
  templateUrl: './echelle-show.component.html',
  styleUrls: ['./echelle-show.component.scss'],
    animations: fuseAnimations
})
export class EchelleShowComponent implements OnInit {

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
            if (composants[i].equipementType =='Echellle') return composants[i];
        }
        return null;
    }

}
