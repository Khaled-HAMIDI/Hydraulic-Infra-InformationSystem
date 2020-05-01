import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {PostChimique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-post-recyclage-eau-lavage-show',
  templateUrl: './post-recyclage-eau-lavage-show.component.html',
  styleUrls: ['./post-recyclage-eau-lavage-show.component.scss'],
    animations: fuseAnimations
})
export class PostRecyclageEauLavageShowComponent implements OnInit {

    post: PostChimique;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.post=new PostChimique();
    }

    ngOnInit(): void {
        this.composantShowService.loadPostChimique(this.route.snapshot.params['code']).then(
            (composants) => {
                if (this.typePost(composants)) {
                    this.initComposant(this.typePost(composants));
                }
                else this.exist =false ;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initComposant(composant) {
        this.post= new PostChimique(composant);
    }

    typePost(composants):PostChimique{
        for (var i in composants){
            if (composants[i].postType =='RecyclageEauLavage') return composants[i];
        }
        return null;
    }

}
