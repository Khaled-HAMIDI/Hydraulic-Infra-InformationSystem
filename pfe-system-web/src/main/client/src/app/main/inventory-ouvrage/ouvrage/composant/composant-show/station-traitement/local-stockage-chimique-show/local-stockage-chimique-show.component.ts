import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {LocalStockage, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-local-stockage-chimique-show',
  templateUrl: './local-stockage-chimique-show.component.html',
  styleUrls: ['./local-stockage-chimique-show.component.scss'],
    animations: fuseAnimations
})
export class LocalStockageChimiqueShowComponent implements OnInit {

    local: LocalStockage;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.local=new LocalStockage();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[5]) this.local = new LocalStockage(response.data[5]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
