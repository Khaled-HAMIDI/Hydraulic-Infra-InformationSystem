import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {GroupeElectroMoteur, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-elec-pomp-moteur-show',
  templateUrl: './groupe-elec-pomp-moteur-show.component.html',
  styleUrls: ['./groupe-elec-pomp-moteur-show.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompMoteurShowComponent implements OnInit {

    groupe: GroupeElectroMoteur;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.groupe=new GroupeElectroMoteur();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[11]) this.groupe = new GroupeElectroMoteur(response.data[11]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
