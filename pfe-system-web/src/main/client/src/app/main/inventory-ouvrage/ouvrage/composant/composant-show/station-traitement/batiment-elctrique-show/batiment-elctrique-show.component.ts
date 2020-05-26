import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {BatimentElectrique, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-batiment-elctrique-show',
  templateUrl: './batiment-elctrique-show.component.html',
  styleUrls: ['./batiment-elctrique-show.component.scss'],
    animations: fuseAnimations
})
export class BatimentElctriqueShowComponent implements OnInit {

    batiment: BatimentElectrique;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.batiment=new BatimentElectrique();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data.batimentElectriqueData) this.batiment = new BatimentElectrique(response.data.batimentElectriqueData);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
