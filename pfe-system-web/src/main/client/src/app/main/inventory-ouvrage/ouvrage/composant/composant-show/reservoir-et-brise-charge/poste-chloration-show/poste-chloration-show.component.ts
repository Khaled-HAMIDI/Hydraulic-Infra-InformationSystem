import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {PosteChloration, Security} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-poste-chloration-show',
  templateUrl: './poste-chloration-show.component.html',
  styleUrls: ['./poste-chloration-show.component.scss'],
    animations: fuseAnimations
})
export class PosteChlorationShowComponent implements OnInit {

    posteChloration: PosteChloration;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.posteChloration=new PosteChloration();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (response.data[0]) this.posteChloration = new PosteChloration(response.data[0]);
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

}
