import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {ArmoireElectrique, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-armoire-elec-cmd-show',
  templateUrl: './armoire-elec-cmd-show.component.html',
  styleUrls: ['./armoire-elec-cmd-show.component.scss'],
    animations: fuseAnimations
})
export class ArmoireElecCmdShowComponent implements OnInit {

    armoire: ArmoireElectrique;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.armoire=new ArmoireElectrique();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[12]) this.armoire = new ArmoireElectrique(response.data[12]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }
}
