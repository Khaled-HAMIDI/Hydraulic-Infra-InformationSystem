import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {EquipementStationTraitement, PostChimique} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-prep-injection-show',
  templateUrl: './post-prep-injection-show.component.html',
  styleUrls: ['./post-prep-injection-show.component.scss'],
    animations: fuseAnimations
})
export class PostPrepInjectionShowComponent implements OnInit {

    post: PostChimique;
    exist:boolean;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private composantShowService: ComposantGetService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this._unsubscribeAll = new Subject();
        this.exist=true;
        this.post=new PostChimique();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                if (this.typePost(response.data.postChimiqueData)) this.post = new PostChimique(this.typePost(response.data.postChimiqueData));
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

    typePost(composants):PostChimique{
        for (var i in composants){
            if (composants[i].postType =='PreparationInjection') return composants[i];
        }
        return null;
    }

}
