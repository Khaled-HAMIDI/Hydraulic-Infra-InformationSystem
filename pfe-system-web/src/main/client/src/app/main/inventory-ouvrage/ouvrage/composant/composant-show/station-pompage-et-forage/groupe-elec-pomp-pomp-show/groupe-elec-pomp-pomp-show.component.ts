import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {GroupeElectroPompe, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-elec-pomp-pomp-show',
  templateUrl: './groupe-elec-pomp-pomp-show.component.html',
  styleUrls: ['./groupe-elec-pomp-pomp-show.component.scss'],
    animations: fuseAnimations
})
export class GroupeElecPompPompShowComponent implements OnInit {

    groupe: GroupeElectroPompe;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.groupe=new GroupeElectroPompe();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[10]) this.groupe = new GroupeElectroPompe(response.data[10]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
