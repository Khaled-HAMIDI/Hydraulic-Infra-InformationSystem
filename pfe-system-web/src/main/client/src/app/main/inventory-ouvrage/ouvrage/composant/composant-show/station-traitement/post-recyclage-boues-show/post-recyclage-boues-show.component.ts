import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantGetService} from "../../../composant-get.service";
import {PostChimique} from "../../../../../../model/composant.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-recyclage-boues-show',
  templateUrl: './post-recyclage-boues-show.component.html',
  styleUrls: ['./post-recyclage-boues-show.component.scss'],
    animations: fuseAnimations
})
export class PostRecyclageBouesShowComponent implements OnInit {

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
                if (this.typePost(response.data[8])) this.post = new PostChimique(this.typePost(response.data[8]));
                else this.exist =false;
            },
            (error) => {
                console.log(error);
            }
        );

    }

    typePost(composants):PostChimique{
        for (var i in composants){
            if (composants[i].postType =='RecyclageBoues') return composants[i];
        }
        return null;
    }

}
