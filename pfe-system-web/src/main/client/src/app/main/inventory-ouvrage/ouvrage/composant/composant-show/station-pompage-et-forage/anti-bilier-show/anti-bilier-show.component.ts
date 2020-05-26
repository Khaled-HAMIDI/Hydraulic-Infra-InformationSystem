import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {AntiBelier, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-anti-bilier-show',
  templateUrl: './anti-bilier-show.component.html',
  styleUrls: ['./anti-bilier-show.component.scss'],
    animations: fuseAnimations
})
export class AntiBilierShowComponent implements OnInit {

    antiBelier: AntiBelier;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.antiBelier=new AntiBelier();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data.antiBelierData) this.antiBelier = new AntiBelier(response.data.antiBelierData);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
