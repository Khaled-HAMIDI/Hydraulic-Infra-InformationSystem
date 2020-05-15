import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {Security, SoupapeDecharge} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-soupape-decharge-show',
  templateUrl: './soupape-decharge-show.component.html',
  styleUrls: ['./soupape-decharge-show.component.scss'],
    animations: fuseAnimations
})
export class SoupapeDechargeShowComponent implements OnInit {

    soupape: SoupapeDecharge;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.soupape=new SoupapeDecharge();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[14]) this.soupape = new SoupapeDecharge(response.data[14]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
