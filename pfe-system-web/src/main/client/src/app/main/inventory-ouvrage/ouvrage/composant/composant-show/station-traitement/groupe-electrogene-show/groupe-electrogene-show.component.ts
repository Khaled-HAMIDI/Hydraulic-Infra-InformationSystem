import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {GroupeElectrogene, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-groupe-electrogene-show',
  templateUrl: './groupe-electrogene-show.component.html',
  styleUrls: ['./groupe-electrogene-show.component.scss'],
    animations: fuseAnimations
})
export class GroupeElectrogeneShowComponent implements OnInit {

    groupe: GroupeElectrogene;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.groupe=new GroupeElectrogene();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data.groupeElectrogeneData) this.groupe = new GroupeElectrogene(response.data.groupeElectrogeneData);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
